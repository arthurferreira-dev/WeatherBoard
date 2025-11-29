import { useEffect, useLayoutEffect, useState, type JSX } from "react";
import { Cloud } from "lucide-react";
import { WeatherImg } from "./components/WeatherImg";
import { ChevronState } from "./components/ChevronState";
import { TempSimbol, WindMetric } from "./components/TempSimbol";
import type {
  //DailyForecast,
  //OneCallResponse,
  Props,
  WeatherData,
} from "./utils/props";
import { ThemeController } from "./components/ThemeController";
import { degToCompass } from "./components/WindDirectionName";
import { useNavigate } from "react-router-dom";
//import { Test } from "./test/consoleTest";

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [temp, setTemp] = useState<string>("&units=metric");
  const [chevronState, setChevronState] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  //const [hourly, setHourly] = useState<DailyForecast[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryTime, setQueryTime] = useState(query);
  const [error, setError] = useState<string>("");
  const data: Date = new Date();
  const year = data.getFullYear();
  const monthData = data.getMonth();
  const Months: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const month = Months[monthData];
  const day = data.getDate();

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryTime(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useLayoutEffect(() => {
    if (!queryTime.trim()) return;

    const FetchAPI = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            query
          )}${temp}&lang=pt&appid=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const json = await res.json();
        setWeather(json);
      } catch (err: any) {
        setError(err.mensage);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    FetchAPI();
  }, [API_KEY, temp, queryTime, query]);

  //Test.log(query);

  /*
    useEffect(() => {
      if (!weather?.coord || !API_KEY) return;

      const fetchForecast = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&lang=pt&appid=${API_KEY}`
          )
          if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
          }

          const data: OneCallResponse = await res.json();
          console.log(data)

          if (!data.daily) {
            console.error("Daily data não encontrada", data);
            return;
          }

          setHourly(data.daily.slice(0, 7));
        } catch (error) {
          console.error("Erro ao buscar previsão diária:", error);
        }
      };

      fetchForecast();
    }, [API_KEY, weather]);
  */

  const handleChangeTemp = (temp: string) => {
    setTemp(temp);
  };

  const Card: ({ children }: Props) => JSX.Element = ({ children }: Props) => {
    return (
      <div className="card w-[450px] bg-base-200 rounded-md shadow-md">
        <div className="card-body">{children}</div>
      </div>
    );
  };

  const MiniCard: ({ children }: Props) => JSX.Element = ({
    children,
  }: Props) => {
    return (
      <div className="bg-base-100 w-[125px] rounded-lg duration-300 hover:-translate-y-1">
        <div className="p-2 flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="navbar bg-base-300 shadow-sm justify-between">
          <div className="flex items-center gap-2">
            <Cloud size={33} />
            <a className="text-xl" href="/">
              WeatherBoard
            </a>
          </div>

          <div className="flex-none gap-2 flex">
            <div className="relative inline-block">
              <div
                role="button"
                className="btn m-1 bg-base-200 flex items-center gap-3"
                onClick={() => setChevronState(!chevronState)}
              >
                Temperaturas
                <ChevronState state={chevronState} />
              </div>

              {chevronState && (
                <ul className="absolute flex flex-col flex-wrap gap-4 bg-base-200 rounded-box shadow w-52 p-2 mt-1 z-10">
                  <li
                    className="duration-300 rounded-box px-2 py-1.5 hover:bg-base-300"
                    onClick={() => handleChangeTemp("&units=metric")}
                  >
                    Celsius
                  </li>
                  <li
                    className="duration-300 rounded-box px-2 py-1.5 hover:bg-base-300"
                    onClick={() => handleChangeTemp("&units=imperial")}
                  >
                    Fahrenheit
                  </li>
                  <li
                    className="duration-300 rounded-box px-2 py-1.5 hover:bg-base-300"
                    onClick={() => handleChangeTemp("")}
                  >
                    Kelvin
                  </li>
                </ul>
              )}
            </div>
            <ThemeController />
          </div>
        </header>
        <main className="p-2 grow">
          <div
            id="input-with-card"
            className="flex flex-col flex-wrap justify-center items-center gap-4"
          >
            <div className="w-full flex justify-center items-center">
              <input
                type="text"
                className="bg-base-100 font-poppins input text-[1rem] max-[501px]:w-[250px]"
                placeholder="Digite o nome da sua cidade..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <Card>
                {error && (
                  <p className="text-error text-xl text-center">{error}</p>
                )}

                {!query && (
                  <h2 className="card-title">Pesquise uma cidade...</h2>
                )}

                {!error && query && (
                  <>
                    <h2 className="card-title">{weather?.name}</h2>
                    <p className="font-bold">
                      {day} de {month} de {year}
                    </p>
                    <div className="w-full flex justify-center items-center gap-1 my-3">
                      <p className="text-3xl font-semibold leading-none">
                        {loading ? (
                          <span className="loading loading-dots loading-xs" />
                        ) : (
                          <>
                            {weather?.main.temp} <TempSimbol temp={temp} />
                          </>
                        )}
                      </p>

                      <div>
                        <WeatherImg
                          lang="pt-br"
                          iconDesc={weather?.weather?.[0]?.description ?? ""}
                          size="2.6rem"
                        />
                      </div>
                    </div>
                    <div className="flex justify-evenly items-center">
                      <MiniCard>
                        <h2 className="font-semibold text-lg">
                          {weather?.main.temp_min} <TempSimbol temp={temp} />
                        </h2>
                        <p className="font-semibold">Mín</p>
                      </MiniCard>
                      <MiniCard>
                        <h2 className="font-semibold text-lg">
                          {weather?.main.temp_max} <TempSimbol temp={temp} />
                        </h2>
                        <p className="font-semibold">Máx</p>
                      </MiniCard>
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                      <MiniCard>
                        <h2 className="font-semibold text-lg">
                          {loading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            <>
                              {weather?.main.feels_like}{" "}
                              <TempSimbol temp={temp} />
                            </>
                          )}
                        </h2>
                        <div className="tooltip">
                          <div className="tooltip-content">
                            <div className="font-semibold text-center">
                              Sensação Térmica
                            </div>
                          </div>
                          <button className="font-semibold">ST</button>
                        </div>
                      </MiniCard>
                      <MiniCard>
                        <h2 className="font-semibold text-lg">
                          {weather?.main.humidity}%
                        </h2>
                        <div className="tooltip">
                          <div className="tooltip-content">
                            <div className="font-semibold text-center">
                              Umidade do Ar
                            </div>
                          </div>
                          <button className="font-semibold">UR</button>
                        </div>
                      </MiniCard>
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                      <MiniCard>
                        <h2 className="font-semibold text-lg">
                          {loading ? (
                            <span className="loading loading-dots loading-xs"></span>
                          ) : (
                            <>
                              {weather?.wind.speed} <WindMetric temp={temp} />
                            </>
                          )}
                        </h2>
                        <div className="tooltip">
                          <div className="tooltip-content">
                            <div className="font-semibold text-center">
                              Velocidade do Vento
                            </div>
                          </div>
                          <button className="font-semibold">WS</button>
                        </div>
                      </MiniCard>
                      <MiniCard>
                        <h2 className="font-semibold text-lg">
                          {weather?.wind?.deg !== undefined
                            ? degToCompass(weather.wind.deg)
                            : "—"}
                        </h2>
                        <p className="font-semibold">Dir. Vento</p>
                      </MiniCard>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </main>
        <footer className="footer flex flex-col flex-wrap gap-4 p-2 justify-center items-center bg-base-200">
          <h1 className="footer-title mb-0">
            Este dashboard ainda está sendo desenvolvido!
          </h1>
          <div
            className="badge badge-error duration-300 hover:-translate-y-1 text-white hover:cursor-pointer"
            onClick={() => navigate("/version")}
          >
            Demo v0.5.1
          </div>
        </footer>
      </div>
    </>
  );
}

/*
  <div className="w-full p-3 flex overflow-x-auto gap-3">
          {hourly.map((h) => (
            <Card key={h.dt}>
              <p>
                {new Date(h.dt * 1000).toLocaleDateString("pt-BR", {
                  weekday: "short",
                })}
              </p>
              <WeatherImg
                lang="pt-br"
                iconDesc={h.weather[0].description}
                size="2rem"
              />
              <p>{h.temp.day}°C</p>
              <p className="text-sm">
                Min: {h.temp.min}° Max: {h.temp.max}°
              </p>
            </Card>
          ))}
        </div>
*/
