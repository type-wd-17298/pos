import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { BookMarkedIcon, MinusCircle, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import CardCategory from "../../components/CardCategory";
// import useSWR from "swr";
// import fetcher from "../../components/fetcher";

export default function Menu() {
  const [orderItems, setOrderItems] = useState([]);
  // const { data, error } = useSWR("/api/category", fetcher);

  // if (error) return <div>Failed to load data.</div>;
  // if (!data) return <div>Loading...</div>;

  // console.log("data : ",data);

  const products = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: [
      "Cappuccino",
      "Latte",
      "Espresso",
      "Americano",
      "Macchiato",
      "Mocha",
      "Flat White",
      "Affogato",
      "Café au Lait",
      "Iced Coffee",
      "Café Miel",
      "Nitro Cold Brew",
      "Cold Brew",
      "Caramel Macchiato",
      "Iced Latte",
    ][index],
    price: [
      250, 280, 200, 220, 230, 250, 270, 300, 240, 220, 260, 320, 280, 300, 250,
    ][index],
    image: ["/coffee.jpg", "/cappuccino.jpg", "espresso.jpg"][index],
  }));

  const cardData = [
    {
      id: 1,
      icon: <BookMarkedIcon className="h-6 w-6" />,
      categoryName: "Bread",
      count: 25,
    },
    {
      id: 2,
      icon: <BookMarkedIcon className="h-6 w-6" />,
      categoryName: "Croissant",
      count: 18,
    },
    {
      id: 3,
      icon: <BookMarkedIcon className="h-6 w-6" />,
      categoryName: "Cake",
      count: 40,
    },
    {
      id: 4,
      icon: <BookMarkedIcon className="h-6 w-6" />,
      categoryName: "Cookies",
      count: 12,
    },
    {
      id: 5,
      icon: <BookMarkedIcon className="h-6 w-6" />,
      categoryName: "Muffins",
      count: 20,
    },
    {
      id: 6,
      icon: <BookMarkedIcon className="h-6 w-6" />,
      categoryName: "Donuts",
      count: 15,
    },
  ];

  const handleAddToOrder = (product) => {
    const existingItem = orderItems?.find((item) => item?.id === product?.id);

    if (existingItem) {
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (productId) => {
    setOrderItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // ลบออกเมื่อจำนวนสินค้าเป็น 0
    );
  };

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const printRef = useRef();
  // console.log("printRef", printRef);

  // const handlePrintBill = () => {
  //   const printContent = printRef.current.innerHTML;
  //   const originalContent = document.body.innerHTML;

  //   document.body.innerHTML = printContent;
  //   window.print();
  //   document.body.innerHTML = originalContent;
  //   window.location.reload(); // รีโหลดหน้าเพื่อกลับมาปกติ
  // };

  const handlePrintBill = () => {
    if (printRef.current) {
      window.print();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <TextField
          id="outlined-basic"
          label="Search product here"
          variant="outlined"
          size="small"
          className="w-full md:w-96"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-4">
          {cardData.map((item) => (
            <CardCategory
              key={item.id}
              icon={item.icon}
              categoryName={item.categoryName}
              count={item.count}
            />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-3"
            >
              <img
                className="rounded-lg w-full h-40 object-cover"
                src={product.image}
                alt={product.name}
              />
              <div className="pt-2 flex flex-col">
                <p className="text-base font-medium text-gray-900 dark:text-white font-sans">
                  {product.name}
                </p>
                <p className="text-green-600 font-medium text-xl pb-4 font-sans">
                  {product.price} bath
                </p>
                {/* <Button
                  variant="contained"
                  className="mt-auto rounded-lg"
                  onClick={() => handleAddToOrder(product)}
                >
                  Add
                </Button> */}
                <button
                  onClick={() => handleAddToOrder(product)}
                  className="bg-transparent hover:bg-green-600 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {orderItems.length > 0 && (
        <div className="w-full lg:w-80 bg-white border-l rounded-2xl border-gray-300 p-4 shadow-lg overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {orderItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 border-gray-500 pb-2 border-2 rounded-xl p-2"
            >
              <div className="flex items-center">
                {/* รูปภาพสินค้า */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price} bath</p>
                </div>
              </div>

              {/* ปุ่มเพิ่มหรือลดจำนวน */}
              <div className="flex items-center justify-center">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveFromOrder(item.id)}
                >
                  <MinusCircle />
                </IconButton>

                <span className="text-lg flex justify-center items-center">
                  {item.quantity}
                </span>

                <IconButton
                  aria-label="add"
                  onClick={() => handleAddToOrder(item)}
                  color="success"
                >
                  <PlusCircle />
                </IconButton>
              </div>
            </div>
          ))}

          <div className="mt-4 border-t pt-2">
            <p className="font-bold text-lg">Total: {totalPrice} bath</p>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <Button
              variant="contained"
              color="primary"
              className="w-full rounded-lg mt-4"
              onClick={handlePrintBill}
            >
              Checkout & Print
            </Button>

            <Button
              variant="contained"
              color="error"
              className="w-full rounded-lg mt-4"
              onClick={() => {setOrderItems([])}}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      )}

      {/* ส่วนบิลใบเสร็จ */}
      <div
        ref={printRef}
        id="printable-content"
        className="hidden print:block p-4 w-80 border shadow-lg bg-white"
      >
        <h2 className="text-center text-lg font-bold mb-4">
          Type Café & Restaurant
        </h2>
        {/* <p className="text-center text-sm">--------------------------</p> */}

        {/* ตารางสินค้า */}
        <table className="w-full text-sm">
          <thead>
            <tr className="">
              <th className="text-left p-1">product</th>
              <th className="text-center p-1">quantity</th>
              <th className="text-right p-1">price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index} className="">
                <td className="p-1">{item.name}</td>
                <td className="p-1 text-center">{item.quantity}</td>
                <td className="p-1 text-right">
                  {item.price * item.quantity} ฿
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-center text-sm mt-2">--------------------------</p>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Summary</span>
          <span>{totalPrice} ฿</span>
        </div>

        <p className="text-center text-sm mt-4">
          Thank you for using the service. ❤️
        </p>
      </div>
    </div>
  );
}
