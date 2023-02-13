import { useEffect, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<any>(null);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [imgUrl, setImgurl] = useState(null);

  const uploadFile = async () => {
    setUploadingStatus(true);
    
    let fileData = {
      name: file.name,
      type: file.type
    }
  
  const response = await fetch("/api/s3/upload", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
    mode: 'cors',
    body: JSON.stringify(fileData)
    }).then(response => response.json())
    .then(data => {
      return fetch(data.url, {
        method: 'PUT',
        headers: {
          "Content-type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'cors',
        body: JSON.stringify(fileData)
      })})
    .then(res => setImgurl(res.url))
      console.log("Continuing")
      
    const imgResponse = await fetch("/api/s3/classify", {
      method: 'POST',
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
      mode: 'cors',
      body: JSON.stringify(fileData)
    }).then(response => response.json).then(res => console.log(res))
  

  setUploadingStatus(false);
  setFile(null);

}
const classifyImage = async () => {
  // POST to the image url
}


useEffect(() => {
  console.log(file)

}, [file])


  return (
    <>
        {uploadingStatus ? (<p>Loading...</p>) : (
          <>
            <input
            type="file"
            accept="image/*"
            name="image"
            id="selectFile"
            onChange={(e: any) => setFile(e.target.files[0])}
            />
            <button onClick={uploadFile}>Upload</button>
          </>
        )}

    </>
  );
}
