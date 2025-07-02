import type maplibregl from 'maplibre-gl';
import { ISLANDS_INFO } from './config';

export const appState = {
  currentIslandId: ISLANDS_INFO[0].id,
  isOverlayVisible: false,
  map: null as maplibregl.Map | null,

  get currentIslandFileName(): string {
    const island = ISLANDS_INFO.find(island => island.id === this.currentIslandId);
    return island ? island.fileName : ISLANDS_INFO[0].fileName;
  }
};
