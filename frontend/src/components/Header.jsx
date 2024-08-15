import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-red-200 ">
      <div className="p-5 flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold"> Auth App </h1>
        </Link>
        <ul className="flex gap-3">
          <Link to="/">
            <li> Home </li>
          </Link>
          <Link to="/about">
            <li> About </li>
          </Link>
          <Link to="/login">
            <li> Login </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
