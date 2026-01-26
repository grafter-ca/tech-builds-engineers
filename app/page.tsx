import About from "@/components/common/About";
import CoursesOverview from "@/components/common/CourseOverview";
import Hero from "@/components/common/Hero";
import Services from "@/components/common/Service";
import WhyChooseUs from "@/components/common/Why";
import NavBar from "@/components/layout/Navbar";
import CallToAction from "@/components/common/CallToAction";
import Patern from "@/components/common/Patern";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/layout/AnimateSection";

export default function Home() {
  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <AnimatedSection className="min-h-screen flex items-center">
        <Hero />
      </AnimatedSection>
      {/* About Section */}
      <AnimatedSection className="py-20">
        <About />
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <Services />
      </AnimatedSection>

      {/* Courses Section */}
      <AnimatedSection className="py-20">
        <CoursesOverview />
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <WhyChooseUs />
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection className="py-20">
        <CallToAction />
      </AnimatedSection>

      {/* Infinite Pattern Section */}
      <AnimatedSection className="py-20">
        <Patern />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </>
  );
}
