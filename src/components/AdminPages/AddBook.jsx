import { useEffect, useState } from "react";
import axiosInstance from "../../extras/axiosInstance";
import { IoAdd, IoTrash } from "react-icons/io5";
import { useSelector } from "react-redux";

const AddBook = () => {
  const [Data, setData] = useState({
    images: [""], // Array to store multiple image URLs
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
  });

  const [AddNewCat, setAddNewCat] = useState({ addCat: "" });
  const [Categories, setCategories] = useState();
  const backendLink = useSelector((state) => state.prod.link);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...Data.images];
    updatedImages[index] = value;
    setData({ ...Data, images: updatedImages });
  };

  const addImageField = () => {
    setData({ ...Data, images: [...Data.images, ""] });
  };

  const removeImageField = (index) => {
    const updatedImages = Data.images.filter((_, i) => i !== index);
    setData({ ...Data, images: updatedImages });
  };

  useEffect(() => {
    const fetchCat = async () => {
      const response = await axiosInstance.get(
        `${backendLink}/api/v1/categories`,
        {
          headers,
        }
      );
      setCategories(response.data.categories);
    };
    fetchCat();
  }, [Categories]);

  const addNewCategory = async (e) => {
    e.preventDefault();
    try {
      if (AddNewCat.addCat === "") {
        alert("Add new category is required");
      } else {
        const response = await axiosInstance.post(
          `${backendLink}/api/v1/add-cat`,
          AddNewCat,
          { headers }
        );
        alert(response.data.success);
        setAddNewCat({ addCat: "" });
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const submit = async () => {
    try {
      if (
        Data.images.length === 0 ||
        Data.images.some((img) => img === "") ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === "" ||
        Data.category === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axiosInstance.post(
          `${backendLink}/api/v1/add-book`,
          Data,
          { headers }
        );
        setData({
          images: [""],
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
          category: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="h-[100%] p-0">
      <div className="p-4 shadow rounded">
        {/* Image Fields */}
        <label htmlFor="" className="">
          Images
        </label>
        {Data.images.map((img, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              className="w-full border rounded bg-zinc-200 p-2 outline-none"
              placeholder="Enter image URL"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
            {index > 0 && (
              <button
                className="text-red-500 text-xl"
                onClick={() => removeImageField(index)}
              >
                <IoTrash />
              </button>
            )}
          </div>
        ))}
        <button
          className="mt-3 bg-sky-900 text-white px-3 py-1 rounded flex items-center gap-1"
          onClick={addImageField}
        >
          <IoAdd /> Add more images
        </button>

        {/* Other Fields */}
        <div className="mt-4">
          <label htmlFor="">Title of book</label>
          <input
            type="text"
            className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
            placeholder="Title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="">Author of book</label>
          <input
            type="text"
            className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
            placeholder="Author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="">Language</label>
            <input
              type="text"
              className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
              placeholder="Language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="">Price</label>
            <input
              type="number"
              className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
              placeholder="Price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="">Description of book</label>
          <textarea
            className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
            rows="5"
            placeholder="Description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="">Select Category</label>
            <select
              name="category"
              className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
              onChange={change}
              value={Data.category}
            >
              <option value="">---</option>
              {Categories &&
                Categories.map((items) => (
                  <option key={items.title} value={items.title}>
                    {items.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-3/6">
            <label htmlFor="">Add New Category</label>
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                className="w-full mt-2 border rounded bg-zinc-200 p-2 outline-none"
                placeholder="Add new category"
                name="addCat"
                required
                value={AddNewCat.addCat}
                onChange={(e) => setAddNewCat({ addCat: e.target.value })}
              />
              <button
                className="text-2xl bg-sky-900 hover:bg-sky-800 text-white rounded p-2"
                onClick={addNewCategory}
              >
                <IoAdd />
              </button>
            </div>
          </div>
        </div>

        <button
          className="mt-4 px-3 bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
