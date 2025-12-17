import WashroomRow from "./WashroomRow";

export default function WashroomTable({ items }) {
    const rows = items ?? [];
    return (
        <div className="bg-white rounded-2xl shadow overflow-x-auto overflow-y-auto max-h-[420px]">
            <table className="min-w-[1200px] w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 sticky top-0 z-10">
                    <tr>
                        <th className="px-5 py-4 text-left">Sr No</th>
                        <th className="px-5 py-4 text-left">Washroom Name</th>
                        <th className="px-5 py-4 text-left">Zone</th>
                        <th className="px-5 py-4 text-left">Current Score</th>
                        <th className="px-5 py-4 text-left">Average Rating</th>
                        <th className="px-5 py-4 text-left">Cleaner</th>
                        <th className="px-5 py-4 text-left">Facility</th>
                        <th className="px-5 py-4 text-left">Status</th>
                        <th className="px-5 py-4 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((washroom, index) => (
                        <WashroomRow
                            key={washroom.id}
                            index={index + 1}
                            washroom={washroom}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
