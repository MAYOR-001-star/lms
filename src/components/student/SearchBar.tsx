import { useNavigate } from "react-router-dom";
// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { SearchBarProps } from "../../types/types";

const SearchBar = ({ data = "" }: SearchBarProps) => {
  const navigate = useNavigate()

  // Sync input state with URL param
  const [input, setInput] = useState<string>(data);

  useEffect(() => {
    setInput(data);
  }, [data]);

  const onSearchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = input.trim();

    // Navigate to new course search URL
    if (query.length > 0) {
      navigate(`/course-list/${query}`);
    } else {
      // If empty search, go back to base list
      navigate(`/course-list`);
    }
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded pl-2 pr-1 md:pl-2"
    >
      <img
        src={assets.search_icon}
        alt="search icon"
        className="w-5 md:w-auto"
      />

      <input
        type="text"
        placeholder="Search for courses"
        aria-label="Search for courses"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        value={input}
        className="flex-1 h-full outline-none text-gray-500/80 px-3"
      />

      <button
        type="submit"
        className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 ml-2 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
