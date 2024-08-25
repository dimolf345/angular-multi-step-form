export interface ISubscriptionItem {
  id: number;
  title: string;
  basePrice: number;
  yearlyDiscount: number;
  description?: string;
  theme?: string;
  icon?: string;
}
