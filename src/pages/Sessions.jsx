import React from "react";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { formatMoney } from "../lib/formatMoney";
import { useSessions } from "../context/SessionsContext";
import { useUsers } from "../context/UsersContext";
import { formateDateAndTime } from "../lib/formateDate";
import { BsTrash } from "react-icons/bs";
const { Column } = Table;

const Sessions = () => {


  const { sessions,isLoading,tableParams,setTableParams,handleDeleteBtn,fetchSessions } = useSessions();


  const handleDeleteWithMessage = async (sessionId) => {
    try {
     await handleDeleteBtn(sessionId);
      message.success("Session deleted successfully!");
    } catch (error) {
      console.error("Error deleting session:", error);
      message.error("An error occurred while deleting the session.");
   }
  }
  const { users } = useUsers();

  const dataSource = sessions.map((session) => ({
    ...session,
    key: session.id,
  }));



  const userFilters = users.map((user) => ({
    text: user.name,
    value: user.name,
  }));
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Game Name",
      dataIndex: ["game", "name"],
      key: ["game", "id"],
      align: "center",
      ellipsis: true,
    },
    {
      title: "Device Name",
      dataIndex: ["device", "name"],
      key:["device", "id"],
      align: "center",

    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: ["user", "id"],
      align: "center",
      onFilter: (value, record) => record.user.name.indexOf(value) === 0,
      filterSearch: true,
      filters: userFilters,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "session_id",
      align: "center",
      render: (text) => <span>{formatMoney(text)}</span>,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (text) => <span>{formateDateAndTime(text)}</span>,
    },
    {
      title: "Duration (minutes)",
      key: "duration",
      align: "center",
      render: (_, record) =>
      {
        const { start_time, end_time } = record;
        // Convert start_time and end_time to Date objects
      const startDate = new Date(start_time);
      const endDate = new Date(end_time);

      // Calculate the difference in milliseconds
      const durationMs = endDate - startDate;
        // Convert milliseconds to minutes
        const durationMinutes = durationMs / 1000 / 60;

        console.log("render", durationMinutes);
       return  <span>{ durationMinutes <1 ? durationMinutes.toFixed(2) : durationMinutes.toFixed(0)}</span>;
      },
        
        
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this device?"
          placement="topLeft"
            okText="Yes"
          cancelText="No"
            onConfirm={() => handleDeleteWithMessage(record.id)}
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
      ),
    }
  ];



  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setSessions([]);
    }
  };
 
  return (
    <>

      <Table
        bordered
        // rowKey="key"
        rowKey="id"
        columns={columns}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
        // dataSource={dataSource}
        dataSource={sessions}
        loading={isLoading}
      ></Table>
    </>
  );
};

export default Sessions;
