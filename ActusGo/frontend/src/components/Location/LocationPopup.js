import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const defaultLocation = {
    lon: 36.6,
    lat: 31.4,
};
const initialMapState = {
    longitude: defaultLocation.lon,
    latitude: defaultLocation.lat,
};

const LocationPopup = ({ onAllow, setPopupVisible }) => {
    const [userLocation, setUserLocation] = useState(null);
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const userMarkerRef = useRef(null);
    const watchIdRef = useRef(null);

    useEffect(() => {
        const mapInstance = tt.map({
            key: "D3lMaI5Ss7PAi0jffJ9WfK3aP2nGorJO",
            container: mapContainerRef.current,
            center: [initialMapState.longitude, initialMapState.latitude],
            zoom: 2
        });
        mapInstanceRef.current = mapInstance; 

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const startWatchingLocation = () => {
            if (navigator.geolocation) {
                const watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const userCoords = {
                            lon: position.coords.longitude,
                            lat: position.coords.latitude,
                        };
                        setUserLocation(userCoords); 
                        mapInstanceRef.current.setCenter([userCoords.lon, userCoords.lat]);
                        mapInstanceRef.current.setZoom(15);

                        // if (userMarkerRef.current) {
                        //     userMarkerRef.current.setLngLat([userCoords.lon, userCoords.lat]);
                        // } else {
                        //     userMarkerRef.current = new tt.Marker().setLngLat([userCoords.lon, userCoords.lat]).addTo(mapInstanceRef.current);
                        // }
                    },
                    (error) => {
                        console.error("Error obtaining location", error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                    }
                );
                watchIdRef.current = watchId;
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        startWatchingLocation();

        return () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);
    const handleClickAllow = () => {
        const center = mapInstanceRef.current.getCenter();
        const centerLocation = { latitude: center.lat, longitude: center.lng };
        onAllow(centerLocation);
        setPopupVisible(false); // Close the popup after allowing the location
    };
    
    return (
        <div className="absolute top-1/3 left-[5%] bg-white rounded-3xl text-black text-center overflow-hidden mx-auto w-[300px] h-[450px] z-[10]">
            <div ref={mapContainerRef} className="w-full h-[200px] mb-2"></div>
            <h1 className="font-bold mb-4 px-2">Allow Your Location?</h1>
            <p className="text-sm px-5 mb-4 text-gray-500">We want to know your location in order to share relevant realtime public transit updates and alerts</p>
            <div className="mb-4">
                <button onClick={handleClickAllow} className="LocationBtn bg-black text-[#efff55] font-bold px-4 py-2 rounded-lg mr-2 w-[80%]">Allow Location</button>
            </div>
            <div className="mb-4">
                <button onClick={() => setPopupVisible(false)} className="border-black border-[1px] text-black px-4 py-2 rounded-lg w-[80%]">Maybe Later</button>
            </div>
        </div>
    );
};

export default LocationPopup;
