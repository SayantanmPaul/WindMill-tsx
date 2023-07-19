
export const getData=async()=>{
    const res= await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}=London`)
  
    return await res.json()
  }
