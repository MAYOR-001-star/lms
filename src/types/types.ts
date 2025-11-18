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
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  courseContent?: Chapter[];
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
};

// Testimonial type
export type dummyTestimonialProps = {
  name: string;
  role: string;
  image: string;
  rating: number;
  feedback: string;
}