import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import CoursesList from "./pages/student/CoursesList";
import Home from "./pages/student/Home";
import CoursesDetail from "./pages/student/CoursesDetail";
import MyEnrollement from "./pages/student/MyEnrollement";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentEnrolled from "./pages/educator/StudentEnrolled";
import Navbar from "./components/student/Navbar";
const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="coursesList" element={<CoursesList />} />
        <Route path="course/:id" element={<CoursesDetail />} />
        <Route path="my-enrollments" element={<MyEnrollement />} />
        <Route path="player/:id" element={<Player />} />
        <Route path="loading/:path" element={<Loading />} />
        <Route path="educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
