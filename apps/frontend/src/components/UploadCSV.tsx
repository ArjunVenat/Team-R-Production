import React from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert.tsx";

export default function UploadCSV() {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState<File>();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        console.log(formData);
        const response = await axios({
            method: "post",
            url: "/api/admin/csv",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status == 200) {
            console.log("submitted csv successfully");

            SuccessAlert();
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect}/><br/>
            <button type="submit">Upload File</button>
        </form>
    );
};
