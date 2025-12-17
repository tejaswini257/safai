import WashroomDetailsForm from "./WashroomDetailsForm";
import LocationInfoSection from "./LocationInfoSection";
import UsageCategory from "./UsageCategory";
import AccessAmenities from "./AccessAmenities";
import AdditionalFeatures from "./AdditionalFeatures";
import LocationImagesUpload from "./LocationImagesUpload";
import AssignCleaners from "./AssignCleaners";
import LocationSearchMap from "./LocationSearchMap";

export default function AddWashroomForm() {
    const handleSubmit = () => {
        // TODO: replace with real submit integration
        console.log("Create Location clicked");
        alert("Location submitted (demo). Hook up API integration to save.");
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Title Section */}
            <div className="w-full rounded-2xl bg-gradient-to-r from-[#0B1220] to-[#111827] px-6 py-5 text-white shadow-md">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Washroom Locations
                        </h1>
                        <p className="mt-1 text-sm text-gray-300">
                            Overview of location details, cleaner assignments, and facility ratings
                        </p>
                    </div>
                    <div className="flex items-center gap-3">

                    </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-100">

                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4 flex flex-wrap items-center gap-3">
                <input className="input-ui w-64" placeholder="Search washrooms..." />
                <select className="filter-select w-40">
                    <option>All Types</option>
                </select>
                <select className="filter-select w-48">
                    <option>All Facility Companies</option>
                </select>
                <select className="filter-select w-36">
                    <option>All Ratings</option>
                </select>
                <button className="filter-btn">Clear</button>
                <div className="ml-auto flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg bg-[var(--navy)] text-white text-sm">All</button>
                    <button className="px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-sm">Assigned</button>
                    <button className="px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-sm">Unassigned</button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <UsageCategory />

                    <div className="section-card">
                        <h3 className="text-lg font-semibold text-[var(--navy)] mb-4">Men’s Availability</h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 text-sm text-slate-700">
                                <input type="checkbox" className="checkbox-ui" />
                                <span>Central Park, W1702035</span>
                            </label>
                            <label className="flex items-center gap-3 text-sm text-slate-700">
                                <input type="checkbox" className="checkbox-ui" />
                                <span>Family Room</span>
                            </label>
                        </div>
                        <div className="mt-4">
                            <label className="label">Additional Notes</label>
                            <textarea className="textarea-ui" placeholder="Enter notes" />
                        </div>
                    </div>

                    <AccessAmenities />

                    <AdditionalFeatures />
                </div>

                <div className="space-y-6">
                    <LocationSearchMap />

                    <LocationInfoSection />

                    <div className="grid grid-cols-1 gap-6">
                        <LocationImagesUpload />
                        <AssignCleaners />
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4">
                <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition font-medium">
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-[var(--navy)] hover:bg-slate-800 text-white rounded-xl shadow-md font-semibold transition"
                >
                    + Create Location
                </button>
            </div>
        </div>
    );
}
