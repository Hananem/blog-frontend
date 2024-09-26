import React, { useState, useRef, useEffect } from 'react';
import { FiSlack, FiChevronDown, FiMenu } from 'react-icons/fi';
import { BiLogOut, BiUser } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Logout Handler
    const logoutHandler = () => {
        setOpen(false);
        dispatch(logoutUser());
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const closeDropdown = () => {
        setOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden text-black hover:text-gray-500 focus:outline-none"
                        >
                            <FiMenu className="h-6 w-6" />
                        </button>
                        <div className="flex-shrink-0 flex items-center text-black hover:text-gray-500 font-xl">
                            <FiSlack />
                        </div>
                    </div>

                    <div className="hidden md:flex">
                        <Link
                            to="/"
                            className="px-3 py-2 text-sm font-medium text-black hover:text-gray-500"
                        >
                            Home
                        </Link>

                        <Link
                            to="/posts"
                            className="px-3 py-2 text-sm font-medium text-black hover:text-gray-500"
                        >
                            Post
                        </Link>

                        {user && (
                            <Link
                                to="/posts/create-post"
                                className="px-3 py-2 text-sm font-medium text-black hover:text-gray-500"
                            >
                                Create
                            </Link>
                        )}
                        {user?.isAdmin && (
                            <Link
                                to="/admin-dashboard"
                                className="px-3 py-2 text-sm font-medium text-black hover:text-gray-500"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="flex">
                        <div className="relative inline-block text-left">
                            {user ? (
                                <button
                                    onClick={toggleDropdown}
                                    className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                >
                                    <img
                                        src={user.profilePhoto.url}
                                        alt="user photo"
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span>{user.username}</span>
                                    <FiChevronDown
                                        onClick={closeDropdown} // Close dropdown when FiChevronDown is clicked
                                        className="ml-2 h-5 w-5 cursor-pointer"
                                        aria-hidden="true"
                                    />
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-3 py-2 text-sm font-medium text-black hover:text-gray-500"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-3 py-2 text-sm font-medium text-black hover:text-gray-500"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                            {open && (
                                <div
                                    ref={dropdownRef}
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <div className="py-1">
                                        <Link
                                            to={`/profile/${user?._id}`}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <BiUser className="mr-2" />
                                            Profile
                                        </Link>
                                        <div
                                            onClick={logoutHandler}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <BiLogOut className="mr-2" />
                                            Logout
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            {sidebarOpen && (
                <div className="md:hidden">
                    <div className="fixed inset-0 flex z-40">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
                                    onClick={toggleSidebar}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <FiMenu className="h-6 w-6 text-white" />
                                </button>
                            </div>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <FiSlack />
                                </div>
                                <nav className="mt-5 px-2 space-y-1">
                                    <Link
                                        to="/"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                        onClick={toggleSidebar}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/posts"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                        onClick={toggleSidebar}
                                    >
                                        Post
                                    </Link>
                                    {user && (
                                        <Link
                                            to="/posts/create-post"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                            onClick={toggleSidebar}
                                        >
                                            Create
                                        </Link>
                                    )}
                                    {user?.isAdmin && (
                                        <Link
                                            to="/admin-dashboard"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                            onClick={toggleSidebar}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
