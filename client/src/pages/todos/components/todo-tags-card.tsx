import type { AppDispatch, RootState } from "@/lib/store/store";
import {
  deleteTodoTaskTagsUpdate,
  setTodoTaskTagsUpdate,
} from "@/lib/store/todos/updating-todos-collector-slice";
import { multiplySVG } from "@/other/assets/svg/collectionSVG";
import type { Action } from "@reduxjs/toolkit";
import { useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const TodoTagsCard = () => {
  const { todo } = useSelector((state: RootState) => state.updateTodoCollector);
  const dispatch: AppDispatch = useDispatch();
  const [tags, setTags] = useState<string>("");

  const addTaskTags = () => {
    const TAGS_LIST_LIMIT = 6;
    const list_tags = todo.tags || [];
    if (tags.length >= 3 && list_tags.length < TAGS_LIST_LIMIT) {
      dispatch(setTodoTaskTagsUpdate(tags));
      setTags("");
    }
  };

  function generateTodoTag(text: string): string {
    return text.split(/\s+/).join("_").toLowerCase();
  }

  const handleTaskTagsInput = (e: ChangeEvent<HTMLInputElement>) => {
    const _text = e.target.value;
    if (_text.length > 10) return;
    setTags(generateTodoTag(_text));
  };

  return (
    <section className="flex flex-col gap-4 w-full mt-6">
      <header className="text-xl font-bold text-white">Task Tags</header>

      {/* Tags List */}
      <div className="flex gap-3 flex-wrap max-h-[45vh] overflow-y-auto">
        {todo.tags &&
          todo.tags.map((t, idx) => (
            <span
              key={`todo-tags:${idx}:${t}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
              bg-white/10 backdrop-blur-xl border border-white/20
              text-white select-none hover:scale-[1.02] transition-transform"
            >
              <h3 className="text-sm">#{t}</h3>

              <img
                src={multiplySVG}
                onClick={(): Action =>
                  dispatch(deleteTodoTaskTagsUpdate({ _idx: idx }))
                }
                className="h-4 cursor-pointer hover:scale-125 transition-transform"
                alt="delete"
                title={`delete tag ${idx + 1}`}
              />
            </span>
          ))}
      </div>

      {/* Input + button */}
      {todo.tags?.length !== 6 && (
        <div className="flex gap-3 w-full items-center">
          <input
            id="tag"
            name="tag"
            type="text"
            onChange={handleTaskTagsInput}
            className="w-full px-3 py-3 rounded-lg 
              bg-white/10 backdrop-blur-xl border border-white/20 
              outline-none focus:ring-2 focus:ring-white/30
              text-white placeholder-white/60"
            placeholder="Task Tag (ex: urgent_task)"
            autoComplete="off"
            value={tags}
          />

          <button
            onClick={addTaskTags}
            type="button"
            className="px-4 py-3 rounded-lg bg-green-500 text-white 
              hover:bg-green-600 transition-all cursor-pointer"
          >
            Add+
          </button>
        </div>
      )}
    </section>
  );
};

export default TodoTagsCard;
