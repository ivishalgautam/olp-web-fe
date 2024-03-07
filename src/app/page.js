import Categories from "@/components/categories";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/featured-products";
import ProductsWithTabs from "@/components/products-with-tabs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Categories />
      <ProductsWithTabs />
      <FeaturedProducts />
    </div>
  );
}
