export default function MapsCategory() {
    return (
        <div className="bg-white shadow-md hover:shadow-lg rounded-xl p-6 transition">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Maps & Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Men's Facilities */}
                <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50">
                    <h3 className="font-semibold text-indigo-700 mb-3">Men’s Facilities</h3>

                    <div className="grid grid-cols-2 gap-3">
                        <input className="input-ui" placeholder="WC" />
                        <input className="input-ui" placeholder="Urinals" />
                        <input className="input-ui" placeholder="Latrines" />
                        <input className="input-ui" placeholder="Showers" />
                    </div>
                </div>

                {/* Women Facilities */}
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                    <h3 className="font-semibold text-amber-700 mb-3">Women & All Gender</h3>

                    <div className="grid grid-cols-2 gap-3">
                        <input className="input-ui" placeholder="WC" />
                        <input className="input-ui" placeholder="Urinals" />
                        <input className="input-ui" placeholder="Latrines" />
                        <input className="input-ui" placeholder="Showers" />
                    </div>
                </div>

            </div>
        </div>
    );
}

