const Entreprise=require('../Models/Entreprise.model')
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const SendEmailMiddleware = require('../Middleware/NodeMailer');

const Login_Ent=async(req,res)=>{
    
    try{
        let {email,password}=req.body;
        
        let exist=await Entreprise.findOne({email:email});
        if(exist){
            let verifP=await bcrypt.compare(password,exist.password);
            if(verifP){
                if(exist.etat==false){
                    const verificationLink = `http://127.0.0.1:3500/verificationEnt?email=${exist.email}`;
    
                    // Construct the email request body
                        const emailData = {
                            to: exist.email,
                            subject: 'Please verify your email address',
                            name: exist.nom,
                            link: verificationLink,
                            buttonText:'Verify Your Account',
                            emailMessage:'Thank you for signing up! To complete your registration, please click the button below:'
                        }; 
                 SendEmailMiddleware({ body: emailData }, res); 
                    return res.status(401).json({
                        success:false,
                        message:'You need to verify your email first!',
                    })
                }
    
    
                let token =jwt.sign( {exist} , process.env.TOKEN_SECRET, { expiresIn: '24h' });
                console.log(token);
                res.status(200).json({
                    success:true,
                    message:'welcome back',
                    result:{
                        token:token,
                    }
                })
                
            }else{
                res.status(400).json({
                    success:false,
                    message:'password incorrect'
                }) 
            }
    
        }else{
            res.status(400).json({
                success:false,
                message:'Email incorrect'
            })
        }
    }catch(error){
       
        res.status(500).json({ message: "Internal server error" });
    }
}
const SignIN_Ent=async(req,res)=>{
    let {email,password,nom,description,address}=req.body;
    try{
       const existEnt=await Entreprise.findOne({email})
       if(existEnt)
        return   res.status(400).json({
               success:false,
               message:'Entreprise already exists !'   
           })
           let hash =await bcrypt.hash(password,10);
           const result =await Entreprise.create({
               email,
               password:hash ,
               address,
               avatar:"null",
               nom,
               description,
           })
           if(result){
               res.status(201).json({
                   success:true,
                   result:result   
               })
               const verificationLink = `http://127.0.0.1:3500/verificationEnt?email=${existEnt._id}`;
   
               // Construct the email request body
                   const emailData = {
                       to: email,
                       subject: 'Please verify your email address',
                       name: nom,
                       link: verificationLink,
                       buttonText:'Verify Your Account',
                       emailMessage:'Thank you for signing up! To complete your registration, please click the button below:'
                   }; 
               SendEmailMiddleware({ body: emailData }, res); 
           }
               
   
       
    }catch(error){
      
       res.status(500).json({ message: "Internal server error" });
   }
}
const Verif_Mail=async(req,res)=>{
    try{
        const { _id } = req.query;
        console.log(email);
        const existEnt=await Entreprise.findById(_id)
        if(existEnt){
            existEnt.etat=true; 
           const updateEtat=await existEnt.save();
           res.status(200).json({
            success:true,
            message:"verification done.",
            Entreprise:updateEtat
           })
    
    }else{
        res.status(400).json({
            success:false,
            message:"Email incorrect"
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Internal server error"
        });
    }
}
const Forget_Password =async(req,res)=>{
    try{
    const {email}=req.body;
    const existEnt=await Entreprise.findOne({email})
    if(!existEnt)
        return res.status(400).json({
            success:false,
            message:"Email incorrect"
        })
        const verificationLink = `http://127.0.0.1:3500/:${existEnt._id}`;//bch ya3ml rederaction l page forget password

        // Construct the email request body
            const emailData = {
                to: email,
                subject: 'Reset Your Password',
                name: existEnt.nom,
                link: verificationLink,
                buttonText:'Reset Password',
                emailMessage:'We received a request to reset the password for your account. If you made this request, click the button below to reset your password:'
            }; 
        SendEmailMiddleware({ body: emailData }, res); 
}catch(err){
    res.status(500).json({
        message:"Internal server error"
    })
}
}
const update_Password=async(req,res)=>{
    try{
        const {_id}=req.params;
        const {password}=req.body;
        
        
        const existEnt=await Entreprise.findById(_id)
        console.log(existEnt);
        
        if(!existEnt)
            return res.status(400).json({
                success:false,
                message:"Email incorrect"})
                
        let hash=await bcrypt.hash(password,10);
        existEnt.password=hash
        const updated=await existEnt.save();
        if(updated)
        res.status(201).json({
            success:true,
            message:'Password Updated.',
            result:updated
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports={Login_Ent,SignIN_Ent,Verif_Mail,Forget_Password,update_Password}