import type { BookType } from "../../../types";
import BookDetails from "./BookDetails";

type Props = {
  book: BookType;
  toggleViewState?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Book = ({ book, toggleViewState, ...rest }: Props) => {
  const { coverImage } = book;

  let imgStyles = "h-[calc(140px)] md:h-[calc(240px)] md:min-w-[calc(180px)]";

  if (toggleViewState) {
    imgStyles = "h-[calc(20px)] w-[calc(15px)]";
  }

  return (
    <div
      {...rest}
      className="flex flex-row hover:scale-110 hover:z-10 hover:shadow-2xl hover:bg-gray-900 cursor-pointer transition-transform duration-300 ease-in-out transform rounded-md overflow-hidden"
    >
      <div className=" bg-amber-100 me-2">
        <img className={`${imgStyles} object-center`} src={coverImage} />
      </div>
      <div className="grow">
        <BookDetails book={book} toggleViewState={toggleViewState} />
      </div>
    </div>
  );
};

export default Book;
