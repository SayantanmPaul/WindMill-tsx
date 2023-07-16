'use client';

import { useState } from "react"

const getData=async()=>{
    const res= await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}=London`, {
      cache: "no-store"
    })
  
    return res.json()
  }


export default function WeatherComp() {  
    const [city, setCity]= useState('')
    const [weather, setWeather]= useState({})
    const [loading, setLoading]= useState(false)

    return (
      <div>
        <h1>Hello</h1>
      </div>
  
    )
  }
  