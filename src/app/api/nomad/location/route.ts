import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      city: "Unknown",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Simulate dynamic location
async function getDynamicLocation(): Promise<string> {
  // This could be enhanced to:
  // 1. Call a real geolocation API
  // 2. Pull from a database or service where you update your location
  // 3. Use a rotating list of locations based on time of day/week
  
  // For demo purposes, let's rotate through some tech hubs
  const locations = [
    'Helsinki',
    'San Francisco',
    'Tokyo',
    'Berlin',
    'Singapore',
    'Stockholm',
    'London',
    'Amsterdam',
    'Toronto',
    'Seoul'
  ];
  
  // Use date to make it somewhat deterministic but change daily
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const locationIndex = dayOfYear % locations.length;
  
  return locations[locationIndex];
}
