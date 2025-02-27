import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
const FAQ = () => {
  const [Content, setContent] = useState(0);
  const faq = [
    {
      title: "What types of books do you publish?",
      desc: "Absolutely! We publish a wide range of genres, including fiction, non-fiction, memoirs, self-help, academic texts, and children’s books. We’re always looking for unique voices and compelling stories.",
    },
    {
      title: " How long does it take to publish a book?",
      desc: "The timeline for publishing a book can vary, but it typically takes about months,from manuscript acceptance to the book's release.This includes editing, design, printing, and marketing phases.",
    },
    {
      title: "What marketing and promotional support do you provide?",
      desc: "We provide comprehensive marketing and promotional support, including book launch events, press releases, social media campaigns, and distribution to bookstores and online retailers.",
    },
    {
      title: "What is your review process for submitted manuscripts?",
      desc: "Our editorial team reviews each submission carefully. If your manuscript interests us, we will request the full manuscript for further evaluation. The entire review process can take up to 20 day's .",
    },
    {
      title: "Do you charge any fees for publishing?",
      desc: "Unfortunately no.We are a traditional publisher and do not charge authors any fees for publishing. We have some basic packages to cover all the costs related to editing, design, printing and marketing so that the writer can get the best work as per his choice.",
    },
    {
      title: "What are the royalties and how are they calculated?",
      desc: "Of course! Authors receive royalties based on the net sales of their books. The royalty rates vary depending on the format (e.g., print, e-book, audiobook) and are outlined in the publishing contract.",
    },
    {
      title: "Will my book be available internationally?",
      desc: "Yes, we distribute our books internationally through various channels, ensuring they reach a global audience,but only that book which comes under international package.",
    },
    {
      title: "What rights do I retain as an author?",
      desc: "The specific rights you retain will be outlined in your publishing contract/ agreement Typically, you will retain rights to your work, with the publisher holding certain exclusive rights for a defined period.",
    },
  ];
  return (
    <div className="  px-4 lg:px-10 py-4 md:py-12 lg:py-24  ">
      {" "}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold ">FAQ</h1>
        <h5 className="mt-3 text-zinc-600">
          Frequently asked questions By the authors
        </h5>
      </div>
      {faq.map((items, i) => (
        <div className=" border-b border-zinc-800 py-4 mx-4 md:mx-20 lg:mx-32 transition-all duration-500">
          <div className="flex items-center justify-between">
            {" "}
            <h2
              className={` ${
                Content === i ? "text-sky-900" : "text-zinc-900"
              } font-semibold text-xl`}
            >
              {items.title}
            </h2>{" "}
            <button
              className="text-white text-2xl transition-all duration-500"
              onClick={() => {
                if (Content === i) {
                  setContent(-1);
                } else {
                  setContent(i);
                }
              }}
            >
              {Content === i ? (
                <IoMdArrowDropup className="text-sky-900" />
              ) : (
                <IoMdArrowDropright className="text-zinc-900" />
              )}
            </button>
          </div>
          {Content === i && (
            <p className="my-8 text-zinc-900 transition-all duration-500">
              {items.desc}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
