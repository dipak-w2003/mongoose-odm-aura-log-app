import HomePage from "./pages/home/home-page";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { SidebarLayout } from "./components/other/sidebar/sidebar-layout";
import { activeTheme } from "./lib/store/global/theme/theme-changer-slice.type";
import PageNotFound404 from "./pages/error/page-not-found-page";
import { lazy, type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./lib/store/store";
import CompletedTodosMainPage from "./pages/todos/completed-todos/completed-todos-main-page";
import PendingTodosMainPage from "./pages/todos/pending-todos/pending-todos-main-page";
import TrashedTodosMainPage from "./pages/todos/trashed-todos/trashed-todos-main-page";

/**@Todos_IMPORT */
const TodoMainPage = lazy(() => import("./pages/todos/todo-main-page"));
const AddTodoMainPage = lazy(
  () => import("./pages/todos/add-todo/add-todo-main-page")
);
const AllTodosMainPage = lazy(
  () => import("./pages/todos/all-todos/all-todos-main-page")
);
const ProgressTodosMainPage = lazy(
  () => import("./pages/todos/progress-todos/progress-todos-main-page")
);
const ArchivedTodosMainPage = lazy(
  () => import("./pages/todos/archived-todos/archived-todos-main-page")
);
const CrucialsTodosMainPage = lazy(
  () => import("./pages/todos/crucials-todos/crucials-todos-main-page")
);

/**@Notes_IMPORT */
const NoteMainPage = lazy(() => import("./pages/notes/note-main-page"));
const AllNotesMainPage = lazy(
  () => import("./pages/notes/all-notes/all-notes-main-page")
);

/**@Blogs_IMPORT */
const BlogMainPage = lazy(() => import("./pages/blogs/blog-main-page"));
const AllBlogsMainPage = lazy(
  () => import("./pages/blogs/all-blogs/all-blogs-main-page")
);

/**@Else_IMPORT */
const RegisterFormPage = lazy(
  () => import("./pages/global/auth/register/register-form-page")
);
const LoginPage = lazy(() => import("./pages/global/auth/login/login-page"));
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
        element: <PublicRoute children={<RegisterFormPage />} />,
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
                element: <AllTodosMainPage />,
              },
              {
                path: "all-todos",
                element: <AllTodosMainPage />,
              },
              {
                path: "crucial-todos",
                element: <CrucialsTodosMainPage />,
              },
              {
                path: "completed-todos",
                element: <CompletedTodosMainPage />,
              },
              {
                path: "pending-todos",
                element: <PendingTodosMainPage />,
              },
              {
                path: "progress-todos",
                element: <ProgressTodosMainPage />,
              },

              {
                path: "archived-todos",
                element: <ArchivedTodosMainPage />,
              },
              {
                path: "trashed-todos",
                element: <TrashedTodosMainPage />,
              },
              {
                path: "add-todo",
                element: <AddTodoMainPage />,
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
