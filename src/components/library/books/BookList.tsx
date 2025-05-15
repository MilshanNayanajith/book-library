import { useSelector } from "react-redux";
import type { BookType } from "../../../types";
import Book from "./Book";
import type { RootState } from "../../../redux-store/store";
import { useLocation, useNavigate } from "react-router-dom";
import BookPreview from "../book-preview/BookPreview";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../../util/http";
import ErrorMsg from "../../error-msg/ErrorMsg";
const BookList = () => {

  const { data, isError, error, isLoading} = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  let contetnt;

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = new URLSearchParams(location.search).get("id");

  const selectedBook = bookId && data && data?.find((b: BookType) => b?.id == parseInt(bookId));

  const toggleView = useSelector((state: RootState) => state.toggleView?.value);

  let view = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10";

  if (toggleView) {
    view = "flex flex-col gap-1";
  }

  if (isLoading) {
    contetnt = <h3>Loading ...</h3>;
  }

  if (isError) {
    const err = error as any;
    contetnt = <ErrorMsg msg={err.info || err.message || "Something went wrong."} />
  }

  if (data) {
    contetnt = (
      <div className={`${view}`}>
        {data &&
          data?.map((book: BookType, bookIndex: number) => (
            <Book
              key={bookIndex}
              book={book}
              toggleViewState={toggleView}
              onClick={() => navigate(`/?id=${book.id}`)}
            />
          ))}
      </div>
    );
  }

  return (
    <>
      {contetnt}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <BookPreview book={selectedBook} onClose={() => navigate("/")} />
        </div>
      )}
    </>
  );
};

export default BookList;
