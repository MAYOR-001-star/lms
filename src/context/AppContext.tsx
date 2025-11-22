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

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isEducator, setIsEducator] = useState<boolean>(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  // ★★★★★ Progress array for each course
  const [progressArray, setProgressArray] = useState<
    { completed: number; total: number; percentage: number }[]
  >([]);

  // ★★★★★ Generate mock progress
  const generateMockProgress = (courses: Course[]) => {
    return courses.map((course, index) => {
      // First 3 courses ALWAYS fully completed
      if (index < 3) {
        return {
          completed: 4,
          total: 4,
          percentage: 100,
        };
      }

      // Others = partial random progress
      const total = Math.floor(Math.random() * 4) + 3; // 3–6 lectures
      const completed = Math.floor(Math.random() * total);
      const percentage = Math.round((completed / total) * 100);

      return { completed, total, percentage };
    });
  };

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
    setProgressArray(generateMockProgress(dummyCourses));
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  // ★★★★★ Rating
  const calculateRating = (course: Course): number => {
    if (course.courseRatings.length === 0) return 0;
    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return total / course.courseRatings.length;
  };

  // ★★★★★ Chapter time
  const calculateChapterTime = (chapter: Chapter): string => {
    let time = 0;

    chapter.chapterContent.forEach((lecture: Lecture) => {
      time += lecture.lectureDuration;
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // ★★★★★ Whole course duration
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

  // ★★★★★ Lecture count
  const calculateNoOfLectures = (course: Course): number => {
    let total = 0;

    course.courseContent.forEach((chapter: Chapter) => {
      total += chapter.chapterContent.length;
    });

    return total;
  };

  // ★★★★★ Return progress from the progressArray
  const getCourseProgress = (course: Course) => {
    const index = enrolledCourses.findIndex((c) => c._id === course._id);

    if (index !== -1 && progressArray[index]) {
      return progressArray[index];
    }

    return { completed: 0, total: 0, percentage: 0 };
  };

  const value: AppContextValue = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    enrolledCourses,
    // setEnrolledCourses,
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
