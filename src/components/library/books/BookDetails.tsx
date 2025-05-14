import type { BookType } from "../../../types";

type Props = {
  book: BookType;
  toggleViewState?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const BookDetails = ({ toggleViewState, book }: Props) => {
    const { title, author, rating, category } = book; 
  let listViewStyles = "p-5";
  let imgStyles = "h-[calc(140px)] md:h-[calc(240px)] md:min-w-[calc(180px)]";

  if (toggleViewState) {
    listViewStyles = "grid grid-cols-3";
    imgStyles = "h-[calc(20px)] w-[calc(15px)]";
  }
  return (
    <div className={`${listViewStyles}`}>
      <h2
        className={`text-xs ${
          toggleViewState ? "" : "md:text-2xl mb-2"
        } font-bold  text-amber-400`}
      >
        {title}
      </h2>
      <p
        className={`text-gray-300 ${
          toggleViewState ? "text-xs" : "mb-4 sm:text-base"
        }`}
      >
        by {author}
      </p>
      <div
        className={`flex items-center gap-2 ${
          toggleViewState ? "text-xs" : "text-sm"
        }   text-gray-400 `}
      >
        <span
          className={`${
            toggleViewState ? "text-xs" : "bg-gray-700 px-2 py-1 rounded"
          } `}
        >
          {category}
        </span>
        <span className="flex items-center gap-1">
          ⭐ {rating.toFixed(1)} / 5
        </span>
      </div>

    </div>
  );
};

export default BookDetails;
