import islandImages from './imgs/islands/*.*'
import 'babel-polyfill'


const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
}

const isiOS = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const opt = {
  zoom: 9,
  center: new google.maps.LatLng(34.538379, 134.990289), // awaji
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  disableDoubleClickZoom: true
};

const dict = {
  awaji: {
    width: 0.211893,
    height: 0.214920,
  },
  shoudo: {
    width: 0.095061,
    height: 0.149476
  }
};
const opacityOverlay = 0.5;

let gmap;
let selectedIsland;
let isOverlayed = false;
let historicalOverlay;

const start = () => {
  window.addEventListener('DOMContentLoaded', init);
}

const init = () => {
  for (let islandName in islandImages) {
    document.getElementById(islandName.toString()).addEventListener("click", setIsland, false);
  }

  const div = initCanvas();
  gmap = new google.maps.Map(div, opt);
  google.maps.event.addListener(
    gmap, 'click', (event) => {
      onClick(event.latLng);
    });
}

const setIsland = (event) => {
  selectedIsland = event.target.name;
}

const initCanvas = () => {
  const useragent = navigator.userAgent;
  let mapdiv = document.getElementById("map_canvas");
  if (!isiOS != -1 || isAndroid != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '90%';
    mapdiv.style.height = '90%';
  }
  return mapdiv;
}

const onClick = (location) => {
  if (selectedIsland != null) {
    if (!isOverlayed) {
      for (let extensionName in islandImages[selectedIsland]) {
        const fileName = islandImages[selectedIsland][extensionName]
        const bound = calcBound(selectedIsland, location);
        historicalOverlay = new google.maps.GroundOverlay(
          fileName, bound
        );
      }

      isOverlayed = true;
      historicalOverlay.setMap(gmap);
      historicalOverlay.setOpacity(opacityOverlay);

      google.maps.event.addListener(historicalOverlay, 'click', (event) => {
        onClickOverlay(event.latLng);
      });
    }
    else {
      historicalOverlay.setMap(null);
      isOverlayed = false;
    }
  }
}

const calcBound = (islandName, location) => {
  return new google.maps.LatLngBounds(
    new google.maps.LatLng(location.lat() - dict[islandName].width, location.lng() - dict[islandName].height),
    new google.maps.LatLng(location.lat() + dict[islandName].width, location.lng() + dict[islandName].height)
  );
}

const onClickOverlay = () => {
  historicalOverlay.setMap(null);
  isOverlayed = false;
}

start();