import React from "react";

const About = () => {
  const aboutItems = [
    {
      title: "Who We Are",
      text: `ETB (Engineering Tech Builds) is a community-driven engineering club
      dedicated to empowering students and professionals with modern
      technical skills. We provide hands-on training and mentorship in
      SolidWorks design, embedded systems, and web development—helping
      upcoming engineers learn faster, build confidently, and innovate with
      purpose.`,
    },
    {
      title: "Our Mission",
      text: `To create a practical learning environment where aspiring engineers
      can gain industry-relevant skills through collaborative projects,
      expert-led training, and structured learning paths that prepare them
      for real-world engineering challenges.`,
    },
    {
      title: "Our Vision",
      text: `To become a leading engineering learning hub in Rwanda—where
      students, innovators, and professionals come to explore technology,
      develop technical mastery, and build impactful engineering solutions
      for the future.`,
    },
  ];

  return (
    <section id="about" className="w-full py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6 -mt-40 lg:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      

      </div>
    </section>
  );
};

export default About;
