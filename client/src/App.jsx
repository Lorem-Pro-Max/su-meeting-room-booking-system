import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";
import Booking from "./components/Booking/Booking";
import MyBooking from "./components/MyBooking/MyBooking";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route index element={<Booking />} />
              <Route path="my-bookings" element={<MyBooking />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
