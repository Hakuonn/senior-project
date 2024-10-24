import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import GetUserLocation from './GetUserLocation';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Map({ data }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB71Ppc2GOczEV6gwD_cpS11SlyoOF8Ddk', // 使用環境變數保護 API 金鑰
  });

  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 22.7319608, lng: 120.3493329 });
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    if (data) {
      console.log('Received data:', data);  // 在控制台中查看後端返回的數據
      const tmpMarkers = data
        .map((e) => {
          const lat = parseFloat(e.lat);
          const lng = parseFloat(e.lng);
          if (isNaN(lat) || isNaN(lng)) {
            console.warn(`Invalid coordinates for id ${e.sid}`);
            return null;
          }
          return {
            id: e.sid,
            name: e.name,
            position: { lat, lng },
          };
        })
        .filter((marker) => marker !== null);
      setMarkers(tmpMarkers);
    }
  }, [data]);
  

  useEffect(() => {
    if (userLocation) {
      setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
    }
  }, [userLocation]);

  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container fluid>
      <div className="map-outside-div">
        <div className="map-div">
          <GetUserLocation userLocation={userLocation} setUserLocation={setUserLocation} />
          <GoogleMap
            zoom={15}
            center={center}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: '100%', height: '400px' }}
          >
            {markers.map(({ id, name, position }) => (
              <MarkerF
                key={id}  // 使用唯一的 id 作為 key
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindowF
                    key={`${id}_info`}  // InfoWindow 也應該有一個唯一的 key
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div>
                      {name}
                      <br />
                      <Link to={`/store/${id}`}>點我至商家页面</Link>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}

          </GoogleMap>
        </div>
      </div>
    </Container>
  );
}

export default Map;
