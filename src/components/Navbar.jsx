import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="p-3 flex justify-center items-center space-x-5 text-xl text-black border-b border-gray-500 font-medium">
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
            </nav>
        </>
    )
};

export default Navbar;
