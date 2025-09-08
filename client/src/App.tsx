import HomePage from "./pages/home/home-page";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { SidebarLayout } from "./components/other/sidebar/sidebar-layout";
import { activeTheme } from "./lib/store/global/theme/theme-changer-slice.type";
import LoginPage from "./pages/global/auth/login/login-page";
import PageNotFound404 from "./pages/error/page-not-found-page";
import { lazy, type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./lib/store/store";
import AllTaskMainPage from "./pages/todos/all-task/all-task-main-page";
import ProgressTaskMainPage from "./pages/todos/progress-task/progress-task-main-page";
import CrucialsTaskMainPage from "./pages/todos/crucials-task/crucials-task-main-page";
import ArchivedTaskMainPage from "./pages/todos/archived-task/archived-task-main-page";
import AddTaskMainPage from "./pages/todos/add-task/add-task-main-page";
import AllNotesMainPage from "./pages/notes/all-notes/all-notes-main-page";
import AllBlogsMainPage from "./pages/blogs/all-blogs/all-blogs-main-page";
import RegisterPage from "./pages/global/auth/register/register-page";

const TodoMainPage = lazy(() => import("./pages/todos/todo-main-page"));
const NoteMainPage = lazy(() => import("./pages/notes/note-main-page"));
const BlogMainPage = lazy(() => import("./pages/blogs/blog-main-page"));

const Layout = () => (
  <main
    className={`flex h-screen max-h-screen overflow-hidden scrollbar-hidden
      ${activeTheme.twc}
`}
  >
    {/* First child: Sidebar */}
    <div className="flex-shrink-0 h-full">
      <SidebarLayout />
    </div>
    {/* Second child: Main content with independent scroll */}
    <div className="p-1 w-full *:w-full h-full overflow-y-scroll">
      <Outlet />
    </div>
  </main>
);

const User = () => {
  return (
    <main
      className={`flex h-screen max-h-screen overflow-hidden scrollbar-hidden
      ${activeTheme.twc}
`}
    >
      User Geda
    </main>
  );
};

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useSelector((state: RootState) => state.userLogin);
  const isLoggedIn = user && user?.token && user?.username ? true : false;
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useSelector((state: RootState) => state.userLogin);
  const isLoggedIn = user && user?.token && user?.username ? true : false;
  if (isLoggedIn) {
    return <Navigate to={"/profile"} />;
  }
  return children;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 👈 shared layout
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <PublicRoute children={<LoginPage />} />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: <PrivateRoute children={<User />} />,
      },
      {
        path: "user/",
        children: [
          {
            path: "todos/",
            element: <PrivateRoute children={<TodoMainPage />} />,
            children: [
              {
                index: true,
                // 👈 default route
                element: <AllTaskMainPage />,
              },
              {
                path: "all-task",
                element: <AllTaskMainPage />,
              },
              {
                path: "progress-task",
                element: <ProgressTaskMainPage />,
              },
              {
                path: "crucial-task",
                element: <CrucialsTaskMainPage />,
              },
              {
                path: "archived-task",
                element: <ArchivedTaskMainPage />,
              },
              {
                path: "add-task",
                element: <AddTaskMainPage />,
              },
            ],
          },
          {
            path: "notes",
            element: <PrivateRoute children={<NoteMainPage />} />,
            children: [
              {
                index: true, // 👈 default route
                element: <AllNotesMainPage />,
              },
              {
                path: "all-notes",
                element: <AllNotesMainPage />,
              },
            ],
          },
          {
            path: "blogs",
            element: <PrivateRoute children={<BlogMainPage />} />,
            children: [
              {
                index: true, // 👈 default route
                element: <AllBlogsMainPage />,
              },
              {
                path: "all-blogs",
                element: <AllBlogsMainPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound404 />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
/**
 * @FullCode_Review
 */
