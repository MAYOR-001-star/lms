import React from 'react'
// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";

const CourseCard = ({course}) => {
  return (
    <div>
      <img src={course.courseThumnail} alt='' />
      <div>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div>
          <p>4.5</p>
          <div>
            {[...Array(5)].map((_, index) => (
              <img  key={index} src={assets.star} alt='' />
            ))}
          </div>
          <p>22</p>
          </div>
          <p>{(course.course.price-course.discount * course.coursePrice/100).toFixed(2)}
      </div>
    </div>
  )
}

export default CourseCard
