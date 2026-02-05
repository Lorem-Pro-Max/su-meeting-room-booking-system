import Building from "../../assets/icon/building.svg";

export function SubmitModalBody({ formData, setIsSubmitModalOpen }) {
    console.log(formData)
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl">สรุปข้อมูลการจอง</h1>
            <p>โปรดตรวจสอบรายละเอียดก่อนยืนยันการจอง</p>
            <div className="w-full mb-5 flex flex-col gap-4 border border-mint-dark rounded-xl p-6 ">
                <h1 className="text-xl">{formData?.title}</h1>
                <div className="w-full rounded-xl p-5 shadow-md">
                    <div className="flex gap-2 mb-2">
                        <div className="bg-mint-dark p-4 rounded-xl">
                            <img src={Building} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span>{formData?.room.title}</span>
                            <span>ชั้น {formData?.room.floor}</span>
                        </div>
                    </div>
                    <span>{formData?.room.building_name}</span>
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-normal">ชื่อ-นามสกุลผู้จอง</p>
                    <p className="text-lg text-gray-900 font-bold">{formData?.userName || "-"}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                    <p className="text-base text-gray-900 font-semibold">{formData?.phone || "-"}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">วันที่ทำการจอง</p>
                    <p className="text-base text-gray-900 font-semibold">
                        {formData?.selectedDate?.format("DD MMM YYYY")}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">เวลาที่ต้องการจอง</p>
                    <p className="text-base text-gray-900 font-semibold">
                        {formData?.startTime} - {formData?.endTime}
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <button className="w-full rounded-lg bg-mint-dark py-2 !text-white hover:cursor-pointer">ยืนยันการจอง</button>
                <button className="w-full rounded-lg border border-[#D9D9D9] py-2 text-white hover:cursor-pointer" onClick={() => { setIsSubmitModalOpen(false) }}>แก้ไขข้อมูลการจอง</button>
            </div>
        </div>)
}