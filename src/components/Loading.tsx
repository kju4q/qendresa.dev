import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
