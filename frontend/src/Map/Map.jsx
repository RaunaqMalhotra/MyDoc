import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"];

const Map = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [markers, setMarkers] = useState([]);
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries,
    });
    
    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
        });
    }}, []);
    
    useEffect(() => {
        if (currentLocation) {
            const request = {
                location: currentLocation,
                radius: '5000',
                type: ['hospital'],
                keyword: "infection"
            };
            
            const service = new window.google.maps.places.PlacesService(mapRef.current);
            
            service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setHospitals(results);
                }
            });
        }
    }, [currentLocation]);
    
    const onMarkerClick = (marker) => {
        const selectedHospital = hospitals.find((hospital) => (
            hospital.geometry.location.lat() === marker.lat && hospital.geometry.location.lng() === marker.lng
            ));
            setSelectedHospital(selectedHospital);
        };
        
    useEffect(() => {
        if (hospitals.length > 0) {
            const newMarkers = hospitals.map((hospital) => ({
                lat: hospital.geometry.location.lat(),
                lng: hospital.geometry.location.lng(),
                name: hospital.name
            }));
            setMarkers(newMarkers);
        }
    }, [hospitals]);
        
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    
    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const currentLocationIcon = {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new window.google.maps.Size(32, 32),
    };
        
        return (
        
        <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100%" }}
            zoom={13}
            center={currentLocation}
            options={options}
            onLoad={onMapLoad}
        >
            
            {currentLocation && (
            <Marker
            position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
            icon={currentLocationIcon}/>
            )}
            
            {markers.map((marker) => (
            <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            onClick={() => onMarkerClick(marker)}/>
            ))}
            
            {markers.map((marker) => (
            <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            onClick={() => onMarkerClick(marker)}
            />
            ))}
            
            {selectedHospital && (
            <InfoWindow
            position={{ 
                lat: selectedHospital.geometry.location.lat(), 
                lng: selectedHospital.geometry.location.lng() 
            }}
            
            onCloseClick={() => setSelectedHospital(null)}>
                <div>
                    <h2>{selectedHospital.name}</h2>
                    <p>{selectedHospital.vicinity}</p>
                </div>
            </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map; 