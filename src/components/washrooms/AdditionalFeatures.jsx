export default function AdditionalFeatures() {
    const features = [
        "All Gender Only",
        "Baby Changing Station Available",
        "Sanitary Products Available",
    ];

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Additional Features</h2>

            <div className="space-y-3">
                {features.map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="checkbox-ui" />
                        <span className="text-gray-700">{item}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
