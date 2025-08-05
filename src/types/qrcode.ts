export interface QRCodeOptions {
  size: number;
  foreground: string;
  background: string;
  errorCorrection: "L" | "M" | "Q" | "H";
}
