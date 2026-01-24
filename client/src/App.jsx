import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MyBooking from "./pages/MyBooking";
import Login from "./pages/login";
import Booking from "./pages/Booking";
import { ConfigProvider } from "antd";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Kanit, sans-serif",
                colorPrimary: '#13c2c2',
              },
            }}
          >
            <Layout>
              <Routes>
                <Route index element={<Booking />} />
                <Route path="my-booking" element={<MyBooking />} />
              </Routes>
            </Layout>
          </ConfigProvider>
        }
      />
      < Route path="login" element={< Login />} />
    </Routes >
  );
}

export default App;
