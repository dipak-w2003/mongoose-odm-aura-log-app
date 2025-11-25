import {
  boxSVG,
  comboChartSVG,
  listSVG,
  plusSVG,
} from "@/other/assets/svg/collectionSVG";
import { Link } from "react-router-dom";
const keyFeatures: {
  icon: string;
  topic: string;
  info: string;
}[] = [
  {
    icon: plusSVG,
    topic: "Effort task creation",
    info: "It is necessary to point out that",
  },
  {
    icon: listSVG,
    topic: "Smart categorization",
    info: "It is necessary to point out that",
  },
  {
    icon: boxSVG,
    topic: "Deadline management",
    info: "It is necessary to point out that",
  },
  {
    icon: comboChartSVG,
    topic: "Progress tracking",
    info: "It is necessary to point out that",
  },
];
const HomeAboutTodoPage = () => {
  return (
    <main
      className="flex flex-col  items-center justify-around  gap-y-4 transition-all duration-300
   *:transition-all *:duration-300
    "
    >
      {/* Top Content */}
      <div
        className="card h-[50vh] w-[98%] rounded  text-center flex flex-col items-center justify-around  p-7 "
        style={{
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          background: "linear-gradient(180deg, #022a2a 0%, #034c38 100%)",
        }}
      >
        <header className="text-3xl font-semibold underline">
          Master Your Day with Todo Master Todos
        </header>
        <p className="text-xl px-6 font-light">
          Manage your tasks, jot down notes, and create blog posts all in one
          place. Our AuraLog helps you stay organized and focused.
        </p>
        <button className="bg-[#FE802C] font-bold px-10 cursor-pointer py-4 rounded  ">
          <Link to={"/login"}>Get Started</Link>
        </button>
      </div>

      {/* Article */}
      <article className=" w-[100%] rounded   flex flex-col gap-2 *:transition-all *:duration-300  ">
        <header className="text-xl font-semibold pl-2">Key Features:</header>
        <p className="pl-2">
          Manage your tasks, jot down notes, and create blog posts all in one.
        </p>

        <section className="flex w-[99.45%] gap-3 flex-wrap justify-center *:transition-all *:duration-300">
          {keyFeatures.map((_) => {
            return (
              <div
                className="feature-box h-[200px] w-[23.95%] p-2 flex flex-col gap-3 rounded "
                style={{
                  background:
                    "linear-gradient(180deg, #022a2a 0%, #034535 100%)",
                  boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                }}
              >
                <span className="h-8 w-8 ">
                  <img src={_.icon} alt="" />
                </span>
                <h3 className="font-[600]">{_.topic} </h3>
                <p className="text-sm">{_.info}</p>
              </div>
            );
          })}
        </section>
      </article>
    </main>
  );
};

export default HomeAboutTodoPage;
