export interface ITileData {
  id: number;
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description?: string;
  extra?: string;
  icon?: string;
  iconBackground?: string;
  checked?: boolean;
}
