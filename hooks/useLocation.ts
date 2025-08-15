import { useState, useEffect } from 'react';
import { type Coords } from '../types';

export const useLocation = () => {
    const [userCoords, setUserCoords] = useState<Coords | null>(null);
    const [locationInput, setLocationInput] = useState('');
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);

    useEffect(() => {
        // Proactively detect location on app load
        handleDetectLocation();
    }, []);

    const handleLocationInputChange = (value: string) => {
        setLocationInput(value);
        if(value.toLowerCase() !== 'locația mea curentă') {
            setUserCoords(null);
        }
    }
  
    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            setIsDetectingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const coords = { latitude, longitude };
                    setUserCoords(coords);
                    setLocationInput('Locația mea curentă');
                    setIsDetectingLocation(false);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Don't clear userCoords if they were already set
                    // and just clear the input field if it was set to the auto-detect value
                    if(locationInput.toLowerCase() === 'locația mea curentă') {
                         setLocationInput('');
                    }
                    setIsDetectingLocation(false);
                }
            );
        } else {
            console.warn('Geolocalizarea nu este suportată de acest browser.');
            setIsDetectingLocation(false);
        }
    };

    return {
        userCoords,
        locationInput,
        isDetectingLocation,
        handleLocationInputChange,
        handleDetectLocation
    };
};
