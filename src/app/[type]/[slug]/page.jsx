import ProductCard from "@/components/cards/product";
import SidebarBrands from "@/components/layout/sidebar-brands";
import SidebarCategories from "@/components/layout/sidebar-categories";
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

  // console.log({ data });

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

          <div className="col-span-9">
            <div className="grid grid-cols-4">
              {data?.length === 0 && (
                <P className={"col-span-4 text-center"}>No products found!</P>
              )}
              {data?.map(({ id, pictures, title, slug }) => (
                <ProductCard
                  key={id}
                  image={pictures[0]}
                  title={title}
                  id={id}
                  slug={slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
