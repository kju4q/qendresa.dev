import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// This API endpoint returns the current location
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you could:
    // 1. Use a geolocation API based on the server IP
    // 2. Connect to a third-party service like ipinfo.io
    // 3. Pull from a database where you update your location

    // Always use the dynamic location to ensure we're returning a consistent value
    const city = await getDynamicLocation();

    return NextResponse.json({
      city,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      city: "Unknown",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Get real dynamic location with anonymity for first week
async function getDynamicLocation(): Promise<string> {
  // Check for environment variables with real location and move date
  // These don't need NEXT_PUBLIC_ prefix because they're only used server-side in this API route
  const currentLocation = process.env.NOMAD_CURRENT_CITY || "Unknown";
  const locationChangeDate = process.env.NOMAD_LOCATION_CHANGE_DATE
    ? new Date(process.env.NOMAD_LOCATION_CHANGE_DATE)
    : null;

  // Calculate if it's been less than a week since location change
  const isNewLocation = locationChangeDate
    ? new Date().getTime() - locationChangeDate.getTime() <
      7 * 24 * 60 * 60 * 1000 // 7 days in ms
    : false;

  // If location is new (less than a week old), return "Somewhere new" instead of the actual city
  if (isNewLocation) {
    return "Somewhere new";
  }

  // Return the actual location after a week has passed
  return currentLocation;
}
