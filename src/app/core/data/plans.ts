import { ISubscriptionItem } from "../models/subscription-item.model";

export const PLANS: ISubscriptionItem[] = [
    {
        id: 1,
        title: 'arcade',
        icon: 'icon-arcade.svg',
        basePrice: 9,
        yearlyDiscount: 2
    },
    {
        id: 2,
        title: 'advanced',
        icon: 'icon-advanced.svg',
        basePrice: 12,
        yearlyDiscount: 2
    },
    {
        id: 3,
        title: 'pro',
        icon: 'icon-pro.svg',
        basePrice: 15,
        yearlyDiscount: 2
    }
]