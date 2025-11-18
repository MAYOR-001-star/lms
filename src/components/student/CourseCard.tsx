import { Link } from "react-router-dom";
// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
import { useGlobalContext } from "../../context/AppContext";
import type { Course } from "../../types/types";

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const { currency, calculateRating } = useGlobalContext() || {};
  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 rounded-lg pb-6 overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        {/* <p>{course.educator.name}</p> */}
        <div className="flex items-center space-x-2">
          <p>{calculateRating?.(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
              src={index < Math.floor(calculateRating?.(course) || 0)
                  ? assets.star
                  : assets.star_blank}
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
