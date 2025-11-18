// @ts-expect-error: No declaration file for assets
import { dummyTestimonial, assets } from "../../assets/assets";
import type { dummyTestimonialProps } from "../../types/types";

const TestimonialSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>

      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their
        lives.
      </p>

      {/* GRID LAYOUT — uncommented and fixed */}
      <div className="mt-10 grid gap-8 md:grid-cols-3 px-4 md:px-24 lg:px-36">
        {dummyTestimonial.map(
          (testimonial: dummyTestimonialProps, index: number) => (
            <div
              key={index}
              className="text-sm text-left border border-gray-500/30 rounded-lg shadow-[0px_4px_15px_0px] bg-white shadow-black/5 overflow-hidden p-6"
            >
              {/* Top section */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h1 className="text-lg font-medium text-gray-800">
                    {testimonial.name}
                  </h1>
                  <p className="text-gray-800/80">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating + Feedback */}
              <div className="mt-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                      className="h-5"
                    />
                  ))}
                </div>

                <p className="text-gray-500 mt-4">{testimonial.feedback}</p>
              </div>
              <a href="#" className="text-blue-500 underline px-5">Read more</a>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;
