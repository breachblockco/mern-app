import Banner from "./components/Banner";
import React from "react";
import BookList from "./components/BookList";

async function page() {
  // data fetching

  const response = await fetch(`${process.env.BACKEND_URL}/books`);
  if(!response){
    throw new Error('An error occurred while fetching the books')
  }
  
  const books =await response.json();
  console.log(books)
  return (
    <>
      <Banner />
      <BookList books={books}/>
    </>
  );
}

export default page;
