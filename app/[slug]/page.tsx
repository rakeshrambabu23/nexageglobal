import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/components/PageView";
import { pageDefs } from "@/lib/pages";

export const dynamicParams = false;
export function generateStaticParams() { return pageDefs.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = pageDefs.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — NexAge Global` : "NexAge Global", description: p?.intro };
}

export default async function SubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pageDefs.some((x) => x.slug === slug)) notFound();
  return <PageView slug={slug} />;
}
