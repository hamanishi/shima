#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GeoJSONファイルからSVGアイコンを生成するスクリプト
Usage: python geojson_to_svg.py input.geojson output.svg
"""

import json
import os
import sys
from typing import List, Tuple


def load_geojson(file_path: str) -> dict:
    """GeoJSONファイルを読み込む"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def get_bounds(geojson: dict) -> Tuple[float, float, float, float]:
    """GeoJSONのバウンディングボックスを計算"""
    min_lng = float('inf')
    max_lng = float('-inf')
    min_lat = float('inf')
    max_lat = float('-inf')

    for feature in geojson['features']:
        coordinates = feature['geometry']['coordinates']
        for ring in coordinates:
            for lng, lat in ring:
                min_lng = min(min_lng, lng)
                max_lng = max(max_lng, lng)
                min_lat = min(min_lat, lat)
                max_lat = max(max_lat, lat)

    return min_lng, min_lat, max_lng, max_lat


def coord_to_svg(lng: float, lat: float, bounds: Tuple[float, float, float, float], size: int) -> Tuple[float, float]:
    """地理座標をSVG座標に変換（アスペクト比を保持）"""
    min_lng, min_lat, max_lng, max_lat = bounds

    # 実際の幅と高さを計算
    width = max_lng - min_lng
    height = max_lat - min_lat

    # マージンを設定
    margin = size * 0.05  # 5%のマージン
    available_size = size - 2 * margin

    # アスペクト比を保持するためのスケール計算
    if width > height:
        # 幅が長い場合：幅を基準にスケール
        scale = available_size / width
        scaled_width = available_size
        scaled_height = height * scale
        # 高さ方向の中央揃え用オフセット
        offset_x = 0
        offset_y = (available_size - scaled_height) / 2
    else:
        # 高さが長い場合：高さを基準にスケール
        scale = available_size / height
        scaled_width = width * scale
        scaled_height = available_size
        # 幅方向の中央揃え用オフセット
        offset_x = (available_size - scaled_width) / 2
        offset_y = 0

    # 正規化（0-1の範囲）
    x_norm = (lng - min_lng) / width if width != 0 else 0.5
    y_norm = (lat - min_lat) / height if height != 0 else 0.5

    # SVG座標に変換（Y軸を反転し、中央揃え）
    x = margin + offset_x + x_norm * scaled_width
    y = size - (margin + offset_y + y_norm * scaled_height)  # Y軸反転

    return x, y


def create_svg_path(coordinates: List[List[float]], bounds: Tuple[float, float, float, float], size: int) -> str:
    """座標リストからSVGパスを作成"""
    path_data = []

    for i, (lng, lat) in enumerate(coordinates):
        x, y = coord_to_svg(lng, lat, bounds, size)
        if i == 0:
            path_data.append(f"M{x:.2f},{y:.2f}")
        else:
            path_data.append(f"L{x:.2f},{y:.2f}")

    path_data.append("Z")  # パスを閉じる
    return " ".join(path_data)


def geojson_to_svg(geojson: dict, size: int = 64, fill_color: str = "#007bff",
                   stroke_color: str = "#0056b3", stroke_width: float = 0.5) -> str:
    """GeoJSONをSVGに変換"""
    bounds = get_bounds(geojson)

    svg_paths = []

    for feature in geojson['features']:
        coordinates = feature['geometry']['coordinates']
        for ring in coordinates:
            path_data = create_svg_path(ring, bounds, size)
            svg_paths.append(f'<path d="{path_data}" fill="{fill_color}" stroke="{stroke_color}" stroke-width="{stroke_width}"/>')

    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  {chr(10).join(svg_paths)}
</svg>'''

    return svg_content


def main():
    if len(sys.argv) != 3:
        print("Usage: python geojson_to_svg.py input.geojson output.svg")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found")
        sys.exit(1)

    try:
        # GeoJSONを読み込み
        geojson = load_geojson(input_file)

        # SVGに変換
        svg_content = geojson_to_svg(
            geojson,
            size=64
        )

        # SVGファイルを保存
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        print(f"Successfully converted {input_file} to {output_file}")

    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
