import Hero from "@/components/home/Hero";
import Journal from "@/components/home/Journal";
import Marquee from "@/components/home/Marquee";
import FlashSale from "@/components/home/FlashSale";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeatureBanner from "@/components/home/FeatureBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionalBanner from "@/components/home/PromotionalBanner";

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
