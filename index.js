import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try {
      const result = await axios.get(`https://image-charts.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(req.body.content)}&choe=UTF-8`);
      res.render("QR-code.ejs", { qrUrl: result.request.res.responseUrl });
    } catch (error) {
      console.log(error.response.data);
      res.status(404).send("Error generating QR code");
    }
  });

app.listen(port, () =>{
    console.log(`Currently listening to ${port}...`);
})