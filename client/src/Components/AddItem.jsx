import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

 // Validation

 const validationSchema = Yup.object().shape({

    name: Yup.string()
    .required('name of the book is required'),

    price: Yup.number()
        .positive('Price must be greater than zero')
        .required('Price is required'),

    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),    

    category: Yup.string()
         .required('Category is required'),


         image: Yup.mixed()
         .required('Image is required')
           


 })





const AddItem = () => {


    const [productData, setProductData] = useState ({

        name: '',
        description: '',
        price: '',
        category: '',
        image: null,


    })

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()


    const validateForm = async () => {
        try {
            await validationSchema.validate(productData, { abortEarly: false });
            setErrors({});
            return true;

        }
        catch (err) {
            const newErrors = {};
            err.inner.forEach((err) => {

                newErrors[err.path] = err.message;

            })
            setErrors(newErrors);
            return false;

        }

    }




    // HandleSubmit

    const handleSubmit = async (event) => {
   event.preventDefault();

  // create formdata to handle file

  const formData = new FormData();

    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('image', productData.image); // Add the image file

    const isValid = await validateForm();

    if(!isValid){
 toast.error('Enter proper inputs')
    }

try {

    const response = await axios.post('https://thriftqar-production.up.railway.app/api/additem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }, { withCredentials: true },)

      if(response.status === 201) {
        toast.success("Product created successfully");
        setTimeout(()=>{

            navigate('/home');
        },1000)
    } else {
        toast.error("The item is not added");
    }


}

catch (err) {

      console.log("not added successfully")
}

    }


    // HandleChange

    const handleChange = (event) => {

        const { name, value } = event.target;

        setProductData(prevData => ({
            ...prevData,
            [name]: value,

        }))

    }

    // onChange={handleFileChange}

    const handleFileChange =(event) =>
    {
    setProductData(prevData => ({
  ...prevData,
  image: event.target.files[0],

    }))


    }





    return (
        <>
        <Navbar/>
        <ToastContainer/>
            <div className="flex items-center justify-center min-h-screen  bg-orange-50">
                <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-black">Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Product Name */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="productName">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name='name'
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter product name"
                                required
                            />  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="productDescription">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name='description'
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                rows="3"
                                placeholder="Enter product description"
                                required
                            ></textarea>
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="productPrice">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                onChange={handleChange}
                                name='price'
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter product price"
                                required
                            />{errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>

                        {/* Product Category */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="productCategory">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Home_Decor">Home Décor</option>
                                <option value="Electronics">Electronics</option>
                            </select> {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                        </div>

                        {/* Product Image */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="productImage">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleFileChange}
                                name="image"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                //   onChange={handleFileChange}
                                required
                            />
                            {(
                                <p className="mt-2 text-sm text-green-600">Selected file:  </p>
                            )}
                        </div>  {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

                        {/* Submit Button */}
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>



        </>
    )
}

export default AddItem
