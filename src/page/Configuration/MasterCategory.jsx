import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  Box,
  Button,
  Dialog,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Edit2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import AdministratorSearchBox from "../../components/AdministratorSearchBox";
import useDeleteDialog from "../../components/ConfirmDelete";
import fetcher from "../../components/fetcher";
import FormInput from "../../components/FormInput";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/CategoryServices";

export default function MasterCategory() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data, error, isLoading } = useSWR(
    `/api/category?search=${encodeURIComponent(search)}`,
    fetcher
  );
  const rows = data
    ? data.map((item, index) => ({
        ...item,
        no: index + 1,
      }))
    : [];
  const [rowSelection, setRowSelection] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [onSearch,setOnSearch] = useState("");
  // const [categoryName, setCategoryName] = useState("");
  // const [description, setDescription] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const { control, handleSubmit, reset } = useForm();
  const { open, close, DialogComponent } = useDeleteDialog();
  if (error) return <div>Failed to load data.</div>;
  if (!data) return <div>Loading...</div>;

  const OpenDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleProcessRowUpdate = async (newRow) => {
    const oldRow = data.find((row) => Number(row.id) === Number(newRow.id));
    if (!oldRow) {
      console.warn("Old row not found, updating anyway.");
      return newRow;
    }

    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      return oldRow;
    }

    try {
      const updatedRow = await updateCategory(newRow);
      return updatedRow;
    } catch (error) {
      console.error("Update failed:", error);
      return oldRow;
    }
  };

  const refresh = () => {
    mutate(
      `/api/category?search=${encodeURIComponent(search)}`,
      fetcher(`/api/category?search=${encodeURIComponent(search)}`),
      { revalidate: true }
    );
  };

  const deleteRow = async (data) => {
    try {
      await deleteCategory(data);
      setOpenSnackbar(true);
      refresh();
      close();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleDelete = (row) => {
    open({
      title: "Confirm Deletion?",
      content: "Are you sure you want to delete this item?",
      actions: (
        <>
          <button
            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
            onClick={() =>
              rowSelection !== null || [] ? deleteSelected() : deleteRow(row)
            }
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

  const startTransition = (callback) => {
    callback();
  };

  const setPage = (page) => {
    setOptions((prev) => ({
      ...prev,
      page: parseInt(page, 10),
    }));
  };

  const setRowsPerPage = (pageSize) => {
    setOptions((prev) => ({
      ...prev,
      rowsPerPage: parseInt(pageSize, 10),
    }));
  };

  const onSubmit = async (data) => {
    try {
      // เรียก API เพื่อสร้างหมวดหมู่
      const response = await createCategory(data);
      refresh();
      reset();
      alert("Category created successfully!");
      return response;
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create category. Please try again.");
    }
  };

  console.log(rowSelection);

  const deleteSelected = async () => {
    console.log("delete select : ", rowSelection);
    for (let i = 0; i < rowSelection?.length; i++) {
      const dataDeleted = rows?.find((row) => row?.id === rowSelection[i]);
      console.log(dataDeleted);
      await deleteCategory(dataDeleted);
    }
    setRowSelection([]);
    refresh();
    close();
    setOpenSnackbar(true);
  };

  const columns = [
    {
      field: "no",
      headerName: "No.",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "categoryCode",
      headerName: "Code",
      width: 150,
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
      field: "categoryName",
      headerName: "Name",
      width: 150,
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
      field: "description",
      headerName: "Description",
      width: 700,
      editable: true,
      flex: 1,
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

  return (
    <>
      <DataGrid
        rows={rows}
        rowCount={rows?.length || 0}
        paginationMode="server"
        columns={columns}
        checkboxSelection
        editMode="cell"
        loading={isLoading}
        processRowUpdate={handleProcessRowUpdate}
        disableRowSelectionOnClick={true}
        onRowSelectionModelChange={(model) => setRowSelection(model)}
        paginationModel={{
          page: options.page,
          pageSize: options.rowsPerPage,
        }}
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
            <>
              <div className=" p-4 flex items-center">
                <div className="grow">
                  <AdministratorSearchBox />
                </div>
                <div className="flex gap-1">
                  {rowSelection.length > 0 ? (
                    <Button
                      startIcon={<Trash2Icon className="h-5" />}
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                    >
                      Delete selected
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlusIcon className="h-5" />}
                        onClick={() => OpenDialog()}
                        size="small"
                      >
                        Add New
                      </Button>
                      <span style={{ margin: "0 10px", fontSize: "20px" }}>
                        |
                      </span>
                      <GridToolbarColumnsButton />
                      <GridToolbarDensitySelector />
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RefreshIcon />}
                        onClick={() => refresh()}
                        size="small"
                      >
                        Refresh
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          ),
        }}
        sx={{
          // border: "1px solid #ddd",
          // "& .MuiDataGrid-columnHeader": {
          //   backgroundColor: "#f4f4f4",
          //   color: "#333",
          //   fontWeight: "bold",
          // },
          // "& .MuiDataGrid-row": {
          //   "&:nth-child(even)": {
          //     backgroundColor: "#f9f9f9",
          //   },
          //   "&:hover": {
          //     backgroundColor: "#f1f1f1",
          //   },
          // },
          // "& .MuiDataGrid-cell": {
          //   padding: "8px 12px",
          //   fontSize: "14px",
          // },
          backgroundColor: "white",
        }}
      />
      {isOpen && (
        <Dialog onClose={closeDialog} open={isOpen}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-white rounded-xl shadow-lg w-lg max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Category
              </h3>
              {/* <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <X onClick={() => closeDialog()} />

                <span className="sr-only">Close modal</span>
              </button> */}
            </div>
            <div className="px-8 gap-4 flex flex-col">
              <Controller
                name="categoryCode"
                control={control}
                defaultValue=""
                rules={{ required: "Category Code is required" }}
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Category Code "
                    id="categoryCode"
                    placeholder="Enter category code"
                    field={field}
                    error={fieldState.error}
                  />
                )}
              />

              <Controller
                name="categoryName"
                control={control}
                defaultValue=""
                rules={{ required: "Product name is required" }}
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Category Name"
                    id="categoryName"
                    placeholder="Enter category name"
                    field={field}
                    error={fieldState.error}
                  />
                )}
              />

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

      {openSnackbar && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000} // Close after 3 seconds
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            ลบสำเร็จ!
          </Alert>
        </Snackbar>
      )}

      <DialogComponent />
    </>
  );
}
