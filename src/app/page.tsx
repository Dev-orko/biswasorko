import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Ticker from "@/components/sections/Ticker";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import Preloader from "@/components/ui/Preloader";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="relative z-10">
        <Layout>
          <Hero />
          <Ticker />
          <Stack />
          <Work />
          <Services />
          <Contact />
        </Layout>
      </div>
    </>
  );
}
