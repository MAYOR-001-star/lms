// Provider props
export type AppProviderProps = {
  children: React.ReactNode;
};

// Context value
export type AppContextValue = {
  currency: string;
  allCourses: Course[];
  calculateRating: (course: Course) => number;
  isEducator: boolean;
  setIsEducator: React.Dispatch<React.SetStateAction<boolean>>;
  enrolledCourses: Course[];
  // setEnrolledCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  calculateChapterTime: (chapter: Chapter) => string;
  calculateCourseDuration: (course: Course) => string;
  calculateNoOfLectures: (course: Course) => number;
  fetchUserEnrolledCourses: () => Promise<void>;

  getCourseProgress: (course: Course) => {
    completed: number;
    total: number;
    percentage: number;
  };
};

// Course, CourseRating, etc.
export type CourseRating = {
  userId: string;
  rating: number;
  _id: string;
};

export type Course = {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseThumbnail: string;
  educator: string;
  instructor: string;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  courseContent: Chapter[];
};

export type Chapter = {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
};

export type Lecture = {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
  completed: boolean;
};

export type GetCourseData = {
  getCourseData: () => Course;
};

export type PlayerData = {
  lectureTitle: string;
  lectureUrl: string;
  chapter: number;
  lecture: number;
  videoId?: string;
} | null;


export type RatingProps = {
  initialRating?: number;
  onRate?: (value: number) => void;
};

export type SearchBarProps = {
  data?: string;
};

export type DummyTestimonialProps = {
  name: string;
  role: string;
  image: string;
  rating: number;
  feedback: string;
};
