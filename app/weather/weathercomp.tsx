'use client'

import { useEffect, useState} from 'react';
import Image from "next/image";
import {BsSearch} from 'react-icons/bs';
import { Rubik, VT323} from 'next/font/google';
import bgimage from '../../public/day/rainy.jpg';
import {MagnifyingGlass} from 'react-loader-spinner'

// font styles
const rubik= Rubik({subsets: ['cyrillic']});
const vt= VT323({subsets: ['latin'], weight: '400'})

// api data
interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    localtime: string
  };
  current: {
    is_day: boolean
    temp_c: number
    condition: {
      code: number
      text: string
      icon: string
    };
    cloud: number
    humidity: number
    wind_kph: number
    feelslike_c: number
  };
}

 export default function WeatherComp() {  

  const [city, setCity]= useState('London')
  const [weather, setWeather]= useState<WeatherData | null>(null)
  const [loading, setLoading]= useState(false)
  
  // fetching api data whenevery theres new input
  const fetchData= async ()=>{
    setLoading(true);
    try {
      const data= await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}=${city}`)
      const result = await data.json();
      setWeather(result);
      setCity('')
      setLoading(false)

    } catch (err) {
      console.error(err);
      setLoading(false);

      window.alert("Location doesn't exists")
    }
  }

  // default city data fetch [london]
  useEffect(()=>{
    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}=${city}`)
    .then((response)=> response.json())
    .then((data)=> setWeather(data))     
  }, [city])

  const handleClick=(city: string, e:React.MouseEvent)=>{
    e.preventDefault();
    setCity(city)
    
  }

  // checking for day or night
  let timeofDay= 'day'
  if(weather && weather.current && !weather.current.is_day){
    timeofDay='night'
  }

  // if theres no input location
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!city){
      alert("please enter a location")
      return
    }
  }

  if(loading) return 
  <div>
    <Image src={bgimage} className=" object-cover w-full h-screen overflow-hidden -z-10 absolute" alt="background"  />
    <div className=' flex justify-center items-center'>
      <MagnifyingGlass visible={true} height="80" width="80" ariaLabel="MagnifyingGlass-loading" wrapperStyle={{}} wrapperClass="MagnifyingGlass-wrapper" glassColor = '#c0efff' color = '#fa6d1b'/>
    </div>
  </div>
  
  return(

      <div style={{...rubik.style }} className=" min-h-screen weather-app  bg-black/40 ">

        {/* change background images depending upon the weather */}
        {weather && weather.current && weather.current.condition && weather.current.condition.code===1000?(
          <Image 
            src={`/${timeofDay}/sunny.jpg`} 
            className="object-cover w-full h-screen overflow-hidden -z-10 absolute ease-in-out duration-1000" 
            alt="background" 
            width={2000} 
            height={1000} 
          />
        ):(
          weather && weather.current && weather.current.condition && weather.current.condition.code===1003 || 1006 || 1009 || 1030 || 1069 
          || 1087 || 1135 || 1273 || 1276 || 1279 || 1282?(
            <Image 
              src={`/${timeofDay}/cloudy.jpg`} 
              className="object-cover w-full h-screen overflow-hidden -z-10 absolute ease-in-out duration-1000" 
              alt="background" 
              width={1000} 
              height={1000}
            />
          ) :(
            weather && weather.current && weather.current.condition && weather.current.condition.code===1063 || 1069 || 1072 || 1150 || 1153 || 1180 
            || 1183|| 1186|| 1189|| 1192 || 1195 || 1204 || 1207 || 1240 || 1243 || 1246|| 1249 || 1252?(
              <Image 
              src={`/${timeofDay}/rainy.jpg`} 
              className="object-cover w-full h-screen overflow-hidden -z-10 absolute ease-in-out duration-1000" 
              alt="background" 
              width={1000} 
              height={1000}
            />
            ) : 
            <Image 
              src={`/${timeofDay}/snowy.jpg`} 
              className="object-cover w-full h-screen overflow-hidden -z-10 absolute ease-in-out duration-1000" 
              alt="background" 
              width={1000} 
              height={1000}
            />
          )
        )}

        {/* weather data */}
        {weather && weather.location && weather.location.region && weather.location.country && weather.current && weather.current.temp_c && weather.current.condition && weather.current.condition.text && weather.current.condition.icon?(
        <div className="container absolute top-0 left-0 w-full h-full flex lg:justify-between md:justify-between items-start flex-col z-0 p-4 lg:pt-8 lg:px-12 lg:pb-16 md:px-10 md:pb-48  pt-6 py-16 ">
          <div className="flex flex-row mb-10">
            <h3 className=" font-semibold text-green-500 lg:text-xl">wind-</h3>
            <h3 className="font-semibold lg:text-xl text-white">mill</h3>
          </div>
          
          <div className="flex flex-col lg:flex-row md:flex-row items-center text-white ">
            <div className='flex flex-row items-center justify-start'>
              <h1 className="temp m-0 lg:text-9xl md:text-7xl text-5xl">{weather.current.temp_c}°</h1>
              <div className="city-time m-0 mx-4 ">

                {weather && weather.location && weather.location.name? (
                  <h1 className=" m-0 mb-1 lg:text-6xl text-4xl ">{weather.location.name}</h1>
                ):(
                  <h1 className=" m-0 mb-1 lg:text-6xl text-4xl "></h1>
                )}
                
                <small className=" w-full text-white ">
                  <span className=" text-sm pr-1">{weather.location.region},</span>
                  <span className=" text-sm">{weather.location.country}</span>
                </small>
              </div>
              <div className="weather flex flex-col items-center lg:gap-1 gap-0 text-white">
                <Image 
                  src={`https:${weather.current.condition.icon}`} 
                  width={80} 
                  height={80} 
                  alt="icons" 
                  className="block lg:w-14 w-14"
                />
                <span className="condition lg:text-lg text-xs text-center">{weather.current.condition.text}</span>
            </div>
          </div>
        </div>
            
        </div>): null
        }

        <div className="panel absolute w-[40%] h-full right-0 bottom-0 bg-[#6e6e6e40]
        shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 px-8 overflow-y-auto ">
          <form onSubmit={handleSubmit} id="locationInput" className="lg:my-10 md:my-12 my-8 lg:mx-8">
            <input onChange={(e)=>setCity(e.target.value)} value={city} type="text" placeholder="Another location" className=" search bg-transparent border-b border-gray-300 focus: outline-none text-[17px] text-[#fff]  w-[80%] py-2 lg:text-base text-sm  " />
            {city==='' && <p style={{...vt.style}} className="text-rose-200 mt-2">please enter a location</p>}
            <button type="submit" className=" submit absolute top-0 right-0 p-6 m-0 border-none outline-none
              bg-[#fa6d1b] cursor-pointer hover:bg-white hover:text-black duration-200 ">
            <BsSearch className=" lg:text-4xl md:text-4xl text-2xl "/>
            </button>
          </form>

          <ul className="cities lg:my-9 lg:mx-8 md:my-12 my-8 border-b border-white "> 
            <li onClick={(e)=>handleClick('New York', e)} className="city  my-10 text-sm lg:text-base text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white ">
              New York
            </li>
            <li onClick={(e)=>handleClick('Sydney', e)} className="city my-10 text-sm lg:text-base text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white">
              Sydney
            </li>
            <li onClick={(e)=>handleClick('London', e)} className="city my-10 text-sm lg:text-base text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white">
              London
            </li>
            <li onClick={(e)=>handleClick('Kolkata', e)} className="city my-10 text-sm lg:text-base  text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white">
              Kolkata
            </li>
          </ul>

          {weather && weather.current && weather.current.cloud && weather.current.humidity && weather.current.wind_kph?(
            <ul className="details lg:my-8 lg:mx-8 md:my-10 my-7 border-b border-white">
            <h4 className="font-medium text-white/70 text-sm lg:text-base">Weather details</h4>
            <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
              <span>Cloudy</span>
              <span className="cloud"> {weather.current.cloud}%</span>
            </li>
            <li className=" my-10 text-white flex justify-between items-cente text-sm lg:text-baser">
              <span>Humidity</span>
              <span className="humidity"> {weather.current.humidity}%</span>
            </li>
            <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
              <span>Wind</span>
              <span className="wind"> {weather.current.wind_kph}km/h</span>
            </li>
          </ul>
          ): (
            <ul className="details lg:my-8 lg:mx-8 md:my-10 my-7 border-b border-white">
            <h4 className="font-medium text-white/70 text-sm lg:text-lg">Weather details</h4>
            <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
              <span>Cloudy</span>
              <span className="cloud"> data not avaiable </span>
            </li>
            <li className=" my-10 text-white flex justify-between items-cente text-sm lg:text-base">
              <span>Humidity</span>
              <span className="humidity"> data not avaiable </span>
            </li>
            <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
              <span>Wind</span>
              <span className="wind"> data not avaiable </span>
            </li>
          </ul>
          )}
          {weather && weather.location && weather.location.localtime && weather.current && weather.current.feelslike_c?(
            <ul className="details lg:my-8 lg:mx-8 md:my-10 my-7 ">
              <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
                <span>weather feels like</span>
                <span className="cloud"> {weather.current.feelslike_c}°C </span>
              </li>
              <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
                <span>current day & time</span>
                <span className="cloud"> {weather.location.localtime} </span>
              </li>
            </ul>
          ): (
            <ul className="details lg:my-8 lg:mx-8 md:my-10 my-7 ">
              <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
                <span>weather feels like</span>
                <span className="cloud"> data not avaiable </span>
              </li>
              <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
                <span>current day & time</span>
                <span className="cloud"> data not avaiable </span>
              </li>
            </ul>
          ) }

          
          {/* credit section */}
          <div className=' flex flex-row gap-2 lg:pt-28 pt-10 p-1 justify-center'>
            <div style={{...vt.style}} className=' flex gap-2 lg:text-sm text-xs '>
              <a className='text-white'>hand crafted by</a>
              <a className=' text-green-500 hover:text-green-600 hover:underline' href="https://github.com/SayantanmPaul">Sayantan,</a>
            </div>
            <div style={{...vt.style}} className=' flex gap-2 lg:text-sm text-xs'>
              <a className='text-white'>design credit</a>
              <a className=' text-green-500 hover:text-green-600 hover:underline' href="https://dribbble.com/shots/7118235-Weather-DailyUI-037">DailyUI </a>
            </div>
          </div>
          <div style={{...vt.style}} className=' lg:hidden flex justify-center gap-2 text-xs'>
            <a className='text-white'>Powered by</a>
            <a className=' text-green-500 hover:text-green-600 hover:underline' href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
          </div>
        </div>  
      </div>
    )
  }


