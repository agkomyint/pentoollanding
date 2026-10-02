import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocsShell } from "@/components/docs-shell";
import { docs } from "@/lib/content";
export const metadata:Metadata={title:"Documentation"};
export default function DocsPage(){return <DocsShell><div><p className="label text-[var(--muted)]">Pentool docs</p><h1 className="display mt-5 text-6xl md:text-8xl">Build in the open.</h1><p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)]">Learn the file format, automate the editor, and distribute reusable design libraries without depending on a proprietary service.</p><div className="mt-12 grid gap-3 sm:grid-cols-2">{docs.map((item,i)=><Link key={item.slug} href={`/docs/${item.slug}`} className={`lift min-h-48 rounded-xl border p-6 ${i===0?"border-[var(--ink)] bg-[var(--ink)] text-white":"hairline bg-white/35"}`}><span className={`mono text-xs ${i===0?"text-[var(--signal)]":"text-[var(--muted)]"}`}>0{i+1}</span><h2 className="mt-10 text-xl font-semibold tracking-[-.035em]">{item.title}</h2><p className={`mt-2 text-sm leading-6 ${i===0?"text-white/55":"text-[var(--muted)]"}`}>{item.description}</p><ArrowRight className="mt-5" size={16}/></Link>)}</div></div></DocsShell>}
