import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
// @ts-expect-error: No declaration file for assets
import { dummyCourses } from "../assets/assets";
import type { Course, AppContextValue, AppProviderProps } from "../types/types";

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
