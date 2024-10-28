import { atom } from "nanostores";
import { Book } from "../api/types";

const LOCAL_STORAGE_KEY = "wishListBooks";

export const $books = atom<Book[]>([]);

function saveToLocalStorage(books: Book[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
}

export function toggleBook(book: Book) {
  const currentBooks = $books.get();
  const bookIndex = currentBooks.findIndex(
    (existingBook) => existingBook.id === book.id
  );

  let updatedBooks;

  if (bookIndex === -1) {
    updatedBooks = [...currentBooks, book];
  } else {
    updatedBooks = currentBooks.filter((_, index) => index !== bookIndex);
  }

  $books.set(updatedBooks);
  saveToLocalStorage(updatedBooks);
}

export function getWishBooks() {
  const initialBooks = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
  );
  return initialBooks;
}
