import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
const app = express();
const port = 3000;
const db=new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "country",
  password: "654123",
  port: 5432,
})

db.connect()
let visited_countrys=[]
db.query("SELECT country_code FROM visited_country",(err,res)=>{
  if(err){
    console.error("Error loading database"+err.stack)
  }else{
visited_countrys=res.rows.map(e=>e.country_code)
// ).map((country)=>{country.country_code})
  }
  db.end()
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const country='visited_countrys'.split(',')
app.get("/", async (req, res) => {
  //Write your code here.
  // res.send(visited_countrys[6])

  res.render("index.ejs",{countries:visited_countrys,total:visited_countrys.length})
  // console.log(typeof(visited_countrys))
  // console.log(typeof(country))

});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
