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
    return (
      <div className="text-center py-4 text-gray-500">
        No book in the Wish List
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="font-bold text-purple-500 opacity-60">Wish List</h1>
      <div className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {booksWishData?.map((item: Book) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
      <p className="font-bold text-purple-500 opacity-60">In Progress</p>
      <p className="font-bold text-purple-500 opacity-60">Finished</p>
    </div>
  );
}
