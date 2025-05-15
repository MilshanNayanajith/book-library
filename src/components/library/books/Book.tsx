import type { BookType } from "../../../types";
import BookDetails from "./BookDetails";

type Props = {
  book: BookType;
  toggleViewState?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Book = ({ book, toggleViewState, ...rest }: Props) => {
  const { coverImage } = book;

  let imgStyles = "h-[calc(140px)] md:h-[calc(240px)] md:min-w-[calc(180px)]";

  let cardStyle = 'flex flex-row hover:scale-110 hover:z-10 hover:shadow-2xl hover:bg-gray-900 cursor-pointer transition-transform duration-300 ease-in-out transform rounded-md overflow-hidden';
  if (toggleViewState) {
    imgStyles = "h-[calc(20px)] w-[calc(15px)]";
    cardStyle = 'flex flex-row hover:scale-100 hover:z-10 hover:shadow-2xl hover:bg-gray-900 cursor-pointer transition-transform duration-300 ease-in-out transform rounded-md overflow-hidden'
  }

  return (
    <div
      {...rest}
      className={cardStyle}
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
