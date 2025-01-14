import { Link } from "react-router-dom";
import { Lock, LogOut, ShoppingCart, UserCheck, UserPlus } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const NavBar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className=" flex justify-between items-center fixed top-0 left-0 w-full px-2 md:px-10 py-2 bg-stone-800 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-slate-800">
      <Link
        to={"/"}
        className="text-2xl font-bold text-white hover:text-neutral-300 transition-all duration-300 ease-in-out items-center space-x-2 flex"
      >
        <img src="/mens_wear.png" alt="mens fashion" height={30} width={30} />
        <span> Men&apos;s Wear</span>
      </Link>
      <nav className="flex flex-wrap items-center gap-4">
        {user && (
          <Link
            to="/"
            className="text-white hover:text-neutral-300 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        )}
        {user && (
          <Link
            to="/cart"
            className="relative-group text-indigo-100 hover:text-neutral-300 transition duration-300 ease-in-out"
          >
            <ShoppingCart
              className="inline-block mr-1 group-hover:text-neutral-200"
              size={20}
            />
            <span className="hidden sm:inline">Cart</span>
            <span className="relative -top-3 -left-1 bg-neutral-300 text-stone-900 rounded-full px-2 py-0.5 text-xs">
              3
            </span>
          </Link>
        )}

        {isAdmin && (
          <Link className="bg-neutral-200 hover:bg-neutral-500 text-stone-900 hover:text-stone-300 px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
            <Lock className="inline-block mr-1" size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-neutral-200 hover:bg-neutral-500 text-stone-900 hover:text-stone-300 px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
          >
            <LogOut className="inline-block mr-1 " size={18} />
            <span className="hidden sm:inline ">Log Out</span>
          </button>
        ) : (
          <Link
            to="/signup"
            className="bg-neutral-200 hover:bg-neutral-500 text-stone-900 hover:text-stone-300 px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out flex "
          >
            <UserPlus className="mr-1" size={18} />
            <span className="hidden sm:inline  ">Sign Up</span>
          </Link>
        )}
        {!user && (
          <Link
            to="/login"
            className="bg-neutral-200 hover:bg-neutral-500 text-stone-900 hover:text-stone-300 px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out flex "
          >
            <UserCheck className="mr-1" size={18} />
            <span className="hidden sm:inline  ">Log In</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
