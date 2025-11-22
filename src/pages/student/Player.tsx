// Player.tsx
import { useGlobalContext } from "../../context/AppContext";
// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
// @ts-expect-error: no type declarations for humanize-duration
import humanizeDuration from "humanize-duration";
import { useParams } from "react-router-dom";
import type { Course, PlayerData } from "../../types/types";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { calculateChapterTime, enrolledCourses } = useGlobalContext();
  const { courseId } = useParams(); // FIXED: matches route

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [openSection, setOpenSection] = useState<Record<number, boolean>>({});
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  // NEW: store completed lectures
  const [completedLectures, setCompletedLectures] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (index: number) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getCourseData = () => {
    const course = enrolledCourses.find((c) => c._id === courseId) || null;
    setCourseData(course);
  };

  useEffect(() => {
    getCourseData();
  }, [courseId, enrolledCourses]);

  // MARK COMPLETE HANDLER
  const markLectureComplete = () => {
    if (!playerData) return;

    const key = `${playerData.chapter}-${playerData.lecture}`;
    setCompletedLectures((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  return (
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* Course Structure */}
      <div className="text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Course Structure</h2>

        <div className="space-y-2">
          {courseData &&
            courseData.courseContent.map((chapter, index) => {
              // Check if ALL lectures are completed
              const isChapterCompleted = chapter.chapterContent.every(
                (_, lecIndex) =>
                  completedLectures[`${index + 1}-${lecIndex + 1}`]
              );

              return (
                <div
                  key={index}
                  className="border border-gray-300 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Accordion Header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          isChapterCompleted
                            ? assets.blue_tick_icon
                            : assets.play_icon
                        }
                        alt="chapter icon"
                        className="w-5"
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
                      {chapter.chapterContent.map((lecture, lecIndex) => {
                        const key = `${index + 1}-${lecIndex + 1}`;
                        const isCompleted = completedLectures[key];

                        return (
                          <li
                            key={lecIndex}
                            className="flex items-start gap-2 py-1"
                          >
                            <img
                              src={
                                isCompleted
                                  ? assets.blue_tick_icon
                                  : assets.play_icon
                              }
                              alt="lecture icon"
                              className="w-4 h-4 mt-1"
                            />

                            <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
                              <p>{lecture.lectureTitle}</p>

                              <div className="flex items-center gap-3">
                                {/* Preview Button */}
                                {lecture.lectureUrl && (
                                  <p
                                    onClick={() =>
                                      setPlayerData({
                                        lectureTitle: lecture.lectureTitle,
                                        lectureUrl: lecture.lectureUrl,
                                        chapter: index + 1,
                                        lecture: lecIndex + 1,
                                      })
                                    }
                                    className="text-blue-500 cursor-pointer"
                                  >
                                    Watch
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
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this Course:</h1>
          <Rating initialRating={0} />
        </div>
      </div>

      {/* Player */}
      <div className="md:mt-10">
        {playerData ? (
          <div>
            <YouTube
              videoId={playerData.lectureUrl.split("/").pop() || ""}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />

            <div className="flex justify-between items-center mt-4">
              <p>
                {playerData.chapter}.{playerData.lecture}{" "}
                {playerData.lectureTitle}
              </p>

              {/* MARK COMPLETE BUTTON */}
              <button className="text-blue-600 cursor-pointer" onClick={markLectureComplete}>
                {completedLectures[
                  `${playerData.chapter}-${playerData.lecture}`
                ]
                  ? "Complete"
                  : "Mark Complete"}
              </button>
            </div>
          </div>
        ) : (
          <img
            src={courseData ? courseData.courseThumbnail : ""}
            alt={courseData?.courseTitle || ""}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
