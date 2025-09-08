import {
  taskmasterImg1,
  taskmasterImg2,
  taskmasterImg3,
  taskmasterImg4,
} from "@/other/assets/imgs/collectionIMG";

const visualizingInfoCards: {
  img: string;
  topic: string;
  info: string;
}[] = [
  {
    img: taskmasterImg1,
    topic: "Clear Task List",
    info: "Manage your tasks, jot down notes and create blogs posts",
  },
  {
    img: taskmasterImg2,
    topic: "Categories View",
    info: "Manage your tasks, jot down notes and create blogs posts",
  },
  {
    img: taskmasterImg3,
    topic: "Calendar Integration",
    info: "Manage your tasks, jot down notes and create blogs posts",
  },
  {
    img: taskmasterImg4,
    topic: "Progress Reports",
    info: "Manage your tasks, jot down notes and create blogs posts",
  },
];

const HomeAboutTodo2AndOthersPage = () => {
  return (
    <main className="mt-5">
      <section className="flex flex-col gap-4 w-full">
        <article className=" pl-2">
          <header className="text-xl font-semibold">
            Visualizing Your Workflow
          </header>
          <p className="">
            See TaskMaster Todo transforms your task management with visual
            tools
          </p>
        </article>

        <div className="cards w-full  flex flex-wrap justify-center gap-3">
          {visualizingInfoCards.map((_) => {
            return (
              <span className="flex flex-col gap-1 w-[23.65%] h-[200px] rounded">
                <img
                  src={_.img}
                  className="object-cover h-[200px] w-[full] rounded"
                  alt=""
                />
                <h4 className="pl-1 text-lg">{_.topic}</h4>
                <p className="pl-1 text-sm font-[300]">{_.info}</p>
              </span>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default HomeAboutTodo2AndOthersPage;
