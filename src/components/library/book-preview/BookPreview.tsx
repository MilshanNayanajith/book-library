import { useLocation, useNavigate } from "react-router-dom";
import type { BookType } from "../../../types";
import { IoClose } from "react-icons/io5";
import BookDetails from "../books/BookDetails";
import { AiFillEdit } from "react-icons/ai";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, updateBook } from "../../../util/http";

type Props = {
  book: BookType;
  onClose: () => void;
};

const BookPreview = ({ book, onClose }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = new URLSearchParams(location.search).get("id");
  const [editable, setEditable] = useState(false);

  const imgRef = useRef<HTMLInputElement>(null);

  // const [newCoverImage, setNewCoverImage] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>(book?.coverImage);
  console.log(bookId);

  // This function for select and convert to image to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateBook,
    onMutate: async (data:any) => {
      const newData = data.book;

      await queryClient.cancelQueries({ queryKey:['books', bookId]});
      queryClient.setQueryData(['books', bookId], newData);
      
    },
    onSuccess:() => {
      setEditable((prev: boolean) => !prev);
      navigate('/')

    }

  })

  const handleEdit = (data:any) => {
    mutate({id:bookId, data: data});
   
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-w-2xl relative ">
      <button
        onClick={onClose}
        className="absolute z-50 top-5 right-5 text-white bg-red-900 rounded-full flex items-center justify-center h-8 w-8 hover:scale-105 transition delay-150 duration-300 ease-in-out "
      >
        <IoClose />
      </button>

      <div className="flex gap-4">
        <div className=" relative max-h-60">
          {editable && (
            <div className=" absolute w-full h-full bg-black/55 flex flex-col justify-center items-center">
              <button
                onClick={() => imgRef.current?.click()}
                className=" text-3xl hover:scale-110 transition duration-300 delay-100 ease-in-out"
              >
                <AiFillEdit />
              </button>
              <input
                ref={imgRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden w-full text-sm text-gray-500"
              />
            </div>
          )}
          <img src={coverImage} className="w-40 max-h-60 object-cover" />
        </div>
        {/* <img src={book.coverImage} className="w-40 h-60 object-cover" /> */}
        <div className="grow  flex flex-col justify-between relative">
          <BookDetails
            book={book}
            editableState={editable}
            editableFn={handleEdit}
          >
            <div className=" flex flex-row-reverse">
              {editable && (
                <button
                  type="submit"
                  className=" bg-amber-100 rounded-sm px-2 text-amber-700 hover:scale-105 transition  duration-300 ease-in-out text-xl"
                 
                >
                  {isPending ? 'Savving...':'Save'}
                </button>
              )}
            </div>
          </BookDetails>
          <div className=" flex flex-row-reverse">
            {!editable && (
              <button
                type="button"
                className=" bg-amber-100 rounded-sm px-2 text-amber-700 hover:scale-105 transition  duration-300 ease-in-out text-xl"
                onClick={() => setEditable((prev: boolean) => !prev)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
