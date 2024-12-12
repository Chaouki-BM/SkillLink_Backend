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
                    const verificationLink = `${process.env.URL_BACK}verificationEnt?email=${exist.email}`;
    
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
                        nom:exist.nom,
                        avatar:exist.avatar,
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
    let {email,password,nom,description,address,siteW,CodePostal}=req.body;
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
               siteW,
               CodePostal
           })
           if(result){
               res.status(201).json({
                   success:true,
                   result:result   
               })
               const verificationLink = `${process.env.URL_BACK}verificationEnt?email=${email}`;
   
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
        const { email } = req.query;
        console.log(email);
        const existEnt=await Entreprise.findOne({email})
        console.log(existEnt);
        if(existEnt){
            existEnt.etat=true; 
           const updateEtat=await existEnt.save();
           res.redirect(`http://localhost:5173/loginEnt`);
        //    res.status(200).json({
        //     success:true,
        //     message:"verification done.",
        //     Entreprise:updateEtat
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
    const existEnt=await Entreprise.findOne({email})
    if(!existEnt)
        return res.status(400).json({
            success:false,
            message:"Email incorrect"
        })
        const verificationLink = `http://localhost:5173/loginEnt/${existEnt._id}`;//bch ya3ml rederaction l page forget password

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


const UpAvatar=async(req,res)=>{
    try {
        const userId = req.user.exist;
        const enterprise = await Entreprise.findById(userId);
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No Avatar uploaded' });   
            }
            // Create a new PDF document with the file path
            enterprise.avatar=req.file.path
            await enterprise.save();
    
            res.status(201).json({
                message: 'Avatar uploaded and file path saved to database',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

// const getData=async(req,res)=>{
//     try{
//         const userId = req.user.exist;
//         const enterprise = await Entreprise.findById(userId);
//         if (!enterprise || enterprise.role!=="entreprise") {
//             return res.status(404).json({ message: 'Enterprise not found' });
//         }
//     res.status(200).json({
//         success:true,
//         nom:employe.nom,
//         prenom:employe.prenom,
//         posteT:employe.posteT,
//         NumT:employe.NumT,
//         avatar:employe.avatar,
//         CV:Cv
//     })
// }catch (error) {
//     res.status(500).json({ message: error.message });
// }
// }
const UpdateProfile = async (req, res) => {
    try {
        const userId = req.user.exist; 
        const { nom, description, address, siteW,CodePostal } = req.body; 
        const enterprise = await Entreprise.findByIdAndUpdate(
            userId, 
            {
                nom,
                description,
                address,
                siteW,
                CodePostal
            }, 
            {
                new: true, 
                runValidators: true, 
            }
        );
        if (!enterprise) {
            return res.status(404).json({ message: 'Enterprise introuvable' });
        }

        res.status(200).json({
            message: 'Votre profil a été mis à jour avec succès',
            data: enterprise, 
        });

    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};
module.exports={Login_Ent,SignIN_Ent,Verif_Mail,Forget_Password,update_Password,UpAvatar,UpdateProfile}