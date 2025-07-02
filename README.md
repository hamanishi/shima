## Development

```bash
yarn
yarn dev
```

## Python
geojsonファイルからアイコン用にSVGファイルを生成しておく

### Setup
```bash
cd python
uv pip install -r requirements.txt
```

### GeoJSONファイルの変換
```bash
cd python
python geojson_to_svg.py ../public/geojson/awaji.geojson ../public/icons/awaji.svg
```

### GeoJSONファイルのバッチ変換
```bash
cd python
python batch_convert.py
```

## Build & Preview

### ローカル用ビルド

```bash
# 通常のローカル用ビルド（ベースパス: /）
yarn build
yarn preview
```

### GitHub Pages環境をローカルでテスト

```bash
# GitHub Pages用のベースパスでビルド
VITE_BASE_PATH=/geojson-map-ts/ yarn build
yarn preview
```

## Deploy

GitHub Actionsで自動デプロイされます：

1. `main`ブランチにプッシュ
2. GitHub Actionsが `VITE_BASE_PATH` をベースパスとしてビルド
3. 自動でGitHub Pagesにデプロイ


---

© 2013-2025 hamanishinatsukilab
