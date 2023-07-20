'use client'

import { useEffect, useState} from 'react';
import Image from "next/image";
import {BsSearch} from 'react-icons/bs';
import { Rubik} from 'next/font/google';
import bgimage from '../../public/day/snowy.jpg';
import {MagnifyingGlass} from 'react-loader-spinner'

const rubik= Rubik({subsets: ['cyrillic']});

 export default function WeatherComp() {  

  const [city, setCity]= useState('')
  const [weather, setWeather]= useState({})
  const [loading, setLoading]= useState(false)
  

  console.log('city:', city);
  
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
    }
  }

  useEffect(() => {
    if (city !== '') {
      fetchData();
    }
  }, [city]);

  const handleClick=(clickedcity, e)=>{
    e.preventDefault();
    setCity(clickedcity)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

  if(loading) return <div><Image src={bgimage} className=" object-cover w-full h-screen overflow-hidden -z-10 absolute" alt="background"  /><MagnifyingGlass visible={true} height="80" width="80" ariaLabel="MagnifyingGlass-loading" wrapperStyle={{}} wrapperClass="MagnifyingGlass-wrapper" glassColor = '#c0efff' color = '#fa6d1b'/></div>
  
  return(

      <div style={{...rubik.style }} className=" min-h-screen weather-app  bg-black/40 ">
        <Image src={bgimage} className=" object-cover w-full h-screen overflow-hidden -z-10 absolute" alt="background"  />
        {weather && weather.location && weather.location.localtime && weather.current && weather.current.temp_c && weather.current.condition && weather.current.condition.text && weather.current.condition.icon?(
        <div className="container absolute top-0 left-0 w-full h-full flex lg:justify-between md:justify-between justify-center items-center flex-col z-0 lg:items-start md:items-start lg:pt-8 lg:px-12 lg:pb-16 md:px-10 md:pb-48  pt-6 py-16 ">
          <div className="flex flex-row mb-10">
            <h3 className=" font-semibold text-green-500 lg:text-xl">wind-</h3>
            <h3 className="font-semibold lg:text-xl">mill</h3>
          </div>
          
          <div className="flex items-center justify-center lg:gap-2">
            <h1 className="temp m-0 lg:text-9xl text-6xl">{weather.current.temp_c}°</h1>
            <div className="city-time m-0 mx-4 ">

              {weather && weather.location && weather.location.name? (
                <h1 className=" m-0 mb-1 lg:text-6xl text-4xl ">{weather.location.name}</h1>
              ):(
                <h1 className=" m-0 mb-1 lg:text-6xl text-4xl "></h1>
              )}
              
              <small className=" flex gap-1">
                <span className="time  text-sm">{weather.location.localtime}</span>
                
                <span className="date text-sm"></span>
              </small>
            </div>
            <div className="weather flex flex-col items-center">
              <Image src={`https:${weather.current.condition.icon}`} width={60} height={60} alt="icons" className=" block lg:w-14 w-11 "/>
              <span className="condition lg:text-lg text-sm">{weather.current.condition.text}</span>
            </div>
          </div>
        </div>):(
          <div>loading</div>
        )}

        <div className="panel absolute w-[40%] h-full right-0 bottom-0 bg-[#6e6e6e40]
        shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 px-8 overflow-y-auto ">
          <form onSubmit={handleSubmit} id="locationInput" className="lg:my-10 md:my-12 my-8 lg:mx-8">
            <input onChange={(e)=>setCity(e.target.value)} value={city} type="text" placeholder="Another location" className=" search bg-transparent border-b border-gray-300 focus: outline-none text-[17px] text-[#fff]  w-[80%] py-2 lg:text-base text-sm  " />
            <button type="submit" className=" submit absolute top-0 right-0 p-6 m-0 border-none outline-none
              bg-[#fa6d1b] cursor-pointer hover:bg-white hover:text-black duration-200 ">
            <BsSearch className=" lg:text-4xl md:text-4xl text-2xl "/>
            </button>
          </form>

          <ul className="cities lg:my-9 lg:mx-8 md:my-12 my-8 border-b border-white "> 
            <li onClick={(e)=>handleClick('New York', e)} className="city  my-10 text-sm lg:text-base text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white ">
              New York
            </li>
            <li onClick={(e)=>handleClick('California', e)} className="city my-10 text-sm lg:text-base text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white">
              California
            </li>
            <li onClick={(e)=>handleClick('London', e)} className="city my-10 text-sm lg:text-base text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white">
              London
            </li>
            <li onClick={(e)=>handleClick('Kolkata', e)} className="city my-10 text-sm lg:text-base  text-gray-400 block cursor-pointer hover:text-white duration-300 focus:text-white">
              Kolkata
            </li>
          </ul>


          <ul className="details lg:my-8 lg:mx-8 md:my-10 my-7 border-b border-white">
            <h4 className="font-medium text-white/70 text-sm lg:text-base">Weather details</h4>
            <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
              <span>Cloudy</span>
              <span className="cloud"> 90%</span>
            </li>
            <li className=" my-10 text-white flex justify-between items-cente text-sm lg:text-baser">
              <span>Humidity</span>
              <span className="humidity"> 63%</span>
            </li>
            <li className=" my-10 text-white flex justify-between items-center text-sm lg:text-base">
              <span>Wind</span>
              <span className="wind"> 5km/h</span>
            </li>
          </ul>
        </div>
      </div>
      
  
    )
  }
