'use client'

import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Droplets, Search, Thermometer, Wind } from "lucide-react"
import { getWeatherData } from "./actions";
import { useState } from "react";
import { WeatherData } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { ForecastData, getDay } from "@/types/forecast";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Search className={`w-4 h-4 ${pending ? "animate-spin" : ""}`} />
    </Button>
  )
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (formData: FormData) => {
    setError("")

    const city = formData.get("city") as string;
    const { data, data2,  error: weatherError } = await getWeatherData(city);

    
    console.log(data2);
    
    if (data) {
      setWeather(data);
    }

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data2) {
      setForecast(data2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-500 to-slate-700 p-4">
      <div className="flex text-3xl text-neutral-50 font-bold item-center justify-center my-10"> Is Jupiter on your side today? </div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <form action={handleSearch} className="flex gap-1">
            <Input 
              name="city"
              type="text"
              placeholder="Enter your city's name..."
              className="bg-white/90"
              required
            />
            <SubmitButton />
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10}}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center text-neutral-50 border border-neutral-50 bg-zinc-600/50 rounded-md p-2"> 
              {error}
            </motion.div>
          )}
          
          {weather && forecast && (
            <motion.div
              initial={{ opacity: 0, y: 10}}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="bg-white/70 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h2 className="text-4xl font-bold">{weather.name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={64}
                      height={64}
                      />
                      <div className="text-xl">{Math.round(weather.main.temp)}°C</div>
                    </div>
                    <div className="text-gray-500 mt-1 capitalize">{weather.weather[0].description}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <Thermometer className="w-7 h-7 mx-auto text-orange-500" />
                      <div className="text-sm text-gray-700">Feels like</div>
                      <div className="font-semibold">{Math.round(weather.main.feels_like)}°C</div>
                    </div>

                    <div className="text-center">
                      <Droplets className="w-7 h-7 mx-auto text-blue-500" />
                      <div className="text-sm text-gray-700">Humidity</div>
                      <div className="font-semibold">{Math.round(weather.main.humidity)}%</div>
                    </div>

                    <div className="text-center">
                      <Wind className="w-7 h-7 mx-auto text-teal-500" />
                      <div className="text-sm text-gray-700">Wind</div>
                      <div className="font-semibold">{Math.round(weather.wind.speed)} m/s</div>
                    </div>
                    
                    
                  </div>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 3 }}
              >
                <Card className="bg-white/70 backdrop-blur mt-4">
                  <CardContent className="p-6">
                  {/*
                    <div> At {forecast.list[0].dt_txt} it is {forecast.list[0].main.temp}°C</div>
                    <div> At {forecast.list[1].dt_txt} it is {forecast.list[1].main.temp}°C</div>
                    <div> At {forecast.list[2].dt_txt} it is {forecast.list[2].main.temp}°C</div>
                  */}


                  <div className="text-center font-bold text-2xl mb-6">Looking ahead...</div>
                  <div className="mb-2 border-b border-gray-500">
                    <div className="font-semibold">{forecast.list[0].dt_txt}</div>
                    <div className="">
                      <img src={`https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`}
                              alt={forecast.list[0].weather[0].description}
                              width={64}
                              height={64}
                              />
                        <div className="capitalize text-gray-500 mb-1">{forecast.list[0].weather[0].description}</div>
                    </div>
                  </div>
                  
                    

                  <div className="mb-2 border-b border-gray-500">
                    <div className="font-semibold">{forecast.list[1].dt_txt}</div>
                    <div className="">
                      <img src={`https://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png`}
                              alt={forecast.list[1].weather[0].description}
                              width={64}
                              height={64}
                              />
                        <div className="capitalize text-gray-500 mb-1">{forecast.list[1].weather[0].description}</div>
                    </div>
                  </div>

                  <div className="mb-2 border-b border-gray-500">
                    <div className="font-semibold">{forecast.list[2].dt_txt}</div>
                    <div className="">
                      <img src={`https://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png`}
                              alt={forecast.list[2].weather[0].description}
                              width={64}
                              height={64}
                              />
                        <div className="capitalize text-gray-500 mb-1">{forecast.list[2].weather[0].description}</div>
                    </div>
                  </div>

                    </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
