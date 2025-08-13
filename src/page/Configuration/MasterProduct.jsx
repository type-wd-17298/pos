import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Autocomplete,
  Box,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Edit2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import AdministratorSearchBox from "../../components/AdministratorSearchBox";
import fetcher from "../../components/fetcher";
import FormInput from "../../components/FormInput";
import { createProducts } from "../../services/ProductsServices";

const MasterProduct = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: products,
    error: productsError,
    isLoading: isProductsLoading,
  } = useSWR(`/api/products?page=${page}&limit=${rowsPerPage}`, fetcher);
  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useSWR(`/api/category`, fetcher);

  console.log("product : ", products);

  const rows = products?.data
    ? products?.data.map((item, index) => ({
        ...item,
        no: index + 1,
      }))
    : [];
  const [rowSelection, setRowSelection] = useState([]);
  const { control, handleSubmit, reset, watch, register } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [options, setOptions] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  // const [rows, setRows] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     age: 30,
  //     email: "johndoe@example.com",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     age: 28,
  //     email: "janesmith@example.com",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 3,
  //     name: "Robert Brown",
  //     age: 35,
  //     email: "robertbrown@example.com",
  //     status: "Active",
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Clark",
  //     age: 42,
  //     email: "emilyclark@example.com",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 5,
  //     name: "Michael White",
  //     age: 50,
  //     email: "michaelwhite@example.com",
  //     status: "Active",
  //   },
  // ]);

  const refresh = () => {
    console.log("Refreshing data...");
  };

  const OpenDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const startTransition = (callback) => {
    callback();
  };

  // const setPage = (page) => {
  //   setOptions((prev) => ({
  //     ...prev,
  //     page: parseInt(page, 10),
  //   }));
  // };

  // const setRowsPerPage = (pageSize) => {
  //   setOptions((prev) => ({
  //     ...prev,
  //     rowsPerPage: parseInt(pageSize, 10),
  //   }));
  // };

  const handleProcessRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === newRow.id ? { ...row, ...newRow } : row
      )
    );
    return newRow;
  };

  const onSubmit = async (data) => {
    console.log("data product : ", data);

    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("price", data?.price || 0);
    formData.append("category_id", data?.category_id || undefined);
    formData.append("image_url", data?.image_url[0] || undefined); // image is a FileList
    formData.append("stock_quantity", data?.stock_quantity || 0);
    formData.append("description", data?.description || "");
    try {
      const res = await createProducts(formData);

      // if (!res.ok) throw new Error("Upload failed");

      // alert("Product added successfully!");
      // reset();
      // setPreviewUrl(null);
    } catch (error) {
      alert("Upload failed.");
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // อัปเดตรูป preview ทันทีเมื่อเลือกไฟล์
  // const watchImage = watch("image");
  // React.useEffect(() => {
  //   if (watchImage && watchImage.length > 0) {
  //     const file = watchImage[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => setPreviewUrl(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // }, [watchImage]);

  const handleDelete = (row) => {
    open({
      title: "Confirm Deletion?",
      content: "Are you sure you want to delete this item?",
      actions: (
        <>
          <button
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
            // onClick={() =>
            //   rowSelection !== null || [] ? deleteSelected() : deleteRow(row)
            // }
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
            onClick={close} // ปิด Dialog ถ้าคลิกยกเลิก
          >
            Cancel
          </button>
        </>
      ),
    });
  };

  const columns = [
    { field: "no", headerName: "No.", width: 100 },
    {
      field: "image_url",
      headerName: "Image",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <div className="w-full h-full flex justify-center items-center px-3 py-2">
          <img
            src={
              params.value || "https://www.w3schools.com/html/img_chania.jpg"
            } // fallback เผื่อไม่มีรูป
            alt="product"
            className="object-cover rounded-md shadow-md"
            style={{
              // width: "200px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      ),
    },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: true,
      renderEditCell: (params) => (
        <TextField
          variant="standard"
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              height: "100%",
            },
            padding: 1,
          }}
          defaultValue={params.value}
          autoFocus
          onChange={(event) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
              debounceMs: 200,
            })
          }
        />
      ),
    },

    {
      field: "price",
      headerName: "Price",
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "stock_quantity",
      headerName: "Quantity",
      width: 150,
      editable: true,
    },
    {
      field: "category_id",
      headerName: "Category",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
    },
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Box gap={1} className="">
          <IconButton color="error" onClick={() => handleDelete(params?.row)}>
            <Trash2Icon />
          </IconButton>
          <IconButton color="primary">
            <Edit2Icon />
          </IconButton>
        </Box>
      ),
    },
  ];
  if (productsError) return <div>Failed to load data.</div>;
  if (!products) return <div>Loading...</div>;
  return (
    <>
      <DataGrid
        rows={rows ? rows : []}
        rowCount={rows?.length || 0}
        paginationMode="server"
        columns={columns}
        checkboxSelection
        editMode="cell"
        loading={isProductsLoading}
        processRowUpdate={handleProcessRowUpdate}
        disableRowSelectionOnClick={true}
        getRowHeight={() => 200}
        onRowSelectionModelChange={(model) => setRowSelection(model)}
        paginationModel={{
          page: options.page,
          pageSize: options.rowsPerPage,
        }}
        // onPaginationModelChange={({ page, pageSize }) => {
        //   setPage(page);
        //   setRowsPerPage(pageSize);
        // }}
        onPaginationModelChange={(model) => {
          startTransition(() => {
            setPage(model.page.toString());
            if (model.pageSize !== options.rowsPerPage)
              setRowsPerPage(model.pageSize.toString());
          });
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        slots={{
          toolbar: () => (
            <div className="flex items-center justify-between p-4 ">
              <div className="flex items-center space-x-4">
                <AdministratorSearchBox />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlusIcon className="h-5" />}
                  onClick={() => OpenDialog()}
                  size="small"
                >
                  Add New
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={refresh}
                  size="small"
                >
                  Refresh
                </Button>
              </div>
            </div>
          ),
        }}
        sx={{
          backgroundColor: "white",
        }}
      />

      {isOpen && (
        <Dialog onClose={closeDialog} open={isOpen}>
          {" "}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-white rounded-xl shadow-lg w-lg max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
            </div>
            <div className="px-8 flex flex-col">
              {" "}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Product name is required" }}
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Product name"
                    id="name"
                    placeholder="Enter product name"
                    field={field}
                    error={fieldState.error}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Price"
                    id="price"
                    placeholder="Enter price"
                    field={field}
                    error={fieldState.error}
                  />
                )}
              />
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Category
                </label>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={categories || []}
                      getOptionLabel={(option) =>
                        option.categoryCode + " - " + option.categoryName
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_, selectedOption) =>
                        field.onChange(selectedOption?.id || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label="หมวดหมู่"
                          // InputLabelProps={{ shrink: true }}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder="Select category"
                          slots={{ noRowsOverlay: "No rows" }}
                          sx={{
                            // borderRadius: "6px", // ทำให้กรอบมนขึ้น
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px", // ทำให้ขอบของ input ก็มนขึ้น
                            },
                            // "& .MuiFormHelperText-root": {
                            //   marginTop: "4px", // เพิ่มช่องว่างให้กับ helperText
                            // },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                {" "}
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-600 mb-2 block"
                      >
                        Description
                      </label>
                      <textarea
                        {...field}
                        id="description"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter description"
                      />
                    </div>
                  )}
                />
              </div>
              <Controller
                name="stock_quantity"
                control={control}
                defaultValue=""
                // rules={{ required: "Product name is required" }}
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Stock"
                    id="stock_quantity"
                    placeholder="Enter stock"
                    field={field}
                    error={fieldState.error}
                  />
                )}
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  รูปภาพ
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image_url", { required: false })}
                  onChange={handleImageChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreview && (
                  <div className="mt-4 text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 object-contain border rounded-md mx-auto shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-end">
              <div className="flex flex-row">
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset(); // ✅ รีเซ็ตฟอร์ม
                    closeDialog();
                  }}
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default MasterProduct;
