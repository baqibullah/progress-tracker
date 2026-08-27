import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" label="Loading..." />
    </main>
  );
}
