import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "狗子与我",
  description: "唐涛、尹磊的浪漫爱情",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-thumb-white scrollbar-thumb-rounded-full scrollbar-track-[transparent]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-thin`}
      >
        <nav className="w-full fixed top-0 px-4 py-2 flex justify-between items-center z-50">
          <Link href="/" className="font-bold mix-blend-difference">狗子与我</Link>
          <Avatar>
            <AvatarImage src="/avatar.jpg" className="hover:scale-110 transition"/>
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </nav>
        {children}
        <footer className="w-full fixed bottom-0 p-4 flex justify-between items-center z-50 mix-blend-difference text-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/projects">Stories</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/letter">Letter</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p className="hidden md:block">© 2025 尹磊 版权所有</p>
        </footer>
      </body>
    </html>
  );
}
