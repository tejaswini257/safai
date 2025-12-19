import CleanerCard from "./CleanerCard";

const cleaners = [
    { id: 1, name: "Nikhil Tupkar", phone: "821777777", date: "Nov 11, 2025" },
    { id: 2, name: "Anil Saafai User", phone: "821773377", date: "Nov 11, 2025" },
];

export default function CleanerGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cleaners.map((c) => (
                <CleanerCard key={c.id} cleaner={c} />
            ))}
        </div>
    );
}
