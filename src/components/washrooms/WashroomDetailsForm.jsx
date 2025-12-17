export default function WashroomDetailsForm() {
    return (
        <div className="section-card">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Washroom Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="label">Washroom Name*</label>
                    <input className="input-ui" placeholder="Enter washroom name" />
                </div>

                <div>
                    <label className="label">Location (Nearby)</label>
                    <input className="input-ui" placeholder="Enter nearby landmark" />
                </div>

                <div>
                    <label className="label">Facility Company</label>
                    <input className="input-ui" placeholder="Enter facility company" />
                </div>

                <div>
                    <label className="label">Number of Photos</label>
                    <input className="input-ui" type="number" placeholder="0" />
                </div>

            </div>
        </div>
    );
}

