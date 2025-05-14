import { useLocation } from "react-router-dom";
import type { BookType } from "../../../types";
import { IoClose } from "react-icons/io5";
import BookDetails from "../books/BookDetails";

type Props = {
  book: BookType;
  onClose: () => void;
};

const BookPreview = ({ book, onClose }: Props) => {
  const location = useLocation();
  const bookId = new URLSearchParams(location.search).get("id");

  console.log(bookId);
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-w-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white bg-red-900 rounded-full flex items-center justify-center h-8 w-8 hover:scale-105 transition delay-150 duration-300 ease-in-out "
      >
        <IoClose />
      </button>

      <div className="flex gap-4">
        <img src={book.coverImage} className="w-40 h-60 object-cover" />
        <div className="grow">
        <BookDetails book={book} />
      </div>
      </div>
    </div>
  );
};

export default BookPreview;
