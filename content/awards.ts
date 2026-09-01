export interface Award {
  propertySlug: string;
  propertyName: string;
  badgeImage: string;
}

export const awards: Award[] = [
  {
    propertySlug: 'burdwan',
    propertyName: 'Sinclairs Burdwan',
    badgeImage: '/images/awards/burdwan.jpg',
  },
  {
    propertySlug: 'darjeeling',
    propertyName: 'Sinclairs Darjeeling',
    badgeImage: '/images/awards/darjeeling.jpg',
  },
  {
    propertySlug: 'dooars',
    propertyName: 'Sinclairs Retreat Dooars',
    badgeImage: '/images/awards/dooars.jpg',
  },
  {
    propertySlug: 'kalimpong',
    propertyName: 'Sinclairs Retreat Kalimpong',
    badgeImage: '/images/awards/kalimpong.jpg',
  },
  {
    propertySlug: 'ooty',
    propertyName: 'Sinclairs Retreat Ooty',
    badgeImage: '/images/awards/ooty.jpg',
  },
  {
    propertySlug: 'port-blair',
    propertyName: 'Sinclairs Bayview Port Blair',
    badgeImage: '/images/awards/port-blair.jpg',
  },
];
