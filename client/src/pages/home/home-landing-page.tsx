import { landingPagePNG } from "@/other/assets/imgs/collectionIMG";

const HomeLandingPage = () => {
  return (
    <main className="h-[100vh]  w-full flex flex-col gap-2 justify-center items-center">
      <img
        src={landingPagePNG}
        className=" w-[98%] h-[82vh] rounded  object-cover "
        alt={landingPagePNG}
      />

      <article className="text-center w-3/4 m">
        <h1 className="text-4xl">Boost Your Productivity</h1>
        <p>
          Manage your tasks, jot down notes, and create blog posts all in one
          place. Our AuraLog helps you stay organized and focused.
        </p>
      </article>
    </main>
  );
};

export default HomeLandingPage;
