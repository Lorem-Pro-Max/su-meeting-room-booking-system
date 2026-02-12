import MyBookingCardHeader from "./MyBookingcardHeader"
import MyBookingCardBody from "./MyBookingCardBody"
import MyBookingCardFooter from "./MyBookingCardFooter"
import noBookingImage from "../../assets/image/no-booking.png"

function MyBookingCard({ myBookings, mode, setLoading }) {
    if (!Array.isArray(myBookings) || myBookings.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <img src={noBookingImage} className="w-40" />
                <p className="text-sm font-light text-center">ยังไม่มีข้อมูลการจองของฉัน</p>
            </div>)
    }
    return (
        <div className="space-y-4">
            {myBookings.map((booking) => (
                <div key={booking.id} className="rounded-lg shadow-lg max-w-[1143px]">
                    <MyBookingCardHeader booking={booking} />
                    <MyBookingCardBody booking={booking} />
                    <MyBookingCardFooter booking={booking} mode={mode} setLoading={setLoading} />
                </div>
            ))}
        </div>)
}

export default MyBookingCard