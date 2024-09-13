import { ISubscriptionItem } from "../models/subscription-item.model";

export const ADDONS: ISubscriptionItem[] = [
    {
        id: 4,
        title: 'online service',
        description: 'access to multiplayer games',
        basePrice: 1,
        yearlyDiscount: 0
    },
    {
        id: 5,
        title: 'larger storage',
        description: 'extra 1 TB of cloud save',
        basePrice: 2,
        yearlyDiscount: 0
    },
    {
        id: 6,
        title: 'customizable profile',
        description: 'custom theme on your profile',
        basePrice: 2,
        yearlyDiscount: 0
    }
]