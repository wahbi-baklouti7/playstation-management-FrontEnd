import React, { useEffect, useState } from 'react'
import { deleteGame, getGames } from '../services/GamesServices';
import { formatDate } from '../lib/formateDate';
import { formatMoney } from '../lib/formatMoney';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import ModalP from '../components/devices/ModalP';
import Column from 'antd/es/table/Column';
import GameForm from '../components/games/GameForm';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { useGames } from '../context/GamesContext';

const Games = () => {
  const [gamess, setGames] = useState([]);
  const [isLoadinsg, setIsLoading] = useState(false);


  const {games,isLoading,fetchGames,handleDelete} = useGames()

  // const handleDelete = async (id) => {
    
  //   deleteGame(id).then((res) => {

  //     if (res.status) {
  //       const updatedGame = games.filter((game) => game.id !== id);
  //       setGames(updatedGame);
  //     }
  //   })
    
  // }

  const handleDeleteWithMessage = async (id) => {
    try {
      await handleDelete(id);
      message.success('Game deleted successfully!');
    } catch (error) {
      message.error('An error occurred while deleting the game.');
    }
  };
    
  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'game_id',
    //   align: 'center',
    // },
    {
      title: 'Name',
      dataIndex:'name',
      key: 'name',
      align: 'center',
      // width: 200,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <p>{formatMoney(text)}</p>,
    },
    {
      title: 'Extra Time Price',
      dataIndex: 'extra_time_price',
      key: 'extra_time_price',
      align: 'center',
  
      render: (text) => <p>{formatMoney(text)}</p> 
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (text) => <p>{formatDate(text)}</p>,
    },
    // {
    //   title: 'Updated At',
    //   dataIndex: 'updated_at',
    //   key: 'updated_at',
    //   align: 'center',
    //   render: (text) => <p>{formatDate(text)}</p>,
    // },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className='d-flex justify-content-center gap-3'>
          {/* <Button type="primary" icon={<BsPen className='' />} iconPosition='start' >Edit</Button> */}
          <ModalP form = {<GameForm setGames={setGames} game={record} />} title="Edit" icon = {<BsTrash className='' />} />
          <Popconfirm title="Are you sure to delete this device?" onConfirm={() => handleDeleteWithMessage(record.id)} okText="Yes" cancelText="No">
          <Button  type="primary" danger icon={<BsTrash className='' />} iconPosition='start' >Delete</Button>
          </Popconfirm>
        </div>
      )
    }

  ]
  // const loadGames = async () => {
  //   setIsLoading(true);
  //   const d = await getGames();
  //   setGames(d);
  //   setIsLoading(false);
  // };
  
  useEffect(() => {
    // loadGames();
    // fetchGames()
  }, []);
  return (
    <>
   
      <ModalP form = {<GameForm setGames={setGames} />}  title="New Game" icon = {<BsPlus className='' />}/>
    <Table
        bordered
 className="mt-3"
      rowKey="id"
        columns={columns}
        // onChange={handleTableChange}
        // pagination={tableParams.pagination}
        dataSource={games}
        loading={isLoading}
      >
        
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
      </>
  )
}

export default Games