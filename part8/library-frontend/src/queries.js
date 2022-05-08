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
      author
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
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const LOGIN = gql`
  mutation loginform($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
