import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonials = [
    {
      user: "Dhanesh",
      review:
        "Being a part of Milaan Publication has been a game-changer for me as a writer. With my friend's guidance and mentorship, I have grown as a writer, exploring different genres and honing my skills. From brainstorming ideas to editing drafts, we work together as a team, bringing out the best in each other's writing.",
    },
    {
      user: "Sneha",
      review:
        "My experience with Milaan Publication House has been nothing short of exceptional. From the initial consultation to the final publication, the team demonstrated unparalleled professionalism and dedication. The editing and design services were top-notch, ensuring my book was polished to perfection...",
    },
    {
      user: "Usha Krishnan",
      review:
        "As an author who has had the pleasure of working with Milaan Publication House, I can confidently say that their professionalism and dedication are unparalleled. The editorial team is incredibly supportive, providing insightful feedback and ensuring that every piece reaches its full potential...",
    },
    {
      user: "Urmil Negi",
      review:
        "As a 17-year-old author, working with Milaan Publication House has been an amazing experience. The team is incredibly supportive and professional, helping me refine my work while respecting my creative voice...",
    },
    {
      user: "Harishita Dev",
      review:
        "The working experience with Milaan Publication was absolutely the best experience ever. It was my first anthology published in a book officially so I am glad that it happened...",
    },
    {
      user: "Hitesh Kumar",
      review:
        "For the past 1.5 years, I have been closely connected with Milaan Publication and its owner, Mr. Shekhar Milaan. They have consistently involved me in their anthologies and competitions...",
    },
  ];

  return (
    <div className="px-4  lg:px-10 py-4 lg:py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold">Testimonials</h1>
      </div>

      <Swiper
        className=" py-4 "
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4} // Show 4 at a time
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 rounded w-full flex flex-col shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer bg-white">
              <p className="text-sm">{item.review.slice(0, 200)}...</p>
              <div className="flex items-center gap-2 mt-4">
                <img src="./user.png" className="h-12" alt="User" />
                <h1 className="font-extralight text-orange-500 text-2xl">
                  {item.user}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
