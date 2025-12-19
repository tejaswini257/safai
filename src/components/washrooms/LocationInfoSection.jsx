export default function LocationInfoSection() {
    return (
        <div className="section-card">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Location Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="label">State</label>
                    <select className="input-ui">
                        <option>Select or type state</option>
                    </select>
                </div>

                <div>
                    <label className="label">City</label>
                    <select className="input-ui">
                        <option>Select or type city</option>
                    </select>
                </div>

                <div>
                    <label className="label">District</label>
                    <input className="input-ui" placeholder="Enter district name" />
                </div>

                <div>
                    <label className="label">Pincode</label>
                    <input className="input-ui" placeholder="Enter 6-digit pincode" />
                </div>

                <div className="col-span-2">
                    <label className="label">Full Address</label>
                    <textarea className="input-ui h-28 resize-none" placeholder="Enter complete address"></textarea>
                </div>

            </div>
        </div>
    );
}
