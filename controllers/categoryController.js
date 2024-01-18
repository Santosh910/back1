import categoryModel from "../model/categoryModel.js";

export const addCategory = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name)return res.status(401).json({success:false,message:"category not found"})

         const category = new categoryModel({
            name
         })
         await category.save()

        return res.status(201).json({success:true,message:"category added successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const gellAllCategory=async(req,res)=>{
    try{
         const cat = await categoryModel.find({})
         if(cat.length){
            return res.status(200).json({success:true,message:"all categories found",cats:cat})
         }
         return res.status(404).json({success:false,message:"category not found"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}