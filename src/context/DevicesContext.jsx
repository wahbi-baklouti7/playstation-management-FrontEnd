import { createContext, useContext, useEffect, useState } from "react";
import {
    changeDeviceStatus,
  createDevice,
  deleteDevice,
  getAllDevices,
  updateDevice,
} from "../services/DevicesService";
import { Form } from "antd";

const devicesContext = createContext();

const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeviceActive, setIsDeviceActive] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    const result = await getAllDevices();
    setDevices(result);
      setIsLoading(false);
      // console.log("!!!!!!!!!!!!!!! useEffect devices contest "+JSON.stringify(result));

  };

  const handleDelete = async (id) => {
    await deleteDevice(id);
    const updatedDevices = devices.filter((device) => device.id !== id);
    setDevices(updatedDevices);
  };

  // const addDevice = () => {
  //     createDevice(values).then((res) => {
  //         if (res.status) {
  //             setDevices((prev) => [...prev, res.data]);
  //             setIsModalOpen(false);
  //         } else {
  //             form.setFields([
  //                 {
  //                     name: 'name',
  //                     errors: [res.message],
  //                 },
  //             ])
  //         }

  //     });
  // }

  const handleAddDevice = async (values) => {
    const res = await createDevice(values);
    // createDevice(values).then((res) => {
      if (res.status) {
        setDevices((prev) => [...prev, res.data]);
        form.resetFields();
        // onSuccess();
        // setIsModalOpen(false);
      } else {
        form.setFields([
          {
            name: "name",
            errors: [res.message],
          },
        ]);
      }
    // });
  };

  const handleUpdateDevice = (deviceId, values, onSuccess) => {

    updateDevice(deviceId, values).then((res) => {
      if (res.status) {
        setDevices((prev) =>
          prev.map((d) => (d.id === res.data.id ? res.data : d))
        );
        onSuccess();
      } else {
        form.setFields([
          {
            name: "name",
            errors: [res.message],
          },
        ]);
      }
    });
  };

  const handleUpdateDeviceStatus = async (deviceId) => {
    const response = await changeDeviceStatus(deviceId);

    if (response.status) {
      setDevices((prev) =>
        prev.map((d) => (d.id == response.data.id ? { ...d, is_active: response.data.is_active }: d))
      );
    }
  };

  return (
    <devicesContext.Provider
      value={{
        devices,
        isLoading,
        form,
        fetchDevices,
        handleDelete,
        handleAddDevice,
              handleUpdateDevice,
        handleUpdateDeviceStatus,
      }}
    >
      {children}
    </devicesContext.Provider>
  );
};

export default DevicesProvider;

export const useDevices = () => {
  return useContext(devicesContext);
};
