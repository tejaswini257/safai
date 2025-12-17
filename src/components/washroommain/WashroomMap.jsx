"use client";

import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function WashroomMap() {
    const locations = [
        { lat: 21.1458, lng: 79.0882 },
        { lat: 21.155, lng: 79.095 },
        { lat: 21.16, lng: 79.082 },
    ];

    return (
        <div className="h-[320px] w-full rounded-xl overflow-hidden">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    center={{ lat: 21.1458, lng: 79.0882 }}
                    zoom={12}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                    {locations.map((l, i) => (
                        <Marker key={i} position={l} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

