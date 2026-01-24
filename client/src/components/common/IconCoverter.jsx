import Icon from "@ant-design/icons";
import booking from "../../assets/icon/booking.svg";


const wrapIcon = (Component) => (props) =>
  <Icon component={Component} {...props} />;

export const BookingIcon = wrapIcon(booking);
export const BuildingIcon = wrapIcon(BuildingSvg);