import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { IoTrashBin } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddField from "../components/AddField";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const EditProductAdmin = ({close, data : propsData, fetchProductData}) => {
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleAddField = async () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);
    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        if (close) {
          close()
          
        }
        fetchProductData()
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-50">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]">
        <section>
          <div className="p-2 font-semibold bg-white shadow-md flex items-center justify-between">
            <h2 className="font-semibold">Upload Product</h2>
            <button className="cursor-pointer" onClick={close}>
                <IoClose size={20}/>
            </button>
          </div>
          <div className="grid p-3">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-1">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={data.name}
                  name="name"
                  required
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  placeholder="Enter product description"
                  value={data.description}
                  name="description"
                  required
                  rows={3}
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded resize-none"
                />
              </div>

              <div>
                <p className="font-medium">Image</p>
                <div>
                  <label
                    htmlFor="productImage"
                    className="bg-blue-100 h-24 border rounded flex justify-center items-center cursor-pointer"
                  >
                    <div className="text-center flex justify-center items-center flex-col">
                      {imageLoading ? (
                        <Loading />
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="productImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </label>
                  {/* display uloaded images */}
                  <div className="flex flex-wrap gap-4">
                    {data.image.map((img, index) => {
                      return (
                        <div
                          key={img + index}
                          className="mt-1 h-20 w-20 min-w-20 border bg-blue-50 relative group"
                        >
                          <img
                            src={img}
                            alt={img}
                            className="w-full h-full object-scale-down cursor-pointer py-1"
                            onClick={() => setViewImageUrl(img)}
                          />
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className="absolute bottom-0 right-0 p-1 bg-red-300 text-red-600 hover:bg-red-500 hover:text-white rounded hidden group-hover:block cursor-pointer"
                          >
                            <IoTrashBin />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-1">
                <label htmlFor="" className="font-medium">
                  Category
                </label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allCategory.find(
                        (el) => el._id === value,
                      );
                      console.log(category);

                      setData((prev) => {
                        return {
                          ...prev,
                          category: [...prev.category, category],
                        };
                      });
                      setSelectCategory("");
                    }}
                  >
                    <option value={""}>Select Category</option>
                    {allCategory.map((c, index) => {
                      return (
                        <option key={index} value={c?._id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.category.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{c.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveCategory(index)}
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-1">
                <label htmlFor="" className="font-medium">
                  Sub Category
                </label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const subCategory = allSubCategory.find(
                        (el) => el._id === value,
                      );

                      setData((prev) => {
                        return {
                          ...prev,
                          subCategory: [...prev.subCategory, subCategory],
                        };
                      });
                      setSelectSubCategory("");
                    }}
                  >
                    <option value={""} className="text-neutral-600">
                      Select SubCategory
                    </option>
                    {allSubCategory.map((c, index) => {
                      return (
                        <option key={index} value={c?._id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.subCategory.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{c.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveSubCategory(index)}
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-1">
                <label htmlFor="unit" className="font-medium">
                  Unit
                </label>
                <input
                  type="text"
                  id="unit"
                  placeholder="Enter product unit"
                  value={data.unit}
                  name="unit"
                  required
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded"
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="stock" className="font-medium">
                  Number of Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  placeholder="Enter product stock"
                  value={data.stock}
                  name="stock"
                  required
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter product price"
                  value={data.price}
                  name="price"
                  required
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="discount" className="font-medium">
                  Discount
                </label>
                <input
                  type="text"
                  id="discount"
                  placeholder="Enter product discount"
                  value={data.discount}
                  name="discount"
                  required
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded"
                />
              </div>

              {/* add more fields */}

              {Object?.keys(data?.more_details).map((key) => {
                return (
                  <div className="grid gap-1 font-medium">
                    <label htmlFor={key}>{key}</label>
                    <input
                      type="text"
                      id={key}
                      value={data?.more_details[key]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [key]: value,
                            },
                          };
                        });
                      }}
                      className="bg-blue-50 p-2 border outline-none focus-within:border-yellow-400 rounded"
                    />
                  </div>
                );
              })}

              <div
                onClick={() => setOpenAddField(true)}
                className="py-1 px-3 w-32 text-center font-semibold bg-yellow-50 hover:bg-yellow-400 border border-yellow-400 hover:text-neutral-900 cursor-pointer rounded"
              >
                Add Fields
              </div>

              <button className="bg-yellow-400 hover:bg-yellow-300 border border-yellow-400 py-2 font-semibold text-center px-3 cursor-pointer hover:text-neutral-900 rounded">
               Update Product
              </button>
            </form>
          </div>

          {viewImageUrl && (
            <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
          )}
          {openAddField && (
            <AddField
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              submit={handleAddField}
              close={() => setOpenAddField(false)}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;
