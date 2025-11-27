interface Props {
  desc: string;
}

const TodoMiddleContent = ({ desc }: Props) => {
  return (
    <article className="pt-4 pb-2 px-1 group-hover:underline-offset-4 transition-all overflow-hidden">
      <h2 className="text-lg font-semibold underline">Descriptions</h2>
      <p className="text-sm text-[#f0f8ffb6] p-3 leading-relaxed">
        {desc ?? "N/A"}
      </p>
    </article>
  );
};

export default TodoMiddleContent;
