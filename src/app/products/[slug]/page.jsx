import ImageSlider from "@/components/ImageSlider";
import ProductCard from "@/components/cards/product";
import AddToCart from "@/components/forms/add-to-cart";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, H4, H5, P, Small } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { fetchProduct } from "@/utils/api";

export default async function Page({ params: { slug } }) {
  const { data } = await fetchProduct(slug);
  // console.log({ data });
  return (
    <section className="py-14">
      <div className="container space-y-10">
        <div className="rounded-md bg-white p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="">
              <ImageSlider pictures={data?.pictures} />
            </div>
            {/* description */}
            <div className="space-y-10 divide-y">
              <div className="space-y-4">
                <H3 className={"border-none font-bold"}>{data?.title}</H3>
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
                <AddToCart id={data?.id} />
              </div>

              <div className="py-6">
                <div>
                  <Small className={"font-normal"}>SKU: {data?.sku}</Small>
                </div>
                <div>
                  <Small className={"font-normal"}>
                    Categories: {data?.category_name}
                  </Small>
                </div>
                <div>
                  <Small className={"font-normal"}>
                    Tags: {data?.tags.join(", ")}
                  </Small>
                </div>
                <div>
                  <Small className={"font-normal"}>
                    Availabilty:{" "}
                    <span
                      className={cn({
                        "text-red-500": false,
                        "text-green-500": true,
                      })}
                    >
                      {true ? "In stock" : "Out of stock"}
                    </span>
                  </Small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="rounded-md bg-white p-8">
          <div className="border-b">
            <Button className="rounded-none border-b-2 border-primary bg-transparent p-0 pb-2 text-lg text-primary hover:bg-transparent">
              Description
            </Button>
          </div>
          <div
            className="py-6"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
        </div>

        {/* related products */}
        <div>
          <div className="border-b">
            <Button className="relative rounded-none bg-transparent p-0 pb-2 text-2xl font-semibold text-black before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-1/2 before:bg-primary hover:bg-transparent">
              Related products
            </Button>
          </div>
          {data?.related_products?.length ? (
            <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {data?.related_products?.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <P>No related products.</P>
          )}
        </div>
      </div>
    </section>
  );
}
