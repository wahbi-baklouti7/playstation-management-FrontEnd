import { Button, Form, Input, message } from "antd";
import { createUser, updateUser } from "../../services/UsersService";
import { useEffect, useState } from "react";
import { useUsers } from "../../context/UsersContext";

const UserForm = ({ user = null, setUsers, setIsModalOpen }) => {
  // const [form] = Form.useForm();

  console.log(user.name);
  const isUpdate = user != null;
  
  const { handleAddUser,handleUpdateUser,form } = useUsers()


  useEffect(() => {
    console.log(user);
    console.log("use effect");
    form.resetFields();
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [user.id, form]);

  // useEffect(() => {
  //   console.log("use effect");
  // }, []);

  const handleAddUserWithMessage = async (values) => {
    try {
      // await handleAddUser(values, () => setIsModalOpen(false));
      await handleAddUser(values);
      setIsModalOpen(false)
      message.success('User added successfully!');
    } catch (error) {
      message.error('An error occurred while adding the user.');
    }
  };

    const onFinish = (values) => {
    if (!user) {
      // createUser(values).then((res) => {
      //   if (res.status) {
      //     setUsers((prev) => [...prev, res.data]);
      //     setIsModalOpen(false);
      //   } else {
      //       form.setFields(
      //           Object.keys(res.errors).map((err) => (
      //               {
      //                   name: err,
      //                   errors: [res.errors[err]],
      //               }
      //           ))
                    
      //             );
        
      //   }
      // });
      // handleAddUser(values, () => setIsModalOpen(false))
      handleAddUserWithMessage(values)
    } else {
      // updateUser(user.id, values).then((res) => {
      //   if (res.status) {
      //     setUsers((prev) =>
      //       prev.map((d) => (d.id === res.data.id ? res.data : d))
      //       );
            
      //       setIsModalOpen(false);

           
            
      //   } else {
      //     form.setFields(
      //         // TODO: refactor this to a method an use it in many places
      //           Object.keys(res.errors).map((err) => ( 
      //               {
      //                   name: err,
      //                   errors: [res.errors[err]],
      //               }
      //           ))
                    
      //             );

      //   }
      // });
      handleUpdateUser(user.id,values,() => setIsModalOpen(false))
    }
    };
    
  return (
    <Form
      form={form}
      key={user ? user.id : 'new'}
      name="userForm"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{

        // remember: true,
        name: user?.name,
        email: user?.email
      }}
      
      // onReset={() => console.log("reset")}
      onFinish={onFinish}
      
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        // initialValue={user?.name}
        required={false}
        rules={[
          {
            required: true,
            message: "Please enter your user name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        // initialValue={user?.email}
        required={false}
        rules={[
          {
            required: true,
            message: "Please enter your email!",
          },
        ]}
      >
        <Input />
          </Form.Item>
          <Form.Item
        label="New Password"
        name="password"
        hasFeedback = {!isUpdate}
        required={false}
              rules={[
                  
                 
                  {
              
            required: !isUpdate,
                message: "Please enter your password!",
                min: 8,
            
          },
        ]}
      >
        <Input />
          </Form.Item>
          <Form.Item
          dependencies={["password"]}
        label="Confirm Password"
        name="confirm_password"
        hasFeedback = {!isUpdate}
        required={false}
        rules={[
          {
            required:!isUpdate,
                message: "Please confirm your password!",
                min: 8,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("passwords do not match!")
                );
              },
            }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          
        }}

      >
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
