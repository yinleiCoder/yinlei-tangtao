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
  description: "唐涛与尹磊的浪漫爱情之旅",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 w-full p-4 flex justify-between items-center z-50 mix-blend-difference">
          <a href="#">狗子与我</a>
          <Avatar>
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </nav>
        {children}
        <footer className="fixed bottom-0 w-full p-4 flex justify-between items-center z-50 mix-blend-difference text-sm">
          <div className="flex items-center gap-10">
            <Link href="/">Home</Link>
            <Link href="/projects">Stories</Link>
          </div>
          <p>© 2025 尹磊 版权所有</p>
        </footer>
      </body>
    </html>
  );
}
