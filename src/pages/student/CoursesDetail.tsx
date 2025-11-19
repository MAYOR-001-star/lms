// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import type { paramsType } from "../../types/types";
import { useMemo } from "react";
import { useGlobalContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import DOMPurify from "dompurify";

import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const CoursesDetail = () => {
  const { id } = useParams<paramsType>();
  const { allCourses, calculateRating, calculateChapterTime } = useGlobalContext();

  const courseData = useMemo(() => {
    return allCourses.find((course) => course._id === id) || null;
  }, [id, allCourses]);

  if (!courseData) return <Loading />;

  const sanitizedDescription = DOMPurify.sanitize(courseData.courseDescription || "");
  const ratingValue = calculateRating?.(courseData) || 0;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 to-white pt-10 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 md:px-12">

        {/* LEFT SIDE — COURSE DETAILS */}
        <div className="w-full md:w-3/5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            {courseData.courseTitle}
          </h1>

          <p
            className="mt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription.slice(0, 200) }}
          />

          {/* Ratings Row */}
          <div className="flex items-center gap-3 mt-4">
            <p className="font-semibold">{ratingValue.toFixed(1)}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < Math.floor(ratingValue) ? assets.star : assets.star_blank}
                  alt="rating star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              {courseData.courseRatings.length} ratings · {courseData.enrolledStudents.length} students
            </p>
          </div>

          {/* Instructor */}
          <p className="text-sm mt-2 text-gray-700">
            Course by <span className="text-blue-600 underline">{courseData.instructor}</span>
          </p>

          {/* Course Description */}
          <h2 className="mt-10 mb-2 font-semibold text-xl">Course Description</h2>
          <p
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription.slice(0, 500) }}
          />

          {/* Course Structure Placeholder */}
          <div className="pt-10 text-gray">
            {/* TODO: Add your course structure component or content here */}
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => {
                return (
                  <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                    <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                      <div className="flex items-center gap-2">
                        <img src={assets.dropdown_icon} alt="arrow-icon" className="w-5" />
                        <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                      </div>
                      <p className="text-sm md:text-default">{chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — COURSE PURCHASE CARD */}
        <div className="w-full md:w-2/5">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <img
              src={courseData.courseThumbnail}
              className="rounded-lg w-full object-cover"
              alt={courseData.courseTitle}
            />

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">${courseData.coursePrice}</p>
              {courseData.oldPrice && (
                <p className="text-sm text-gray-500 line-through">${courseData.oldPrice}</p>
              )}

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                Enroll Now
              </button>

              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">What's in the course?</h3>
                <ul className="text-sm space-y-3 text-gray-700">
                  {[
                    "Lifetime access with free updates.",
                    "Step-by-step project guidance.",
                    "Downloadable resources.",
                    "Certificate of completion.",
                    "Quizzes to test knowledge."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <RiCheckboxBlankCircleFill size={6} className="text-gray-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;
