import React, {useEffect, useState} from 'react';
import axios from "axios";
import Chart from "../component/Chart";
import {useLocation} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import Select from 'react-select'
import AsyncSelect from "react-select/async";
import {useYjs} from "../../context/YjsContext";
import ChartsGrid from "../../components/common/ChartsGrid";
import ProjectsGrid from "../../components/common/ProjectsGrid";
import {BASEUSRL} from "../../constants";

const DefaultPage = (props) => {
    const {user} = useUser()
    const {yarray} = useYjs()
    const [newChart, setNewChart] = useState(null);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [charts, setCharts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)


        const loadUsers = async () => {
            try {
                axios.get(`${BASEUSRL}users/all/${user}`).then((response) => {
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
                const response = await axios.get(`${BASEUSRL}dashboard/get_file`,
                    {params: {userId: user, fileId: location.state._id, isOwner:location.state.ownerId===user}});
                setSelectedFileContent(response.data?.csvFiles);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };


        const fetchCharts = async () => {
            try {
                const response = await axios.get(`${BASEUSRL}dashboard/get_charts`,
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
        const response = await axios.post(`${BASEUSRL}dashboard/add_user`,
                    {userId:selectedUser, ownerId:user, projectId:location.state._id});
    };

const collaborators = users.map(pair => pair.label);
    return (
        <div className="flex flex-1 flex-col ">
            <div>
                <div className="flex flex-row gap-4 items-center w-full">
                    <button className="border border-gray-600 p-2 rounded" onClick={()=>{

                              const randomNumberBetweenZeroAndTen = Math.floor(Math.random() * 10);
                              yarray.push([randomNumberBetweenZeroAndTen]);
                              yarray.observe(() => {
                                console.log(yarray)
                              });
                    }}>
                        Test Y JS
                    </button>
                    <p>
                        {
                            // yarray && yarray.join("-")
                        }
                    </p>
                    <Select
                        className="w-52"
                        options={users}
                        isSearchable
                        isClearable
                        isMulti={false}
                        onChange={handleSearch}/>
                    <button className="border border-gray-600 p-2 rounded" onClick={addUser}>
                        Add user
                    </button>
                    <div className="right-0 flex flex-row"><p className="font-bold">Dashboard owner:</p> {location.state.ownerId}</div>
                    <div className="right-0 flex flex-row"><p className="font-bold">Collaborators:</p> {collaborators.join(', ')}</div>
                </div>
                <table className="bg-white p-2 pt-4">
                    {
                        selectedFileContent &&
                        selectedFileContent?.csvContent.map((row, i) => {
                            if (i > 10) {
                                return null
                            }
                            return <tbody key={i}>
                                {i == 0 && <tr className="border border-gray-300 border-1 p-1" key={i}>
                                    {Object.keys(row).map((val) => {
                                        return <th className="p-2" key={val}>{val}</th>
                                    })}
                                </tr>
                                }
                                <tr className="border border-gray-300 border-1 p-1">
                                    {Object.keys(row).map((val) => {
                                        return <td className="p-2"  key={val}>{row[val]}</td>
                                    })}
                                </tr>
                            </tbody>
                        })
                    }
                </table>
            </div>
            <div className="flex w-500 h-500 border-1  border-gray-600 bg-yellow w-full">

            {
                selectedFileContent &&  charts  &&
                <ChartsGrid numRows={charts.length > 2 ? charts.length/2 : charts.length} numCols={charts.length > 2 ? 2 : charts.length} charts={charts} csvContent={selectedFileContent.csvContent}/>

            }
            </div>
            <button className="border border-gray-600 p-2 rounded w-52" onClick={ () => {
                setNewChart(true)
            }}>
                Add New Chart
            </button>
            {
                newChart && selectedFileContent && selectedFileContent?.csvContent &&
                <Chart title={"Untitled"} data={selectedFileContent.csvContent}
                       chart={{projectId: location.state._id, ownerId: user}}/>
            }
        </div>
    );
};

export default DefaultPage;