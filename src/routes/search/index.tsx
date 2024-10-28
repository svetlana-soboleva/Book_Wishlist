import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchBar } from "../../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../api/api";
import { useState } from "react";
import { BookList } from "../../components/BookList";
import { ResponseData } from "../../api/types";

//fix refetching when toggling the heart here and in with list
export const Route = createFileRoute("/search/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      query: search.query as string,
    };
  },
  component: Search,
});

function Search() {
  const { query } = Route.useSearch();
  const [searchQuery, setSearchQuery] = useState(query);
  const navigate = useNavigate();

  const {
    data: booksData,
    error: booksError,
    isLoading: booksAreLoading,
  } = useQuery<ResponseData | null>({
    queryKey: ["books", searchQuery],
    queryFn: () => getBooks(searchQuery),
    //this will triger getBooks only when we get searchQuery! Cool ! :P
    enabled: !!searchQuery,
  });

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
    navigate({
      to: "/search",
      search: { query: value },
    });
  };

  return (
    <div className="p-2 flex flex-col items-center">
      <SearchBar onSearchChange={onSearchChange} />
      <BookList
        booksData={booksData}
        booksError={booksError}
        booksAreLoading={booksAreLoading}
      />
    </div>
  );
}
