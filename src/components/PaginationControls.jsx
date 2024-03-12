"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function PaginationControls({ total_page }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page =
    typeof searchParams.get("page") === "string"
      ? Number(searchParams.get("page"))
      : 1;

  return (
    <div className="space-x-4">
      <Button
        onClick={() => router.push(`?page=${Number(page) - 1}`)}
        disabled={page === 1}
      >
        Prev
      </Button>
      <Button
        disabled={total_page === page}
        onClick={() => router.push(`?page=${Number(page) + 1}`)}
      >
        Next
      </Button>
    </div>
  );
}
