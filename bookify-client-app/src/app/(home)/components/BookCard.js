import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BookCard({book}) {
  return (
    <div className="flex justify-between border p-3 shadow-lg rounded-md roboto-family w-full">
      <div className='w-[40%]'>
        <Image
          src={book.coverImage}
          width={0}
          height={0}
          className="w-full h-[12rem]"
          sizes="100vw"
        />
      </div>
      <div className='w-[50%] flex flex-col items-start gap-3'>
        <h2 className="line-clamp-2 text-xl font-medium text-blue-600 leading-[22px]">
          {book.title}
        </h2>
        <p className='font-semibold text-blue-900'>{book.author.name}</p>
        <Link href={`/book/${book._id}`} className='border-[2px] border-blue-700 px-3 py-1 text-blue-700 font-medium rounded-md hover:bg-blue-200 hover:border-blue-200 transition-all duration-200'>Read More</Link>
      </div>
    </div>
  );
}

export default BookCard