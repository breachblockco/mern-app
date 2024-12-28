import React from 'react'
import BookCard from './BookCard'

async function BookList() {
  // data fetching
  const response = await fetch(`${process.env.BACKEND_URL}/books`);
  if(!response){
    throw new Error('An error occurred while fetching the books')
  }
  
  const books =await response.json();
  console.log(books)
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 max-w-7xl mx-auto mb-14'>
        {
            books.map((book)=>(
                <BookCard key={book._id} book={book}/>
            ))
        }
    </div>
  )
}

export default BookList