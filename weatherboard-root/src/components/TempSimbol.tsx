interface Props {
  temp: string;
}

export const TempSimbol = ({ temp }: Props) => {
  if (temp === "&units=metric") {
    return "°C";
  } else if (temp === "&units=imperial") {
    return "°F";
  } else if (!temp) {
    return "K";
  }
};

export const WindMetric = ({ temp }: Props) => {
  if (temp === "&units=metric") {
    return "m/s";
  } else if (temp === "&units=imperial") {
    return "mi/h";
  } else if (!temp) {
    return "m/s";
  }
};