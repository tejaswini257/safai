export default function LocationImagesUpload() {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Location Images</h2>

            <div className="border-2 border-dashed border-gray-400 rounded-xl p-8 text-center hover:bg-gray-50 transition">
                <p className="text-gray-500 mb-3">Drag or Drop images here</p>

                <button className="px-4 py-2 bg-[var(--navy)] hover:bg-slate-800 text-white rounded-lg transition">
                    Choose Images
                </button>
            </div>
        </div>
    );
}
