import { useNavigate } from "react-router-dom";

const PageNotFound404 = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col h-full w-full justify-center items-center">
      <header>Page Not found 404</header>
      <button onClick={() => navigate("/")}>Home</button>
    </main>
  );
};

export default PageNotFound404;
