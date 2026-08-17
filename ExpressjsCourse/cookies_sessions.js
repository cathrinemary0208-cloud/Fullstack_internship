//Sending data ffrom frontend to backend is callled post request
//npm i cookie-parser (to print the cookies in correct format)
//npm i express-session (tp use sessions )
//passport js (npm i passport passport-local) to authenticate a user
import express from "express"
import {users} from "./utils/constants.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import { Strategy as LocalStrategy } from "passport-local"
import passport from "passport"
const app = express()

app.use(session( {
    secret:"This is a secret",//for encryption
    saveUninitialized : false,//If there is no data dont save   //FIXED: was "saveUninitialialized" (typo) so express-session ignored it
    resave:false,//dont have to forcefully save the new data
    cookie : //sent as a cookie to browser 
    {
       maxAge :60000*60
    }
  }
))
app.use(passport.initialize())//initializing the passport
app.use(passport.session())//creating a session for it
passport.use(new LocalStrategy({usernameField:"name",passwordField:"password"},(name,password,done)=>
{
   const user = users.find((user)=>user.name === name)
   if(!user)
   {
     return done(null,false,{Message:"Invalid user"})
   }
   if(!user.password == password)
   {
      return done(null,false,{Message:"Password is not matched"})
   }
   return done(null,user)
}));

passport.serializeUser((user,done)=>
{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>
{
   const user = users.find((user)=>
  {
    user.id == id
  })
   done(null,user || false)
})

app.use(cookieParser("Cathy_secret"))//for signed this is like a code word for encryption
app.use(express.json()); //middleware to convert it as a json file


app.get("/",(req,res)=>
{
    //key ,value,options
    console.log(req.session)
    console.log(req.session.id)
    //check cookie BEFORE setting it, else req.cookies never has it on the first hit
    if(req.signedCookies && req.signedCookies.user == "Admin")
    {
         console.log(req.cookies)
         return  res.send({"Message":"This is the root"})
    }
    else
    {
      res.cookie("user","Admin",{maxAge:600000,signed:true})// added signed:true so it matches the req.signedCookies check above
      return res.send({msg:"You are not an admin"})
    }
    
    
    
})

app.get("/api/users_",(req,res)=>
{
    
    //checks if the name user == admin
    //req.signedCookies is an object, so compare req.signedCookies.user, not the whole object
    if(req.signedCookies && req.signedCookies.user === "Admin")
    {
        console.log(req.cookies)
        const {query:{filter,value}} = req
        if(filter&&value)
      {
       return res.send(users.filter((user) => String(user[filter]).toLowerCase().includes(value.toLowerCase())));
      }
       res.send(users)
    }
    else
      {
        res.cookie("user","Admin",{maxAge:60000*6,signed:true})//stores in browser
        return res.send({msg :"You are not the admin "})
      }
    
})

app.get("/api/users",(req,res)=>   
{
  
  req.session.visited = true; //keep track of session (it remembers it ) making changes,stored in server
  console.log(req.session)
  req.sessionStore.get(req.session.id,(err,sessionData)=>
  {
    if(err)
    {
      console.log(err)
    }
    else
    {
      console.log(sessionData)
    }
  })
    res.cookie("user","Admin",{maxAge:60000*6,signed:true})//stores in 
    return res.send(users)
    

 
})


//To login

app.post("/login",(req,res,next)=>
{
   //authenticate in local storage
    passport.authenticate("local",(err,user,info)=>
    {
      if(err)
      {
        return next(err);
      }
      //check if user present
      if(!user)
      {
        res.status(401).send({message:info?.message || "Login successful"})
      }
      //calls serializeUser and stores the user id in req.session
      req.logIn(user,(err)=>
      {
        if(err)
        {
           return next(err);
        }
        return res.json({Message:"Login successful",user})
      })
    })(req,res,next)
});

app.listen(3000,()=>{
    console.log("Server is listening...")
})


//sessions is stored in server as well when the response is sent it is passed as a cookie
//based on the session it sends the relevant data 
//Resave - when the user already havee 5 items in the cart ,so when he just browsers a page 
//we dont have to forcefully update it even if there is no data