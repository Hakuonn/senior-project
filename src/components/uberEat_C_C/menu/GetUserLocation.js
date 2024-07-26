import React, { useState } from "react";
import { MdGpsFixed } from "react-icons/md";

/**
 * 取得使用者位置，要先允許browser取得使用者位置才可使用
 */
function GetUserLocation({userLocation, setUserLocation}){
    // const variable array to save the users location
    // const [userLocation, setUserLocation] = useState(null);
  
    // define the function that finds the users geolocation
    const getUserLocation = () => {
      // if geolocation is supported by the users browser
      if (navigator.geolocation) {
        // get the current users location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // save the geolocation coordinates in two variables
            const { latitude, longitude } = position.coords;
            // update the value of userlocation variable
            setUserLocation({ latitude, longitude });
          },
          // if there was an error getting the users location
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
      // if geolocation is not supported by the users browser
      else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    return (
      <div className="gps-button-div">
        {/* create a button that is mapped to the function which retrieves the users location */}
        <button onClick={getUserLocation} className="gps-button"><MdGpsFixed/></button>

        {/* if the user location variable has a value, print the users location */}
        {/* {userLocation && (
          <div>
            <h2>User Location</h2>
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
          </div>
        )} */}
      </div>
    );
  }
  
  export default GetUserLocation