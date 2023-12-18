import React, {useState} from 'react';
import {LineChart, Line, Bar, BarChart, ResponsiveContainer} from 'recharts';
import axios from "axios";
import {useUser} from "../../UserContext";
import {Checkbox, FormControlLabel} from "@mui/material";


// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
const Chart = ({chart, data}) => {
    const {user} = useUser()
    const columns = Object.keys(data[0])
    const chartTypes = ["Bar", "Line"]

    const [newTitle, setNewTitle] = useState(chart.x)
    const [x, setX] = useState(chart.x)
    const [y, setY] = useState(chart.y)
    const [isLocked, setIsLocked] = useState(chart.isLocked)
    const [chartType, setChartType] = useState(chart.chartType)

    const handleSubmit = async () => {
        const formData = {
            userId: user,
            projectId: chart.projectId,
            title: chart.title || newTitle,
            x,
            y,
            chartType,
            isLocked
        };
        try {
            const response = await axios.post('http://localhost:3000/api/dashboard/save_chart', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="basis-1/3 border border-gray-400 my-2 rounded p-5">
            <div className="gap-2 flex flex-row justify-between">
                {chart && chart.title ?
                    chart.title :
                    <div> Title: <input type="text" onChange={(e) => setNewTitle(e.target.value)}/></div>
                }
                <div>

                    <FormControlLabel
                        control={<Checkbox checked={isLocked} disabled={user != chart.ownerId} onChange={(e) => {
                            setIsLocked(e.target.checked)
                        }}/>}
                        label={isLocked ? 'locked' : 'unlocked'}
                    />
                </div>
            </div>
            <hr/>
            <div className="">
                <div className="gap-2 flex flex-row">
                    <div>
                        x: <select value={x} onChange={(e) => setX(e.target.value)}>
                        {columns && columns.map((val) => {
                            return <option value={val}>{val}</option>
                        })}
                    </select>
                    </div>
                    <div>
                        y: <select value={y} onChange={(e) => setY(e.target.value)}>
                        {columns && columns.map((val) => {
                            return <option value={val}>{val}</option>
                        })}
                    </select>
                    </div>
                </div>

                <div>
                    Chart type: <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    {chartTypes && chartTypes.map((val) => {
                        return <option value={val}>{val}</option>
                    })}
                </select>
                </div>
            </div>

            {
                x && y && chartType === "Line" &&
                // <ResponsiveContainer width={400} height={400}>
                <LineChart width={400} height={400} data={data}>
                    <Line type="monotone" dataKey={y} stroke="#8884d8"/>
                </LineChart>
                // </ResponsiveContainer>
            }

            {
                x && y && chartType === "Bar" &&
                // <ResponsiveContainer width="100%" height="100%">
                <BarChart width={400} height={400} data={data}>
                    <Bar dataKey={y} fill="#8884d8"/>
                </BarChart>
                // </ResponsiveContainer>
            }


            <button className="border border-gray-600 p-2 rounded" onClick={handleSubmit}>Save</button>


        </div>
    );
};

export default Chart;