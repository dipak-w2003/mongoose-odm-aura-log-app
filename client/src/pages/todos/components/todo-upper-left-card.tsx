import { curvedStarSlashedSVG } from "@/other/assets/svg/collectionSVG";
import type { todoPriority } from "@/lib/store/todos/todos-slice-type";

interface Props {
  title: string;
  priority: todoPriority;
  date: Date;
  tags?: string[];
}

const TodoUpperLeftContent = ({ title, priority, date, tags }: Props) => {
  const PRIORITY_LEVELS = { low: 1, medium: 2, high: 3, urgent: 4 };
  return (
    <section className="flex flex-col w-1/2 gap-2 px-1">
      <header className="text-lg font-bold group-hover:underline group-hover:underline-offset-4">
        {title}
      </header>

      <div className="flex items-center gap-2">
        {Array.from({ length: PRIORITY_LEVELS[priority] }).map((_, i) => (
          <img key={i} src={curvedStarSlashedSVG} className="h-6" />
        ))}

        <h3 className="text-white border border-[#BCCBCE] px-3 py-1 rounded-md text-sm font-bold">
          {date.toLocaleDateString()}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {tags?.length ? (
          tags.map((t, i) => (
            <span key={i} className="text-[#E1B7B8] text-sm font-semibold">
              #{t}
            </span>
          ))
        ) : (
          <span>No Tags</span>
        )}
      </div>
    </section>
  );
};

export default TodoUpperLeftContent;
