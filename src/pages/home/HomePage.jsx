import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useUser} from "../../context/UserContext";
import {useNavigate} from "react-router-dom";
import ProjectsGrid from "../../components/common/ProjectsGrid";
import {BASEUSRL} from "../../constants";

const HomePage = () => {
    const {user} = useUser();
    const [newProject, setNewProject] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [projects, setProjects] = useState([]);
    const nav = useNavigate()

        const fetchCsvFiles = async () => {
            try {
                axios.get(`${BASEUSRL}dashboard/get_files/${user}`).then(
                    (response)=>{
                        setProjects(response.data);
                    }
                )

            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

    useEffect(() => {
        if (user) {
            fetchCsvFiles();
        }
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
        } finally {
            setNewProject(false);
        }
    };


    return (
        <>
            <div >
                <button className="border border-gray-600 p-1 rounded" onClick={()=>{setNewProject(true)}}>Create New Project</button>
                {
                    newProject &&
                    <div className="flex flex-col w-1/2 py-5 border-1 gap-4">
                        <input type="text" placeholder="Project Name" onChange={handleProjectChange}/>
                        <input type="file" accept=".csv" onChange={handleFileChange}/>
                        <div className="flex w-full gap-2">

                        <button className="border border-gray-600 p-1 rounded w-1/2" onClick={()=>setNewProject(false)}>Cancel</button>
                        <button className="border border-gray-600 p-1 rounded w-1/2" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                }
                <div>
                    <hr className="my-1"/>
                    <h2 className="text-lg font-bold pt-10">Projects</h2>
                    {
                        projects && projects.length > 0 &&
                        <ProjectsGrid
                        numRows={projects.length > 3 ? Math.ceil(projects.length / 3) : projects.length}
                        numCols={projects.length > 3 ? 3 : projects.length}
                        projects={projects}
                      />                  
                    }
                </div>

            </div>

        </>
    );
};

export default HomePage;
