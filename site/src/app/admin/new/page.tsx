import Link from "next/link";
import { NewCompanyForm } from "@/components/NewCompanyForm";

export default function NewCompanyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-xl">
        <Link href="/admin" className="text-xs text-neutral-500 hover:text-neutral-300">
          ← All companies
        </Link>
        <h1 className="mt-2 mb-6 text-2xl font-semibold">New company</h1>
        <NewCompanyForm />
      </div>
    </div>
  );
}
