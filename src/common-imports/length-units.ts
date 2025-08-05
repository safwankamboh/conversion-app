import { LengthUnit } from "@/types/length";

export const lengthUnits: LengthUnit[] = [
  { name: "Meters", symbol: "m", toMeters: 1 },
  { name: "Kilometers", symbol: "km", toMeters: 1000 },
  { name: "Centimeters", symbol: "cm", toMeters: 0.01 },
  { name: "Millimeters", symbol: "mm", toMeters: 0.001 },
  { name: "Feet", symbol: "ft", toMeters: 0.3048 },
  { name: "Inches", symbol: "in", toMeters: 0.0254 },
  { name: "Yards", symbol: "yd", toMeters: 0.9144 },
  { name: "Miles", symbol: "mi", toMeters: 1609.344 },
  { name: "Nautical Miles", symbol: "nmi", toMeters: 1852 },
  { name: "Light Years", symbol: "ly", toMeters: 9.461e15 },
  { name: "Astronomical Units", symbol: "AU", toMeters: 1.496e11 },
  { name: "Parsecs", symbol: "pc", toMeters: 3.086e16 },
];
