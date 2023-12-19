import React, {useEffect, useState} from 'react';
import {
    LineChart,
    Line,
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from 'recharts';
import axios from "axios";
import {useUser} from "../../UserContext";
import {Checkbox, FormControlLabel} from "@mui/material";
import {AccessibilityNew, Face, Face2, PendingSharp} from '@mui/icons-material';
import {useLocation} from "react-router-dom";
import {useYjs} from "../../YjsContext";
import {BASEUSRL} from "../../constants";


// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
const Chart = ({chart, data}) => {
    const {user} = useUser()
    const {ychartsmap, doc} = useYjs()

    let ychart;
    if (chart._id) {
        ychart = doc.getMap(chart._id);
        if (ychart && chart) {
            ychart.set(chart._id, chart)
            ychart.observeDeep(() => {
                console.log("size", ychart.size)
                console.log("get", ychart.get(chart._id))
            })
        }
    }
    const location = useLocation()
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
            isLocked,
            isOwner: location.state.ownerId === user
        };
        try {
            axios.post(`${BASEUSRL}dashboard/save_chart`, formData).then(
                (response)=>{

                    // ychartsmap.set(chart._id, response.data.chart);
                    ychart.set(chart._id, response.data.chart);
                    // ychartsmap.observe((e) => {
                    //     // console.log("observe after save ", ychartsmap.entries())
                    //     // console.log("observe after save ", ychartsmap.get(chart._id))
                    //     console.log("observe after save ", e.changes, ychartsmap)
                    // })
                }
            )


        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="basis-1/2 border border-gray-400 my-2 rounded p-5 bg-gray-200 gap-2">
            <div className="gap-2 flex flex-row justify-between">
                <div className="flex flex-row justify-between w-full">
                    {chart && chart.title ?
                    <div className="text-lg font-semibold"> {chart.title}
                        {/*<Face/>*/}
                    </div>
                    :
                    <div> Title: <input type="text" onChange={(e) => setNewTitle(e.target.value)}/></div>
                }
                    <div className="flex flex-row"><p className="font-bold">Chart Owner: </p>{chart.ownerId}</div>
                </div>

                {chart._id &&
                    <div className="gap-2">
                        {
                            // user == chart.ownerId || user == project.ownerId?
                            user == chart.ownerId &&
                            <FormControlLabel
                                control={<Checkbox checked={isLocked} disabled={user != chart.ownerId}
                                                   onChange={(e) => {
                                                       setIsLocked(e.target.checked)
                                                   }}/>}
                                label={isLocked ? 'locked' : 'unlocked'}
                            />
                        }

                    </div>
                }

            </div>
            <hr/>
            <div className="gap-2 flex flex-row my-2">
                {
                    // isLocked && user != chart.ownerId && user != project.ownerId?
                    isLocked && user != chart.ownerId ?
                        <div className="flex gap-2">
                            <span className="flex flex-row gap-2"><p className="font-bold">x:</p> {x}</span>
                            <span className="flex flex-row gap-2"><p className="font-bold">y:</p> {y}</span>
                            <span className="flex flex-row gap-2"><p className="font-bold">Chart type:</p> {chartType}</span>
                        </div>
                        :
                        <div className="gap-2">
                            <div className="gap-3 flex flex-row justify-between">
                                <div className="flex flex-row gap-2 w-1/2">
                                    <p className="font-bold">x:</p> <select value={x} onChange={(e) => setX(e.target.value)}>
                                    {columns && columns.map((val) => {
                                        return <option value={val} key={val}>{val}</option>
                                    })}
                                </select>

                                </div>
                                <div className="flex flex-row gap-2  w-1/2">

                                    <p className="font-bold">y:</p> <select value={y} onChange={(e) => setY(e.target.value)}>
                                    {columns && columns.map((val) => {
                                            return <option value={val}  key={val}>{val}</option>
                                        }
                                    )}
                                </select>
                                </div>

                            </div>
                            <div className="flex flex-row gap-2 mt-1">
                                <p className="font-bold">Chart type:</p> <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                                {chartTypes && chartTypes.map((val) => {
                                    return <option value={val} key={val}>{val}</option>
                                })}
                            </select>
                            </div>
                        </div>

                }


            </div>

            {
                x && y && chartType === "Line" &&
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart width={400} height={400} data={data} className="bg-white" margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}>
                        <Line type="monotone" dataKey={y} stroke="#8884d8"/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                    </LineChart>
                </ResponsiveContainer>
            }

            {
                x && y && chartType === "Bar" &&
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart width={400} height={400} data={data} className="bg-white">

                        <CartesianGrid strokeDasharray="3 3"/>
                        <Bar dataKey={y} fill="#8884d8"/>
                        <XAxis/>
                        <YAxis/>
                        <Line type="monotone"/>
                        <Tooltip/>
                        <Legend/>
                    </BarChart>
                </ResponsiveContainer>
            }

            {
                // isLocked && user != chart.ownerId && user != project.ownerId?
                isLocked && user != chart.ownerId ?
                    <div></div>
                    :
                    <button className="border border-gray-600 p-2 mt-5 rounded" onClick={handleSubmit}>Save</button>

            }

        </div>
    );
};

export default Chart;