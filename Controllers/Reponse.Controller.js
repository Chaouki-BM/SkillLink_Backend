const Reponse=require("../Models/Reponse.model")

const createReponse = async (req, res) => {
    try {
      const { reponse, IdQuestion } = req.body;
  
      // Create new response
      const newReponse = new Reponse({
        reponse,
        Question:IdQuestion,
      });
  
      const savedReponse = await newReponse.save();
      res.status(201).json({
        success: true,
        message: 'Reponse created successfully',
        data: savedReponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create response',
        error: error.message,
      });
    }
  };
  
  // Get all responses
  const getAllReponses = async (req, res) => {
    try {
        const {IdQuestion } = req.body;
      const responses = await Reponse.find({Question:IdQuestion}).populate('Question'); // Populates Question details
      res.status(200).json({
        success: true,
        data: responses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch responses',
        error: error.message,
      });
    }
  };
  
  // Get a single response by ID
  const getReponseById = async (req, res) => {
    try {
      const { idR } = req.body;
      const response = await Reponse.findById({_id:idR}).populate('Question');
  
      if (!response) {
        return res.status(404).json({
          success: false,
          message: 'Reponse not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch response',
        error: error.message,
      });
    }
  };
  // Delete a response
  const deleteReponse = async (req, res) => {
    try {
      const { idR } = req.params;
  
      const deletedReponse = await Reponse.findByIdAndDelete({_id:idR});
  
      if (!deletedReponse) {
        return res.status(404).json({
          success: false,
          message: 'Reponse not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Reponse deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete response',
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createReponse,
    getAllReponses,
    getReponseById,
    deleteReponse,
  };