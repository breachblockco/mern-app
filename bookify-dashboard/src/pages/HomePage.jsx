import { Home, BookMarked, Search } from "lucide-react"; // Icons from Lucide
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useState } from "react";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
=======
>>>>>>> 802c1679956afaf1a3788791ff758bdd6bccb409

const HomePage = () => {
  const [active, setActive] = useState("home");
  return (
<<<<<<< HEAD
    
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk='dashboard-02-chunk-1'>
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">You have no books</h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a book.
          </p>
          <Button className="mt-4">Add Book</Button>
        </div>
      </div>
    </>
  );
};

=======
    <div className="h-screen flex ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 px-4">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-2xl font-bold">Bookify</h1>
          </div>
          <a
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              active === "home" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActive("home")}
          >
            <Home className="w-5 h-5" />
            Home
          </a>
          <a
            href="/profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              active === "books" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActive("books")}
          >
            <BookMarked className="w-5 h-5" />
            Books
          </a>
        </nav>

        {/* Footer Section */}
        <div className="p-4">
          <p className="text-sm">© 2024 Bookify</p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <div className="w-full bg-gray-800 text-white px-10 py-2 flex items-center justify-between">
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 shadow-md w-full max-w-md mx-auto">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search for books, authors, or categories..."
              className="bg-transparent flex-1 focus:outline-none text-gray-700"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-1 rounded-full ml-2 hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Hi, User</p>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <Popover>
                <PopoverTrigger>
                  {" "}
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col">
                    <Link className="transition-all bg-gray-200 duration-200 text-xl font-medium px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white">
                      Logout
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <main className="flex-1 bg-gray-100 p-6">
          {/* Your main content goes here */}
          <h2 className="text-xl font-bold">Welcome to Bookify!</h2>
          <p>Explore your favorite books here.</p>
        </main>
      </div>
    </div>
  );
};

>>>>>>> 802c1679956afaf1a3788791ff758bdd6bccb409
export default HomePage;
