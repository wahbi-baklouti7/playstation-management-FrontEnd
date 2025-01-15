import { createContext, useContext, useEffect, useState } from "react";
import { deleteSession, getAllSessions } from "../services/SessionsService";



const sessionContext = createContext();

const SessionsProvider = ({ children }) => {
    
    const [sessions, setSessions] = useState([]);
    const [sessionTotal, setSessionTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });

    useEffect(() => {

        fetchSessions(tableParams.pagination.current, tableParams.pagination.pageSize); 
    // console.log("!!!!!!!!!!!!!!! useEffect sessions contest ")

    }, [tableParams.pagination.current,
        tableParams.pagination.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField])

    const fetchSessions = async (page, pageSize) => {
        setIsLoading(true);
        const result = await getAllSessions(page, pageSize);
        // console.log("context " + result.data);
        // console.log("context total " + result.total);
        setIsLoading(false);
        setSessions(result.data);
        setSessionTotal(result.total)
        setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: result.total,
            },
          });
    
    }
    // const loadSessions = async () => {
    //     setIsLoading(true);
    //     const s = await getAllSessions(tableParams.pagination.current, tableParams.pagination.pageSize);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: s.total,
    //       },
    //     });
    //     setSessions(s.data);
    //     setIsLoading(false);
  //   }
  
  const handleDeleteBtn = async (id) => {

    deleteSession(id).then((res) => {

      if (res.status) {
        const updatedSession = sessions.filter((session) => session.id !== id);
        setSessions(updatedSession);
      }
    })
  }

    return <sessionContext.Provider value={{
        sessions,
        sessionTotal,
        tableParams,
        isLoading,
        fetchSessions,
      setTableParams,
      handleDeleteBtn,
      setSessions

    }}>{children}</sessionContext.Provider>;
}


export default SessionsProvider


export const useSessions = () => {
    
    return useContext(sessionContext)
}