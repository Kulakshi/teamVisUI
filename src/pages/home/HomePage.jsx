import React, {useState, useEffect} from 'react';
import axios from 'axios';

const HomePage = () => {
    const [userId, setUserId] = useState('user1');
    const [csvFile, setCsvFile] = useState(null);
    const [csvFiles, setCsvFiles] = useState([]);

    useEffect(() => {
        const fetchCsvFiles = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_files/${userId}`);
                setCsvFiles(response.data.csvFiles);
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

        fetchCsvFiles();
        const fetchCsvFile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/dashboard/get_file`,
                    {params: {userId: userId, fileId: "65788c6275707a0d04fb390f"}}); //65789161fb2041c975d8176e
                console.log(response)
                // setCsvFiles(response.data.csvFiles);
                //65788c6275707a0d04fb390f
            } catch (error) {
                console.error('Error fetching CSV files:', error);
            }
        };

        fetchCsvFile();
    }, [userId]);

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('csvFile', csvFile);

        try {
            const response = await axios.post('http://localhost:3000/api/dashboard/upload_csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <div>
                <div>
                    <input type="text" placeholder="User ID" onChange={handleUserIdChange}/>
                    <input type="file" onChange={handleFileChange}/>
                    <button onClick={handleSubmit}>Upload File</button>
                </div>
                <div>
                    <h2>CSV Files for User ID: {userId}</h2>
                    <ul>
                        {csvFiles.map((fileName, index) => (
                            <li key={index}>{fileName}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    );
};

export default HomePage;
