#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
複数のGeoJSONファイルを一括でSVGに変換
"""

import glob
import os

from geojson_to_svg import geojson_to_svg, load_geojson


def batch_convert(input_dir: str = "../public/geojson", output_dir: str = "../public/icons"):
    """指定ディレクトリ内のすべてのGeoJSONファイルをSVGに変換"""

    # 出力ディレクトリを作成
    os.makedirs(output_dir, exist_ok=True)

    # GeoJSONファイルを検索
    geojson_files = glob.glob(os.path.join(input_dir, "*.geojson"))

    if not geojson_files:
        print(f"No GeoJSON files found in {input_dir}")
        return

    for geojson_file in geojson_files:
        try:
            # ファイル名から拡張子を除いてSVGファイル名を作成
            base_name = os.path.splitext(os.path.basename(geojson_file))[0]
            svg_file = os.path.join(output_dir, f"{base_name}.svg")

            # GeoJSONを読み込んでSVGに変換
            geojson = load_geojson(geojson_file)
            svg_content = geojson_to_svg(
                geojson,
                size=64,
                fill_color="#333333",       # 塗りつぶし色
                stroke_color="#333333",     # 境界線色
                stroke_width=1.0
            )

            # SVGファイルを保存
            with open(svg_file, 'w', encoding='utf-8') as f:
                f.write(svg_content)

            print(f"Converted: {geojson_file} -> {svg_file}")

        except Exception as e:
            print(f"Error converting {geojson_file}: {e}")


if __name__ == "__main__":
    batch_convert()
