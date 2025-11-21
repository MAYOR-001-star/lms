import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import { Line } from "rc-progress";

const MyEnrollement = () => {
  const navigate = useNavigate();
  const { enrolledCourses, calculateCourseDuration, getCourseProgress } =
    useGlobalContext();

  return (
    <div className="px-6 md:px-36 pt-10 pb-20">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      {/* DESKTOP TABLE */}
      <table className="w-full mt-10 border border-gray-200 rounded-lg overflow-hidden max-sm:hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Course</th>
            <th className="px-4 py-3 font-semibold">Duration</th>
            <th className="px-4 py-3 font-semibold">Completed</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {enrolledCourses.map((course) => {
            const progress = getCourseProgress(course);
            const isCompleted = progress.completed === progress.total;
            const percentProgress =
              progress.total > 0
                ? (progress.completed / progress.total) * 100
                : 0;

            return (
              <tr
                key={course._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 flex items-center gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-[7rem] h-16 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={percentProgress}
                      strokeColor="#3b82f6"
                      trailColor="#e5e7eb"
                      className="rounded-full mt-1"
                    />
                  </div>
                </td>

                <td className="px-4 py-4">{calculateCourseDuration(course)}</td>

                <td className="px-4 py-4">
                  {progress.completed}/{progress.total}{" "}
                  <span className="text-gray-500">Lectures</span>
                </td>

                <td className="px-4 py-4 text-blue-600 font-medium">
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className="hover:underline"
                    aria-label={`Go to course ${course.courseTitle}`}
                  >
                    {isCompleted ? "Completed" : "Ongoing"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* MOBILE CARD VIEW */}
      <div className="sm:hidden mt-10 space-y-6">
        {enrolledCourses.map((course) => {
          const progress = getCourseProgress(course);
          const isCompleted = progress.completed === progress.total;
          const percentProgress =
            progress.total > 0
              ? (progress.completed / progress.total) * 100
              : 0;

          return (
            <div
              key={course._id}
              className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
            >
              {/* Top: Image + Title */}
              <div className="flex gap-4 items-center">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-24 h-20 object-cover rounded shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-base">{course.courseTitle}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {calculateCourseDuration(course)}
                  </p>
                  <Line
                    strokeWidth={2}
                    percent={percentProgress}
                    strokeColor="#3b82f6"
                    trailColor="#e5e7eb"
                    className="rounded-full mt-1"
                  />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="mt-4 flex justify-between text-sm">
                <p>
                  <span className="font-semibold">
                    {progress.completed}/{progress.total}
                  </span>{" "}
                  Lectures
                </p>

                <button
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                  onClick={() => navigate("/player/" + course._id)}
                  aria-label={`Go to course ${course.courseTitle}`}
                >
                  {isCompleted ? "Completed" : "Ongoing"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEnrollement;
