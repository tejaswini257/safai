"use client";

import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { MapPin, Users, Heart, Camera, Plus, Upload, Ruler, FileText, UserPlus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// --- State and Handlers ---

// Utility to get initial form data
const getInitialFormData = () => ({
    name: '',
    locationHierarchy: 'Select a location hierarchy',
    facilityCompany: '',
    numPhotos: 0,
    wcMen: 0, wcIndianMen: 0, wcUrinalsMen: 0, wcShowerMen: 0, wcBasinMen: 0,
    wcWomen: 0, wcIndianWomen: 0, wcUrinalsWomen: 0, wcShowerWomen: 0, wcBasinWomen: 0,
    lat: '',
    lng: '',
    state: 'Select or type state',
    city: 'Select or type city',
    district: '',
    pincode: '',
    fullAddress: '',
    // Access
    availableGender: { male: false, female: false, unisex: false, familyRoom: false, childrenOnly: false },
    availability24x7: false,
    handDryer: false,
    // Additional Features
    paidEntry: false,
    wheelchairAccessible: false,
    disabledOnly: false,
    babyChanging: false,
    sanitaryProducts: false,
    // Cleaners
    selectedCleaners: [], // Array of cleaner IDs/objects
});

// Mock data for cleaners
const MOCK_CLEANERS_COUNT = 12;

// Setup leaflet default icon using CDN image URLs (avoids bundling assets)
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function MapClickHandler({ onClick }) {
    useMapEvents({
        click(e) {
            onClick(e.latlng);
        }
    });
    return null;
}

// --- Inline Styles (based on provided screenshots) ---
const styles = {
    container: { padding: '28px', backgroundColor: '#f6f9fc', minHeight: '100vh' },
    wrapper: { maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 20px' },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
        marginBottom: '20px',
    },
    header: { background: 'linear-gradient(90deg,#2563eb,#1e40af)', color: '#fff', padding: '32px', borderRadius: '12px', marginBottom: '22px', display: 'flex', flexDirection: 'column', gap: 8 },
    title: { margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#fff' },
    subtitle: { opacity: 0.95, fontSize: '0.95rem', color: 'rgba(255,255,255,0.95)' },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#0f172a'
    },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', },
    formGroup: { marginBottom: '16px', },
    label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' },
    input: { width: '100%', padding: '12px 16px', border: '1px solid #e6eef5', borderRadius: '12px', fontSize: '1rem', background: '#fff', boxShadow: 'inset 0 1px 2px rgba(2,6,23,0.03)' },
    select: { width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', appearance: 'none' },
    facilityInfo: { fontSize: '0.875rem', color: '#ef4444', marginTop: '10px', },

    // WC/Facility Specific Styles
    wcCard: { padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
    menCard: { backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', },
    womenCard: { backgroundColor: '#fff0f6', borderLeft: '4px solid #ec4899', },
    wcLabel: { fontSize: '1rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' },

    // Toggle/Checkbox Styles
    toggleItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e5e7eb' },
    toggleLabel: { fontSize: '1rem', fontWeight: '500', color: '#1e293b' },
    toggleSubtitle: { fontSize: '0.8rem', color: '#64748b' },

    // Map/Location Styles
    mapContainer: { width: '100%', height: '360px', backgroundColor: '#e5e7eb', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', border: '1px solid #cbd5e1', position: 'relative' },
    searchMapInput: { width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '10px' },
    mapToggleBtn: { padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: '#fff', fontSize: '0.875rem' },
    mapActiveBtn: { backgroundColor: '#3b82f6', color: '#fff', border: '1px solid #3b82f6' },

    // Image Upload Styles
    imageUploadBox: { border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', marginBottom: '20px' },
    uploadBtn: { backgroundColor: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '15px' },

    // Cleaner Assignment Styles
    cleanerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    cleanerCount: { backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '999px', fontWeight: '600', fontSize: '0.875rem' },
    cleanerSelector: { border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', cursor: 'pointer' },

    // Footer/Action Buttons
    footerActions: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' },
    cancelBtn: { backgroundColor: '#fff', color: '#475569', padding: '12px 24px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: '600', cursor: 'pointer' },
    createBtn: { backgroundColor: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    // Section icon badges
    sectionIconWrap: { display: 'inline-flex', alignItems: 'center', gap: 12 },
    sectionIconCircle: { width: 40, height: 40, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#eef2ff', color: '#2563eb' },
    sectionIconCirclePink: { width: 40, height: 40, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#fff0f6', color: '#ec4899' },
};

// Component for the Checkbox Grid
const CheckboxGrid = ({ label, name, options, state, onChange }) => (
    <div style={{ ...styles.formGroup, gridColumn: 'span 1' }}>
        <label style={{ ...styles.label, color: label.includes('*') ? '#ef4444' : styles.label.color }}>{label}</label>
        <div style={styles.formGrid}>
            {options.map((option) => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px' }}>
                    <input
                        type="checkbox"
                        name={name}
                        value={option}
                        checked={state[option.replace(/\s|-|\//g, '').toLowerCase()]}
                        onChange={onChange}
                        style={{ marginRight: '8px' }}
                    />
                    {option}
                </label>
            ))}
        </div>
    </div>
);


export default function AddWashroomPage() {
    const [formData, setFormData] = useState(getInitialFormData());
    // NOTE: The useRef for mapInstance is kept here, but the useEffect logic for cleanup is updated.
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        // Attempt to access the map instance for cleanup (if needed in a real app)
        // In the context of react-leaflet using MapContainer, manual removal is often unnecessary
        // but keeping the cleanup function as a safeguard if MapContainer is not fully unmounting.
        return () => {
            // No explicit map destruction is necessary for MapContainer in modern react-leaflet unless using uncontrolled mode.
            // Keeping this return empty or for other unmount logic is safer.
        };
    }, []);

    const [mapView, setMapView] = useState('Map'); // State for Map/Satellite toggle

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle the ToggleSwitch (which uses type="checkbox")
        if (name === 'availability24x7' || name === 'handDryer' || name === 'paidEntry' || name === 'wheelchairAccessible' || name === 'disabledOnly' || name === 'babyChanging' || name === 'sanitaryProducts') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        }
        // Handle the CheckboxGrid (where all options are in 'availableGender')
        else if (type === 'checkbox') {
            const key = value.replace(/\s|-|\//g, '').toLowerCase(); // Use value directly for naming convention
            setFormData(prev => ({
                ...prev,
                availableGender: { ...prev.availableGender, [key]: checked }
            }));
        }
        // Handle all other input types (text, number, select)
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Final Form Data:', formData);
        alert('Creating Location...');
    };

    // --- Helper for Toggle Switches (using the built-in checkbox type='range' mock for toggles) ---
    const ToggleSwitch = ({ name, isChecked, label, subtitle }) => (
        <div style={styles.toggleItem}>
            <div>
                <div style={styles.toggleLabel}>{label}</div>
                <div style={styles.toggleSubtitle}>{subtitle}</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                <input
                    type="checkbox" // Changed to checkbox for standard HTML input behavior
                    name={name}
                    checked={isChecked}
                    onChange={handleChange}
                    style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: isChecked ? '#10b981' : '#ccc', transition: '0.4s', borderRadius: '20px'
                }}></span>
                <span style={{
                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '2px', bottom: '2px',
                    backgroundColor: 'white', transition: '0.4s', borderRadius: '50%',
                    transform: isChecked ? 'translateX(20px)' : 'translateX(0)'
                }}></span>
            </label>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Add New Washroom</h1>
                    <p style={styles.subtitle}>Create a washroom and optionally assign cleaners</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* 1. Washroom Information Card */}
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}><span style={styles.sectionIconCircle}><MapPin size={18} /></span> Washroom Information</h2>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Washroom Name <span style={{ color: '#ef4444' }}>*</span></label>
                                <input type="text" style={styles.input} placeholder="Enter location name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Location Hierarchy</label>
                                <select style={styles.select} name="locationHierarchy" value={formData.locationHierarchy} onChange={handleChange}>
                                    <option>Select a location hierarchy</option>
                                    {/* Mock options */}
                                    <option>Zone A</option>
                                    <option>Zone B</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Facility Company (Optional)</label>
                                <input type="text" style={styles.input} placeholder="-- No Facility Company --" disabled value={formData.facilityCompany} />
                                <p style={styles.facilityInfo}>No facility companies available. Add one from the Facility Companies section.</p>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Number of Photos</label>
                                <input type="number" style={styles.input} placeholder="Enter number of photos" name="numPhotos" value={formData.numPhotos} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* 2. Usage Category Card */}
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}><span style={styles.sectionIconCircle}><Ruler size={18} /></span> Usage Category</h2>

                        <div style={styles.formGrid}>
                            {/* Men's Facilities */}
                            <div style={{ ...styles.wcCard, ...styles.menCard }}>
                                <h3 style={styles.wcLabel}>&#x2642; Men's Facilities</h3>
                                <div style={styles.formGrid}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>WC</label>
                                        <input type="number" style={styles.input} name="wcMen" value={formData.wcMen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Indian</label>
                                        <input type="number" style={styles.input} name="wcIndianMen" value={formData.wcIndianMen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Urinals</label>
                                        <input type="number" style={styles.input} name="wcUrinalsMen" value={formData.wcUrinalsMen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Shower</label>
                                        <input type="number" style={styles.input} name="wcShowerMen" value={formData.wcShowerMen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Basin</label>
                                        <input type="number" style={styles.input} name="wcBasinMen" value={formData.wcBasinMen} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Women's Facilities */}
                            <div style={{ ...styles.wcCard, ...styles.womenCard }}>
                                <h3 style={styles.wcLabel}>&#x2640; Women's Facilities</h3>
                                <div style={styles.formGrid}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>WC</label>
                                        <input type="number" style={styles.input} name="wcWomen" value={formData.wcWomen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Indian</label>
                                        <input type="number" style={styles.input} name="wcIndianWomen" value={formData.wcIndianWomen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Urinals</label> {/* Kept as per screenshot, though unusual for women's section */}
                                        <input type="number" style={styles.input} name="wcUrinalsWomen" value={formData.wcUrinalsWomen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Shower</label>
                                        <input type="number" style={styles.input} name="wcShowerWomen" value={formData.wcShowerWomen} onChange={handleChange} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Basin</label>
                                        <input type="number" style={styles.input} name="wcBasinWomen" value={formData.wcBasinWomen} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Access & Amenities Toggles (Combined from various small cards) */}
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}><span style={styles.sectionIconCircle}><FileText size={18} /></span> Access & Amenities</h2>

                        <ToggleSwitch
                            name="availability24x7"
                            isChecked={formData.availability24x7}
                            label="24/7 Availability"
                            subtitle="Access"
                        />
                        <ToggleSwitch
                            name="handDryer"
                            isChecked={formData.handDryer}
                            label="Hand Dryer Available"
                            subtitle="Amenities"
                        />

                        <div style={{ marginTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                            <CheckboxGrid
                                label="Available for Gender *"
                                name="availableGender"
                                options={['Male', 'Female', 'Unisex/All Genders', 'Family Room', 'Children Only']}
                                state={formData.availableGender}
                                onChange={handleChange}
                            />
                        </div>

                        <h3 style={{ ...styles.sectionTitle, fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px' }}>Additional Features</h3>
                        <ToggleSwitch name="paidEntry" isChecked={formData.paidEntry} label="Paid Entry Required" subtitle="Access" />
                        <ToggleSwitch name="wheelchairAccessible" isChecked={formData.wheelchairAccessible} label="Wheelchair Accessible" subtitle="Accessibility" />
                        <ToggleSwitch name="disabledOnly" isChecked={formData.disabledOnly} label="Strictly for Disabled Users Only" subtitle="Accessibility" />
                        <ToggleSwitch name="babyChanging" isChecked={formData.babyChanging} label="Baby Changing Station Available" subtitle="Family Features" />
                        <ToggleSwitch name="sanitaryProducts" isChecked={formData.sanitaryProducts} label="Sanitary Products Available" subtitle="Amenities" />
                    </div>

                    {/* 4. Location Coordinates & Address Card */}
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}><span style={styles.sectionIconCircle}><MapPin size={18} /></span> Location Coordinates</h2>

                        {/* Search Location Input */}
                        <label style={styles.label}>Search Location</label>
                        <input type="text" style={styles.searchMapInput} placeholder="Search for a place" />

                        {/* Interactive Map */}
                        <div style={styles.mapContainer}>
                            {/* Leaflet CSS from CDN (move to global layout if preferred) */}
                            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

                            <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '8px', zIndex: 600 }}>
                                <button type="button" onClick={() => setMapView('Map')} style={{ ...styles.mapToggleBtn, ...(mapView === 'Map' && styles.mapActiveBtn) }}>Map</button>
                                <button type="button" onClick={() => setMapView('Satellite')} style={{ ...styles.mapToggleBtn, ...(mapView === 'Satellite' && styles.mapActiveBtn) }}>Satellite</button>
                            </div>

                            <MapContainer
                                center={
                                    formData.lat && formData.lng
                                        ? [parseFloat(formData.lat), parseFloat(formData.lng)]
                                        : [19.0760, 72.8777]
                                }
                                zoom={14}
                                style={{ width: "100%", height: "100%" }}
                                ref={mapInstanceRef} // Use a more appropriate ref for the map instance
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url={mapView === 'Map' ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
                                    maxZoom={19}
                                />

                                <MapClickHandler onClick={(latlng) => setFormData(prev => ({ ...prev, lat: String(latlng.lat), lng: String(latlng.lng) }))} />

                                {formData.lat && formData.lng && (
                                    <Marker position={[parseFloat(formData.lat), parseFloat(formData.lng)]} icon={DefaultIcon} />
                                )}
                            </MapContainer>
                        </div>

                        {/* Coordinates */}
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Latitude</label>
                                <input type="text" style={styles.input} placeholder="Enter latitude" name="lat" value={formData.lat} onChange={handleChange} />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Longitude</label>
                                <input type="text" style={styles.input} placeholder="Enter longitude" name="lng" value={formData.lng} onChange={handleChange} />
                            </div>
                        </div>

                        {/* State, City, District, Pincode */}
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>State</label>
                                <select style={styles.select} name="state" value={formData.state} onChange={handleChange}>
                                    <option>Select or type state</option>
                                    <option>Maharashtra</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>City</label>
                                <select style={styles.select} name="city" value={formData.city} onChange={handleChange}>
                                    <option>Select or type city</option>
                                    <option>Nagpur</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>District</label>
                                <input type="text" style={styles.input} placeholder="Enter district name" name="district" value={formData.district} onChange={handleChange} />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Pincode</label>
                                <input type="text" style={styles.input} placeholder="Enter 6-digit pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div style={{ ...styles.formGroup, gridColumn: 'span 2' }}>
                            <label style={styles.label}>Full Address</label>
                            <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }} placeholder="Enter complete address" name="fullAddress" value={formData.fullAddress} onChange={handleChange} />
                        </div>
                    </div>

                    {/* 5. Location Images Upload Card */}
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}><span style={styles.sectionIconCircle}><Camera size={18} /></span> Location Images</h2>

                        <div style={styles.imageUploadBox}>
                            <Upload size={40} style={{ color: '#94a3b8' }} />
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Select multiple images (max 2MB each)</p>
                            <button type="button" style={styles.uploadBtn}>
                                <Plus size={16} /> Choose Images
                            </button>
                        </div>
                    </div>

                    {/* 6. Assign Cleaners Card (Optional) */}
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}><span style={styles.sectionIconCircle}><UserPlus size={18} /></span> Assign Cleaners (Optional)</h2>

                        <div style={styles.cleanerHeader}>
                            <div style={{ color: '#1e293b' }}>Select Cleaners ({formData.selectedCleaners.length} selected)</div>
                            <div style={styles.cleanerCount}>{MOCK_CLEANERS_COUNT} cleaners available</div>
                        </div>

                        <div style={styles.cleanerSelector}>
                            <UserPlus size={20} style={{ color: '#475569', marginRight: '8px' }} />
                            Click to select cleaners...
                            <span style={{ fontSize: '1.2rem' }}>&#x2304;</span> {/* Down arrow icon */}
                        </div>
                    </div>

                    {/* Footer Action Buttons */}
                    <div style={styles.footerActions}>
                        <button type="button" style={styles.cancelBtn}>Cancel</button>
                        <button type="submit" style={styles.createBtn}>
                            <Plus size={16} /> Create Location
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}