import { PinataApi } from "api";
const FormData = require("form-data");

export default async function uploadJsonFile(req, res) {
  let IpfsHash = "";

  if (req.method === "POST") {
    const fileName = `${req.body.data.public_key}_${new Date().toISOString()}.json`
    const metadata = JSON.stringify(req.body.data.metadata);

    try {
      const formData = new FormData();
      formData.append("file", metadata, `${fileName}`);

      const res = await PinataApi.post("/pinFileToIPFS", formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      if (res) {
        // console.log(res.data)
        IpfsHash = res.data.IpfsHash

        if (res.data.isDuplicate) {
            return res.status(500).json({
                message: "File content already exist",
            });
        }
      }

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Upload to IPFS fail",
      });
    }
  }
  res.status(200).json({ IpfsHash });
}
