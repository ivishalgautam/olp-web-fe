import PaginationControls from "@/components/PaginationControls";
import AllProducts from "@/components/all-products";
import ProductCard from "@/components/cards/product";
import SidebarBrands from "@/components/layout/sidebar-brands";
import SidebarCategories from "@/components/layout/sidebar-categories";
import { fetchProducts } from "@/utils/api";

export default async function Page({
  params: { type, slug },
  searchParams: { page: currPage, limit },
}) {
  const data = await fetchProducts(type, slug, currPage ? currPage : 1, limit);
  console.log({ data });
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-3">
            <div className="space-y-4">
              <SidebarCategories />
              <SidebarBrands />
            </div>
          </div>

          <div className="relative col-span-9">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {data?.data?.map(({ id, pictures, slug, title }) => (
                <ProductCard
                  key={id}
                  image={pictures[0]}
                  slug={slug}
                  title={title}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <PaginationControls total_page={data?.total_page} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
