import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { createNewBook } from '../../../util/http';
import type { BookType } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { queryClient } from "../../../util/http";

const categories = [
  'Fiction',
  'Non-Fiction',
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Horror',
  'Biography',
  'Historical',
];

const BookForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewBook,
        onSuccess: () => {
         queryClient.invalidateQueries();
         navigate('/')
        }
    })


  const [coverImage, setCoverImage] = useState<string>('');
  const id = Math.floor(Math.random() * 1000000); // Generates a number between 0 - 999999

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      category: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().min(2).max(100).required('Title is required'),
      author: Yup.string().min(2).required('Author is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: (values) => {
      const book:BookType = {
        id,
        ...values,
        coverImage,
        rating: 0
      };
      mutate(book)
      console.log(book);
      // Send to server or Redux
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>

      <input
        type="text"
        name="title"
        placeholder="Book Title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      {formik.touched.title && formik.errors.title && (
        <p className="text-red-500 text-sm">{formik.errors.title}</p>
      )}

      <input
        type="text"
        name="author"
        placeholder="Author Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.author}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      {formik.touched.author && formik.errors.author && (
        <p className="text-red-500 text-sm">{formik.errors.author}</p>
      )}

      <select
        name="category"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category}
        className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {formik.touched.category && formik.errors.category && (
        <p className="text-red-500 text-sm">{formik.errors.category}</p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-500"
      />
      {coverImage && (
        <img
          src={coverImage}
          alt="Cover Preview"
          className="h-40 w-auto mt-2 rounded shadow"
        />
      )}

      <button
        type="submit"
        className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-200"
      >
        {isPending ? 'Loading...': 'Save Book'}
      </button>
    </form>
  );
};

export default BookForm;
