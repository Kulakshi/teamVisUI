import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useUser} from "../../UserContext";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const {user} = useUser();
    console.log(user)
    const [newProject, setNewProject] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [projects, setProjects] = useState([]);
    const nav = useNavigate()

        const fetchCsvFiles = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_files/${user}`);
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

    useEffect(() => {
        fetchCsvFiles();
    }, [user]);

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleProjectChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('userId', user);
        formData.append('name', projectName);
        formData.append('csvFile', csvFile);

        try {
            const response = await axios.post('http://localhost:3000/api/dashboard/new_project', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(()=>fetchCsvFiles());
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <>
            <div >
                <h2>Hello {user && user}</h2>
                <button className="border border-gray-600 p-1 rounded" onClick={()=>{setNewProject(true)}}>Create New Project</button>
                {
                    newProject &&
                    <div className="flex flex-col w-1/2 p-5 border-1">
                        <h2>Create New Project</h2>
                        <input type="text" placeholder="Project Name" onChange={handleProjectChange}/>
                        <input type="file" accept=".csv" onChange={handleFileChange}/>
                        <button className="border border-gray-600 p-1 rounded" onClick={handleSubmit}>Create</button>
                    </div>
                }
                <div>
                    <h2 className="text-lg font-bold">Projects</h2>
                    <ul>
                        {projects && projects.map((ob, index) => (
                            <li key={index} className="p-5 border border-1"
                                onClick={()=>{
                                    nav('/app/dashboard', { state: ob });
                                }}
                            >{ob.projectName || ob.fileName}</li>
                        ))}
                    </ul>
                </div>

            </div>

        </>
    );
};

export default HomePage;
