import { NavLink } from "react-router-dom";
import { ReactComponent as TLogoWhite } from "../assets/tgwalk_white.svg";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 z-20 fixed min-w-full">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 flex justify-center sm:block ">
        <div className="relative flex h-16 items-center justify-between ">
          <div className="block w-10 mr-10 sm:hidden">
            <div className="z-20 w-fit cursor-pointer">
              <NavLink to={"/"}>
                <TLogoWhite className="block h-10 w-auto lg:hidden" />
              </NavLink>
            </div>
          </div>
          <div className="z-20 w-fit cursor-pointer">
            <NavLink to={"/"}>
              <TLogoWhite className="hidden h-14 w-auto lg:block" />
            </NavLink>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch -ml-10">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-16">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white block rounded-md px-4 py-2 text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/testimonials"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white block rounded-md px-4 py-2 text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                  }
                >
                  Testimonials
                </NavLink>
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white block rounded-md px-4 py-2 text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                  }
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="sm:hidden flex flex-row space-between justify-center"
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            }
            aria-current="page"
          >
            Home
          </NavLink>
        </div>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to={"/testimonials"}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Testimonials
          </NavLink>
        </div>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
