import Icon from "@ant-design/icons";
import Booking from "../../assets/icon/booking.svg";

const wrapIcon = (Component) => (props) =>
  <Icon component={Component} {...props} />;

export const BookingIcon = wrapIcon(Booking);
