import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getLoggedIn = async () => {
        const loggedInRes = await axios.get("http://localhost:3000/users/loggedIn");
        setLoggedIn(loggedInRes.data);
        setIsLoading(false);
        navigate("/");
    }

    useEffect(() => {
      getLoggedIn();
    }, [])

    if (isLoading) {
      return <div>Loading...</div>;
    }
    
  return (
    <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContext;
export {AuthContextProvider};