import React from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert.tsx";
import {Button, styled} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


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
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button>
        </form>
    );
};
