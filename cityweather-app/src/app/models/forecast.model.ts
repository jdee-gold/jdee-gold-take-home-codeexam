export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}
