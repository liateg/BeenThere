import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
const app = express();
const port = 3000;
const db=new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "country",
  //put your password here  password: "000000", make sure its string
  port: 5432,
})

db.connect()
let visited_countrys_code=[]
let countrys_name=[]
let countrys_code=[]

//loading the data from countries to check newly added destination

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const country='visited_countrys'.split(',')
app.get("/", async (req, res) => {
  db.query("SELECT country_code FROM visited_country",(err,res)=>{
    if(err){
      console.error("Error loading database"+err.stack)
    }else{
  visited_countrys_code=res.rows.map(e=>e.country_code) //passing only the code
  // visited_countrys_name=res.rows.map(e=>e.country_name)
  // ).map((country)=>{country.country_code})
    }
    
  })
  //Write your code here.
  // res.send(visited_countrys[6])

  res.render("index.ejs",{countries:visited_countrys_code,total:visited_countrys_code.length})
  // console.log(typeof(visited_countrys))
  // console.log(typeof(country))

});
app.post("/add",async(req,res)=>{

 try {let result={}
  // console.log(req.b)
  let input=req.body.country[0].toUpperCase() + req.body.country.slice(1).toLowerCase()
  // console.log(`input: ${input}`)
  try{
    result=await db.query("SELECT country_name, country_code FROM country WHERE country_name LIKE $1 ",[`%${input}%`])
    console.log(result.rows)
  }catch(e){
    console.error("Problem loading your input , try again"+e)
  }
  
  
  countrys_name=result.rows.map(e=>e.country_name)
  countrys_code=result.rows.map(e=>e.country_code)
  //fix case sensetivity


// let id =countrys_name.indexOf(req.body.country)
// console.log(countrys_name)
// console.log(id+'\n'+req.body.country+'\n'+countrys_code[id]+'\n'+countrys_name[id])
// if(id>0){

 try{db.query("INSERT INTO visited_country (country_code) values($1)",[countrys_code[0]])
    res.redirect('/')}catch(err) {console.log(`${input} is already on the list, try again ${err.name}`)}

  
  

// }else{

// }
}catch(err){
  console.error(`${input} is already on the list, try again ${err.name}`)
  res.render("index.ejs",{error:err.message})
}

})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
