import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from '../../../components/Axios'; // 自訂 Axios 實例

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB71Ppc2GOczEV6gwD_cpS11SlyoOF8Ddk', // 使用環境變數保護 API 金鑰
  });

  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStoreData = async (newPage = 1) => {
    try {
      const response = await Axios().get('/store/search/get/', {
        params: {
          page: newPage,
          page_size: 10,
          q: '', // 可選：搜索關鍵字
          lat: userLocation?.latitude,
          lng: userLocation?.longitude,
          distance: 50, // 搜索範圍，單位：公里
        },
      });
      const { results, total_pages } = response.data;
      const tmpMarkers = results.map((store) => ({
        id: store.id,
        name: store.name,
        position: { lat: store.lat, lng: store.lng },
        distance: store.distance,
      }));
      setMarkers(tmpMarkers);
      setPage(newPage);
      setTotalPages(total_pages);
    } catch (error) {
      console.error('獲取商家資料失敗:', error);
    }
  };

  useEffect(() => {
    if (userLocation) {
      setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
      fetchStoreData();
    }
  }, [userLocation]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error('無法取得使用者位置:', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) return;
    setActiveMarker(markerId);
  };

  const handlePageChange = (newPage) => {
    fetchStoreData(newPage);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container fluid>
      <GoogleMap
        zoom={15}
        center={center}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        {markers.map(({ id, name, position, distance }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id && (
              <InfoWindowF
                position={position}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div>
                  <strong>{name}</strong>
                  <Link to={`/menu/store/${id}`}>點我至商家頁面</Link>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
      
    </Container>
  );
}

export default Map;