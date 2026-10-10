import type { Metadata, Viewport } from "next";
import { Figtree, Young_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import strings from "@/content/strings.json";
import "./globals.css";

const f0 = Young_Serif({ variable: "--font-young", subsets: ["latin"], weight: "400" });
const f1 = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

const EN = strings.en as Record<string, string>;
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231d4ea0'/%3E%3Cpath d='M22 16c-5 0-8 4-7 9 1 4 2 6 3 10 1 6 2 13 4 13 3 0 3-10 8-10s5 10 8 10c2 0 3-7 4-13 1-4 2-6 3-10 1-5-2-9-7-9-4 0-5 2-8 2s-4-2-8-2z' fill='%23fff'/%3E%3Ccircle cx='50' cy='14' r='6' fill='%23f2b632'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: EN.title.replace(/&amp;/g, "&"),
  description: EN.desc,
  icons: { icon: ICON },
};
export const viewport: Viewport = { themeColor: "#1d4ea0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${f0.variable} ${f1.variable}`}>
      <body className="min-h-dvh leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
