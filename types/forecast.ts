export interface ForecastData {
    list: Array<{
        dt: number;
        dt_txt: string;
        main: {
        temp: number;
        feels_like: number;
        humidity: number;
        };
        weather: Array<{
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
        };
    }>;
}



export function getDay(dt: number) {
    const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    });

    const day = new Date(dt * 1000);
    console.log(weekdayFormatter.format(day));
}