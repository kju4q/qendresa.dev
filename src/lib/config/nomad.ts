// Nomad location and weather settings
export const nomadConfig = {
  // Default city if not set in environment
  defaultCity: 'Unknown',
  
  // Cache for city to avoid excessive API calls
  cachedCity: null as string | null,
  cachedTime: 0,
  cacheDuration: 60 * 60 * 1000, // 1 hour in milliseconds
  
  // Get current city from API or environment or default
  getCurrentCity: async () => {
    // Check if we have a valid cached city
    const now = Date.now();
    if (nomadConfig.cachedCity && (now - nomadConfig.cachedTime < nomadConfig.cacheDuration)) {
      return nomadConfig.cachedCity;
    }
    
    // First try environment variable
    if (process.env.NOMAD_CITY) {
      return process.env.NOMAD_CITY;
    }
    
    try {
      // Try to get from API
      const response = await fetch('/api/nomad/location');
      if (response.ok) {
        const data = await response.json();
        // Cache the result
        nomadConfig.cachedCity = data.city;
        nomadConfig.cachedTime = now;
        return data.city;
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
    
    // Fallback to default
    return nomadConfig.defaultCity;
  },
  
  // Synchronous version for cases where async isn't possible
  getCurrentCitySync: () => {
    // Check if we have a valid cached city
    const now = Date.now();
    if (nomadConfig.cachedCity && (now - nomadConfig.cachedTime < nomadConfig.cacheDuration)) {
      return nomadConfig.cachedCity;
    }
    
    // Fallback to environment or default
    return process.env.NOMAD_CITY || nomadConfig.defaultCity;
  },
  
  // Weather-related settings
  weather: {
    // Weather condition to accent color mapping (using site's existing color palette)
    conditionColors: {
      sunny: 'var(--terminal-success)',
      clear: 'var(--terminal-accent)',
      cloudy: 'rgb(142, 142, 147)',
      rainy: 'rgb(100, 210, 255)',
      stormy: 'var(--terminal-warning)',
      snowy: 'rgb(242, 242, 247)',
      foggy: 'rgb(174, 174, 178)',
      default: 'var(--terminal-accent)',
    },
    
    // Time of day to accent color mapping
    timeColors: {
      morning: 'rgb(255, 204, 0)',
      afternoon: 'rgb(255, 149, 0)',
      evening: 'rgb(172, 142, 255)',
      night: 'rgb(94, 92, 230)',
    }
  }
};
