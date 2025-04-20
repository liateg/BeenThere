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
let visited_countrys_code=[]
let countrys_name=[]
let countrys_code=[]
db.query("SELECT country_code FROM visited_country",(err,res)=>{
  if(err){
    console.error("Error loading database"+err.stack)
  }else{
visited_countrys_code=res.rows.map(e=>e.country_code) //passing only the code
// visited_countrys_name=res.rows.map(e=>e.country_name)
// ).map((country)=>{country.country_code})
  }
  
})
//loading the data from countries to check newly added destination

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const country='visited_countrys'.split(',')
app.get("/", async (req, res) => {
  const result =await db.query("SELECT country_code FROM visited_country")
  visited_countrys_code=result.rows.map(e=>e.country_code) //passing only the code
  //Write your code here.
  // res.send(visited_countrys[6])

  res.render("index.ejs",{countries:visited_countrys_code,total:visited_countrys_code.length})
  // console.log(typeof(visited_countrys))
  // console.log(typeof(country))

});
app.post("/add",async(req,res)=>{
  const result=await db.query("SELECT country_name,country_code FROM country")
  
  countrys_name=result.rows.map(e=>e.country_name)
  countrys_code=result.rows.map(e=>e.country_code)
  //fix case sensetivity


let id =countrys_name.indexOf(req.body.country)
console.log(countrys_name)
console.log(id+'\n'+req.body.country+'\n'+countrys_code[id]+'\n'+countrys_name[id])
if(id>0){
  db.query("INSERT INTO visited_country (country_code) values($1)",[countrys_code[id]])
res.redirect("/")
}else{
  console.error(`invalid input : ${req.body.country}`)
}
})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
