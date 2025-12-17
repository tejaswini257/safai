"use client";

import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function MapPanel({ locations }) {
    const center = locations?.[0]
        ? { lat: locations[0].lat, lng: locations[0].lng }
        : { lat: 21.1458, lng: 79.0882 };

    const colors = {
        Active: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        Inactive: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        default: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 h-[720px] border border-[var(--border-subtle)] flex flex-col">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[var(--navy)]">Washroom Locations</h3>
                    <p className="text-xs text-slate-500">
                        View active, inactive and review locations on the city map
                    </p>
                </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-inner">
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={center}
                        zoom={12}
                    >
                        {(locations || []).map((loc) => (
                            <Marker
                                key={loc.id}
                                position={{ lat: loc.lat, lng: loc.lng }}
                                icon={colors[loc.status] || colors.default}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}
