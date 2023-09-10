const express = require("express")
const app = express()
const session = require("express-session");

const {MongoClient} = require("mongodb")
const uri = require("./atlas_uri")
console.log(uri)
var bodyParser = require("body-parser")
const { default: mongoose } = require("mongoose")

const client = new MongoClient(uri)
const db = "vault"
const credentials = client.db(db).collection("credentials")
const connectToDatabase = async() => {
    try {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db("vault");
        console.log("Connected to the database");
        return db;
    }
    catch (err){
        console.error("Error connecting to database")
    }
}

const main = async() =>{
    try{
        await connectToDatabase();
        // let result = await credentials.insertOne(submit())
    }
    catch(err){
console.error("Error connecting",err)
    }
    // finally{
    //     await client.close()
    // }
}

main();


app.use(bodyParser.json());
app.use(express.static('./'));
app.use(express.urlencoded({
    extended:false
}))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')

app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false
    })
  );

const DBSchema = {
    username : String,
    password : String,
    email : String,
    url : String
}
const cred = mongoose.model('cred', DBSchema)
app.post("/add", function(req,res){
    var username = req.body.username;
    var email =req.body.email;
    var password = req.body.password;
    var url =req.body.url;
    var useremail = req.session.useremail
    var data = {
        "username": username,
        "email":email,
        "password":password,
        "url":url
    }
    // var collectionName = useremail.toString();
    console.log(req.app.locals.collectionNameUser)
    addcred = client.db(db).collection(req.app.locals.collectionNameUser)
    addcred.insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('add.html');
})

app.post('/signup',function(req,res){
    var email = req.body.email
    var password = req.body.password
    var signupcred = client.db(db).collection('user')
    var data ={
        "useremail":email,
        "userpassword":password
    }
    signupcred.insertOne(data, function(err,collection){
        if (err) throw err;
        console.log("user inserted successfully")
    })

    return res.redirect('signup.html')
})

// app.get('/',function(req,res){
//     res.set({
//         'Access-control-Allow-Origin': '*'
//         });
//     return res.redirect('main.html');
//     }).listen(3000)

app.post('/login',async function(req,res){
    var useremail = req.body.email
    var userpassword = req.body.password

    var user = client.db(db).collection('user')
    logincred = await user.findOne({"useremail":useremail})
    // console.log(req.body)
    // res.send(logincred)
    // console.log(logincred)
    
    if (logincred && logincred.userpassword==userpassword){
        //  res.send('login successful')
        req.session.useremail = useremail
        var login = true
        req.app.locals.login = login
        req.app.locals.collectionNameUser = useremail
        
         return res.redirect('loginsuccess.html');
    }
    else if(!logincred){

         res.redirect('/signup')
    }
    else{
        res.redirect('loginfail.html')
    }
    
    
})
app.get('/',(req,res) =>{
    res.render('main')
})

app.get('/login',async(req,res)=>{
    res.redirect('login.html')
})

app.get('/signup',async(req,res)=>{
    res.redirect('signup.html')
})

app.get('/vault', async (req, res) => {
    console.log(req.session.useremail)

    if (req.app.locals.login && req.session.useremail){
        findCredUser = await client.db(db).collection(req.session.useremail)
        results = await findCredUser.find({}).toArray()
        res.render('vault',results)


    }
    
//   results.forEach(element => {
        
//   });
});




    
app.listen(3000,function(){
    console.log('port 3000 running')
})
    
   
    

