import { Button, message, Popconfirm, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useEffect, useState } from 'react'
import { deleteDevice, getAllDevices } from '../services/DevicesService';
import { formatDate } from '../lib/formateDate';
import { BsPen, BsPlus, BsTrash } from 'react-icons/bs';
import ModalP from '../components/devices/ModalP';
import DeviceForm from '../components/devices/DeviceForm';
import { useDevices } from '../context/DevicesContext';




const Devices = () => {
  const [devicess, setDevices] = useState([]);

// Handle device deletion with success message
const handleDeleteWithMessage = async (id) => {
  try {
    await handleDelete(id);
    message.success('Device deleted successfully!');
  } catch (error) {
    console.error('Error deleting device:', error);
    message.error('An error occurred while deleting the device.');
  }
};
  const { devices,
    isLoading,
    handleDelete,} = useDevices()


  // const handleDelete = async (id) => {
  //   await deleteDevice(id);
  //   const updatedDevices = devices.filter((device) => device.id !== id);
  //   setDevices(updatedDevices);
    
  // }


  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'device_id',
    //   align: 'center',
    // },
    {
      title: 'Device Name',
      dataIndex:'name',
      key: 'device_id',
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (text) => <a>{formatDate(text)}</a>,
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: 'center',
      render: (text) => <a>{formatDate(text)}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div className='d-flex justify-content-center gap-3'>
          {/* <Button type="primary" icon={<BsPen className='' />} iconPosition='start' >Edit</Button> */}
          <ModalP form = {<DeviceForm setDevices={setDevices} device={record} />} title="Edit" icon = {<BsPen className='' />} />
          {/* <Popconfirm title="Are you sure to delete this device?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No"> */}
          <Popconfirm title="Are you sure to delete this device?" onConfirm={() => handleDeleteWithMessage(record.id)} okText="Yes" cancelText="No">
          <Button  type="primary" danger icon={<BsTrash className='' />} iconPosition='start' >Delete</Button>
          </Popconfirm>
        </div>
      )
    }

  ]
  // const loadDevices = async () => {
  //   setIsLoading(true);
  //   const d = await getAllDevices();
  //   setDevices(d);
  //   setIsLoading(false);
  // };
  
  useEffect(() => {
    // loadDevices();
    // fetchDevices()
  }, []);
  return (
    <>
      <ModalP form = {<DeviceForm setDevices={setDevices} />}  title="New Device" icon = {<BsPlus className='fs-3' />}/>
    <Table
        bordered
        
        rowKey="id"
         className="mt-3"
        columns={columns}
        // onChange={handleTableChange}
        // pagination={tableParams.pagination}
        dataSource={devices}
        loading={isLoading}
        scroll={{ x: "max-content" }}
      >
      </Table>
      </>
  )
}

export default Devices