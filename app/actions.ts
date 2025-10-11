"use server";

import { ForecastData } from "@/types/forecast";
import { WeatherData } from "@/types/weather"
import { z } from "zod";

const weatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        humidity: z.number(),
        feels_like: z.number(),
    }),
    weather: z.array(
        z.object({
        main: z.string(),
        description: z.string(),
        icon: z.string()
    }),
    ),
    wind: z.object({
        speed: z.number(),
    }),
});

export async function getWeatherData(city: string): Promise<{
    data?: WeatherData
    data2?: ForecastData
    error?: string
}> {
    try {
        if(!city.trim()) {
            return { error: "City not found :( Maybe check your spelling?"}
        }

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}&cnt=5`);
        

        if (!res.ok) {
            throw new Error("City not found")
        }

        const data = await res.json();
        const data2 = await res2.json();
        return { data, data2 };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: "Invalid weather data received :/"}
        }
        return {
            error: error instanceof Error ? error.message: "Failed to fetch weather data."
        }
    }
}

{/*export async function getForecastData(city: string) {
    try {
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}&cnt=5`);
        const data2 = await res2.json();
        return { data2 }
    } catch (error) {
        console.error(error);
        return {}
    }
}
*/}
