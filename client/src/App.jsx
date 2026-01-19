import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";
import MyBooking from "./pages/MyBooking";
import Login from "./pages/login";
import Booking from "./pages/Booking";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route index element={<Booking />} />
              <Route path="my-booking" element={<MyBooking />} />
            </Routes>
          </Layout>
        }
      />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
