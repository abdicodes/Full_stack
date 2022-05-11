const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Book = require('../models/books')
const Author = require('../models/authors')
const User = require('../models/users')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const pubsub = new PubSub()
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
      if (!args.genre || args.genre === 'all') {
        return Book.find({}).populate('author')
      }
      return Book.find({ genres: { $all: [`${args.genre}`] } }).populate(
        'author'
      )
    },
    allAuthors: async () => {
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
      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}
module.exports = resolvers
