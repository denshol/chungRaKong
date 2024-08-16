import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const DirectionsMap = () => {
  const churchLocation = {
    latitude: 37.53341328870977,
    longitude: 126.65889461339779,
  };

  const mapHTML = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body, html, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiM0aucj10wgQhy1G5Ux8r8fY14hSW3vQ"></script>
        <script>
          function initMap() {
            var church = {lat: ${churchLocation.latitude}, lng: ${churchLocation.longitude}};
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 18,
              center: church
            });
            var marker = new google.maps.Marker({
              position: church,
              map: map
            });

            var infowindow = new google.maps.InfoWindow({
              content: '<div style="font-size: 20px; font-weight: bold; padding: 0px;">인천광역시 서구 청라동 167-10</div>'
            });

            // 인포윈도우를 항상 열어두기
            infowindow.open(map, marker);

            // 마커 클릭 시 인포윈도우 토글
            marker.addListener('click', function() {
              if (infowindow.getMap()) {
                infowindow.close();
              } else {
                infowindow.open(map, marker);ㅊㅇ
              }
            });
          }
          initMap();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView source={{html: mapHTML}} style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default DirectionsMap;
