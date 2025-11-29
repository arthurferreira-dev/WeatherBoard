import { useNavigate } from "react-router-dom";
import { ThemeController } from "../components/ThemeController";
import { Version } from "../storage/versions/versions";
import { todayDates } from "../utils/date";
import { Cloud, Copyright } from "lucide-react";

export const VersionPage = () => {
  const Demo = Version[0][0];
  const year = todayDates("year");
  const contents = [
    "Painel do clima da cidade pesquisada",
    "Pesquisa atráves de uma caixa de texto",
    "Uso de uma API para melhores informações",
    "Trocador de Tema Claro/Escuro",
    "Responsividade para vários aparelhos",
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="navbar bg-base-300 shadow-sm justify-between">
          <div className="flex items-center gap-2">
            <Cloud size={33} />
            <a className="text-xl" href="/version">
              WeatherBoard - Version
            </a>
          </div>

          <div className="flex-none">
            <ThemeController />
          </div>
        </header>

        <main className="p-2 grow">
          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <h1 className="card-title">
              Versão {Demo.version} ({Demo.type.toLocaleUpperCase()})
            </h1>
            <p className="w-[75%] text-center">
              Versão de pré-lançamento do WeatherBoard, conteúdo adicionado
              nesta versão:
            </p>
            <ol className="list-inside list-decimal text-[16.5px] list-correct-img">
              {contents.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ol>
            <button
              className="btn btn-primary w-[175px]"
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
          </div>
        </main>

        <footer className="footer flex flex-col flex-wrap gap-4 p-2 justify-center items-center bg-base-200 font-poppins">
          <h1 className="footer-title mb-0 flex gap-1.5 justify-center items-center">
            <Copyright size={23} /> {year} - Todos os direitos reservados
          </h1>
        </footer>
      </div>
    </>
  );
};