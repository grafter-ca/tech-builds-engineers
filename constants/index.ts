import { CourseItem, Instructor, ServiceItem, TeamMember } from "@/types";
import { Code, Cpu, Cuboid } from "lucide-react";
import { PiCubeFill, PiCpuThin, PiMonitorThin, PiCodeThin } from "react-icons/pi";
import { Layers } from "lucide-react";
import {  FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

import { FooterInformationsType } from "@/types";

// src/data/team.ts


/* ------------------------------------------
   🚀 INSTRUCTORS LIST (Used for Courses Page)
------------------------------------------- */
export const InstructorList: Instructor[] = [
  {
    id: 1,
    name: "Caleb Habyarimana",
    role: "Lead Mechanical Design Instructor",
    specialization: "SolidWorks • CAD • FEA",
    experience: "4+ Years",
    image: "/images/instructors/caleb.jpg",
    bio: "Caleb is a Certified SolidWorks Professional (CSWP) with hands-on experience in CAD modelling, FEA simulations, and mechanical design for manufacturing.",
    courses: ["SolidWorks Essentials", "Advanced CAD Modeling", "FEA with SolidWorks"]
  },
  {
    id: 2,
    name: "Alice Kamikazi",
    role: "Embedded Systems Instructor",
    specialization: "Arduino • PCB Design • IoT",
    experience: "3+ Years",
    image: "/images/instructors/alice.jpg",
    bio: "Alice specializes in microcontroller-based systems, IoT solutions, and hands-on hardware prototyping for engineering learners.",
    courses: ["Arduino for Beginners", "IoT with ESP32", "Advanced Embedded Systems"]
  },
  {
    id: 3,
    name: "Eric Ndayishimiye",
    role: "Software Development Instructor",
    specialization: "JavaScript • React • Backend",
    experience: "5+ Years",
    image: "/images/instructors/eric.jpg",
    bio: "Eric is a full-stack engineer passionate about teaching clean code, scalable software development, and modern web technologies.",
    courses: ["JavaScript Mastery", "React From Zero to Hero", "Node.js Backend Development"]
  }
];

/* ------------------------------------------
    👨‍💼 TEAM MEMBERS (For About Us Page)
------------------------------------------- */
export const TeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Caleb Habyarimana",
    position: "Club President & Lead Engineer",
    image: "/img/team.webp",
    intro: "Leads ETB with a strong focus on engineering education, design thinking, and technology innovation.",
    socials: {
      linkedin: "https://linkedin.com/in/caleb-habyarimana",
      github: "https://github.com/calebabyarimana"
    }
  },
  {
    id: 2,
    name: "Nadine Uwase",
    position: "Project Coordinator",
    image: "/img/team.webp",
    intro: "Responsible for coordinating student projects, events, and collaborations within ETB.",
    socials: {
      linkedin: "https://linkedin.com/in/nadine"
    }
  },
  {
    id: 3,
    name: "Samuel Mugisha",
    position: "Technical Mentor - Electronics",
    image: "/img/team.webp",
    intro: "Provides mentorship in Arduino, IoT, sensors, and electronics prototyping.",
    socials: {
      linkedin: "https://linkedin.com/in/samuel",
      twitter: "https://twitter.com/samuel"
    }
  },
  {
    id: 4,
    name: "Claudine Ingabire",
    position: "UI/UX & Learning Experience Designer",
    image: "/img/team.webp",
    intro: "Designs user-friendly learning interfaces and improves student engagement.",
    socials: {
      linkedin: "https://linkedin.com/in/claudine"
    }
  }
];


export const hero_image = 
[
'/img/Dev-logo-image.png',
'/img/Embeded-sys-logo-image.png',
'/img/Solidworks-logo-image.png'
]
export const patern_image = 
[
'/img/Rwanda-flag.png',
'/img/solidworks-corp.png',
'/img/UR-logo.png',
]

export const aboutItems = [
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

export const NavLink = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about"},
    { name: "Courses", href: "/courses" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "#contact" },
  ];

  export const reasons = [
        {
            title: "Learn from Certified Professionals",
            description: "Our trainers include CSWA/CSWP-certified designers, experienced embedded developers, and web engineers—ensuring high-quality mentorship and accurate guidance.",
        },
        {
            title: "Hands-on Engineering Projects",
            description: "Every learner builds real-world engineering projects, from CAD models to circuits and web applications, boosting practical confidence and technical skills.",
        },
        {
            title: "Structured Certification Paths",
            description: "We provide step-by-step SolidWorks learning roadmaps tailored for CSWA, CSWP, and CSWPA exams, including mock tests and personalized preparation.",
        },
        {
            title: "Affordable & Accessible for All Students",
            description: "We keep our training affordable so every engineering student can learn without financial barriers—while maintaining premium quality.",
        },
    ];

