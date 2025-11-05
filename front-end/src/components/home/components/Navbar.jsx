import React, { useState } from "react";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query); // send search text to parent
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white">
      <h1 className="text-lg font-bold">MyShop</h1>

       <div className="flex gap-4">
        <button
          className="hover:text-yellow-300 transition"
        >
          Men
        </button>
        <button
          
          className="hover:text-yellow-300 transition"
        >
          Women
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 rounded-l-md text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-3 py-1 rounded-r-md hover:bg-yellow-500"
        >
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
