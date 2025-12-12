import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Safai Dashboard</h1>
      <p className="mt-4">
        Go to{" "}
        <Link href="/dashboard" className="text-blue-600 underline">
          Dashboard
        </Link>
      </p>
    </main>
  );
}