export const services: ServiceItem[] = [
  {
    slug: "cad-mechanical",
    title: "CAD / Mechanical",
    description: "CSWA, CSWP & CSWPA Preparation",
    details: "Practice questions, mock exams, 1:1 coaching",
    icon: Cuboid,

    overview:
      "Master SolidWorks from basic modeling to advanced assemblies and certification-level design. This training prepares you for CSWA, CSWP, and CSWPA exams through structured lessons, real-world examples, and exam-style tasks.",

    highlights: [
      "3D modeling fundamentals",
      "Surface modeling & advanced features",
      "Assembly techniques & motion basics",
      "Exam-style practice sessions",
      "Certification mock exams",
    ],

    modules: [
      {
        title: "Module 1 — SolidWorks Basics",
        content:
          "Sketching, constraints, extrudes, revolves, cuts, fillets, and model organization fundamentals.",
      },
      {
        title: "Module 2 — Advanced Features",
        content:
          "Sweeps, lofts, shelling, ribs, patterns, configurations, and multi-body part design.",
      },
      {
        title: "Module 3 — Assemblies",
        content:
          "Mates, collision detection, exploded views, BOM creation, and motion simulations.",
      },
      {
        title: "Module 4 — Certification Prep",
        content:
          "Timed challenges, mock exams for CSWA, CSWP, CSWPA, and solution breakdown.",
      },
    ],
  },

  {
    slug: "embedded-systems",
    title: "Embedded Systems",
    description: "Arduino & Embedded Training",
    details: "Hands-on projects, circuits, programming",
    icon: Cpu,

    overview:
      "A practical and beginner-friendly path into electronics and embedded programming. Build circuits, sensors, automation systems, and real microcontroller projects from scratch.",

    highlights: [
      "Beginner-friendly introduction",
      "Circuit building & electronics basics",
      "Arduino programming from zero",
      "Sensor integration & communication",
      "Hands-on real projects",
    ],

    modules: [
      {
        title: "Module 1 — Electronics Foundations",
        content:
          "Understanding components, breadboard wiring, voltage/current basics, and power safety.",
      },
      {
        title: "Module 2 — Arduino Programming",
        content:
          "Digital I/O, analog sensors, PWM, timing functions, and serial communication.",
      },
      {
        title: "Module 3 — Sensor Systems",
        content:
          "Using ultrasonic sensors, temperature modules, motion detectors, I2C & SPI devices.",
      },
      {
        title: "Module 4 — Final Embedded Project",
        content:
          "Build a complete system such as a smart sensor device, automation tool, or mini-robot.",
      },
    ],
  },

  {
    slug: "web-dev-code",
    title: "Web Dev / Code",
    description: "Web Development Essentials",
    details: "HTML, CSS, JavaScript, React intro, NextJS intro",
    icon: Code,

    overview:
      "A complete beginner-friendly introduction to modern web development. Learn how websites work, build responsive UIs, understand JavaScript fundamentals, and take your first steps into React and Next.js.",

    highlights: [
      "Start coding with no prior knowledge",
      "HTML & CSS fundamentals",
      "JavaScript logic & DOM manipulation",
      "Tailwind CSS for fast styling",
      "React & Next.js introduction",
    ],

    modules: [
      {
        title: "Module 1 — HTML Foundations",
        content:
          "Structure, tags, forms, media, semantic markup, and proper layout techniques.",
      },
      {
        title: "Module 2 — CSS & Tailwind",
        content:
          "Responsive layouts, flexbox, grid, spacing systems, utility-first design with Tailwind.",
      },
      {
        title: "Module 3 — JavaScript Core",
        content:
          "Variables, arrays, functions, events, APIs, and DOM scripting for interactivity.",
      },
      {
        title: "Module 4 — React & Next.js Basics",
        content:
          "Components, JSX, props, simple state, and introduction to Next.js routing.",
      },
    ],
  },
];



