'use strict';

import gql from 'graphql-tag';

/**
 * Query which is used to fetch the list of books from graphql
 */
export const AllBooksQuery = gql`
{
  books {
    id
    name
    genre
    author {
      id
      name
      age
      books {
        id
        name
        genre
      }
    }
  }
}
`;

export const AllAuthorsQuery = gql`
{
  authors {
    id
    name
    age
    books {
      id
      name
      genre
    }
  }
}
`;

export const addBooksQuery = gql`
mutation ($name: String!, $genre: String!, $authorId: ID!) {
  addBook(name: $name, genre: $genre, authorId: $authorId) {
    id
    name
    genre
  }
}
`;

export const addAuthorsQuery = gql`
mutation ($name: String!, $age: Int!) {
  addAuthor(name: $name, age: $age) {
    id
    name
    age
  }
}
`;