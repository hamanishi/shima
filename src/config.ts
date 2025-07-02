import type { IslandConfig } from './types';

export const ISLANDS_INFO: IslandConfig[] = [
  {
    id: 'awaji',
    name: '淡路島',
    fileName: 'geojson/awaji.geojson',
    iconPath: 'icons/awaji.svg'
  },
  {
    id: 'sado',
    name: '淡路市',
    fileName: 'geojson/awaji_city.geojson',
    iconPath: 'icons/awaji_city.svg'
  },
];

export const MAP_CONFIG = {
  center: [135.0, 34.0] as [number, number],
  zoom: 7,
  overlayId: 'click-overlay'
};
