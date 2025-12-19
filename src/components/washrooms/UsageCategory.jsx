import { FaPerson, FaPersonDress } from "react-icons/fa6";
import { MdShower } from "react-icons/md";

export default function UsageCategory() {
    return (
        <div className="section-card">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                <MdShower className="text-indigo-500 text-2xl" /> Usage Category
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* MEN'S SECTION */}
                <div className="gradient-men shadow-md h-full">
                    <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-4">
                        <FaPerson className="text-indigo-600" /> Men's Facilities
                    </h3>

                    <div className="space-y-4">
                        <InputField label="WC" />
                        <InputField label="Indian" />
                        <InputField label="Urinals" />
                        <InputField label="Shower" />
                        <InputField label="Basin" />
                    </div>
                </div>

                {/* WOMEN'S SECTION */}
                <div className="gradient-women shadow-md h-full">
                    <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2 mb-4">
                        <FaPersonDress className="text-pink-600" /> Women's Facilities
                    </h3>

                    <div className="space-y-4">
                        <InputField label="WC" />
                        <InputField label="Indian" />
                        <InputField label="Urinals" />
                        <InputField label="Shower" />
                        <InputField label="Basin" />
                    </div>
                </div>

            </div>
        </div>
    );
}

function InputField({ label }) {
    return (
        <div>
            <label className="label">{label}</label>
            <input
                className="input-ui"
                type="number"
                min="0"
                defaultValue="0"
            />
        </div>
    );
}
