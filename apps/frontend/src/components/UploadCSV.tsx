import React, {FormEvent, useState} from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert.tsx";



// received help from Dan from team o. He fixed some errors.
export default function UploadCSV() {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        if (selectedFile != undefined) {
            console.log(selectedFile.name);
            formData.append("uploadFile.csv", selectedFile);

            console.log(formData);

            const response = await axios.post(
                "/api/admin/csv",
                formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });

            if (response.status == 200) {
                console.log("submitted csv successfully");

                SuccessAlert();
            }
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
       if (event.target.files && event.target.files.length > 0) {
           setSelectedFile(event.target.files[0]);
       }
    };

    return (
        <form onSubmit={(event)=> {handleSubmit(event).then();}}>
            <input type="file" onChange={handleFileSelect}/><br/>
            <button type="submit">Upload File</button>
        </form>
    );
};
