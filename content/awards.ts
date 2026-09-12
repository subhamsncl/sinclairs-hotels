export interface Award {
  propertySlug: string;
  propertyName: string;
  badgeImage: string;
}

export const awards: Award[] = [
  {
    propertySlug: 'burdwan',
    propertyName: 'Sinclairs Burdwan',
    badgeImage: '/images/awards/burdwan.webp',
  },
  {
    propertySlug: 'darjeeling',
    propertyName: 'Sinclairs Darjeeling',
    badgeImage: '/images/awards/darjeeling.webp',
  },
  {
    propertySlug: 'dooars',
    propertyName: 'Sinclairs Retreat Dooars',
    badgeImage: '/images/awards/dooars.webp',
  },
  {
    propertySlug: 'kalimpong',
    propertyName: 'Sinclairs Retreat Kalimpong',
    badgeImage: '/images/awards/kalimpong.webp',
  },
  {
    propertySlug: 'ooty',
    propertyName: 'Sinclairs Retreat Ooty',
    badgeImage: '/images/awards/ooty.webp',
  },
  {
    propertySlug: 'port-blair',
    propertyName: 'Sinclairs Bayview Port Blair',
    badgeImage: '/images/awards/port-blair.webp',
  },
];
