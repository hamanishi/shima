var map3;
var flg;
var imageurl;
var imageBounds;
var historicalOverlay;
var awaji = new google.maps.LatLng(34.538379, 134.990289);
var awajiopt = {
  zoom: 9,
  center: awaji,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  disableDoubleClickZoom: true
};
function initialize() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map3_canvas");
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '90%';
    mapdiv.style.height = '90%';
  }
  map3 = new google.maps.Map(document.getElementById('map3_canvas'), awajiopt);
  google.maps.event.addListener(map3, 'click', function (event) {
    clicked(event.latLng);
  });
}
function clicked(location) {
  /*
  //センターにしたときの
  var newopt = {
      zoom:9,
      center:location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map3.setOptions(newopt);
  */
  /*
  //表示範囲で指定してたときの
      var map3Bounds = map3.getBounds();
      var swLatlng3 = map3Bounds.getSouthWest();  
      var neLatlng3 = map3Bounds.getNorthEast();
  
      imageBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(swLatlng3.lat(),swLatlng3.lng()),
    new google.maps.LatLng(neLatlng3.lat(),neLatlng3.lng()));    
    */
  if (imageurl != null) {
    if (flg != 1) {//一度に１枚しか表示できないようにする
      if (imageurl == "awaji.jpg") {
        imageBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(location.lat() - 0.211893, location.lng() - 0.214920),
          new google.maps.LatLng(location.lat() + 0.211893, location.lng() + 0.214920));
      } else {
        imageBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(location.lat() - 0.095061, location.lng() - 0.149476),
          new google.maps.LatLng(location.lat() + 0.095061, location.lng() + 0.149476));
      }

      historicalOverlay = new google.maps.GroundOverlay(
        imageurl,
        imageBounds);
      // historicalOverlay.setMap(null);
      flg = 1;
      historicalOverlay.setMap(map3);
      historicalOverlay.setOpacity(0.5); //透明度  

      google.maps.event.addListener(historicalOverlay, 'click', function (event) {
        overclicked(event.latLng);
      });
    } else {
      historicalOverlay.setMap(null);
      flg = 0;
    }
  }
}
function overclicked(location) {
  historicalOverlay.setMap(null);
  flg = 0;

}
function showAwaji() {
  imageurl = "awaji.jpg";
}
function showShoudo() {
  imageurl = "syoudo3.png";
}






