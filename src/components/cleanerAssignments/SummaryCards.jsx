export default function SummaryCards({
  total,
  assigned,
  unassigned,
  onClickCard,
  activeStatus,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Gold / Highlight Card */}
      <div
        className="flex items-center justify-between p-6 rounded-2xl bg-[#FFF3E0] border-2 border-[#F4B740] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onClickCard('unassigned')}
      >
        <div>
          <div className="text-sm font-medium text-[#2F3A45]">Unassigned Cleaners</div>
          <div className="text-2xl font-bold text-[#2F3A45]">
            {unassigned}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F4B740] flex items-center justify-center text-white text-xl">
          👥
        </div>
      </div>

      {/* Blue / Secondary Card */}
      <div
        className="flex items-center justify-between p-6 rounded-2xl bg-[#EEF4FF] border-2 border-[#4F7FD9] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onClickCard('assigned')}
      >
        <div>
          <div className="text-sm font-medium text-[#2F3A45]">Assigned Cleaners</div>
          <div className="text-2xl font-bold text-[#2F3A45]">
            {assigned}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#4F7FD9] flex items-center justify-center text-white text-xl">
          ✅
        </div>
      </div>

      {/* Bronze / Neutral Card */}
      <div
        className="flex items-center justify-between p-6 rounded-2xl bg-[#FFF1E8] border-2 border-[#C77C5C] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onClickCard('total')}
      >
        <div>
          <div className="text-sm font-medium text-[#2F3A45]">Total Cleaners</div>
          <div className="text-2xl font-bold text-[#2F3A45]">
            {total}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#C77C5C] flex items-center justify-center text-white text-xl">
          📊
        </div>
      </div>
    </div>
  );
}
