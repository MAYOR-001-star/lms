import { createContext, useContext, useState, useEffect } from "react";
// @ts-expect-error no types
import { dummyCourses } from "../assets/assets";

import type {
  Course,
  Chapter,
  Lecture,
  AppProviderProps,
  AppContextValue,
} from "../types/types";

// @ts-expect-error no types for humanize-duration
import humanizeDuration from "humanize-duration";

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const currency = import.meta.env.VITE_CURRENCY as string;

  // All courses
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Educator state
  const [isEducator, setIsEducator] = useState<boolean>(false);

  // Enrolled courses (full course objects)
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  // Load dummy courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Load enrolled courses (dummy for now)
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  // ★★★★★ Calculate Rating
  const calculateRating = (course: Course): number => {
    if (course.courseRatings.length === 0) return 0;
    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return total / course.courseRatings.length;
  };

  // ★★★★★ Calculate Chapter Time
  const calculateChapterTime = (chapter: Chapter): string => {
    let time = 0;

    chapter.chapterContent.forEach((lecture: Lecture) => {
      time += lecture.lectureDuration;
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // ★★★★★ Calculate Whole Course Duration
  const calculateCourseDuration = (course: Course): string => {
    let time = 0;

    course.courseContent.forEach((chapter: Chapter) => {
      chapter.chapterContent.forEach((lecture: Lecture) => {
        time += lecture.lectureDuration;
      });
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // ★★★★★ Count total lectures
  const calculateNoOfLectures = (course: Course): number => {
    let total = 0;

    course.courseContent.forEach((chapter: Chapter) => {
      total += chapter.chapterContent.length;
    });

    return total;
  };

  // ★★★★★ Calculate course progress
  const getCourseProgress = (course: Course) => {
    let completed = 0;
    let total = 0;

    course.courseContent.forEach((chapter: Chapter) => {
      chapter.chapterContent.forEach((lecture: Lecture) => {
        total++;
        if (lecture.completed) completed++;
      });
    });

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { completed, total, percentage };
  };

  const value: AppContextValue = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    enrolledCourses,
    setEnrolledCourses,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    fetchUserEnrolledCourses,
    getCourseProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside AppProvider");
  }
  return context;
};
