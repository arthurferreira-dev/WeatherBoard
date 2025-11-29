import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudBolt,
  faCloudRain,
  faCloudSun,
  faSun,
  faCloud,
  faSnowflake,
  faSmog,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

interface WeatherImgProps {
  iconDesc: string;
  size?: string;
  lang: string;
}

const ptBrIcons: Record<string, any> = {
  "trovoada com chuva fraca": faCloudBolt,
  "trovoada com garoa": faCloudBolt,
  "trovoada": faCloudBolt,

  "chuva fraca": faCloudRain,
  "chuva moderada": faCloudRain,
  "pancadas de chuva": faCloudRain,

  "céu limpo": faSun,

  "poucas nuvens": faCloudSun,
  "nuvens dispersas": faCloud,
  "nublado": faCloud,
  "encoberto": faCloud,

  "neve": faSnowflake,
  "neve fraca": faSnowflake,

  "névoa": faSmog,
  "nevoeiro": faSmog,
};

export const WeatherImg = ({ iconDesc, lang, size = "30px" }: WeatherImgProps) => {
  if (lang === "pt-br") {
    const icon = ptBrIcons[iconDesc];
    return (
      <FontAwesomeIcon icon={icon ?? faCloud} style={{ fontSize: size }} />
    );
  }

  return <FontAwesomeIcon icon={faQuestion} style={{ fontSize: size }} />;
};
