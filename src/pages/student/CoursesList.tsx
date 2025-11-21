// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import SearchBar from "../../components/student/SearchBar";
import CourseCard from "../../components/student/CourseCard";
import { useGlobalContext } from "../../context/AppContext";
import type { Course } from "../../types/types";

const CoursesList = () => {
  const {  allCourses } = useGlobalContext();
  const { input } = useParams<string>();
  const navigate = useNavigate();

  // Memoized filtered courses
  const filteredCourses = useMemo<Course[] | null>(() => {
    if (!allCourses) return null; // null = still loading
    if (input) {
      return allCourses.filter((course) =>
        course.courseTitle.toLowerCase().includes(input.toLowerCase())
      );
    }
    return allCourses.slice(); // default = all courses
  }, [input, allCourses]);

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left">
      {/* Header */}
      <div className="flex lg:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>{" "}
            / <span>Course List</span>
          </p>
        </div>

        <SearchBar data={input} />
      </div>

      {/* Search info */}
      {input && (
        <div className="inline-flex items-center gap-4 px-4 py-2 rounded border border-gray-400 mt-8 -mb-8 text-gray-600">
          <p>{input}</p>
          <img
            src={assets.cross_icon}
            alt=""
            className="cursor-pointer"
            onClick={() => navigate("/course-list")}
          />
        </div>
      )}

      {/* Courses grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {filteredCourses === null ? (
          <p className="text-gray-600">Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        ) : (
          <p className="text-gray-600">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
