import { services } from "@/constants";
import Navbar from "@/components/layout/Navbar";
import ServicesCard from "@/components/ui/ServicesCard";
import Footer from "@/components/layout/Footer";

export default function ServicesOverview() {
  return (
    <>
    <Navbar />
    <section className="pt-35 max-w-6xl min-h-screen mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Services / What We Offer
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((item, i) => {
          return (
            <ServicesCard key={i} item={item} />
          );
        })}
      </div>
    </section>
    <Footer />
    </>
  );
}
