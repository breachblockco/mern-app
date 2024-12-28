import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="border-b">
      <nav className="max-w-7xl mx-auto py-5 flex justify-between items-center">
        <div className="flex">
          <Link href={"/"} className="flex items-center gap-2">
            <img src="/navbar/logo-gif.gif" className="w-12 h-12" />
            <h1 className="text-4xl text-blue-600 font-medium ubuntu-family tracking-tight">
              Bookify
            </h1>
          </Link>
        </div>
        <div className="flex gap-5 roboto-family">
          <button className="h-fit px-5 py-1 text-xl font-medium text-white bg-blue-600 rounded-md flex items-center leading-relaxed hover:bg-blue-700 border-[3px] border-blue-600">
            Sign in
          </button>
          <button className="h-fit px-5 py-1 text-xl font-medium text-blue-600 bg-white border-[3px] border-blue-600 rounded-md flex items-center leading-relaxed hover:bg-blue-100">
            Sign up
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
