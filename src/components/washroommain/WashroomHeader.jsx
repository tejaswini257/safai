import Link from "next/link";

export default function WashroomHeader() {
    return (
        <div className="header-container--navy flex justify-between items-center shadow">

            {/* Left content */}
            <div>
                <h1 className="h-page">Washroom Locations</h1>
                <p className="h-sub">
                    Overview of location details, cleaner assignments, and facility ratings
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">

                {/* ADD LOCATION */}
                <Link href="/dashboard/washrooms/add-washroom">
                    <button className="btn-primary bg-white text-[var(--navy)] hover:bg-slate-100 hover:text-[var(--navy)]">
                        + Add Location
                    </button>
                </Link>

                {/* ASSIGN */}
                <Link href="/dashboard/cleaner-assignments/add">
                    <button className="btn-primary bg-indigo-600 hover:bg-indigo-700">
                        Assign
                    </button>
                </Link>
            </div>
        </div>
    );
}
