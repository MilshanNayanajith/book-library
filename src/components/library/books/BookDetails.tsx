
import type { BookType } from "../../../types";
import CustomInput from "../../inputs/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelector from "../../inputs/CustomSelector";
import { categories } from "../create-new-book/BookForm";

type Props = {
  book: BookType;
  toggleViewState?: boolean;
  editableState?: boolean;
  editableFn?:(data:any) => void;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const BookDetails = ({ toggleViewState, book, editableState, editableFn, children }: Props) => {
  const { title, author, rating, category } = book;


  const formik = useFormik({
    initialValues: {
      title: title,
      author: author,
      category: category,
    },

    validationSchema: Yup.object({
      title: Yup.string().min(2).max(100).required("Title is required"),
      author: Yup.string().min(2).required("Author is required"),
      category: Yup.string().required("Category is required"),
    }),

    onSubmit: (values) => {
      const book: { title: string; author: string; category: string } = {
        title: values?.title?.toLowerCase(),
        author: values?.author?.toLowerCase(),
        category: values?.category,
      };

      console.log(book, 'book');
      editableFn?.(book);
      
    },
  });
  let listViewStyles = "p-5";


  let titleElement = (
    <h2
      className={`text-xs ${
        toggleViewState ? "" : "md:text-2xl mb-2"
      } font-bold  text-amber-400`}
    >
      {title.charAt(0).toUpperCase() + title.slice(1)}
    </h2>
  );

  let authorElement = (
    <p
      className={`text-gray-300 ${
        toggleViewState ? "text-xs" : "mb-4 sm:text-base"
      }`}
    >
      by {author}
    </p>
  );

  let categoryElement = (
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
  );

  if (editableState) {
    titleElement = (
      <CustomInput
        lable="Title"
        type="text"
        name="title"
        placeholder="Book Title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
    );

    authorElement = (
      <CustomInput
        lable="Author"
        type="text"
        name="author"
        placeholder="Author Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.author}
      />
    );

    categoryElement = (
      <CustomSelector
        lable="Category"
        name="category"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category}
        items={categories}
      />
    );
  }

  if (toggleViewState) {
    listViewStyles = "grid grid-cols-3";
  }
  return (
    <div >
      <form  className={`${listViewStyles}`} onSubmit={formik.handleSubmit}>
        {titleElement}
        {authorElement}
        {categoryElement}
        {children}
      </form>
    </div>
  );
};

export default BookDetails;
