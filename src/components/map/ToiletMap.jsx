// src/components/map/ToiletMap.jsx
"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 
  NOTE:
  - all window/browser side effects are performed inside useEffect 
  - this prevents "window is not defined" on server
*/

function createColoredIcon(color) {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="
      background:${color};
      width:26px;
      height:26px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:50%;
      box-shadow:0 1px 4px rgba(0,0,0,0.25);
      border: 2px solid white;
    "></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });
}

const STATUS_COLOR = {
  clean: "#16a34a",
  needs_cleaning: "#f59e0b",
  urgent: "#ef4444",
  offline: "#6b7280",
};

const ToiletMap = forwardRef(function ToiletMap({ center = [21.1458, 79.0882], zoom = 13, locations = [], users = [] }, ref) {
  const mapRef = useRef(null);

  useEffect(() => {
    // This runs only in browser
    // Fix default icon references (only if you used default icons elsewhere)
    try {
      // Some setups require clearing icon URLs to prevent 404 console errors
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: undefined,
        iconUrl: undefined,
        shadowUrl: undefined,
      });
    } catch (err) {
      // swallow - only necessary in browser
      // console.warn("leaflet icon patch failed", err);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    panToLocation(locationId) {
      const loc = locations.find((l) => l.id === locationId);
      if (!loc || !mapRef.current) return;
      const map = mapRef.current;
      map.setView([loc.lat, loc.lng], 16, { animate: true });
    },
  }));

  return (
    <div className="w-full h-full rounded-md overflow-hidden shadow-sm">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "72vh", width: "100%" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((t) => {
          const color = STATUS_COLOR[t.status] || "#16a34a";
          const icon = createColoredIcon(color);
          return (
            <Marker key={`loc-${t.id}`} position={[t.lat, t.lng]} icon={icon}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-600">{t.ward || t.address}</div>
                  {t.status && (
                    <div className="text-xs mt-1">
                      <strong>Status:</strong> <span style={{ color }}>{t.status.replace("_", " ")}</span>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {users.map((u) => {
          const userIcon = L.divIcon({
            className: "user-dot",
            html: `<div style="
              background:#3b82f6;
              width:14px;
              height:14px;
              border-radius:50%;
              border:2px solid white;
              box-shadow:0 1px 3px rgba(0,0,0,0.2);
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });
          return <Marker key={`u-${u.id}`} position={[u.lat, u.lng]} icon={userIcon} />;
        })}
      </MapContainer>
    </div>
  );
});

export default ToiletMap;
