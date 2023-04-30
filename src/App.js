import { Routes, Route } from "react-router-dom";
import LayOut from "./components/LayOut";
import UserForm from "./user/UserForm";
import UserTable from "./user/UserTable";
function App() {
  return (
    <div className="App">
      {" "}
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<UserForm />} />
          <Route path="users" element={<UserTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
