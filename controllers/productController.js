import productModel from "../model/productModel.js";

export const addProduct=async(req,res)=>{
   try{
    const {name,price,category_id} = req.body;
    if(!name || !price || !category_id)return res.status(401).json({success:false,message:"all data is mandotory"})

    const product = new productModel({
        name,price,category_id
    })
    await product.save()
       return res.status(201).json({success:true,message:"product added succesfully"})
   }catch(error){
    return res.status(500).json({success:false,message:error})
   }
}

export const getAllProduct = async(req,res)=>{
    try{
        const products = await productModel.find({})
        if(products.length){
            return res.status(200).json({success:true,message:"product found",products:products})
        }
        return res.status(404).json({success:false,message:"product not found"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const getSingleProduct=async(req,res)=>{
    try{
           const {id:productId}= req.body;
           if(!productId)return res.status(404).json({success:false,message:"id not found"})

           const product = await productModel.findById(productId)
           if(product){
            return res.status(200).json({success:true,message:"product found",product:product})
           }
           return res.status(404).json({success:false,message:"product not found"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const updateProduct = async(req,res)=>{
    try{
         const{name,price,category_id,_id}=req.body;
         if(!name || !price || !category_id || !_id)return res.status(404).json({success:false,message:"allmandotory"})

         await productModel.findByIdAndUpdate(_id,{name,price,category_id})

         return res.status(200).json({success:true,message:"product updated successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

export const deleteProduct = async(req,res)=>{
    try{
         const {_id}= req.body;
         if(!_id)return res.status(404).json({success:false,message:"id not found"})

         await productModel.findByIdAndDelete(_id)
         return res.status(200).json({success:true,message:"product deleted successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}


export const getAllData = async(req,res)=>{
    try{
       const aggData = await productModel.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"category_id",
                foreignField:"_id",
                as:"category"
            }
        },
        {
            $project:{
                 _id:1,
                 name:1,
                 price:1,
                 category:{
                    $arrayElemAt:
                    ["$category.name",0]
                 } 
            }
        }
       ]) 
       const count = aggData.length;
       return res.status(200).json({success:true,data:{numberofProduct:count,data:aggData}})
    }catch(error){
        return res.status(400).json({success:false,message:error})
    }
}