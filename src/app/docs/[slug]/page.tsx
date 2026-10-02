import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { Markdown } from "@/components/markdown";
import { docs,getDoc } from "@/lib/content";
export function generateStaticParams(){return docs.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const item=docs.find(d=>d.slug===slug);return{title:item?.title??"Documentation",description:item?.description}}
export default async function DocPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const doc=getDoc(slug);if(!doc)notFound();return <DocsShell current={slug}><Markdown>{doc.content}</Markdown></DocsShell>}
