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

export const ALL_BOOKS = gql`
  query allBooks(
    $genre: String
  ) {
    allBooks(
      genre: $genre
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

// export const BOOKS_IN_GENRE = gql`
//   query booksInGenre(
//     $genre: String!
//   ) {
//     allBooks(
//       genre: $genre
//     ) {
//       title
//       author {
//         name
//       }
//       published
//       genres
//     }
//   }
// `

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
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