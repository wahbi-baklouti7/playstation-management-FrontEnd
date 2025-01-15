import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { createDevice, updateDevice } from '../../services/DevicesService';
import { useDevices } from '../../context/DevicesContext';

const DeviceForm = ({ device, setDevices, setIsModalOpen }) => {

    // const [form] = Form.useForm();
    const {handleAddDevice,handleUpdateDevice,form } = useDevices()
    const onFinish = async (values) => {
        if (!device) {
            // createDevice(values).then((res) => {
            //     if (res.status) {
            //       // setDevices((prev) => [...prev, res.data]);
            //         addDevice(res.data)
            //         setIsModalOpen(false);
            //     } else {
            //         form.setFields([
            //             {
            //                 name: 'name',
            //                 errors: [res.message],
            //             },
            //         ])
            //     }
               
            // });
          await handleAddDevice(values)
          setIsModalOpen(false)
          message.success('Device added successfully!');
          
        } else {
            // updateDevice(device.id, values).then((res) => {
                
            //     if (res.status) {
            //         setDevices((prev) => prev.map((d) => (d.id === res.data.id ? res.data : d)));
            //     setIsModalOpen(false);
            //     } else {
            //         form.setFields([
            //             {
            //                 name: 'name',
            //                 errors: [res.message],
            //             },
            //         ])
            //     }
                
            // });
          handleUpdateDevice(device.id,values,() => setIsModalOpen(false))
          
        }
            
    };

  return (
      <Form
          form={form}
          name="basic"
          
    labelCol={{
    //   span: 8,
    }}
    wrapperCol={{
    //   span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
        remember: true,
        name: device?.name
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Device Name"
              name="name"
            required={false}
      rules={[
          {
            
              required: true,
              message: 'Please input your device name!',
              
        },
      ]}
    >
      <Input />
    </Form.Item>

    {/* <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item> */}



    <Form.Item
      wrapperCol={{
        // offset: 8,
        // span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" block>
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default DeviceForm