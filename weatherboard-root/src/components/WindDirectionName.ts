export function degToCompass(deg: number): string {
  const directions = [
    "Norte",
    "Norte-Nordeste",
    "Nordeste",
    "Leste-Nordeste",
    "Leste",
    "Leste-Sudeste",
    "Sudeste",
    "Sul-Sudeste",
    "Sul",
    "Sul-Sudoeste",
    "Sudoeste",
    "Oeste-Sudoeste",
    "Oeste",
    "Oeste-Noroeste",
    "Noroeste",
    "Norte-Noroeste",
  ];

  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}