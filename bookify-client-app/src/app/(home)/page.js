import Banner from "./components/Banner";
import React, { Suspense } from "react";
import BookList from "./components/BookList";
import Loading from "@/components/Loading";

async function page() {
  return (
    <>
      <Banner />
      <Suspense fallback={<Loading/>}>
        <BookList />
      </Suspense>
    </>
  );
}

export default page;
