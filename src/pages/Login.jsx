import React, {useState} from 'react';
import {useUser} from "../UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const {login} = useUser();


    const nav = useNavigate()

    const handleLogin = () => {
        if (username) {
            axios.post('http://192.168.106.138:3000/api/users/login', {userId:username}).then(
                (response) => {
                    console.log(response.data);
                    login(username)
                    nav('/app')
                }
            );
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
