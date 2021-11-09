import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

function Header() {
  const items = useSelector(selectItems);
  const router = useRouter();
  const [session] = useSession();

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center bg-gradient-to-r from-[#11412c] to-[#1f2221] p-1 flex-grow py-2">
        <div onClick={() => router.push("/")} className="mt-2 ml-2 flex items-center flex-grow sm:flex-grow-0 cursor-pointer">
          <Image
            src="https://raw.githubusercontent.com/SedatCeyhan/LogoStorage/f3469b9eecfc7d595477f87a4a9ab7c838d73dfb/e-com-1.svg"
            width={80}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
          <h2 className="hidden sm:inline text-white text-xl text-center font-extrabold mr-10">E-Commerce App</h2>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 placeholder-gray-500"
            type="text "
            placeholder="This is a Personal Project by Sedat Ceyhan (No Commercial Purposes!)"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="flex items-center text-xs text-white space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={!session ? signIn : signOut}
            className="cursor-pointer link"
          >
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}!` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div
            onClick={() => session && router.push("/orders")}
            className="cursor-pointer link"
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative flex items-center cursor-pointer link"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center space-x-5 p-2 pl-6 bg-gradient-to-r from-[#0c2e1f] to-[#2b3037] text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" /> All
        </p>
        <p className="link">Your Videos</p>
        <p className="link">Your Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Premium</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
