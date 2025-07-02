import maplibregl from 'maplibre-gl';
import { MAP_CONFIG } from './config';

/**
 * MapLibreを使用した地図の初期化
 * OpenStreetMapをベースマップとして使用
 */
export function createMap(): maplibregl.Map {
  const map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors'
        }
      },
      layers: [{
        id: 'osm-layer',
        type: 'raster',
        source: 'osm'
      }]
    },
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    doubleClickZoom: false,
    attributionControl: false
  });

  map.addControl(new maplibregl.AttributionControl({
    compact: false // 常に展開状態にする
  }));

  return map;
}

/**
 * 変換されたGeoJSONをマップにオーバーレイとして追加
 *
 * @param map - MapLibre地図インスタンス
 * @param geoJsonData - 表示するGeoJSONデータ
 */
export function addGeoJSONOverlay(map: maplibregl.Map, geoJsonData: any): void {
  map.addSource(MAP_CONFIG.overlayId, {
    type: 'geojson',
    data: geoJsonData
  });

  map.addLayer({
    id: MAP_CONFIG.overlayId,
    type: 'fill',
    source: MAP_CONFIG.overlayId,
    paint: {
      'fill-color': '#333333',
      'fill-opacity': 0.5,
      'fill-outline-color': 'transparent' // 境界線を透明に
      // 'fill-outline-color': '#333333' // 同じ色
    }
  });
}

/**
 * オーバーレイを削除
 *
 * @param map - MapLibre地図インスタンス
 */
export function removeOverlay(map: maplibregl.Map): void {
  map.removeLayer(MAP_CONFIG.overlayId);
  map.removeSource(MAP_CONFIG.overlayId);
}
