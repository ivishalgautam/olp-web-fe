import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ slug, image, name }) {
  return (
    <Link href={`/categories/${slug}`}>
      <div className="flex flex-col items-center justify-center rounded-md bg-white p-3 shadow-sm">
        <div>
          <figure>
            <Image
              width={400}
              height={400}
              src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`}
              alt={name}
              className="h-full w-full rounded object-cover object-center"
            />
          </figure>
        </div>
        <span className="mt-3 text-sm font-semibold uppercase">{name}</span>
      </div>
    </Link>
  );
}
