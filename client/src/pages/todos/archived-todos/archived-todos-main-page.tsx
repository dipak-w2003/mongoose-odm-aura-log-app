import TodoPagesWrapperWithFilterPanel from "../todo-pages-wrapper";

const ArchivedTodosMainPage = () => {
  return (
    <TodoPagesWrapperWithFilterPanel>
      <main className="flex flex-col items-center gap-4 p-6">
        Archived Todos Ho Hai
      </main>
    </TodoPagesWrapperWithFilterPanel>
  );
};

export default ArchivedTodosMainPage;
