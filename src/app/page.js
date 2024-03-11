import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/featured-products";
import ProductsWithTabs from "@/components/products-with-tabs";
import Footer from "@/components/Footer";
import FeaturedCategories from "@/components/featured-categories";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedCategories />
      <ProductsWithTabs />
      <FeaturedProducts />
    </div>
  );
}
