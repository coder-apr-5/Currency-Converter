export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ConversionRate {
  from: string;
  to: string;
  rate: number;
}