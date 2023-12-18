import React, {useEffect, useState} from 'react';
import axios from "axios";
import Chart from "../component/Chart";
import {useLocation} from "react-router-dom";
import {useUser} from "../../UserContext";

const DefaultPage = (props) => {
    const {user} = useUser()
    const [selectedFileContent, setSelectedFileCOntent] = useState(null);
    const [charts, setCharts] = useState([]);
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
        const fetchCsvFile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_file`,
                    {params: {userId: user, fileId: location.state._id}});
                setSelectedFileCOntent(response.data?.csvFiles);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };


        const fetchCharts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_charts`,
                    {params: {userId: user, projectId: location.state._id}});
                console.log("Charts = ", response.data?.charts)
                setCharts(response.data?.charts);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

        fetchCsvFile();
        fetchCharts();
    }, [location]);


    return (
        <div>
            <div>
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
                            charts && charts.map((chart)=> {
                                return <Chart chart={chart} data={selectedFileContent.csvContent}/>
                            })

                        }
            </div>
            <button className="border border-gray-600 p-2 rounded" onClick={() => {
            }}>New Chart
            </button>
            {
                selectedFileContent && selectedFileContent?.csvContent &&
                <Chart title={"Untitled"} data={selectedFileContent.csvContent} chart={{projectId: location.state._id, ownerId:user}}/>
            }
        </div>
    );
};

export default DefaultPage;