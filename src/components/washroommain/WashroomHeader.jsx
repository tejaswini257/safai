import Link from "next/link";

export default function WashroomHeader() {
    return (
        <div className="washroom-header
      flex flex-col md:flex-row justify-between items-start md:items-center
      rounded-[var(--radius)]
      px-8 py-6
      shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)]
      relative
      overflow-hidden
    ">
            {/* Subtle Background Accent Decor */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-[0.05] rounded-full" />

            {/* Left content: Icon, Title & Metadata */}
            <div className="z-10 flex items-center gap-4">
                <div className="hidden sm:flex p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white">
                        Washroom Locations
                    </h1>
                    <p className="mt-0.5 text-sm font-medium text-teal-100/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Overview of details, assignments, and facility ratings
                    </p>
                </div>
            </div>

            {/* Right Content: Styled Action Buttons */}
            <div className="flex items-center gap-4 mt-5 md:mt-0 z-10">
                {/* ADD LOCATION */}
                <Link href="/dashboard/washrooms/add-washroom">
                    <button className="action-button
            group flex items-center gap-2
            rounded-xl
            px-5 py-2.5
            font-medium
            text-sm font-bold
            text-[hsl(var(--primary-dark))]
            shadow-sm
            hover:shadow-md hover:bg-teal-50
            active:scale-95
            transition-all duration-200
          ">
                        <span className="text-lg group-hover:rotate-90 transition-transform">+</span>
                        Add Location
                    </button>
                </Link>

                {/* ASSIGN */}
                <Link href="/dashboard/cleaner-assignments/add">
                    <button className="assign-button
            flex items-center gap-2
            px-6 py-2.5
            text-sm font-bold
            shadow-sm
            hover:shadow-md
            active:scale-95
            transition-all duration-200
          ">
                        Assign
                    </button>
                </Link>
            </div>
        </div>
    );
}