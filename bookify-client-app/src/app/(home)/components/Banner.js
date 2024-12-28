import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="relative">
        <Image
          src={"/banner/paper-bg.jpg"}
          className="h-72 w-full rounded-lg"
          height={0}
          width={0}
          sizes="100vw"
        />
        <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-30"></div>
        <Image
          src={"/banner/book.png"}
          className="absolute bottom-0 right-5 h-[18rem] w-[15vw]"
          height={0}
          width={0}
          sizes="100vw"
        />
        <h3 className="absolute left-10 top-1/2 -translate-y-1/2 w-full max-w-3xl text-3xl font-medium tracking-tight text-white roboto-family">
          Discover Your Next Adventure, One Page at a Time. Welcome to{" "}
          Bookify – Where Stories Come to Life!
        </h3>
      </div>
    </div>
  );
}

export default Banner