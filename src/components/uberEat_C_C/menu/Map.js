import React, { useEffect, useState } from 'react'
//  on local host we have to use MarkerF, and for online hosting use Marker.. this conflict is because of a react update.
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import GetUserLocation from './GetUserLocation';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/***
 * 地圖
***/
function Map({data}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "",
    })

    // const variable array to save the users location
    const [userLocation, setUserLocation] = useState(null);
    // 設置地圖中心點，init為台北101
    const [center, setCenter] = useState({lat: 22.7319608, lng: 120.3493329})

    // markers
    const [markers, setMarkers] = useState([]);
    useEffect(()=>{
      if(data){
        let tmpMarkers = data.map((e)=>{
          return({
            "id": e.sid,
            "name": e.name,
            "position": {lat:e.lat, lng:e.lng }
          })
        })
        setMarkers(tmpMarkers)
      }
    },[data])
    

    // activeMarker
    const [activeMarker, setActiveMarker] = useState(null);
    const handleActiveMarker = (marker, name) => {
      setActiveMarker(marker);
      if (marker === activeMarker) {
        return ;
      }else{
        return null
      }
    };


    // useEffect監聽userLcaotion若有更新就會re-render map
    useEffect(()=>{
      if(userLocation){
        setCenter({lat: userLocation.latitude, lng: userLocation.longitude})
      }
    },[userLocation])

    // onload
    if(!isLoaded) return <div>Loading...</div>

    
  return (
    <Container fluid>
      <div className='map-outside-div'>
        <div className='map-div'>
          <GetUserLocation userLocation={userLocation} setUserLocation={setUserLocation}/>
          <GoogleMap zoom={15} center={center} onClick={() => setActiveMarker(null)} mapContainerClassName='map-container'>
              {markers.map(({id, name, position})=>{
                return (
                  <MarkerF key={id} position={position} onClick={() => handleActiveMarker(id, name)}>
                    {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        {name}
                        <br />
                        <Link to={`/store/${id}`}>點我至商家頁面</Link>  
                      </div>
                    </InfoWindowF>
                    ) : null}
                  </MarkerF>
                )
              })}
          </GoogleMap>
        </div>
      </div>
    </Container>
  )
}
export default Map
