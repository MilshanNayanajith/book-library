import type { BookType } from "../types";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchBooks() {
    const response = await fetch('http://localhost:8000/books');
  
    if (!response.ok) {
      const errorBody = await response.json();
      const error = new Error('An error occurred while fetching the books');
      
     
      (error as any).status = response.status;
      (error as any).info = errorBody;
  
      throw error;
    }
  
    const books = await response.json();
    return books;
  }

  export async function createNewBook(bookData:BookType) {
    const response = await fetch('http://localhost:8000/books',{
      method:'POST',
      body: JSON.stringify(bookData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      const errorBody = await response.json();
      const error = new Error('An error occurred while creating the book');
      
     
      (error as any).status = response.status;
      (error as any).info = errorBody;
  
      throw error;
    }
  
    const { book } = await response.json();
    console.log(book);
    
    // return book;
  }
  