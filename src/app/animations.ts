import {
  animate,
  AnimationMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const fadeInRight: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-25%)', opacity: 0, zIndex: -1 }),
        animate(
          '.3s ease-out',
          style({ transform: 'translateX(0%)', opacity: 1, zIndex: 1 })
        ),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const fadeInLeft: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({
          transform: 'translateX(0%)',
          zIndex: 1,
          opacity: 0.75,
          backgroundColor: 'transparent',
        }),
        animate(
          '.3s ease-out',
          style({ transform: 'translateX(-25%)', zIndex: -1, opacity: 0 })
        ),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

export const ROUTE_ANIMATIONS = trigger('routeAnimation', [
  transition(':increment', fadeInRight),
  transition(':decrement', fadeInLeft),
]);
