const TodoCardSkeleton = () => {
  return (
    <div className="group w-full animate-pulse">
      <div
        className="
          w-full rounded-lg border border-[#022A2A]
          bg-[#034C38]
          p-3 relative shadow-[3px_3px_8px_-2px_#ffffff]
        "
      >
        {/* TOP SECTION */}
        <article className="w-full flex justify-between items-start border-b border-[#022A2A] pb-3">
          <div className="flex flex-col gap-2 w-1/2">
            <div className="h-6 bg-[#022A2A] rounded w-3/4" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-[#022A2A] rounded-full" />
              <div className="h-5 w-24 bg-[#022A2A] rounded" />
            </div>
            <div className="flex gap-2 mt-1">
              <div className="h-4 w-10 bg-[#022A2A] rounded" />
              <div className="h-4 w-12 bg-[#022A2A] rounded" />
            </div>
          </div>
          <div className="h-16 w-16 bg-[#022A2A] rounded-full" />{" "}
          {/* PieChart */}
        </article>

        {/* TOGGLE BUTTON */}
        <div className="absolute h-[28px] w-[28px] bg-[#111711] rounded-full border border-[#022A2A] -bottom-4 left-1/2 -translate-x-1/2" />

        {/* MIDDLE */}
        <div className="pt-4 pb-2 px-1">
          <div className="h-5 bg-[#022A2A] rounded w-1/3 mb-2" />
          <div className="h-4 bg-[#022A2A] rounded w-full mb-1" />
          <div className="h-4 bg-[#022A2A] rounded w-full mb-1" />
          <div className="h-4 bg-[#022A2A] rounded w-2/3" />
        </div>

        {/* BOTTOM SUBTASKS */}
        <div className="mt-3 flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#022A2A] h-10 rounded-md w-full flex items-center justify-between px-3"
            >
              <div className="flex gap-2">
                <div className="h-4 w-4 bg-[#034C38] rounded-full" />
                <div className="h-4 w-24 bg-[#034C38] rounded" />
              </div>
              <div className="h-4 w-4 bg-[#034C38] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoCardSkeleton;
