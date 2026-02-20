import React from 'react';
import { Button, Form, Input, message } from 'antd';
import Logo from "../../assets/icon/logo.svg";
import KeySvg from "../../assets/icon/key.svg"
import { UserOutlined } from '@ant-design/icons';
import { loginService } from '../../services/index'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const navigate = useNavigate();
    const handleLogin = async (values) => {
        try {
            const data = await loginService(values.username, values.password);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'การเชื่อมต่อผิดพลาด';
            console.error(errorMsg);
        }
    };
    return (
        <div className="w-full max-w-[420px] sm:max-w-[460px] bg-white/80 backdrop-blur rounded-2xl flex flex-col p-6 sm:p-8 lg:p-10 gap-5 shadow-lg">
            <img src={Logo} className='w-50' />
            <div>
                <h1 className="font-extrabold text-xl">ระบบจองห้องประชุม</h1>
                <p>คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร</p>
            </div>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                autoComplete="off"
            >
                <Form.Item
                    label="username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined style={{ color: "#D9D9D9" }} />} />
                </Form.Item>
                <Form.Item
                    label="password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<KeyIcon />} />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" block htmlType="submit" shape="round">
                        เข้าสู่ระบบ
                    </Button>
                </Form.Item>
            </Form>
        </div>)
}

export default LoginForm


function KeyIcon() {
    return (<img src={KeySvg} />)
}