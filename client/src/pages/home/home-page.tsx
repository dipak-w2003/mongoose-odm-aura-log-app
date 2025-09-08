import { lazy } from "react";
import HomeAboutNotePage from "./home-about-note-page";
import HomeAboutBlogPage from "./home-about-blog-page";
const HomeLandingPage = lazy(() => import("./home-landing-page"));
const HomeAboutTodoPage = lazy(() => import("./home-about-todo-page"));
const HomeAboutTodo2AndOthersPage = lazy(
  () => import("./home-about-todo-2-others")
);

const HomePage = () => {
  return (
    <div className={` *:w-full *:h-[100vh] *:mx-auto `}>
      <HomeLandingPage />
      <HomeAboutTodoPage />
      <HomeAboutTodo2AndOthersPage />
      <HomeAboutNotePage />
      <HomeAboutBlogPage />
    </div>
  );
};

export default HomePage;
