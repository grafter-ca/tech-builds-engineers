import About from "@/components/common/About";
import CoursesOverview from "@/components/common/CourseOverview";
import Hero from "@/components/common/Hero";
import Services from "@/components/common/Service";
import WhyChooseUs from "@/components/common/Why";
import NavBar from "@/components/layout/Navbar";
import CallToAction from "@/components/common/CallToAction";
import Patern from "@/components/common/Patern";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
     <section>
      <NavBar />
      <Hero />
      <About />
      <Services />
      <CoursesOverview />
      <WhyChooseUs />
      <CallToAction />
      <Patern />
      <Footer />
     </section>
  );
}
