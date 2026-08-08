import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FlashSale from "@/components/home/FlashSale";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import BestSellers from "@/components/home/BestSellers";
import FeatureBanner from "@/components/home/FeatureBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import Testimonials from "@/components/home/Testimonials";
import Journal from "@/components/home/Journal";

const Home = () => {
  return (
    <div>
      <Hero />
      <Marquee />
      <FlashSale />
      <FeaturedProducts />
      <PromotionalBanner />
      <BestSellers />
      <FeatureBanner />
      <CategoryGrid />
      <Testimonials />
      <Journal />
    </div>
  );
};

export default Home;
