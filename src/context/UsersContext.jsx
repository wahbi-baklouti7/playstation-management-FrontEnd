import { createContext, useContext, useEffect, useState } from "react";
import { createUser, deleteUser, getAllUsers, updateUser } from "../services/UsersService";
import { Form } from "antd";



const usersContext = createContext()


const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [form] = Form.useForm();
    
    useEffect(() => {
      fetchUsers();
    // console.log("!!!!!!!!!!!!!!! useEffect users contest ")
      
    }, [])
  
    const fetchUsers = async () => {
        setIsLoading(true);
      const d = await getAllUsers();
      // console.log("!!!!!!!!!!!!!!! fetch users contest ",JSON.stringify(d))
        setUsers(d);
        setIsLoading(false);
      }

      const handleDelete = async (id) => {
    
        deleteUser(id).then((res) => {
    
          if (res.status) {
            const updatedUser = users.filter((game) => game.id !== id);
            setUsers(updatedUser);
          }
        })
        
  }
  
  const handleAddUser = async (values) => {
    
    const res = await createUser(values);
      if (res.status) {
        setUsers((prev) => [...prev, res.data]);
        form.resetFields();
      } else {
          form.setFields(
              Object.keys(res.errors).map((err) => (
                  {
                      name: err,
                      errors: [res.errors[err]],
                  }
              ))
                  
                );
      
      }
  }

  const handleUpdateUser = (userId,values,onSuccess) => {
    updateUser(userId, values).then((res) => {
      if (res.status) {
        setUsers((prev) =>
          prev.map((d) => (d.id === res.data.id ? res.data : d))
          );
          onSuccess();

         
          
      } else {
        form.setFields(
            // TODO: refactor this to a method an use it in many places
              Object.keys(res.errors).map((err) => ( 
                  {
                      name: err,
                      errors: [res.errors[err]],
                  }
              ))
                  
                );

      }
    });
  }

    return <usersContext.Provider value={{
      users,
      form,
        isLoading,
        fetchUsers,
      handleDelete,
      handleAddUser,
      handleUpdateUser
    }}>

        {children}
    </usersContext.Provider>
}


export default UsersProvider

export const useUsers = () => {
    return useContext(usersContext)
}