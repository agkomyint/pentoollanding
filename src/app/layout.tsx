import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./globals.css";

const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata:Metadata={metadataBase:new URL("https://pentool.space"),title:{default:"Pentool — Open design for humans and agents",template:"%s · Pentool"},description:"An open-source vector editor in one Rust binary. Draw with the CLI, edit in the browser, and keep every layer in a readable .pen file.",openGraph:{title:"Pentool",description:"Open design for humans and agents.",url:"https://pentool.space",siteName:"Pentool",type:"website"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body><SiteHeader/>{children}<SiteFooter/></body></html>}
