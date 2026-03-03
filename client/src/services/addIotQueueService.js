import axios from "axios";
import { api } from "./api";

const IOT_BASE_URL = import.meta.env.VITE_IOT_SERVICE_BASE_URL;

export const addIotQueue = async (data) => {
  try {
    const response = await api.post(
      `${IOT_BASE_URL}/api/iot-queue/add-queue`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("IOT Queue Error:", error.response?.data || error.message);
    throw error;
  }
};

export const setActiveRoom = async (data) => {
  try {
    const response = await api.post(
      `${IOT_BASE_URL}/api/iot-queue/set-active-room`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Set Active Room Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
