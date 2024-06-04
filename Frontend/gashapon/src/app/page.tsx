"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    
    router.push("/game/banner");
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Home Page</h1>
      </div>
    </main>
  );
}
