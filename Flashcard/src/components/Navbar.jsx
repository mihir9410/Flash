import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-zinc-800">
      <nav className="container mx-auto flex justify-between items-center py-6 px-8">
        <div className="text-white text-xl font-semibold">
          <a href="google.com">Flash Cards</a>
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="google.com" className="text-white hover:text-green-600">Home</a>
          </li>
          <li>
            <a href="google.com" className="text-white hover:text-green-600">About</a>
          </li>
          <li>
            <a href="google.com" className="text-white hover:text-green-600">Services</a>
          </li>
          <li>
            <a href="google.com" className="text-white hover:text-green-600">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
