const User = require('../Model/Signup')
const Product = require('../Model/addItems')
const { setUser } = require('../Service/jwt')


// Signup details to Databse

const signup = async (req, res) => {


    const { name, email, phone, password, confirmPassword } = req.body;
    try {

        const userId = await User.findOne({ email });

        if (userId) {
            return res.status(409).send({ message: 'User already exists' })

        }

        const details = new User({

            name: name,
            email: email,
            phone: phone,
            password: password,
            confirmPassword: confirmPassword,


        })
        await details.save();
        res.status(200).json({ message: 'success' })


    }

    catch (error) {
        console.error(error)
    }




}

//Login in to the site

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }


        const token = setUser(user)
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'LAX' });
        return res.status(200).json({ status: 'Login success' });


    }
    catch (error) {

        console.error(error)
    }

}

// getting Product Details in Database


const addItem = async (req, res) => {

    try {

        const { name, description, price, category } = req.body;
        console.log(category);
        const imageUrl = req.file;
        // Create the image URL/path (assuming multer saved the file in /uploads)
        const image = `/uploads/${imageUrl.filename}`;

        const newProduct = new Product({

            name: name,
            description: description,
            price: price,
            category: category,
            image: image

        })

        await newProduct.save();
        return res.status(201).json({ message: 'Product saved successfully' })


    }
    catch (err) {

        console.error(err)
        return res.status(500).json({ message: " error in saving the product" })
    }

}


// LogOut

const LogOut = async (req, res) => {

res.clearCookie('token', {

httpOnly: true,
secure: true,
sameSite: 'strict',
path:'/',

});

res.status(200).json({ message: 'Logged out successfully' });
}


// Sending product detail from database to frontend

const ProductDetail = async (req, res) => {

try {

const  id =req.params.id;

const item = await Product.findById(id);

if(!item) {

    return res.status(404).json({ message: 'detail not found'})


}

res.json(item)

}


catch (err) {

    console.error(err);

}


}


// to show  the product category wise

const Products = async (req,res) => {
const category = req.query.category;

try{

    let data;

    if (category) {
      // If a category is provided, filter products by that category
      data = await Product.find({ category });
    } else {
      // If no category is provided, return all products
      data = await Product.find({});
    }
 

res.json(data);



} 

catch(err) {

    console.log("Product category",err);

}



}

// Edit prfile Data

const editProfile = async (req, res) => {
    const userId = req.user.id; // Assuming you have the user id from token middleware
    const { name, email, phone } = req.body;
  
    try {
      // Update the user profile based on userId
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, phone },
        { new: true } // Return the updated document
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  };


 
module.exports = { signup, login, addItem, Products, LogOut, ProductDetail, editProfile };



