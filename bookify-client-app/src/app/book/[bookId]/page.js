import Image from "next/image";
import Link from "next/link";
import React from "react";

async function SingleBookPage({ params }) {
  let book;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/books/${params.bookId}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching book");
    }
    book = await response.json();
  } catch (error) {
    throw new Error("Error fetching book");
  }

  if (!book) {
    throw new Error("Book not found");
  }
  return (
    <div className="max-w-7xl mx-auto flex roboto-family my-10 justify-between">
      <div className="w-[55%]">
        <h2 className="text-5xl text-blue-900 font-semibold">{book.title}</h2>
        <h5 className="text-2xl font-medium mt-4">by {book.author.name}</h5>
        <p className="mt-4 mb-24">
          Sure! Here's some random text: --- In the quiet embrace of the morning
          sun, a gentle breeze carried the whispers of a new day. The world
          seemed to hold its breath, waiting for the symphony of life to begin.
          Birds danced across the sky, painting melodies with their wings, while
          the leaves swayed in rhythm to an unseen orchestra. Each moment felt
          alive, brimming with untold stories and endless possibilities. It was
          a reminder that every sunrise brings the gift of a fresh start,
          wrapped in the warmth of hope.
        </p>
        <Link
          href={book.file}
          target="_blank"
          className="px-7 py-2 rounded-lg text-xl bg-blue-700 text-white font-medium"
        >
          Download Now
        </Link>
      </div>
      <div className="w-[35%]">
        <Image
          src={book.coverImage}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[50vh]"
        />
      </div>
    </div>
  );
}

export default SingleBookPage;
