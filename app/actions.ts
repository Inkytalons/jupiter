"use server";

import { WeatherData } from "@/types/weather"

export async function getWeatherData(city: string): Promise<{
    data?: WeatherData
}> {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
        const data = await res.json();
        return { data };
    } catch (error) {
        console.error(error);
        return {}
    }
}

export async function getForecastData(city: string) {
    try {
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}&cnt=5`);
        const data2 = await res2.json();
        return { data2 }
    } catch (error) {
        console.error(error);
        return {}
    }
}

