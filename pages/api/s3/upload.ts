import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { fileURLToPath } from "url";

const s3 = new S3({
  region: process.env.AWSDEFAULTREGION,
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSSECRETACCESSKEY,
  signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("REQUEST")
  console.log(req.body)
  
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = JSON.parse(req.body);
    
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read"
    };
    console.log("PARAMS")
    console.log(fileParams)
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    console.log("URL")
    console.log(url)
    return res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};