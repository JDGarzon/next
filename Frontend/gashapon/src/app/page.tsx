import Image from "next/image";
import "./globals.css";
import ButtonAuth from "@/components/ButtonAuth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h1>Home Page</h1>
      <ButtonAuth />
    </div>
    </main>
  );
}
