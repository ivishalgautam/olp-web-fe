import PaginationControls from "@/components/PaginationControls";
import ProductCard from "@/components/cards/product";
import SidebarBrands from "@/components/layout/sidebar-brands";
import SidebarCategories from "@/components/layout/sidebar-categories";
import ProductsWithFilter from "@/components/products-with-filter";
import { P } from "@/components/ui/typography";
import { fetchProducts } from "@/utils/api";

export default async function Page({
  params: { type, slug },
  searchParams: { page: currPage, limit },
}) {
  const { page, total_page, data } = await fetchProducts(
    type,
    slug,
    currPage ? currPage : 1,
  );

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
            <div>
              <ProductsWithFilter data={data} />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <PaginationControls total_page={total_page} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
