
const Entreprise=require('../Models/Entreprise.model')
const Offer=require('../Models/Offer.model')




const CreateOffer=async(req,res)=>{
    try{
        const {description,titre,experience,Contract,lieu}=req.body
        const userId = req.user.exist._id;
        
        
        const enterprise = await Entreprise.findById(userId);
        console.log(enterprise);
        
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const newOffer = new Offer({
            description,
            titre,
            experience,
            Contract,
            lieu,
            Enterprise: userId  // Associate with the enterprise
        });
        await newOffer.save(); 
        return res.status(201).json({
            message: 'Offer created successfully',
            offer: newOffer
        });
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        })
    }
}

const DeleteOffer=async(req,res)=>{
    try{
        const userId = req.user.exist._id;
        const enterprise = await Entreprise.findById(userId);
        
        
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const {id}=req.body
        if (!id) {
            return res.status(400).json({ message: 'Offer ID is required' });
        }
        const DeleteOffer=await Offer.deleteOne({Enterprise:enterprise._id,_id:id})
        console.log(DeleteOffer);
        
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}
const GetAllOffer=async(req,res)=>{
    try{
        const userId = req.user.exist._id;
        const enterprise = await Entreprise.findById(userId);
        
        
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const AllOffer=await Offer.find({Enterprise:enterprise._id}).populate({path:'Enterprise',select:'avatar nom'})
        res.status(200).json({
            success:true,
            resault:AllOffer
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}

const GetOfferById=async(req,res)=>{
    try{
        const userId = req.user.exist._id;
        const enterprise = await Entreprise.findById(userId);
        const OfferId=req.body.OfferId
        
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const AllOffer=await Offer.findById({Enterprise:enterprise._id,_id:OfferId}).populate({path:'Enterprise',select:'avatar nom siteW CodePostal description'})
        res.status(200).json({
            success:true,
            resault:AllOffer
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}

module.exports={CreateOffer,DeleteOffer,GetAllOffer,GetOfferById}