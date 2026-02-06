import {Toaster as Sonner} from "@/components/ui/sonner";
import {Toaster} from "@/components/ui/toaster";
import type {Metadata} from "next";
import "../index.css";
import {Providers} from "./providers";

export const metadata: Metadata = {
  title: "Tasks Pro",
  description: "Gerenciamento de tarefas profissional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
