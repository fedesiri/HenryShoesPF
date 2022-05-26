import User from "../models/User.js";


export const getAllUsers = async (req, res) => {
    try{
        const allUser = await User.findAll()
        res.send(allUser)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try{
        const oneUser = await User.findByPk(req.params.id)
        res.send(oneUser)
    } catch (error){
        res.status(500).send({ message: error.message });
    }
}

export const editUser = async (req, res) => {
    const { name, email, password, lastname } = req.body 
    try{
        await User.update(
            {
              name: name,
              email: email,
              password: password,
              lastname: lastname,            
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );
          res.send({message: 'User has been update succesfuly!'})
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
  
  
  export const deleteUser = (req, res) => {
      try{
          User.destroy({
            where: {
              id: req.params.id,
            },
          })
          return res.send("User has been deleted successfully");

      } catch (error){
        return res.send({ message: err }).status(400);
      }      
  };


