import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import RatingPopover from "./RatingPopover";
import Link from "next/link";

export default function WashroomRow({ washroom, index }) {
    if (!washroom) return null; // safety check

    return (
        <tr className="border-b hover:bg-gray-50 transition">
            <td className="p-3 text-center">{index}</td>

            <td className="p-3 font-semibold">
                <Link
                    href={`/dashboard/washrooms/${washroom.id}`}
                    className="text-[var(--navy)] hover:underline"
                >
                    {washroom.name}
                </Link>
            </td>

            <td className="p-3">
                {washroom.zone}
            </td>

            <td className="p-3">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm">
                    {washroom.score ?? "-"}
                </span>
            </td>

            <td className="p-3">
                <RatingPopover rating={washroom.rating} />
            </td>

            <td className="p-3">
                {washroom.cleaner}
            </td>

            <td className="p-3">
                {washroom.facility}
            </td>

            <td className="p-3">
                <StatusBadge status={washroom.status} />
            </td>

            <td className="p-3 text-right">
                {/* 🔑 PASS WASHROOM ID HERE */}
                <ActionMenu washroomId={washroom.id} />
            </td>
        </tr>
    );
}
