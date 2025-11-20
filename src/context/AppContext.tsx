import { createContext, useContext, useState, useEffect } from "react";
// @ts-expect-error: No declaration file for assets
import { dummyCourses } from "../assets/assets";
import type {
  Course,
  AppContextValue,
  AppProviderProps,
  Chapter,
  Lecture,
} from "../types/types";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const currency = import.meta.env.VITE_CURRENCY as string;

  // Courses
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Educator state
  const [isEducator, setIsEducator] = useState<boolean>(false);


  // Fetch dummy courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Calculate average rating for a course
  const calculateRating = (course: Course): number => {
    if (course.courseRatings.length === 0) return 0;
    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return total / course.courseRatings.length;
  };

  const calculateChapterTime = (chapter: Chapter) => {
    let time = 0;
    chapter.chapterContent.map(
      (lecture: Lecture) => (time += lecture.lectureDuration)
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  const calculateCourseDuration = (course: Course) => {
    let time = 0;
    course.courseContent.map((chapter) => {
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    });
    return humanizeDuration(time*60*1000, {units:["h", "m"]});
  };

  const calculateNoOfLectures = (course: Course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      totalLectures += chapter.chapterContent.length;
    })
    return totalLectures;
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Context value
  const value: AppContextValue = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for consuming context safely
export const useGlobalContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside AppProvider");
  }
  return context;
};
