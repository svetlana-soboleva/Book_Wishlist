import { ResponseData } from "../api/types";
import { BookCard } from "./BookCard";
import { FaSearch } from "react-icons/fa";

interface Props {
  booksData: ResponseData | null | undefined;
  booksError: Error | null;
  booksAreLoading: boolean;
}

export const BookList = ({ booksData, booksError, booksAreLoading }: Props) => {
  if (!booksData || booksData.items?.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500 my-8">
        <FaSearch className="mr-2" />
        <p>Start searching for books</p>
      </div>
    );
  }

  if (booksAreLoading) {
    return <p>Loading books...</p>;
  }

  if (booksError) {
    return <div className="text-red-500">Error loading books: {booksError.message}</div>;
  }

  return (
    <div className="book-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {booksData?.items?.map((item) => <BookCard key={item.id} item={item} />)}
    </div>
  );
};
