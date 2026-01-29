import MyList from "../model/MyListSchema.js";

export const addToMyListController=async (req,res) => {
    try {

        const userId=req.userId;
        const{productId,productTitle,rating,discount,price,oldPrice,brand,image}=req.body;

        const item=await MyList.findOne({
            userId:userId,
            productId:productId
        })

        if(item){
            return res.status(404).json({
            message: "Item already in my list",
            error:true,
            success: false,
            })           
        }

        

        const myList=new MyList({
            productId,productTitle,rating,discount,price,oldPrice,brand,image,userId
        })

        await myList.save();

        return  res.status(200).json({
          message:" Added To MyList Successfully",
          success: true,
          error:false,
          myList:myList
        });
     
        
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
    }
}

export const getMyListController=async (req,res) => {
    try {

        const userId=req.userId;    
        const myListItem=await MyList.find({
            userId:userId,
        }) 
    
        if(!myListItem){
            return res.status(404).json({
                message:"Items not found in MyList",
                error:true,
                success: false,
            })
        } 

        

        return  res.status(200).json({
          message:" Items  MyList Founded",
          success: true,
          error:false,
          myListItem:myListItem
        });
     
        
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
    }
}

export const deleteMyListController=async (req,res) => {
    try {

        const myListItem=await MyList.findById(req.params.id)

        if(!myListItem){
            return res.status(404).json({
            message: "My list Item doesn't found ",
            error:true,
            success: false,
            })           
        }

        const deletedItem=await MyList.findOneAndDelete( req.params.id)

        if(!deletedItem){
            return res.status(404).json({
            message: "The item is not deleted",
            error:true,
            success: false,
            })           
        }
        

        return  res.status(200).json({
          message:" Getting Item from MyList Successfully",
          success: true,
          error:false,
        });
     
        
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
    }
}