export default function AssignCleaners() {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Assign Cleaners (Optional)</h2>

            <select className="input-ui mb-4">
                <option>Select Cleaners</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
                <div className="h-36 bg-gray-100 border rounded-xl shadow-inner"></div>
                <div className="h-36 bg-gray-100 border rounded-xl shadow-inner"></div>
            </div>
        </div>
    );
}
