import type { Metadata } from "next";
import { Hind_Siliguri, Poppins } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "এক্সাম সেবা | জব কুইজ টেস্ট - অনলাইন পরীক্ষা পোর্টাল",
  description: "আধুনিক প্রযুক্তির সাহায্যে বিসিএস, প্রাথমিক শিক্ষক নিয়োগ, শিক্ষক নিবন্ধন, ব্যাংক জব এবং অন্যান্য সরকারি চাকরির সম্পূর্ণ লাইভ পরীক্ষা ও প্রস্তুতি প্ল্যাটফর্ম।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`scroll-smooth ${hindSiliguri.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#f8f9fa] text-slate-800">
        {children}
      </body>
    </html>
  );
}
