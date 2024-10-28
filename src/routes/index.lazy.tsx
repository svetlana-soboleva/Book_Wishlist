import { createLazyFileRoute } from "@tanstack/react-router";
import { getWishBooks } from "../stores/bookStore";
import { useQuery } from "@tanstack/react-query";
import { BookCard } from "../components/BookCard";
import { Book } from "../api/types";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const {
    data: booksWishData,
    error: booksError,
    isLoading: booksAreLoading,
  } = useQuery({
    queryKey: ["wishBooks"],
    queryFn: getWishBooks,
  });

  if (booksError) {
    return <div>Error occured</div>;
  }
  if (booksAreLoading) {
    return <div>Loading...</div>;
  }

  if (booksWishData.length == 0) {
    return <div>No book in the Wish List</div>;
  }

  return (
    <div className="grid grid-cols-1 justify-items-center place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {booksWishData?.map((item: Book) => (
        <BookCard key={item.id} item={item} />
      ))}
    </div>
  );
}
