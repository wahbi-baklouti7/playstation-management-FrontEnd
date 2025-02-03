import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useGames } from "../../context/GamesContext";

const GameForm = ({ game = null, setGames, setIsModalOpen }) => {
  const { handleAddGame, handleUpdateGame, form } = useGames()
  
  useEffect(() => {
    if (game) {
      form.setFieldsValue({
        name: game.name,
        price: game.price,
        extra_time_price: game.extra_time_price,
      });
    }
  }, [game])
  const onFinish =async (values) => {
    if (!game) {
      await handleAddGame(values)
      setIsModalOpen(false)
      message.success('Game added successfully!');
    } else {
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
        name: game?.name,
        price: game?.price,
        extra_time_price: game?.extra_time_price
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
        <Input type="number" />
      </Form.Item>
      <Form.Item
        
        label="Extra Time Price"
        name="extra_time_price"
        initialValue={game?.extra_time_price || 0}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{}}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GameForm;
