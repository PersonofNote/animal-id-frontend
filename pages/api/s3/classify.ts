import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = JSON.parse(req.body);
    const url = process.env.AWS_LAMBDA_URL;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-type": type,
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'cors',
        body: JSON.stringify({name: name, type: type})
      })
      .then(response => {console.log("FINAL"); console.log(response); res.status(200).json(response)})
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};