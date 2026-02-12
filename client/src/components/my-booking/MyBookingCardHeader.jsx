function MyBookingCardHeader({ booking }) {
    return (
        <div className="bg-linear-65 from-[#2D2D2D] to-[#318C88] p-4 w-full rounded-t-lg">
            <p className="text-white text-lg font-extrabold">{booking.title}</p>
            <span className="text-white">ชั้น {booking.floor} </span>
            <span className="text-white">อาคารการเรียนการสอนและปฎิบัติการคณะวิทยาศาสตร์</span>
        </div>)
}

export default MyBookingCardHeader