import { Book } from "../api/types";
import { FaHeart, FaBookOpen } from "react-icons/fa";
import { toggleBook, getWishBooks } from "../stores/bookStore";
import icon from '../assets/onImgPlaceholder.png'
import { formatDate } from "../api/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const BookCard = ({ item }: { item: Book }) => {
  const queryClient = useQueryClient();
  const { selfLink, volumeInfo } = item;
  const { title, authors, publishedDate, pageCount, imageLinks } = volumeInfo;

  const thumbnail =
    imageLinks?.smallThumbnail || icon

  const { data: booksWishData } = useQuery<Book[]>({
    queryKey: ["wishBooks"],
    queryFn: getWishBooks,
  });

  const isBookInWishList = booksWishData?.some(
    (book: Book) => book.id === item.id
  );

  const { mutate } = useMutation({
    mutationFn: (book: Book) => {
      toggleBook(book);
      // sahll useMutation return a Promise???
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishBooks"] });
    },
  });

  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 w-48">
      <img
        src={thumbnail}
        alt={`${title} cover`}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h2 className="text-sm font-bold mb-1 text-gray-900 truncate">{title}</h2>
      <p className="text-xs text-gray-700 truncate">
        {authors?.join(", ") || "Unknown Author"}
      </p>
      <p className="text-xs text-gray-600 mb-2">
        <strong>Published:</strong> {formatDate(publishedDate)}
      </p>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => mutate(item)}
          className="flex items-center text-gray-500 text-xs hover:text-red-500 hover:cursor-pointer"
        >
          <FaHeart
            className={`${isBookInWishList ? "text-red-600" : "text-gray-500 hover:text-red-400"}`}
          />
        </button>

        <div className="flex items-center space-x-2 text-gray-600">
          {pageCount && (
            <p className="text-xs text-gray-700">{pageCount} pages</p>
          )}
          <a href={selfLink} target="_blank" rel="noopener noreferrer">
            <FaBookOpen />
          </a>
        </div>
      </div>
    </div>
  );
};
