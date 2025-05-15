import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import SearchResults from "./SearchResults";
import { fetchBooks } from "../../../util/http";
import type { BookType } from "../../../types";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
 
  const { data, isPending, isError, error }: any = useQuery({
    queryKey: ["booksq"],
    queryFn: fetchBooks,
  });

  const clearSearchResult = () => {
    setFilteredBooks([]);
    setSearchTerm('');
  }
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);

  useEffect(() => {
    if (data && searchTerm) {
      const filtered = data.filter((item: BookType) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(data || []);
    }
  }, [searchTerm, data]);
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            &times;
          </button>
        )}
      </div>

      {searchTerm !== "" && (
        <div className="absolute flex flex-col gap-2 min-w-[calc(230px)] bg-gray-600 mt-2 rounded-md overflow-hidden p-2">
          <SearchResults books={filteredBooks} clrResultFunc={clearSearchResult}  />
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
