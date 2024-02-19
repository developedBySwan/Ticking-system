import { Routes, Route } from "react-router-dom";
import {
  Error404,
  Home,
  Layout,
  Login,
  Register,
  Role,
  Ticket,
  Unauthorized,
} from "./pages";
import { UserTable } from "./pages/UserTable";
import RequireAuth from "./components/common/RequireAuth";
import { permission } from "./constant";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** public route */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />

        {/** private */}
        <Route element={<RequireAuth permission={[permission.user]} />}>
          <Route path="user" element={<UserTable />} />
        </Route>
        <Route element={<RequireAuth permission={[permission.ticket]} />}>
          <Route path="ticket" element={<Ticket />} />
        </Route>
        <Route element={<RequireAuth permission={[permission.role]} />}>
          <Route path="role" element={<Role />} />
        </Route>

        {/** missing */}

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;
