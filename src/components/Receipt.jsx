import React, { useRef } from "react";

const Receipt = ({ orderItems, totalPrice }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // รีโหลดหน้าเพื่อกลับมา
  };

  return (
    <div className="flex flex-col items-center">
      {/* ปุ่ม Checkout */}
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Checkout & Print Bill
      </button>

      {/* ส่วนบิลใบเสร็จ */}
      <div ref={printRef} className="hidden print:block p-4 w-80 border shadow-lg bg-white">
        <h2 className="text-center text-lg font-bold mb-4">🛒 ร้านค้าของคุณ</h2>
        <p className="text-center text-sm">--------------------------</p>

        {orderItems.map((item, index) => (
          <div key={index} className="flex justify-between text-sm my-2">
            <span>{item.name} x{item.quantity}</span>
            <span>{item.price * item.quantity} ฿</span>
          </div>
        ))}

        <p className="text-center text-sm">--------------------------</p>
        <div className="flex justify-between font-bold text-lg">
          <span>รวมทั้งหมด</span>
          <span>{totalPrice} ฿</span>
        </div>

        <p className="text-center text-sm mt-4">ขอบคุณที่ใช้บริการ ❤️</p>
      </div>
    </div>
  );
};

export default Receipt;
