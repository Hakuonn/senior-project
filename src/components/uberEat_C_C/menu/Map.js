import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import GetUserLocation from './GetUserLocation';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

/***
 * 地图组件
 ***/
function Map({ data }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB71Ppc2GOczEV6gwD_cpS11SlyoOF8Ddk', // 使用环境变量存储 API 密钥
  });

  // 保存用户位置的状态变量
  const [userLocation, setUserLocation] = useState(null);
  // 设置地图中心点，初始为台北101
  const [center, setCenter] = useState({ lat: 22.7319608, lng: 120.3493329 });

  // 标记列表
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    if (data) {
      let tmpMarkers = data
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

  // 活动标记
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  // 监听 userLocation 的变化，更新地图中心点
  useEffect(() => {
    if (userLocation) {
      setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
    }
  }, [userLocation]);

  // 使用 useNavigate 进行页面跳转
  const navigate = useNavigate();

  // 加载状态
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
                key={id}
                position={position}
                onClick={() => {
                  handleActiveMarker(id);
                  // 点击标记后跳转到对应的商家页面
                  navigate(`/store/${id}`);
                }}
              >
                {activeMarker === id ? (
                  <InfoWindowF
                    key={`${id}_info`}
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div>
                      {name}
                      <br />
                      <Link to={`/store/${id}`}>点我至商家页面</Link>
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
