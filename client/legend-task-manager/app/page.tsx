import Link from "next/link";

export default function Home() {
  return (
    <main className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md gap-y-10">
          <h1 className="font-bold text-3xl">Legend Task Manager</h1>
          <p className="py-6">
            Forget the chaotic to-do lists and endless reminders. Legend isn&apos;t
            just a task manager, it&apos;s your productivity hero. Imagine a knight,
            not just slaying dragons of procrastination, but vanquishing them
            with elegance and ease.
          </p>
          <Link
            href="/auth"
            className="bg-primary text-white rounded-md px-2 py-2 mt-10 text-center"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
}
