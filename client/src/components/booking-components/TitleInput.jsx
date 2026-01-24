import { Form, Input } from "antd";

import { EditOutlined, } from "@ant-design/icons";

function TitleInput() {
    return (
        <Form.Item
            varient="underlined"
            name="title"
            rules={[{ required: true, message: "Please input!" }]}
        >
            <Input
                placeholder="ระบุชื่อการประชุม/การเรียน"
                className="h-[52px] px-4 custom-booking-input"
                variant="underlined"
                suffix={<EditOutlined style={{ fontSize: "24px", color: "#13C2C2" }} />}
            />
        </Form.Item>
    );
}

export default TitleInput