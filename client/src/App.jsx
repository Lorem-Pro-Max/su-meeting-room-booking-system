import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MyBooking from "./pages/MyBooking";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import { ConfigProvider } from "antd";

function App() {

  const theme = {
    token: {
      fontFamily: "Kanit, sans-serif",
      colorPrimary: "#13c2c2",
    },
  };
  return (
    <>
      <ConfigProvider theme={theme}>
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
          < Route path="login" element={< Login />} />
        </Routes >
      </ConfigProvider >
    </>
  );
}

export default App;
