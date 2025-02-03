import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDevices } from '../../context/DevicesContext';

const DeviceForm = ({ device, setDevices, setIsModalOpen }) => {

  const { handleAddDevice, handleUpdateDevice, form } = useDevices()
  
  useEffect(() => {
    if (device) {
        form.setFieldsValue({
            name: device.name
        })
    }
  }, [device])
    const onFinish = async (values) => {
        if (!device) {

          await handleAddDevice(values)
          setIsModalOpen(false)
          message.success('Device added successfully!');
          
        } else {

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