export const courses: CourseItem[] = [
  {
    slug: "solidworks-beginner",
    icon: Cuboid,
    title: "SolidWorks Beginner Track",
    desc1:
      "Learn the fundamentals of 3D modeling, sketches, features, and assemblies.",
    desc2: "Perfect for students starting their journey into mechanical design.",

    overview:
      "This beginner-friendly SolidWorks course teaches the essential skills needed to start 3D modeling. You will learn sketches, constraints, part modeling tools, simple assemblies, and how to properly structure your design workflow.",

    highlights: [
      "Sketching & constraints fundamentals",
      "Feature-based modeling (extrude, revolve, fillets, chamfers)",
      "Basic part design workflow",
      "Simple assemblies",
      "Engineering drawings basics",
    ],

    modules: [
      {
        title: "Module 1 — Introduction to SolidWorks",
        content:
          "User interface, design intent, units, templates, and workspace setup.",
      },
      {
        title: "Module 2 — Sketching Essentials",
        content:
          "2D sketches, constraints, dimensions, planes, and sketch organization.",
      },
      {
        title: "Module 3 — Part Modeling",
        content:
          "Extrudes, revolves, cuts, fillets, chamfers, patterns, and design strategies.",
      },
      {
        title: "Module 4 — Beginner Assemblies",
        content:
          "Creating assemblies with standard mates, checking interferences, and basic motion.",
      },
    ],
  },

  {
    slug: "solidworks-professional",
    icon: PiCubeFill,
    title: "SolidWorks Professional Track",
    desc1:
      "Advanced modeling techniques, design strategies, complex assemblies, and",
    desc2: "exam-focused practice for CSWP certification.",

    overview:
      "This professional track prepares you for advanced SolidWorks design and CSWP certification. You will learn advanced features, configurations, multi-body modeling, and highly structured modeling approaches.",

    highlights: [
      "Advanced modeling features",
      "Configurations & design variations",
      "Complex assembly techniques",
      "CSWP-style timed problems",
      "Performance-optimized modeling",
    ],

    modules: [
      {
        title: "Module 1 — Advanced Part Modeling",
        content:
          "Sweeps, lofts, boundary features, surfaces, ribs, shelling, and multi-body workflows.",
      },
      {
        title: "Module 2 — Configurations & Design Tables",
        content:
          "Part/assembly configurations, design tables, and managing large families of parts.",
      },
      {
        title: "Module 3 — Complex Assemblies",
        content:
          "Advanced mates, subassemblies, motion, interference checks, and exploded views.",
      },
      {
        title: "Module 4 — CSWP Exam Preparation",
        content:
          "Timed challenges, mock exams, and high-speed modeling techniques.",
      },
    ],
  },

  {
    slug: "arduino-starter",
    icon: PiCpuThin,
    title: "Arduino Starter Track",
    desc1:
      "Build your first electronic circuits, sensors, and automation projects using Arduino.",
    desc2: "No previous electronics experience needed.",

    overview:
      "A hands-on course designed for complete beginners. You will learn electronics basics, Arduino programming, sensors, and how to build your own functional embedded projects.",

    highlights: [
      "No prior experience required",
      "Learn electronics step by step",
      "Arduino fundamentals",
      "Sensor integrations",
      "Mini automation projects",
    ],

    modules: [
      {
        title: "Module 1 — Electronics Basics",
        content:
          "Breadboards, resistors, LEDs, power safety, and understanding circuits.",
      },
      {
        title: "Module 2 — Arduino Programming",
        content:
          "Digital/analog I/O, functions, loops, PWM, delays, and serial communication.",
      },
      {
        title: "Module 3 — Sensor Systems",
        content:
          "Temperature sensors, ultrasonic sensors, motion detectors, and analog devices.",
      },
      {
        title: "Module 4 — Starter Projects",
        content:
          "LED automation, sensor alarms, servo control, and simple IoT-style projects.",
      },
    ],
  },

  {
    slug: "embedded-projects",
    icon: PiMonitorThin ,
    title: "Embedded Projects",
    desc1:
      "Hands-on embedded systems projects involving sensors, communication modules,",
    desc2:
      "and real-world problem-solving. Perfect for project-based learning.",

    overview:
      "This track focuses purely on project-based learning. You’ll build advanced embedded solutions using communication modules, actuators, and microcontroller programming techniques.",

    highlights: [
      "Practical real-world projects",
      "Communication protocols",
      "Actuator & sensor systems",
      "Problem-solving through engineering",
      "Prototype-to-product workflow",
    ],

    modules: [
      {
        title: "Module 1 — Communication Modules",
        content:
          "Bluetooth, WiFi modules, I2C, SPI, UART, and protocol integration.",
      },
      {
        title: "Module 2 — Robotics Components",
        content:
          "Motors, drivers, servos, relays, and controlling real systems.",
      },
      {
        title: "Module 3 — Mini Projects",
        content:
          "Home automation, smart lighting, wireless sensor systems, and mini robots.",
      },
      {
        title: "Module 4 — Capstone Project",
        content:
          "A complete embedded solution from design to implementation.",
      },
    ],
  },

  {
    slug: "web-dev-basics",
    icon: PiCodeThin ,
    title: "Web Dev Basics for Engineers",
    desc1:
      "Learn HTML, CSS, JavaScript, and essential web concepts to build simple",
    desc2:
      "websites and engineering tools. No experience needed.",

    overview:
      "A beginner-friendly introduction to building websites and simple engineering tools using HTML, CSS, JavaScript, and basic React concepts.",

    highlights: [
      "Start coding from scratch",
      "Build simple functional websites",
      "Responsive layouts",
      "JavaScript interactions",
      "Intro to React & component systems",
    ],

    modules: [
      {
        title: "Module 1 — HTML Foundations",
        content:
          "Structure, semantic HTML, forms, tables, and boilerplate layout.",
      },
      {
        title: "Module 2 — CSS & Tailwind",
        content:
          "Flexbox, grid, responsive design, utilities, and animations.",
      },
      {
        title: "Module 3 — JavaScript Basics",
        content:
          "Functions, arrays, DOM manipulation, and API fetching.",
      },
      {
        title: "Module 4 — React Introduction",
        content:
          "JSX, components, props, simple state, and rendering UI elements.",
      },
    ],
  },

  {
    slug: "engineering-career-path",
    icon: Layers,
    title: "Engineering Career Path",
    desc1:
      "Guidance on certifications, portfolios, internships, and career strategies",
    desc2: "to prepare you for the engineering industry.",

    overview:
      "A complete guide to navigating the engineering industry. Learn how to build a strong portfolio, choose the right certifications, and prepare for job opportunities.",

    highlights: [
      "Career direction for engineers",
      "Certification guidance",
      "Portfolio building",
      "Internship & job strategies",
      "Professional branding",
    ],

    modules: [
      {
        title: "Module 1 — Career Mapping",
        content:
          "Define career goals, choose a specialization, and understand industry roles.",
      },
      {
        title: "Module 2 — Certifications Guide",
        content:
          "CSWA, CSWP, embedded certifications, and recommended learning paths.",
      },
      {
        title: "Module 3 — Portfolio Building",
        content:
          "How to design a modern portfolio website and showcase engineering projects.",
      },
      {
        title: "Module 4 — Internship & Job Prep",
        content:
          "CV writing, interview tips, LinkedIn optimization, and job search strategies.",
      },
    ],
  },
];


