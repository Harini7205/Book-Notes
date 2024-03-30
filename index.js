import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app=express();
const port=3000;
let sort="title";

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"books",
    password:"harini",
    port:5432,
});
db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
    let books=[];
    try{
        const result=await db.query(`SELECT * FROM books ORDER BY ${sort}`);
        books=result.rows;
        books.forEach((val)=>{
            val.image=val.image.toString("base64");
        })
        res.render("index.ejs", {books});   
    }
    catch(err){
        console.log(err);
        res.render("index.ejs",{books});
    }     
});

app.post("/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/sort",(req,res)=>{
    sort=req.body.sort;
    res.redirect("/");
})

app.post("/add",async (req,res)=>{
    const isbn=req.body.isbn;
    const title=req.body.title;
    const author=req.body.author;
    const rating=req.body.rating;
    const review=req.body.review;
    try{
        const result=await db.query("SELECT * FROM books WHERE isbn=$1",[isbn]);
        if (result.rows.length>0){
            await db.query("UPDATE books SET rating=$1,review=$2 WHERE isbn=$3",[rating,review,isbn]);
            res.redirect("/");
        }
        else{
            const response= await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,{responseType:'arraybuffer'});
            const image = Buffer.from(response.data,"binary");
            await db.query("INSERT INTO books(isbn,title,author,rating,review,image) VALUES($1,$2,$3,$4,$5,$6)",[isbn,title,author,rating,review,image]);
            res.redirect("/");
        }
    }
    catch(err){
        console.log(err);
    }
})

app.post("/search",async (req,res)=>{
    const searchText=req.body.search;
    try{
        const result=await db.query("SELECT * FROM books WHERE title LIKE ($1) || '%';",[searchText])
        console.log(result.rows);
        if (result.rows.length>0){
            const books=result.rows;
            books.forEach((val)=>{
                val.image=val.image.toString("base64");
            })
            res.render("index.ejs",{books});
        }
        else{
            res.send("No matching books found! Please try using a different keyword.")
        }
    }
    catch(err){
        console.log(err);
    }
})

app.get("/book",(req,res)=>{
    const isbn=req.query.isbn;
    const title=req.query.title;
    const author=req.query.author;
    const rating=req.query.rating;
    const review=req.query.review;
    const exist={
        isbn: isbn,
        title: title,
        author: author,
        rating:rating,
        review:review
    };
    res.render("new.ejs",{exist});
})

app.get("/delete",async (req,res)=>{
    const isbn=req.query.isbn;
    try{
        await db.query("DELETE FROM books WHERE isbn=$1",[isbn]);
        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
});
