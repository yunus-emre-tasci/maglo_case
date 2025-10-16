import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Dancing_Script,
  Kumbh_Sans,
} from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/context/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalLoadingProvider } from "@/context/GlobalLoadingContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maglo - Finance Dashboard",
  description: "Your personal finance dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${kumbhSans.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <GlobalLoadingProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: "#10b981",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
                  },
                }}
              />
            </GlobalLoadingProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
