import { Button } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EditOutlined, HomeOutlined } from '@ant-design/icons';

const Read = () => {
    const [dataSource, setDataSource] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3000/users/${id}`)
                .then((res) => setDataSource(res.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='flex w-[600px] justify-center relative'>
                <h1 className='font-bold text-2xl mb-5'>Detail of Player</h1>
                <Link to='/'>
                    <HomeOutlined className='font-bold text-2xl mb-5 absolute right-0' />
                </Link>
            </div>
            <div className='bg-gray-300 shadow rounded w-[600px] px-3 py-3 '>
                <div className='flex justify-between'>
                    {/* image */}
                    <div className='w-[300px]'>
                        <img src={dataSource.img} alt='Avatar' />
                    </div>

                    {/* infomation */}
                    <div className='w-[250px]'>
                        <div>
                            <strong className='mr-2'>Name:</strong>
                            {dataSource.name}
                        </div>
                        <div>
                            <strong className='mr-2'>Email:</strong>
                            {dataSource.email}
                        </div>
                        <div>
                            <strong className='mr-2'>Phone:</strong>
                            {dataSource.phone}
                        </div>
                        <div>
                            <strong className='mr-2'>Position:</strong>
                            {dataSource.position}
                        </div>
                        <div>
                            <strong className='mr-2'>Date of Birth:</strong>
                            {dataSource.dob}
                        </div>
                        <div>
                            <strong className='mr-2'>Country:</strong>
                            {dataSource.country}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button>
                        <Link to={`/update/${dataSource.id}`}>
                            <EditOutlined className='mr-2' />
                            Edit
                        </Link>
                    </Button>
                    <Button>
                        <Link to='/'>Back</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Read;
