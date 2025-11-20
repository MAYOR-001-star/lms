// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import type { paramsType } from "../../types/types";
import { useMemo, useState } from "react";
import { useGlobalContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import DOMPurify from "dompurify";
import humanizeDuration from "humanize-duration";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import YouTube from "react-youtube";

const CoursesDetail = () => {
  const { id } = useParams<paramsType>();
  const [openSection, setOpenSection] = useState<Record<number, boolean>>({});
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<any>(null);
  const {
    allCourses,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useGlobalContext();

  const courseData = useMemo(() => {
    return allCourses.find((course) => course._id === id) || null;
  }, [id, allCourses]);

  if (!courseData) return <Loading />;

  const sanitizedDescription = DOMPurify.sanitize(
    courseData.courseDescription || ""
  );
  const ratingValue = calculateRating?.(courseData) || 0;

  const toggleSection = (index: number) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 to-white pt-10 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 md:px-12">
        {/* LEFT SIDE — COURSE DETAILS */}
        <div className="w-full md:w-3/5 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            {courseData.courseTitle}
          </h1>

          <p
            className="mt-4 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription.slice(0, 200),
            }}
          />

          {/* Ratings Row */}
          <div className="flex items-center gap-3 mt-4">
            <p className="font-semibold">{ratingValue.toFixed(1)}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < Math.floor(ratingValue)
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="rating star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              {courseData.courseRatings.length} ratings ·{" "}
              {courseData.enrolledStudents.length} students
            </p>
          </div>

          {/* Instructor */}
          <p className="text-sm mt-2 text-gray-700">
            Course by{" "}
            <span className="text-blue-600 underline">
              {courseData.instructor}
            </span>
          </p>

          {/* Course Description */}
          <h2 className="mt-10 mb-2 font-semibold text-xl">
            Course Description
          </h2>
          <p
            className="text-gray-700 text-sm md:text-base leading-relaxed rich-text"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />

          {/* Course Structure */}
          <div className="pt-10">
            <h2 className="text-xl font-semibold mb-4">Course Structure</h2>
            <div className="space-y-2">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-300`}
                >
                  {/* Accordion Header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.dropdown_icon}
                        alt="arrow-icon"
                        className={`w-5 transition-transform duration-300 ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium text-sm md:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-base">
                      {chapter.chapterContent.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-[2000px] py-2" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 text-gray-600">
                      {chapter.chapterContent.map((lecture, lecIndex) => (
                        <li
                          key={lecIndex}
                          className="flex items-start gap-2 py-1"
                        >
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoID: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — COURSE PURCHASE CARD */}
        <div className="w-full md:w-2/5">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-4">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img
                src={courseData.courseThumbnail}
                className="rounded-lg w-full object-cover shadow-md"
                alt={courseData.courseTitle}
              />
            )}

            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} alt="" />

              <p className="text-red-500">
                <span>5 days</span> left at this price
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">
                  {currency}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 line-through">
                  {currency}
                  {courseData.coursePrice}
                </p>
                <p className="text-sm text-gray-400">
                  {courseData.discount}% off
                </p>
              </div>

              <div className="flex items-center text-sm md:text-base gap-4 pt-2 text-gray-500">
                <div className="flex items-center gap-1">
                  <img src={assets.star} alt="star-icon" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className="h-4 w-px bg-gray-500/40"></div>
                <div className="flex items-center gap-1">
                  <img src={assets.time_clock_icon} alt="clock-icon" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>
                <div className="h-4 w-px bg-gray-500/40"></div>
                <div className="flex items-center gap-1">
                  <img src={assets.lesson_icon} alt="lesson-icon" />
                  <p>{calculateNoOfLectures(courseData)}</p>
                </div>
              </div>

              <button
                className={`w-full mt-4 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300
                  ${
                    isEnrolled
                      ? "bg-gray-400 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">
                  What's in the course?
                </h3>
                <ul className="text-sm space-y-3 text-gray-700">
                  {[
                    "Lifetime access with free updates.",
                    "Step-by-step project guidance.",
                    "Downloadable resources.",
                    "Certificate of completion.",
                    "Quizzes to test knowledge.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <RiCheckboxBlankCircleFill
                        size={6}
                        className="text-gray-500"
                      />
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
