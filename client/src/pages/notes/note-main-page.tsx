import { Outlet } from "react-router-dom";

const NoteMainPage: React.FC<{}> = ({}) => {
  return (
    <main>
      <Outlet />
      {/* {<SideBarLv2LinkBasisPageProvider parentName="notes" />}  */}
    </main>
  );
};

export default NoteMainPage;
