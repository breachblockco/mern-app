import React from 'react'
import BookCard from './BookCard'

function BookList({books}) {
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