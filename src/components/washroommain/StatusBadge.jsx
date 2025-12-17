export default function StatusBadge({ status }) {
    const colors =
        status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";

    return (
        <span className={`px-3 py-1 rounded-xl text-sm font-medium ${colors}`}>
            {status}
        </span>
    );
}
