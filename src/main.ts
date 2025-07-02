import 'maplibre-gl/dist/maplibre-gl.css';
import { createMap, addGeoJSONOverlay, removeOverlay } from './mapUtils';
import { createIslandSelector } from './ui';
import { calculateGeoJSONCenter, transformGeoJSONCoordinates } from './geometry';
import { appState } from './state';

const map = createMap();

map.on('load', () => {
  appState.map = map;
  createIslandSelector();

  /**
   * 地図クリック時の処理
   * - オーバーレイが表示中の場合：削除
   * - オーバーレイが非表示の場合：選択されたGeoJSONをクリック位置に移動して表示
   */
  map.on('click', (e) => {
    if (appState.isOverlayVisible) {
      removeOverlay(map);
      appState.isOverlayVisible = false;
      return;
    }

    const geoJsonFileName = appState.currentIslandFileName;
    fetch(geoJsonFileName)
      .then((res) => res.json())
      .then((data) => {
        const clickedLng = e.lngLat.lng;
        const clickedLat = e.lngLat.lat;

        // ディープコピー
        const transformed = JSON.parse(JSON.stringify(data));

        // GeoJSONのpolygon重心を計算
        const polygonCenter = calculateGeoJSONCenter(transformed);

        // クリック位置への移動距離を計算
        const offsetLng = clickedLng - polygonCenter[0];
        const offsetLat = clickedLat - polygonCenter[1];

        // すべてのフィーチャーの座標をクリック位置にオフセット
        transformGeoJSONCoordinates(
          transformed,
          offsetLng,
          offsetLat
        );

        // 変換されたGeoJSONをマップに追加
        addGeoJSONOverlay(map, transformed);

        appState.isOverlayVisible = true;
      })
      .catch((error) => {
        console.error('GeoJSONファイルの読み込みに失敗しました:', error);
      });
  });
});

