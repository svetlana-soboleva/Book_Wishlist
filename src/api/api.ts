const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const KEY = import.meta.env.VITE_REACT_APP_BOOKS;

export const getBooks = async (query: string) => {
  const queries = query.split(" ").join("+");
  try {
    const res = await fetch(`${BASE_URL}${queries}&key=${KEY}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};
