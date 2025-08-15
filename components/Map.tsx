import React, { useEffect, useRef } from 'react';
import { GooglePlaceListing as GooglePlaceListingType, Coords } from '../types';

declare var L: any; // Declare L for Leaflet, loaded from index.html

interface MapProps {
    listings: GooglePlaceListingType[];
    selectedListing: GooglePlaceListingType | null;
    userCoords: Coords | null;
    onSelectListing: (id: string | null) => void;
}

const createIcon = (color: string, iconClass: string) => {
    return L.divIcon({
        html: `<svg class="${iconClass}" fill="${color}" stroke-width="1.5" stroke="#ffffff" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        className: 'bg-transparent border-0',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
};

const Map: React.FC<MapProps> = ({ listings, selectedListing, userCoords, onSelectListing }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markers = useRef<any[]>([]);
    const userMarker = useRef<any>(null);

    const defaultIcon = createIcon('#6b7280', 'w-9 h-9 text-gray-500'); // Gray-500
    const selectedIcon = createIcon('#ef4444', 'w-9 h-9 text-brand-primary animate-bounce'); // Red-500 (brand-primary)

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([45.9432, 24.9668], 7); // Center of Romania
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);
        }
    }, []);

    useEffect(() => {
        // Clear existing markers
        markers.current.forEach(marker => mapInstance.current.removeLayer(marker));
        markers.current = [];

        listings.forEach(listing => {
            if (listing.coords) {
                const isSelected = selectedListing?.place_id === listing.place_id;
                const marker = L.marker([listing.coords.latitude, listing.coords.longitude], {
                    icon: isSelected ? selectedIcon : defaultIcon
                }).addTo(mapInstance.current);

                marker.bindPopup(`<b>${listing.name}</b>`);
                marker.on('click', () => onSelectListing(listing.place_id));
                markers.current.push(marker);
            }
        });
        
         // Add or update user marker
        if (userCoords) {
            const userIcon = L.divIcon({
                html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>`,
                className: 'bg-transparent border-0',
                iconSize: [16, 16],
            });
            if (userMarker.current) {
                userMarker.current.setLatLng([userCoords.latitude, userCoords.longitude]);
            } else {
                userMarker.current = L.marker([userCoords.latitude, userCoords.longitude], { icon: userIcon, zIndexOffset: 1000 }).addTo(mapInstance.current);
                userMarker.current.bindPopup("Locația ta curentă");
            }
        }

        if (selectedListing && selectedListing.coords) {
             mapInstance.current.setView([selectedListing.coords.latitude, selectedListing.coords.longitude], 15, { animate: true });
        } else if (listings.length > 0) {
            const listingsWithCoords = listings.filter(l => l.coords);
             if(listingsWithCoords.length > 0) {
                const bounds = L.latLngBounds(listingsWithCoords.map(l => [l.coords!.latitude, l.coords!.longitude]));
                 if (userCoords) {
                    bounds.extend([userCoords.latitude, userCoords.longitude]);
                }
                mapInstance.current.fitBounds(bounds, { padding: [50, 50], animate: true });
             }
        } else if (userCoords) {
            mapInstance.current.setView([userCoords.latitude, userCoords.longitude], 13, { animate: true });
        }

    }, [listings, userCoords]); // Removed selectedListing dependency to avoid re-drawing all markers on selection
    
    useEffect(() => {
        // Update marker icons and pan the map based on selection
        markers.current.forEach(marker => {
            const markerLatLng = marker.getLatLng();
            let isSelected = false;

            // Check if there's a selected listing with coordinates to compare against
            if (selectedListing && selectedListing.coords && markerLatLng) {
                isSelected = markerLatLng.lat === selectedListing.coords.latitude &&
                             markerLatLng.lng === selectedListing.coords.longitude;
            }
            
            marker.setIcon(isSelected ? selectedIcon : defaultIcon);
        });

        if (selectedListing && selectedListing.coords) {
            mapInstance.current.setView([selectedListing.coords.latitude, selectedListing.coords.longitude], 15, { animate: true, pan: { duration: 0.5 } });
            
            const selectedMarker = markers.current.find(m => {
                // The outer `if` guarantees `selectedListing.coords` is not null here.
                const markerLatLng = m.getLatLng();
                 return markerLatLng && markerLatLng.lat === selectedListing.coords.latitude &&
                       markerLatLng.lng === selectedListing.coords.longitude;
            });

            if (selectedMarker) {
                selectedMarker.openPopup();
            }
        }
    }, [selectedListing]);

    return <div ref={mapRef} className="w-full h-full" />;
};

export default Map;
