import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5513",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (data) => api.post("/api/users/login", data);
export const register = async (data) => api.post("/api/users/register", data);

export const getBooks = async () => api.get("/api/books");

export const createBook = async (data) =>
  api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBook = async (bookId) => {
  return api.delete(`/api/books/${bookId}`);
};

export const getSingleBook = async (bookId) => api.get(`/api/books/${bookId}`);

export const updateBook = async (updatedData) => {
  console.log(updatedData.bookId);
  console.log(updatedData.formdata);

  // Perform the PATCH request to update the book
  const response = await api.patch(
    `/api/books/${updatedData.bookId}`,
    updatedData.formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Return the response data from the API request
  return response.data;
};

