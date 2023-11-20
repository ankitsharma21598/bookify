import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import List from "./pages/List";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import ViewOrder from "./pages/ViewOrder";
import ViewOrderDetail from "./pages/ViewOrderDetail";

function App() {
  return (
    <div>
      <NavBar/>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/list" element={<List/>} />
          <Route path="/book/view/:bookId" element={<Detail/>} />
          <Route path="/book/orders" element={<ViewOrder/>} />
          <Route path="/book/orders/:bookId" element={<ViewOrderDetail/>} />
        </Routes>
      
    </div>
  );
}

export default App;
