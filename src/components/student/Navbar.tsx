import { Link, useLocation } from "react-router-dom";
// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36
      border-b border-gray-500 py-4 
      ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}
    >
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* Right section */}
      <div className="hidden md:flex items-center gap-7 text-gray-500">
        {user && (
          <div className="flex items-center gap-2">
            <button>Become Educator</button>
            <span>|</span>
            <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <div className="flex items-center gap-2">
              <button>Become Educator</button>
              <span>|</span>
              <Link to="/my-enrollments">My Enrollments</Link>
            </div>
          )}
          {user ? (
            <UserButton />
          ) : (
            <button onClick={()=>openSignIn()} className="w-7 h-7">
              <img src={assets.user_icon} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
