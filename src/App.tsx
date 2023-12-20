import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import {routes} from "./routes";
import {UserProvider} from './context/UserContext';
import {useYjs, YjsProvider} from "./context/YjsContext";
import {NotificationProvider} from "./context/NotificationContext";

require('./index.css')

function App() {
    return (
        <React.StrictMode>
            <UserProvider>
                <YjsProvider>
                    <NotificationProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/app/" element={<MainLayout/>}>
                                    {routes}
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </NotificationProvider>
                </YjsProvider>
            </UserProvider>
        </React.StrictMode>
    );
}

export default App;
