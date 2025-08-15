import { NextRequest, NextResponse } from 'next/server';
import { nomadConfig } from '@/lib/config/nomad';
import { TimeOfDay } from '@/lib/helpers/weather';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Get current city from location API, environment or default
  const city = await nomadConfig.getCurrentCity();
  
  // Get current date and time
  const now = new Date();
  const localTime = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  // Determine time of day for accent color
  const hour = now.getHours();
  let timeOfDay: TimeOfDay;
  
  if (hour >= 5 && hour < 12) {
    timeOfDay = 'morning';
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
  } else if (hour >= 17 && hour < 21) {
    timeOfDay = 'evening';
  } else {
    timeOfDay = 'night';
  }
  
  // Return the time data
  return NextResponse.json({
    city,
    localTime,
    timeOfDay,
  });
}
