import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { CaretLeftIcon } from "@phosphor-icons/react/ssr";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { items } from "@/lib/db/schema";
import ItemCard from "@/features/items/components/ItemCard";
import { Badge } from "@/shared/ui-components/controls/badge";
import { Button } from "@/shared/ui-components/controls/button";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await db.select().from(items).where(eq(items.id, id)).limit(1);

  if (!item.length) {
    return { title: "Not Found" };
  }

  return { title: `${item[0].title} — SoleDrop` };
}

export default async function ItemDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  const [item] = await db.select().from(items).where(eq(items.id, id)).limit(1);

  if (!item) {
    notFound();
  }

  const related = await db
    .select()
    .from(items)
    .where(eq(items.category, item.category))
    .limit(4);

  const relatedFiltered = related
    .filter((relatedItem) => relatedItem.id !== item.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 text-muted hover:text-foreground"
        asChild
      >
        <Link href="/items">
          <CaretLeftIcon className="mr-1 h-4 w-4" />
          Back to Drops
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-8xl">
              👟
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <Badge className="mb-3 bg-primary/80 text-white">
              {item.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
            <p className="mt-2 text-muted">{item.shortDescription}</p>
          </div>

          <div className="text-4xl font-black text-accent">
            ${Number(item.price).toFixed(2)}
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Specifications
            </h3>
            {[
              { label: "Brand", value: item.brand },
              { label: "Category", value: item.category },
              {
                label: "Size",
                value: item.size ? `US ${item.size}` : "Multiple",
              },
              {
                label: "Rating",
                value: item.rating ? `${item.rating} / 5 ⭐` : "N/A",
              },
              {
                label: "Added",
                value: new Date(String(item.createdAt)).toLocaleDateString(),
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              About this drop
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {item.fullDescription}
            </p>
          </div>
        </div>
      </div>

      {relatedFiltered.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Similar Drops
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedFiltered.map((relatedItem, index) => (
              <ItemCard key={relatedItem.id} item={relatedItem} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
