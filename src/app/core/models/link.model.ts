export interface ILink {
  route: string;
  label: string;
}

export const LINKS: ILink[] = [
  { label: 'your info', route: 'personal-info' },
  { label: 'select plan', route: 'plan' },
  { label: 'add-ons', route: 'add-ons' },
  { label: 'summary', route: 'summary' },
];
