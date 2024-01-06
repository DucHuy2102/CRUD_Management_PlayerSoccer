import { Button, Form, Input, Space, DatePicker } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        img: '',
    });

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/users', values)
            .then((res) => {
                console.log('New API -->', res.data);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-left font-bold text-2xl mb-5'>Add New Player</h1>
            <div className='bg-gray-300 shadow rounded w-[500px] px-3 py-3 '>
                <Form name='trigger' style={{ maxWidth: 600 }} layout='vertical' onSubmitCapture={handleSubmit}>
                    {/* name */}
                    <Form.Item label='Name'>
                        <Input
                            placeholder='Enter Name'
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </Form.Item>

                    {/* email */}
                    <Form.Item label='Email'>
                        <Input
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </Form.Item>

                    {/* phone */}
                    <Form.Item label='Phone'>
                        <Input
                            placeholder='Enter Phone'
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        />
                    </Form.Item>

                    {/* position */}
                    <Form.Item label='Position'>
                        <Input
                            placeholder='Enter Position'
                            onChange={(e) => setValues({ ...values, position: e.target.value })}
                        />
                    </Form.Item>

                    {/* image */}
                    <Form.Item label='URL Image'>
                        <Input
                            placeholder='Enter Image Player'
                            onChange={(e) => setValues({ ...values, img: e.target.value })}
                        />
                    </Form.Item>

                    {/* dob & country */}
                    <div className='flex justify-between'>
                        {/* dob */}
                        <Form.Item label='Date of Birth'>
                            <DatePicker className='w-[180px]' placeholder='Select date of birth' />
                        </Form.Item>

                        {/* country */}
                        <Form.Item label='Country'>
                            <Input
                                placeholder='Enter Country'
                                onChange={(e) => setValues({ ...values, img: e.target.value })}
                            />
                        </Form.Item>
                    </div>

                    {/* button */}
                    <Space className='flex justify-end'>
                        <Button htmlType='submit'>Add</Button>
                        <Button danger>
                            <Link to='/'>Back</Link>
                        </Button>
                    </Space>
                </Form>
            </div>
        </div>
    );
};

export default Create;
