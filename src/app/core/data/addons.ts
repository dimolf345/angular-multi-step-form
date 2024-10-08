import { ISubscriptionItem } from '../models/subscription-item.model';

export const ADDONS: ISubscriptionItem[] = [
  {
    id: 4,
    title: 'online service',
    description: 'Access to multiplayer games',
    basePrice: 1,
    yearlyDiscount: 2,
  },
  {
    id: 5,
    title: 'larger storage',
    description: 'Extra 1 TB of cloud save',
    basePrice: 2,
    yearlyDiscount: 2,
  },
  {
    id: 6,
    title: 'customizable profile',
    description: 'Custom theme on your profile',
    basePrice: 2,
    yearlyDiscount: 2,
  },
];
