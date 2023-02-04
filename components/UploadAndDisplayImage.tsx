import axios from "axios";
import { useEffect, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<any>(null);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);

  const uploadFile = async () => {
    setUploadingStatus(true);

    let { data } = await axios.post("/api/upload", {
      name: `images/user_uploads/${file.name}`,
      type: file.type,
    });

    const url = data.url;
    await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });
    setUploadingStatus(false);
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      const uploadedFileDetail = async () => await uploadFile();
      uploadedFileDetail();
    }
  }, [file]);

  return (
    <>
        {uploadingStatus ? (<p>Loading...</p>) : (
            <input
            type="file"
            accept="image/*"
            name="image"
            id="selectFile"
            onChange={(e: any) => setFile(e.target.files[0])}
            />
        )}

    </>
  );
}

// TODO: rework to use fetch api