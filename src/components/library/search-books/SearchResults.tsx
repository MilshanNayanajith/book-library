import { useNavigate } from "react-router-dom";
import type { BookType } from "../../../types";

type Props = {
  books: BookType[];
  clrResultFunc : () => void;
};

const SearchResults = ({ books, clrResultFunc }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {books.length === 0 && (
        <p className="text-center text-gray-500">No books found.</p>
      )}
      {books?.map((book: BookType) => (
        <div
          key={book.id}
          onClick={() => {
            clrResultFunc();
            navigate(`/?id=${book.id}`)
          }}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200 overflow-hidden flex w-full"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-15 h-20  object-cover"
          />
          <div className="p-3">
            <h2 className="text-sm font-semibold text-gray-800 truncate">
              {book.title}
            </h2>
            <p className="text-xs text-gray-500 truncate">{book.author}</p>
            <p className="text-xs text-amber-500 font-semibold mt-1">
              ★ {book.rating}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchResults;
