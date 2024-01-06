import { Button, Form, Input, Space, Modal } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Update = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        img: '',
        dob: null,
        country: '',
    });

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3000/users/${id}`)
                .then((res) => setValues(res.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    const handleUpdate = (e) => {
        Modal.confirm({
            title: 'Confirm update this player?',
            okText: 'Yes',
            onOk: () => {
                e.preventDefault();
                axios
                    .put(`http://localhost:3000/users//${id}`, values)
                    .then((res) => {
                        console.log('New API -->', res.data);
                        navigate('/');
                    })
                    .catch((err) => console.log(err));
            },
        });
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='flex w-[600px] justify-center relative'>
                <h1 className='font-bold text-2xl mb-5'>Update Player</h1>
                <Link to='/'>
                    <HomeOutlined className='font-bold text-2xl mb-5 absolute right-0' />
                </Link>
            </div>
            <div className='bg-gray-300 shadow rounded w-[600px] px-3 py-3 '>
                <Form name='trigger' style={{ maxWidth: 600 }} layout='vertical' onSubmitCapture={handleUpdate}>
                    {/* name */}
                    <Form.Item label='Name'>
                        <Input
                            placeholder='Enter Name'
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </Form.Item>

                    {/* email */}
                    <Form.Item label='Email'>
                        <Input
                            placeholder='Enter Email'
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </Form.Item>

                    {/* phone */}
                    <Form.Item label='Phone'>
                        <Input
                            placeholder='Enter Phone'
                            value={values.phone}
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        />
                    </Form.Item>

                    {/* position */}
                    <Form.Item label='Position'>
                        <Input
                            placeholder='Enter Position'
                            value={values.position}
                            onChange={(e) => setValues({ ...values, position: e.target.value })}
                        />
                    </Form.Item>

                    {/* image */}
                    <Form.Item label='URL Image'>
                        <Input
                            placeholder='Enter Image Player'
                            value={values.img}
                            onChange={(e) => setValues({ ...values, img: e.target.value })}
                        />
                    </Form.Item>

                    {/* dob & country */}
                    <div className='flex justify-between'>
                        {/* <Form.Item label='Date of Birth'>
                            <DatePicker className='w-[180px]' placeholder='Select date of birth' value={values.dob} />
                        </Form.Item> */}

                        <Form.Item label='Country'>
                            <Input
                                placeholder='Enter Country'
                                value={values.country}
                                onChange={(e) => setValues({ ...values, country: e.target.value })}
                            />
                        </Form.Item>
                    </div>

                    {/* button */}
                    <Space className='flex justify-end'>
                        <Button type='primary' htmlType='submit' className='border-white'>
                            Update
                        </Button>
                        <Button danger>
                            <Link to={`/read/${values.id}`}>Back</Link>
                        </Button>
                    </Space>
                </Form>
            </div>
        </div>
    );
};

export default Update;
