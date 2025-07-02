/**
 * ポリゴンの重心（面積重心）を計算
 * Shoelace公式（台形公式）を使用して幾何学的重心を求める
 *
 * @param coordinates - ポリゴンの座標配列 [[lng, lat], ...]
 * @returns [経度, 緯度] の配列
 */
export function getPolygonCentroid(coordinates: number[][]): [number, number] {
  let area = 0;
  let centroidX = 0;
  let centroidY = 0;

  // Shoelace公式を使用してポリゴンの面積と重心を計算
  for (let i = 0; i < coordinates.length - 1; i++) {
    const [lng1, lat1] = coordinates[i];
    const [lng2, lat2] = coordinates[i + 1];

    // 外積を計算（符号付き面積の2倍）
    const crossProduct = lng1 * lat2 - lng2 * lat1;
    area += crossProduct;
    centroidX += (lng1 + lng2) * crossProduct;
    centroidY += (lat1 + lat2) * crossProduct;
  }

  // 面積を正規化
  area *= 0.5;

  // 重心座標を計算（面積重心公式）
  return [centroidX / (6 * area), centroidY / (6 * area)];
}

/**
 * GeoJSONの全フィーチャーから重心を計算(面積重心を使用)
 * 複数のポリゴンがある場合は、それぞれの重心の平均を返す
 *
 * @param geojson - GeoJSONオブジェクト
 * @returns [経度, 緯度] の配列
 */
export function calculateGeoJSONCenter(geojson: any): [number, number] {
  let totalLng = 0;
  let totalLat = 0;
  let featureCount = 0;

  for (const feature of geojson.features) {
    // 各フィーチャーのポリゴン重心を計算
    const [lng, lat] = getPolygonCentroid(feature.geometry.coordinates[0]);
    totalLng += lng;
    totalLat += lat;
    featureCount++;
  }

  return [totalLng / featureCount, totalLat / featureCount];
}

/**
 * GeoJSONのすべての座標を指定されたオフセット分だけ移動
 *
 * @param geojson - 変換対象のGeoJSONオブジェクト
 * @param offsetLng - 経度方向のオフセット
 * @param offsetLat - 緯度方向のオフセット
 */
export function transformGeoJSONCoordinates(
  geojson: any,
  offsetLng: number,
  offsetLat: number
): void {
  for (const feature of geojson.features) {
    feature.geometry.coordinates = feature.geometry.coordinates.map(
      (ring: number[][]) => ring.map(([lng, lat]) => [lng + offsetLng, lat + offsetLat])
    );
  }
}
