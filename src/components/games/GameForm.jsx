import { Button, Form, Input, message } from "antd";
import React from "react";
import { createGame, updateGame } from "../../services/GamesServices";
import { useGames } from "../../context/GamesContext";

const GameForm = ({ game = null, setGames, setIsModalOpen }) => {
  // const [form] = Form.useForm();

  const { handleAddGame,handleUpdateGame , form} = useGames()
  
  const onFinish =async (values) => {
    if (!game) {
      // TODO: refactor this and move it to context
      // createGame(values).then((res) => {
      //   if (res.status) {
      //     // setGames((prev) => [...prev, res.data]);
      //     addGame(res.data)
      //     setIsModalOpen(false);
      //   } else {
      //     form.setFields([
      //       {
      //         name: "name",
      //         errors: [res.message],
      //       },
      //     ]);
      //   }
      // });

      await handleAddGame(values)
      setIsModalOpen(false)
      message.success('Game added successfully!');
    } else {
      // updateGame(game.id, values).then((res) => {
      //   if (res.status) {
      //     setGames((prev) =>
      //       prev.map((d) => (d.id === res.data.id ? res.data : d))
      //     );
      //     setIsModalOpen(false);
      //   } else {
      //     form.setFields([
      //       {
      //         name: "name",
      //         errors: [res.message],
      //       },
      //     ]);
      //   }
      // });
      handleUpdateGame(game.id, values)
      setIsModalOpen(false)
      message.success('Game updated successfully!');
      

    }
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
        // offset: 0,
      }}
      wrapperCol={{
        span: 16,
        // offset: 3
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
        name: game?.name,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        required={false}
        rules={[
          {
            required: true,
            message: "Please input your game name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price (1 Game / 1 Hour)"
        name="price"
        initialValue={game?.price || 0}
        required={false}
        rules={[
          {
            required: true,
            message: "Please input your price!",
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Extra Time Price"
        name="extra_time_price"
        initialValue={game?.extra_time_price || 0}
        // required={false}
        // rules={[
        //   {
        //     required: true,
        //     message: "Please input your extra time price!",
        //   },
        // ]}
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

      <Form.Item wrapperCol={{}}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GameForm;
