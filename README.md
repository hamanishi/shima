# ぼくの島 (My Island)

> 島民による島民のための島民向けアプリ  
> *An app by islanders, for islanders, dedicated to islanders*

## 🏝️ Overview

**ぼくの島 (Boku no Shima)** is a Japanese web application that helps island residents communicate the actual size of their islands to people from the mainland. When islanders try to explain how big their island is, it can be difficult for outsiders to visualize the scale. This app solves that problem by overlaying accurate island images on Google Maps.

## ✨ Features

- **Interactive Map**: Click anywhere on Google Maps to place an island overlay
- **Island Selection**: Choose between different Japanese islands:
  - 淡路島 (Awaji Island)
  - 小豆島 (Shoudo Island)
- **Scale Visualization**: See the actual size of islands relative to any location
- **Simple Toggle**: Click once to show, click again to hide the overlay
- **Mobile Friendly**: Responsive design that works on smartphones and tablets

## 🚀 Getting Started

### Prerequisites

- Node.js (for development)
- Modern web browser with JavaScript enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hamanishi/shima.git
cd shima
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run watch
```

This will open the application in your browser with hot reloading enabled.

### Build

Build the project for production:
```bash
npm run build
```

The built files will be generated in the `docs/` directory.

## 🎯 Usage

1. **Select an Island**: Click on either "淡路島にする" (Use Awaji Island) or "小豆島にする" (Use Shoudo Island)
2. **Place on Map**: Click anywhere on the map where you want to show the island's scale
3. **View Scale**: The island overlay will appear, showing the actual size relative to the location
4. **Remove Overlay**: Click on the overlay or the map again to remove it

## 🛠️ Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Maps**: Google Maps JavaScript API
- **Build Tool**: Parcel
- **Compatibility**: Babel polyfill for older browsers
- **Deployment**: Static files served from `docs/` directory

### File Structure

```
shima/
├── index.html          # Main HTML file
├── index.js            # Application logic
├── index.css           # Styles
├── imgs/               # Island images and assets
│   ├── islands/
│   │   ├── awaji.jpg   # Awaji Island overlay
│   │   └── shoudo.png  # Shoudo Island overlay
│   └── icon.png        # App icon
├── docs/               # Built/production files
└── package.json        # Project configuration
```

## 🌐 Demo

The application is deployed and can be accessed via GitHub Pages (if enabled) from the `docs/` directory.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Android Chrome)

## 🤝 Contributing

This project has been maintained since 2013. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Copyright hamanishinatsukilab 2013-2020

## 🙋‍♂️ About

Created and maintained by hamanishinatsukilab since 2013. This application was born out of the real need of island residents to communicate the scale and size of their home islands to people who have never visited.

---

*Made with ❤️ for island communities*