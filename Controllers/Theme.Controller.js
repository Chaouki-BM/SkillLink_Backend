const Entreprise=require('../Models/Entreprise.model')
const Theme = require('../Models/theme.model')
const AddTheme=async(req,res)=>{
    try{
        const userId = req.user.exist._id; 
        const enterprise = await Entreprise.findById(userId);
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
    
        const { motCle,idOffer}=req.body;
        const newTH=new Theme({
            motCle,
            offer:idOffer,
        })
        await newTH.save()
        return res.status(201).json({
            success:true,
            message:"Theme created successfully"
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error!"
        })
    }
    }
    const GetThemes =async(req,res)=>{
        try {
            const {idOffer}=req.body
        const Themes=await Theme.find({offer:idOffer}).populate({path:'offer'})
        res.status(200).json({
            success:true,
            resault:Themes
        })
        } catch (error) {
            res.status(500).json({
                message:"Internal server error !"
            }) 
        }
    }
    const DeleteTheme=async(req,res)=>{
        try{
            const userId = req.user.exist._id; 
            console.log(userId);
            
            const enterprise = await Entreprise.findById(userId);
            if (!enterprise || enterprise.role!=="entreprise") {
                return res.status(404).json({ message: 'Enterprise not found' });
            }
            const {id,idOffer}=req.body;
            const DeleteTheme=await Question.deleteOne({offer:idOffer,_id:id})
            if(DeleteTheme.deletedCount!=0)
              return res.status(200).json({
            success:true,
            message:"Theme deleted successfully"
            })
    
            res.status(200).json({
                success:false,
                message:"Theme not found!"
                })
            
        }catch(err){
            res.status(500).json({
                message:"Internal server error !"
            })
        }
    }
    module.exports={AddTheme,DeleteTheme,GetThemes}
