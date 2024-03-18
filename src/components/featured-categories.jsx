"use client";
import Image from "next/image";
import { H3 } from "./ui/typography";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CategoryCard from "./cards/category";

export const fetchCategories = async () => {
  const { data } = await http().get(
    `${endpoints.categories.getAll}?featured=true`,
  );
  return data;
};

export default function FeaturedCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: fetchCategories,
  });

  const breakpoints = {
    1200: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
  };

  return (
    <div className="bg-[#f4f5f9] py-4">
      <div className="container space-y-4">
        <H3>Feature categories</H3>
        <div className="">
          {isLoading && <Spinner />}

          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            breakpoints={breakpoints}
          >
            {data?.map(({ id, slug, name, image }) => (
              <SwiperSlide key={id}>
                <CategoryCard slug={slug} name={name} image={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
