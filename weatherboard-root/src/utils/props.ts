import type { ReactNode } from "react";

export interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  wind: {
    deg: number;
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface DailyForecast {
  dt: number; // timestamp
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyForecast[];
}

export interface Props {
  children: ReactNode;
}
