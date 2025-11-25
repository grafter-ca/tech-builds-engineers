import React from "react";

const CallToAction = () => {
  return (
    <article className="flex flex-col items-center justify-center max-w-7xl w-full mx-auto space-y-4 px-10 py-20 rounded-full mb-20 bg-[#A8C7FF]">
      <header className="flex flex-col items-center text-center space-y-4 mb-4">
        <h1 className="font-poppins font-bold text-2xl mb-4">Ready to Upgrade Your Engineering Skills?</h1>
        <p className="font-inter text-gray-700 max-w-3xl mb-6">
          Join hundreds of students learning SolidWorks, Embedded Systems, and
          Web Development through guided training and real engineering projects.
        </p>
      </header>

      <button className="text-white bg-blue-600 hover:bg-blue-800 cursor-pointer rounded-lg py-2 px-4">Join ETB Club Now</button>
    </article>
  );
};

export default CallToAction;
