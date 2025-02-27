import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
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

  const addCatChange = (e) => {
    const { name, value } = e.target;
    setAddNewCat({ ...AddNewCat, [name]: value });
  };

  useEffect(() => {
    const fetchCat = async () => {
      const response = await axios.get(`${backendLink}/api/v1/categories`, {
        headers,
      });
      setCategories(response.data.categories);
    };
    fetchCat();
  }, [Categories]);

  const addNewCategory = async (e) => {
    e.preventDefault();
    try {
      if (AddNewCat === "") {
        alert("Add new category is required");
      } else {
        const response = await axios.post(
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
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === "" ||
        Data.category === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${backendLink}/api/v1/add-book`,
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className=" text-3xl md:text-5xl font-semibold text-sky-900 mb-8">
        Add Book
      </h1>
      <div className="p-4 shadow rounded">
        <div>
          <label htmlFor="" className="">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="">
            Title of book
          </label>
          <input
            type="text"
            className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="">
            Author of book
          </label>
          <input
            type="text"
            className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none"
            placeholder="author of book"
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
              className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none"
              placeholder="language of book"
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
              className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none"
              placeholder="price of book"
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
            className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none "
            rows="5"
            placeholder="description of book"
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
              id=""
              className="w-full mt-2 border rounded bg-zinc-200  p-2 outline-none"
              onChange={change}
            >
              <option value="">---</option>
              {Categories &&
                Categories.map((items) => (
                  <option value={items.title}> {items.title}</option>
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
                onChange={addCatChange}
              />
              <button
                className="text-2xl bg-sky-900 hover:bg-sky-800 transition-all duration-300  text-white rounded p-2"
                onClick={addNewCategory}
              >
                <IoAdd />
              </button>
            </div>
          </div>
        </div>

        <button
          className=" mt-4 px-3 bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
