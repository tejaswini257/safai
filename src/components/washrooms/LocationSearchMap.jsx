"use client";

import { useState } from "react";
import {
    GoogleMap,
    Marker,
    Autocomplete,
    useJsApiLoader,
} from "@react-google-maps/api";

const libraries = ["places"];

export default function LocationSearchMap() {
    const [autocomplete, setAutocomplete] = useState(null);
    const [lat, setLat] = useState(19.0760); // default: Mumbai
    const [lng, setLng] = useState(72.8777);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const hasGoogle =
        typeof window !== "undefined" &&
        typeof window.google !== "undefined" &&
        typeof window.google.maps !== "undefined";

    const handlePlaceChanged = () => {
        if (!autocomplete) return;

        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setLat(newLat);
        setLng(newLng);
    };

    if (loadError) {
        return (
            <div className="bg-white shadow-md rounded-xl p-6 text-red-600">
                Failed to load map.
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="bg-white shadow-md rounded-xl p-6">
                <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100 mb-3" />
                <div className="h-64 w-full animate-pulse rounded-xl bg-slate-100" />
            </div>
        );
    }

    if (!hasGoogle) {
        return (
            <div className="bg-white shadow-md rounded-xl p-6 space-y-3">
                <h2 className="text-xl font-semibold text-gray-700">Search Location</h2>
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    Maps could not load (billing or API key issue). Please enable billing for the Google Maps
                    JavaScript API and ensure <code className="font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is set.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="input-ui"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(Number(e.target.value))}
                    />
                    <input
                        className="input-ui"
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(Number(e.target.value))}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">
                Search Location
            </h2>

            {/* GOOGLE AUTOCOMPLETE */}
            <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
                <input
                    className="input-ui mb-3"
                    placeholder="Search for a place…"
                    type="text"
                />
            </Autocomplete>

            {/* MAP PREVIEW */}
            <div className="w-full h-64 rounded-xl overflow-hidden border shadow-inner mb-3">
                <GoogleMap
                    center={{ lat, lng }}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                    <Marker position={{ lat, lng }} />
                </GoogleMap>
            </div>

            {/* LAT / LNG INPUTS */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                    className="input-ui"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(Number(e.target.value))}
                />

                <input
                    className="input-ui"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(Number(e.target.value))}
                />
            </div>
        </div>
    );
}
