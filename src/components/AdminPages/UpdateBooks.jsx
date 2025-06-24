import { useState, useEffect } from "react";
import axiosInstance from "../../extras/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateBooks = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [Data, setData] = useState({
    images: [],
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
  });

  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res = await axiosInstance.get(
        `${backendLink}/api/v1/get-book-by-id/${id}`
      );
      setData({
        images: res.data.data.urls || [],
        title: res.data.data.title,
        author: res.data.data.author,
        price: res.data.data.price,
        desc: res.data.data.desc,
        language: res.data.data.language,
        category: res.data.data.category,
      });
    };
    fetch();
  }, []);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const addImage = () => {
    setData({ ...Data, images: [...Data.images, ""] });
  };

  const updateImage = (index, value) => {
    const newImages = [...Data.images];
    newImages[index] = value;
    setData({ ...Data, images: newImages });
  };

  const removeImage = (index) => {
    const newImages = Data.images.filter((_, i) => i !== index);
    setData({ ...Data, images: newImages });
  };

  const update = async () => {
    try {
      if (
        Data.images.length === 0 ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === "" ||
        Data.category === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axiosInstance.put(
          `${backendLink}/api/v1/update-book`,
          Data,
          { headers }
        );
        alert(response.data.message);
        history(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="px-12 py-8 h-auto">
      <h1 className="text-3xl md:text-5xl font-semibold text-sky-900 mb-8">
        Update Book
      </h1>
      <div className="p-4 rounded">
        <div>
          <label>Images</label>
          {Data.images.map((img, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                className="w-full bg-zinc-200 rounded p-2 outline-none"
                placeholder="Enter image URL"
                value={img}
                onChange={(e) => updateImage(index, e.target.value)}
              />
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="mt-4 px-3 bg-sky-900 text-white font-semibold py-1 rounded hover:bg-sky-800"
            onClick={addImage}
          >
            + Add Image
          </button>
        </div>
        <div className="mt-4">
          <label>Title of book</label>
          <input
            type="text"
            className="w-full bg-zinc-200 rounded p-2 outline-none"
            placeholder="Title of book"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label>Author</label>
          <input
            type="text"
            className="w-full bg-zinc-200 rounded p-2 outline-none"
            placeholder="Author"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label>Category</label>
          <input
            type="text"
            className="w-full bg-zinc-200 rounded p-2 outline-none"
            placeholder="Category"
            name="category"
            value={Data.category}
            onChange={change}
            disabled
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label>Language</label>
            <input
              type="text"
              className="w-full bg-zinc-200 rounded p-2 outline-none"
              placeholder="Language"
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label>Price</label>
            <input
              type="number"
              className="w-full bg-zinc-200 rounded p-2 outline-none"
              placeholder="Price"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label>Description</label>
          <textarea
            className="w-full bg-zinc-200 rounded p-2 outline-none"
            rows="5"
            placeholder="Description"
            name="desc"
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-sky-900 text-white font-semibold py-2 rounded hover:bg-sky-800 transition-all duration-300"
          onClick={update}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBooks;
