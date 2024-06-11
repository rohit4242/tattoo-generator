"use client"
import ImageGenerator from "@/components/ImageGenrator";
import Tattoo from "@/components/Tattoo";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
     <QueryClientProvider client={queryClient}>
        <Tattoo />
    </QueryClientProvider>
    {/* <ImageGenerator /> */}
    </main>
  );
}
