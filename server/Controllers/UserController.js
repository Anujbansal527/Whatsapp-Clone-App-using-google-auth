import User from "../Models/User.js"

export const addUser = async(req,res) => {

    try 
    {
        let exist = await User.findOne({sub: req.body.sub})

        if(exist) {
            res.status(200).json({msg:"user already exist"})
            return;
        }

        const newUser = new User (req.body);

        await newUser.save();

        return res.status(200).json(newUser);

    } catch (error) {
        return res.status(500).json({msg:"error occured while adding user" , error})
    }
} 


export const getUsers = async(req,res)=>{

    try {
        const user = await User.find({});
        return res.status(200).json(user);
    } 
    catch (error) {
        return res.status(500).json({msg:"error occured while finding user" , error})
    }
}