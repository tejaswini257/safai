import { Eye, Trash2, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CleanerCard({ cleaner }) {
    const router = useRouter();

    const handleView = () => {
        router.push("/dashboard/cleaner-activity");
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center">

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-lg">👤</span>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-800">
                        {cleaner.name}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Phone size={14} /> {cleaner.phone}
                    </p>
                </div>
            </div>

            <div className="text-right space-y-2">
                <p className="text-sm text-slate-400">{cleaner.date}</p>

                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        onClick={handleView}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--navy)] text-white hover:bg-slate-800 transition"
                    >
                        <Eye size={14} /> View
                    </button>

                    <button
                        type="button"
                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
