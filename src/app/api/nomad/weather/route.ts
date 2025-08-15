import { NextRequest, NextResponse } from 'next/server';
import { nomadConfig } from '@/lib/config/nomad';
import { WeatherCondition, TimeOfDay } from '@/lib/helpers/weather';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Get current city from location API, environment or default
  const city = await nomadConfig.getCurrentCity();

  // For now, we'll generate mock weather data
  // In a real implementation, you'd connect to a weather API
  const conditions: WeatherCondition[] = ['sunny', 'clear', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy'];
  const timesOfDay: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];
  
  // Get a random condition from the array for demo purposes
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomTimeOfDay = timesOfDay[Math.floor(Math.random() * timesOfDay.length)];
  
  // Generate a random temperature
  const temperature = Math.floor(Math.random() * 35) + 5; // Between 5 and 40
  
  // Get current date and time
  const now = new Date();
  const localTime = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  // Return the weather data
  return NextResponse.json({
    city,
    condition: randomCondition,
    temperature,
    temperatureUnit: 'C',
    timeOfDay: randomTimeOfDay,
    localTime,
  });
}
