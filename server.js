require('dotenv').config();
const cors = require('cors');
const express =require('express');
const mongoose= require('mongoose');
const app =express();
const port = process.env.PORT;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


const EmpRoutes=require("./Routes/Employe.Routes")
const EntRoutes=require("./Routes/Entreprise.Routes")
const OfferRoutes=require("./Routes/Offer.Routes")
const QuestionRoutes=require("./Routes/Question.Routes")
const ThemeRoutes=require("./Routes/Theme.Routes");
const CvRoutes=require("./Routes/Cv.Routes");
const ResualtatRoutes=require('./Routes/Resultat.Routes')
const ReponseRoutes=require('./Routes/Reponse.Routes')
app.use("/",EmpRoutes)
app.use("/",EntRoutes)
app.use("/",OfferRoutes)
app.use("/",QuestionRoutes)
app.use("/",ThemeRoutes)
app.use("/",CvRoutes)
app.use('/uploads', express.static('uploads'));
app.use('/',ResualtatRoutes)
app.use("/",ReponseRoutes)
//concction to database

mongoose.connect(process.env.MONGO_URI).then(()=>{
    
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error conneting to MongoDB:",err);
});


app.listen(port,()=> {
    console.log(`App is running on port :${port}`);
});