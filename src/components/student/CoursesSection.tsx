import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import type { Course } from "../../types/types";

const CoursesSection = () => {
  // const ctx = useGlobalContext();
  // const allCourses = ctx?.allCourses ?? [];
  const{ allCourses } = useGlobalContext();
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">Learn from best</h2>
      <p className="text-sm md:text-base text-gray-500 my-4">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>
      {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(2000px, 1fr))] px-4 md:px-0 md:my-16 my-10 gap-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course:Course, index:number) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      <Link
        to="/course-list"
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
        onClick={() => scrollTo(0, 0)}
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
