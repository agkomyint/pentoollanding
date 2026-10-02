import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { guideContent,guides } from "@/lib/guides";
export function generateStaticParams(){return guides.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const guide=guides.find(g=>g.slug===slug);return{title:guide?.title??"Guide",description:guide?.description}}
export default async function GuidePage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const content=guideContent[slug];if(!content)notFound();return <main className="shell py-12"><Link href="/guides" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)]"><ArrowLeft size={15}/> All guides</Link><article className="mx-auto mt-10 max-w-3xl"><Markdown>{content}</Markdown></article></main>}
