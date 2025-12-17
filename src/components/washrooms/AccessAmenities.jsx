export default function AccessAmenities() {
    const items = ["24/7 Availability", "Hand Dryer Available", "Family Room"];

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Access & Amenities</h2>

            <div className="space-y-3">
                {items.map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="checkbox-ui" />
                        <span className="text-gray-700">{item}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
