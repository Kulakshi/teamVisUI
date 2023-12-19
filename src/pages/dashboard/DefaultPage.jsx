import React, {useEffect, useState} from 'react';
import axios from "axios";
import Chart from "../component/Chart";
import {useLocation} from "react-router-dom";
import {useUser} from "../../UserContext";
import Select from 'react-select'
import AsyncSelect from "react-select/async";

const DefaultPage = (props) => {
    const {user} = useUser()
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [charts, setCharts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
        const loadUsers = async () => {
            try {
                axios.get(`http://localhost:3000/api/users/all`).then((response) => {
                    const options = response.data?.users.map((item) => {
                       return  {
                            value: item._id,
                            label: item.username
                        }
                    });
                    setUsers(options);
                });
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

        const fetchCsvFile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_file`,
                    {params: {userId: user, fileId: location.state._id, isOwner:location.state.ownerId===user}});
                setSelectedFileContent(response.data?.csvFiles);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };


        const fetchCharts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_charts`,
                    {params: {userId: user, projectId: location.state._id, isOwner:location.state.ownerId===user}});
                console.log("Charts = ", response.data?.charts)
                setCharts(response.data?.charts);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

        fetchCsvFile();
        fetchCharts();
        loadUsers();
    }, [location]);

    const handleSearch = async (inputValue, callback) => {
        setSelectedUser(inputValue.value)
    };
    const addUser = async () => {
        const response = await axios.post('http://localhost:3000/api/dashboard/add_user',
                    {userId:selectedUser, ownerId:user, projectId:location.state._id});
    };


    return (
        <div>
            <div>
                <div className="flex flex-row">
                    <Select
                        options={users}
                        isSearchable
                        isClearable
                        isMulti={false}
                        onChange={handleSearch}/>
                    <button className="border border-gray-600 p-2 rounded" onClick={addUser}>
                        Add user
                    </button>
                </div>
                <table>
                    {
                        selectedFileContent &&
                        selectedFileContent?.csvContent.map((row, i) => {
                            if (i > 10) {
                                return null
                            }
                            return <>
                                {i == 0 && <tr>
                                    {Object.keys(row).map((val) => {
                                        return <th>{val}</th>
                                    })}
                                </tr>
                                }
                                <tr>
                                    {Object.keys(row).map((val) => {
                                        return <td>{row[val]}</td>
                                    })}
                                </tr>
                            </>
                        })
                    }
                </table>
            </div>
            <div className="flex w-500 h-500 border-1  border-gray-600 bg-yellow ">
                {
                    selectedFileContent && charts && charts.map((chart) => {
                        return <Chart chart={chart} data={selectedFileContent.csvContent}/>
                    })

                }
            </div>
            <button className="border border-gray-600 p-2 rounded" onClick={() => {
            }}>New Chart
            </button>
            {
                selectedFileContent && selectedFileContent?.csvContent &&
                <Chart title={"Untitled"} data={selectedFileContent.csvContent}
                       chart={{projectId: location.state._id, ownerId: user}}/>
            }
        </div>
    );
};

export default DefaultPage;