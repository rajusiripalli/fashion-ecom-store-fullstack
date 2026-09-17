import HeroSection from "@/components/home/HeroSection";
import LatestCollections from "@/components/home/LatestCollections";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Image from "next/image";

export default function Home() {
  return (
    <FrontendLayout>
      <HeroSection />
      <LatestCollections />
   </FrontendLayout>
  );
}
