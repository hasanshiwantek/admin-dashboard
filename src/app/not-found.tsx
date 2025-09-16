// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LayoutWrapper from "./components/layout/LayoutWrapper";

export default function NotFound() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-700">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 max-w-md">
          The page you’re looking for doesn’t exist or has been moved. Please
          check the URL or return to the homepage.
        </p>

        {/* Call to action */}
        <Link href="/manage/dashboard">
          <Button className="mt-4 !p-6 text-lg btn-primary">
            ⬅ Return Home
          </Button>
        </Link>
      </div>
    </LayoutWrapper>
  );
}
