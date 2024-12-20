const Employe=require('../Models/Employe.model')
const Entreprise=require('../Models/Entreprise.model')
const Offer=require('../Models/Offer.model')
const Theme = require('../Models/theme.model')
const Resultat=require('../Models/Resultat.model')



const CreateOffer=async(req,res)=>{
    try{
        const {description,titre,experience,Contract,lieu,exigence,mession,motCle}=req.body
        //motcle tab rahou tab3thou hakka motcle:["node js","js","html"]
        // haw exemple mt3 body kifh lazem ykoun 
        // {
        //     "description": "This is the job description",
        //     "titre": "Job Title",
        //     "experience": "3 years",
        //     "Contract": "Full-time",
        //     "lieu": "Tunis",
        //     "exigence": "Specific requirements",
        //     "mession": "Job mission",
        //     "motCle": ["JavaScript", "React", "Node.js"] 
        // }
        
        const userId = req.user.exist;
        
        
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
            exigence,
            mession,
            Enterprise: userId  // Associate with the enterprise
            
        });
        await newOffer.save(); 
        if (Array.isArray(motCle) && motCle.length > 0) {
            const themes = motCle.map(keyword => ({
                motCle: keyword,
                offer: newOffer._id
            }));

            await Theme.insertMany(themes); 
        }
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
        const userId = req.user.exist;
        const enterprise = await Entreprise.findById(userId);
        
        
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const {id}=req.body
        if (!id) {
            return res.status(400).json({ message: 'Offer ID is required' });
        }
        await Offer.deleteOne({Enterprise:enterprise._id,_id:id,})
        await Resultat.deleteMany({ offer: id });
       
        res.status(200).json({
            success:true
        })
        
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}

//mregl hani traj3 l offer wel theme mta3ou lel entreprise trj3 kan l offer elli 3mlethom
const GetAllOfferEnt=async(req,res)=>{
    try{
        const userId = req.user.exist;
        const enterprise = await Entreprise.findById(userId);
        
        
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        
        const AllOffer=await Offer.find({Enterprise:userId}).populate({path:'Enterprise'}).lean()
        const offersWithThemes = await Promise.all(AllOffer.map(async (offer) => {
            const themes = await Theme.find({ offer: offer._id }).lean(); 
            return {
                ...offer,
                themes
            };
        }));
        console.log(offersWithThemes._doc);
        
        res.status(200).json({
            success: true,
            result: offersWithThemes
        });
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}

//hathi lel employe hani trj3 kol chy zada l offer lkoll
const GetAllOfferEmp=async(req,res)=>{
    try{
        const userId = req.user.exist; 
    
    
    const employe = await Employe.findById(userId);
    if (!employe || employe.role!=="employe") {
        return res.status(404).json({ message: 'Employe not found' });
    }
        const AllOffer=await Offer.find().populate({path:'Enterprise'}).lean()
        const offersWithThemes = await Promise.all(AllOffer.map(async (offer) => {
            const themes = await Theme.find({ offer: offer._id }).lean(); 
            return {
                ...offer,
                themes
            };
        }));
        
        res.status(200).json({
            success: true,
            result: offersWithThemes
        });
    }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}
//hathi mregl hayy exemple mt3 data trj3ha 
// {
//     "success": true,
//     "resault": {
//       "_id": "67471edb8224a69ddd038887",
//       "description": "This is the job description",
//       "titre": "Job Title",
//       "experience": "3 years",
//       "Contract": "Full-time",
//       "lieu": "Tunis",
//       "mession": "Job mission",
//       "exigence": "Specific requirements",
//       "Enterprise": {
//         "_id": "6746cec215b3ee74f162d7a3",
//         "avatar": "null",
//         "nom": "blblb",
//         "description": "gggggg",
//         "siteW": "gggg",
//         "CodePostal": "5021"
//       },
//       "createdAt": "2024-11-27T13:30:03.086Z",
//       "updatedAt": "2024-11-27T13:30:03.086Z",
//       "__v": 0
//     }
//   }
const GetOfferById=async(req,res)=>{
    try{
        const userId = req.user.exist; 
       /* const employe = await Employe.findById(userId);
        if (!employe || employe.role!=="employe" ){
            return res.status(404).json({ message: 'Employe not found' });
        }*/
        const { offerId } = req.params;
        console.log(offerId);
        const offer = await Offer.findById(offerId).populate({
            path: 'Enterprise',
            select: 'avatar nom siteW CodePostal description address'
        });
        console.log(Offer);
        res.status(200).json({
            success:true,
            resault:offer
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }
}
const ChangeStatus=async(req,res)=>{
try{
    const userId = req.user.exist;
    const enterprise = await Entreprise.findById(userId);
    if (!enterprise || enterprise.role!=="entreprise") {
        return res.status(404).json({ message: 'Enterprise not found' });
    }
    const OfferId=req.body.OfferId
    console.log(req.body.OfferId);
    
    const GetOffer=await Offer.findById({Enterprise:userId,_id:OfferId})
    if(GetOffer.Status==true){
        GetOffer.Status=false
        const updated=await GetOffer.save();
        if(updated)
        res.status(201).json({
            success:true,
            message:'Status change to false.',
        })
    }else{
        GetOffer.Status=true
        const updated=await GetOffer.save();
        if(updated)
        res.status(201).json({
            success:true,
            message:'status change to true.',
            
        })
    }
    

 }catch(err){
        res.status(500).json({
            message:"Internal server error !"
        }) 
    }

}
const UpdateOfferById = async (req, res) => {
    try {
        const userId = req.user.exist;
        const enterprise = await Entreprise.findById(userId);
        if (!enterprise || enterprise.role!=="entreprise") {
            return res.status(404).json({ message: 'Enterprise not found' });
        }
        const { offerId } = req.params; 
        const updates = req.body; 

        console.log({updates});
        
        const updatedOffer = await Offer.findByIdAndUpdate(
            offerId,
            updates,
            { new: true, runValidators: true } 
        );
        const { motCle, ...otherFields } = updates;
        const deleteThemes= await Theme.deleteMany({offer:offerId})
        if ( motCle.length > 0) {
            const themes = motCle.map(keyword => ({
                motCle: keyword,
                offer: offerId
            }));

            await Theme.insertMany(themes); 
        }

        
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        
        res.status(200).json({
            success: true,
            message: 'Offer updated successfully',
            data: updatedOffer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error!'
        });
    }
};

module.exports={CreateOffer,DeleteOffer,GetAllOfferEnt,GetOfferById,GetAllOfferEmp,ChangeStatus,UpdateOfferById}