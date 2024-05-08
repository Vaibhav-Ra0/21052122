import express from "express"
import bodyParser from "body-parser"
import https from "https"


const app = express()
app.use(bodyParser.urlencoded({extended : true}))
const port = 3000

app.get("/", function(req,res)
{
    res.sendFile(__dirname+"/");

    app.post("/",   function(req,res){

            const query =req.body.companyName;
            const query2 = req.body.categoryName;
            const n = req.body.n;
            const p = req.body.minPrice;
            const q = req.body.maxPrice;

    const appid = "62feb420e6331cd66795aa0b839cad09";
const url="http://20.244.56.144/test/companies/"+ query +"/categories/ "+query2+"/products?top="+n+"minPrice="+p+"&maxPrice="+query;



https.get(url,function(response)
{
    response.on("data",function (data) { 
        const weatherData= JSON.parse(data);
        const temp= weatherData.main.temp;
        const descriptions = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(imageUrl);
        res.write("<h1>the temperature in "+ query +" is "+ temp + " degree celcius</h1>");
        res.write("description of weather = "+descriptions);
        res.write("<img src="+ imageUrl+ ">");
        res.send();
    
    })

})
    });

})

app.listen(port,()=>{
    console.log("server running on port : 3000")
})