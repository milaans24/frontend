import React from "react";

const BookPublishingProcess = () => {
  const content = [
    {
      img: "./delivery-man.png",
      title: "Choose A Package",
      desc: "Choose a package that best suits your publishing needs. All our packages are fully customizable. Check our packages",
    },
    {
      img: "./creative-writing.png",
      title: "Submit Your Content",
      desc: "Submit your draft manuscript to us. Our best designers will start working on it and the book cover, following your input",
    },
    {
      img: "./realtime.png",
      title: "Keep Updated",
      desc: "We will keep you updated with the progress of your book publishing work from time to time",
    },
    {
      img: "./paper-plane.png",
      title: "Published in 25 Days",
      desc: "Congrats, Your book is now published and available in 90+ countries for purchase. You will start earning royalty from sales ",
    },
  ];
  return (
    <div className=" px-4  lg:px-10 py-4 lg:py-8 ">
      <div className="h-[100%] w-[100%] bg-sky-900 rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">
            Book Publishing Process
          </h1>
          <h5 className="mt-3 text-orange-100">Simple And Transparent</h5>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {content.map((items) => (
            <div className=" bg-white p-6 rounded w-[100%] flex flex-col items-center justify-center border hover:border-black hover:scale-105 transition-all duration-500 hover:cursor-pointer">
              <img src={items.img} alt="" className="h-32" />
              <h2 className="text-xl font-semibold my-4">{items.title}</h2>
              <p className="text-zinc-800 text-sm text-center leading-tight">
                {items.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPublishingProcess;
