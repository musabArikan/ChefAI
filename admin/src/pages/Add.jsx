import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../assets/assets";
const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message || "Failed to add product");
    }
  };
  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-gray-500 text-base">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 tracking-tight">
        Add Food
      </h2>
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-2.5">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-[120px] cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="w-[max(40%,280px)] flex flex-col gap-2.5">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="p-2.5 border border-gray-300 rounded outline-none focus:border-[tomato]"
          />
        </div>
        <div className="w-[max(40%,280px)] flex flex-col gap-2.5">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Write content here"
            required
            rows="6"
            className="p-2.5 border border-gray-300 rounded outline-none focus:border-[tomato] resize-none"
          ></textarea>
        </div>
        <div className="flex gap-[30px]">
          <div className="flex flex-col gap-2.5">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              className="max-w-[120px] p-2.5 border border-gray-300 rounded outline-none focus:border-[tomato]"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Kebab">Kebab</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="max-w-[120px] p-2.5 border border-gray-300 rounded outline-none focus:border-[tomato]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="max-w-[120px] border-none p-2.5 bg-[tomato] text-white cursor-pointer rounded hover:bg-[#ff4500] transition-colors"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
