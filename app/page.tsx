import About from "@/components/common/About";
import CoursesOverview from "@/components/common/CourseOverview";
import Hero from "@/components/common/Hero";
import Services from "@/components/common/Service";
import NavBar from "@/components/layout/Navbar";

export default function Home() {
  return (
     <section>
      <NavBar />
      <Hero />
      <About />
      <Services />
      <CoursesOverview />
     </section>
  );
}
