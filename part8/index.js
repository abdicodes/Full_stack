require('dotenv').config()
const jwt = require('jsonwebtoken')
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')
const { v1: uuid } = require('uuid')
const User = require('./models/users')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const db = process.env.MONGODB_URI_LIBRARY
console.log('connecting to', db)

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    booksByGenre(gere: String!): [Book]!
    genres: [String!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    genres: async (root, args) => {
      const books = await Book.find({})
      return [...new Set(books.map((item) => item.genres).flat())]
    },
    allBooks: async (root, args) => {
      // if (!args.author && !args.genre) return books
      // if (args.author && args.genre)
      //   return books.filter(
      //     (book) =>
      //       book.author === args.author && book.genres.includes(args.genre)
      //   )
      // return books.filter((book) =>
      //   args.author
      //     ? book.author === args.author
      //     : book.genres.includes(args.genre)
      // )
      // const books = await Book.find({})
      // return books.map(book =>  book = {...book, author:  })
      console.log(args.genre)
      if (!args.genre || args.genre === 'all') {
        return Book.find({}).populate('author')
      }
      console.log('hello')
      return Book.find({ genres: { $all: [`${args.genre}`] } }).populate(
        'author'
      )
    },
    allAuthors: async () => {
      // return authors.map(
      //   (author) =>
      //     (author = {
      //       ...author,
      //       bookCount: () =>
      //         books.filter((book) => book.author === author.name).length,
      //     })
      // )
      const authors = await Author.find({})
      const books = await Book.find({})

      return authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          id: author._id,

          bookCount: books.filter(
            (book) => book.author.toString() === author._id.toString()
          ).length,
        }
      })
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError('author must be at least 4 characters')
        }
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(
          'invalid input: book must be at least 2 characters!'
        )
      }
      return book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author?.name) {
        throw new UserInputError('author cannot be found')
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(args.username)
      console.log(user)

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
