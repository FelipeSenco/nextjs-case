import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WeatherContextProvider } from "./Contexts/WeatherContext";
import QueryClientCustomProvider from "./Contexts/QueryClientCustomProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ilia Nextjs Case",
  description: "Test case from Felipe de Senco",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} id="app-body">
        <QueryClientCustomProvider>
          <WeatherContextProvider>{children}</WeatherContextProvider>
        </QueryClientCustomProvider>
      </body>
    </html>
  );
}
