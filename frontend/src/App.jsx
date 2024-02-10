import { Routes, Route } from "react-router-dom";
import { Error404, Layout, Login, Register } from "./pages";
import { UserTable } from "./pages/UserTable";
import RequireAuth from "./components/common/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** public route */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/** private */}
        <Route element={<RequireAuth />}>
          <Route path="user" element={<UserTable />} />
        </Route>

        {/** missing */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;