export const FooterInformations : FooterInformationsType[] = [
  {
    title: "About",
    content: [
      "Engineering Tech Builds (ETB) is a student-centered engineering club offering training in SolidWorks, embedded systems, and web development.",
      "We help aspiring engineers learn faster, build better, and grow confidently toward their careers.",
    ],
  },

  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Courses", href: "/courses" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "#contact" },
    ],
  },

  {
    title: "Resources",
    links: [
      { name: "SolidWorks Certification Guide", href: "#" },
      { name: "Embedded Systems Projects", href: "#" },
      { name: "Web Development Basics", href: "#" },
      { name: "Career Path & Mentorship", href: "#" },
      { name: "Join the ETB Community", href: "#" },
    ],
  },

  {
    title: "Contact Info",
    contact: {
      email: "techbuildsengineer@gmail.com",
      phone: "+250 786 015 225",
      location: "Kigali, Rwanda",
    },
    socials: [
      { name: "YouTube", url: "https://www.youtube.com/@TechBuildbyCaleb", icon: FaYoutube },
      { name: "Facebook", url: "https://www.facebook.com/TechBuildsEngineer",icon:FaFacebook },
      { name: "Twitter", url: "https://www.xTwitter.com/TechBuildsEngineer",icon:FaXTwitter },
      { name: "Instagram", url: "https://www.instagram.com/TechBuildsEngineer",icon:FaInstagram },
      { name: "LinkedIn", url: "https://www.linkedin.com/TechBuildsEngineer",icon:FaLinkedin },
      { name: "Github", url: "https://www.github.com/TechBuildsEngineer",icon:FaGithub },
    ],
  },
];



