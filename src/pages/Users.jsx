import { Button, message, Popconfirm, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import ModalP from "../components/devices/ModalP";
import { BsPlus, BsTrash } from "react-icons/bs";
import { formatMoney } from "../lib/formatMoney";
import { formatDate, formateDateAndTime } from "../lib/formateDate";
import { deleteUser, getAllUsers } from "../services/UsersService";
import UserForm from "../components/users/UserForm";
import { useUsers } from "../context/UsersContext";

const Users = () => {
  const [userss, setUsers] = useState([]);
  const [isLoadings, setIsLoading] = useState(false);

  const {users,
    isLoading,
    fetchUsers,
    handleDelete} = useUsers()
  // const handleDelete = async (id) => {
  //   deleteUser(id).then((res) => {
  //     if (res.status) {
  //       const updatedUser = users.filter((game) => game.id !== id);
  //       setUsers(updatedUser);
  //     }
  //   });
  // };

  const handleDeleteWithMessage = async (id) => {
    try {
      await handleDelete(id);
      message.success("User deleted successfully!");
    } catch (error) {
      message.error("An error occurred while deleting the user.");
    }
  }
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "game_id",
    //   align: "center",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",

      
      // width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "is_admin",
      key: "role",
      align: "center",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      align: "center",
      render: (text) => <span>{text ? formateDateAndTime(text):"-"}</span>,
      // render: (text) => <span>{text}</span>,

    },
    {
      title: "Member Since",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    // {
    //   title: "Updated At",
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    //   align: "center",
    //   render: (text) => <p>{formatDate(text)}</p>,
    // },
    {
      title: "Action",
      key: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <div className="d-flex justify-content-center gap-3">
          {/* <Button type="primary" icon={<BsPen className='' />} iconPosition='start' >Edit</Button> */}
          <ModalP
            form={<UserForm setUsers={setUsers} user={record} />}
            title="Edit"
            icon={<BsTrash className="" />}
          />
          <Popconfirm
            title="Are you sure to delete this device?"
            onConfirm={() => handleDeleteWithMessage(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<BsTrash className="" />}
              iconPosition="start"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  // const loadUsers = async () => {
  //   setIsLoading(true);
  //   const d = await getAllUsers();
  //   setUsers(d);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    // loadUsers();
    // fetchUsers()
  }, []);
  return (
    <>
      <ModalP
        form={<UserForm setUsers={setUsers} />}
        title="New User"
        icon={<BsPlus className="" />}
      />
      <Table
       
        bordered
         className="mt-3"
        rowKey="id"
        columns={columns}
        // onChange={handleTableChange}
        // pagination={tableParams.pagination}
        dataSource={users}
        loading={isLoading}
        scroll={{ x: "max-content" }}
      >
        
      </Table>
    </>
  );
};

export default Users;
