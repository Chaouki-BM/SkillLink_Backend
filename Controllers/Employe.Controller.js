const Employe=require('../Models/Employe.model')
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const generator = require('generate-password');
const SendEmailMiddleware = require('../Middleware/NodeMailer');
const Pdf=require('../Models/Cv.model')
const Login_EMP=async(req,res)=>{ 
    try{
    let {email,password}=req.body;
    
    
    let exist=await Employe.findOne({email:email});
    
    if(exist){
        let verifP=await bcrypt.compare(password,exist.password);
        if(verifP){
            if(exist.etat==false){
                const verificationLink = `${process.env.URL_BACK}verification?email=${exist.email}`;
                
                // Construct the email request body
                    let emailData = {
                        to: exist.email,
                        subject: 'Please verify your email address',
                        name: exist.nom+"\t"+exist.prenom,
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

            const Cv=await Pdf.find({Employe:exist._id})
            console.log(Cv);
            
            let token =jwt.sign( { exist:exist._id } , process.env.TOKEN_SECRET, { expiresIn: '24h' });
            console.log(token);
            res.status(200).json({
                success:true,
                message:'welcome back',
                result:{
                    token:token,
                     id: exist._id,
                     etat: exist.etat,
                     avatar: exist.avatar,
                     nom: exist.nom,
                     prenom: exist.prenom,
                     role: exist.role,
                     Cv:Cv
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
    res.status(500).json({message: "Internal server error" });
}
}
// const CodeGenerator=()=>{
//     return generator.generate({
//         length:8,
//         numbers:true,
//         uppercase:true,
//     })
    
// }


const SignIN_Emp=async(req,res)=>{
 let {email,password,nom,prenom,posteT,NumT}=req.body;
 try{
    const existEmp=await Employe.findOne({email})
    if(existEmp)
     return   res.status(400).json({
            success:false,
            message:'employe already exists !'   
        })
        let hash =await bcrypt.hash(password,10);
        const result =await Employe.create({
            email,
            password:hash ,
            avatar:"null",
            nom,
            prenom,
            posteT,
            NumT
        })
        if(result){
            res.status(201).json({
                success:true,
                result:result   
            })
            const verificationLink = `${process.env.URL_BACK}verification?email=${email}`;

            // Construct the email request body
                const emailData = {
                    to: email,
                    subject: 'Please verify your email address',
                    name: nom+"\t"+prenom,
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
        const { email } = req.query;
        const existEmp=await Employe.findOne({email})
        if(existEmp){
           existEmp.etat=true; 
           const updateEtat=await existEmp.save();
           res.redirect(`http://localhost:5173/login`);
        //    res.status(200).json({
        //     success:true,
        //     message:"verification done.",
        //     Employe:updateEtat
        //    })
    
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
    console.log(email);
    
    const existEmp=await Employe.findOne({email})
    if(!existEmp)
        return res.status(400).json({
            success:false,
            message:"Email incorrect"
        })
        const verificationLink = `http://localhost:5173/login/${existEmp._id}`;//bch ya3ml rederaction l page forget password

        // Construct the email request body
            const emailData = {
                to: email,
                subject: 'Reset Your Password',
                name: existEmp.nom+"\t"+existEmp.prenom,
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
        
        
        const existEmp=await Employe.findOne({_id})
        console.log(existEmp);
        
        if(!existEmp)
            return res.status(400).json({
                success:false,
                message:"Email incorrect"})
                
        let hash=await bcrypt.hash(password,10);
        existEmp.password=hash
        const updated=await existEmp.save();
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
const UpAvatar=async(req,res)=>{
    try {
        const userId = req.user.exist; 
        const employe = await Employe.findById(userId);
        console.log(employe);
        if (!employe || employe.role!=="employe") {
            return res.status(404).json({ message: 'Employe not found' });
        }
            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No Avatar uploaded' });   
            }
            // Create a new PDF document with the file path
            employe.avatar=req.file.path
            await employe.save();
    
            res.status(201).json({
                message: 'Avatar uploaded and file path saved to database',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

const getData=async(req,res)=>{
    try{
    const userId = req.user.exist; 
    const employe = await Employe.findById(userId);
    console.log(employe);
    if (!employe || employe.role!=="employe") {
        return res.status(404).json({ message: 'Employe not found' });
    }
    const Cv=await Pdf.find({Employe:userId})
    res.status(200).json({
        success:true,
        nom:employe.nom,
        prenom:employe.prenom,
        posteT:employe.posteT,
        NumT:employe.NumT,
        avatar:employe.avatar,
        CV:Cv
    })
}catch (error) {
    res.status(500).json({ message: error.message });
}
}
const UpdateProfile=async(req,res)=>{
    try{
    const userId = req.user.exist; 
    const employe = await Employe.findById(userId);
    console.log(employe);
    if (!employe || employe.role!=="employe") {
        return res.status(404).json({ message: 'Employe not found' });
    }
    const {nom,prenom,posteT,NumT,avatar}=req.body
    employe.nom=nom
    employe.prenom=prenom
    employe.posteT=posteT
    employe.NumT=NumT
    employe.avatar=avatar
    await employe.save();
}catch (error) {
    res.status(500).json({ message: error.message });
}
}
module.exports={
    Login_EMP,
    SignIN_Emp,
    Forget_Password,
    Verif_Mail,
    update_Password,
    UpAvatar,
    getData,
    UpdateProfile
}