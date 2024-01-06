import { Table, Space, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    // get API
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3000/users')
            .then((res) => {
                setDataSource(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const [columns] = useState([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Action',
            className: 'custom_header',
            key: 'action',
            render: (_, record) => (
                <Space>
                    {/* read player */}
                    <Link to={`/read/${record.id}`}>
                        <EyeOutlined style={{ fontSize: '20px' }} />
                    </Link>

                    {/* update player */}
                    <Link to={`/update/${record.id}`}>
                        <EditOutlined style={{ fontSize: '20px', marginLeft: '5px' }} />
                    </Link>

                    {/* delete player */}
                    <Link>
                        <DeleteOutlined
                            style={{ fontSize: '20px', color: 'red', marginLeft: '5px' }}
                            onClick={() => handleDelete(record)}
                        />
                    </Link>
                </Space>
            ),
        },
    ]);

    // delete player
    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Are you sure want to delete this player?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                axios
                    .delete(`http://localhost:3000/users/${record.id}`)
                    .then((res) => {
                        window.location.reload();
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));
                //setDataSource((pre) => pre.filter((player) => player.id !== record.id));
            },
        });
    };

    // search player
    // console.log('Search -->', search);
    const [search, setSearch] = useState('');
    const dataFilter = dataSource.filter((item) => {
        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
    });

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='w-[1200px] mb-2 flex justify-center relative'>
                <h1 className='font-bold text-2xl mb-5'>Management Player</h1>
                <div className='mb-5 absolute right-0'>
                    <input
                        type='text'
                        placeholder='Search player'
                        className='text-lg px-3 py-1 rounded w-[200px] border relative'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchOutlined className='ml-2 text-xl absolute right-2 bottom-2 text-gray-600' />
                </div>
            </div>
            <div className='w-[1200px] rounded border shadow p-4 bg-white'>
                {/* button add new player */}
                <Button className='mb-3'>
                    <Link to='/create'>Add Player</Link>
                </Button>

                {/* table data */}
                <Table columns={columns} dataSource={dataFilter} scroll={{ y: 500 }} />
            </div>
        </div>
    );
};

export default Home;
