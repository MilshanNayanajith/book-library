import { QueryClient } from "@tanstack/react-query";
import type { BookType } from "../types";

export const queryClient = new QueryClient();

function checkStatusCode(status: any) {
  let message = "";

  switch (status) {
    case 400:
      message = "Bad Request – The server could not understand the request.";
      break;
    case 401:
      message = "Unauthorized – Please log in to access this resource.";
      break;
    case 403:
      message = "Forbidden – You do not have permission to access this.";
      break;
    case 404:
      message = "Not Found – The requested book could not be found.";
      break;
    case 500:
      message = "Internal Server Error – Please try again later.";
      break;
    case 503:
      message =
        "Service Unavailable – The server is not ready. Try again soon.";
      break;
    default:
      message = `Unexpected Error – Status Code: ${status}`;
  }
  return message;
}

export async function fetchBooks() {
  const response = await fetch("http://localhost:8000/books");

  if (!response.ok) {
    const message = checkStatusCode(response.status);

    const error = new Error("An error occurred while creating the book");

    (error as any).status = response.status;
    (error as any).info = message;

    throw error;
  }

  const data = await response.json();
  return data;
}

export async function createNewBook(bookData: BookType) {
  const response = await fetch("http://localhost:8000/books", {
    method: "POST",
    body: JSON.stringify(bookData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = checkStatusCode(response.status);

    const error = new Error("An error occurred while creating the book");

    (error as any).status = response.status;
    (error as any).info = message;

    throw error;
  }

  const { book } = await response.json();
  console.log(book);

  // return book;
}

export async function searchBooks(searchQueary: string) {
  const response = await fetch(
    `http://localhost:8000/books?title=${searchQueary}`
  );

  if (!response.ok) {
    const message = checkStatusCode(response.status);

    const error = new Error("An error occurred while searching the books");

    (error as any).status = response.status;
    (error as any).info = message;

    throw error;
  }

  const books = await response.json();
  return books;
}

export async function updateBook({ id, data }: any) {
  const response = await fetch("http://localhost:8000/books/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const message = checkStatusCode(response.status);

    const error = new Error("An error occurred while updating the book");

    (error as any).status = response.status;
    (error as any).info = message;

    throw error;
  }

  const { book } = await response.json();
  console.log(book);

  return book;
}
