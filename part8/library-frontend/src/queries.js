import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation addYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
    }
  }
`
export const ALL_BOOKS = gql`
  query Books($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const GENRE = gql`
  query {
    genres
  }
`

export const LOGIN = gql`
  mutation loginform($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
// const BOOK_DETAILS = gql`
//   fragment BookDetails on BOOK {
//     id
//     title
//     author {
//       name
//     }
//     genres  ${BOOK_DETAILS}
//   }
// `
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
    }
  }
`
