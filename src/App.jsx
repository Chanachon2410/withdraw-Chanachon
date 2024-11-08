// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Swal from 'sweetalert2';  // นำเข้า SweetAlert2

const App = () => {
  // กำหนดยอดเงินเริ่มต้นในบัญชี
  const [balance, setBalance] = useState(10000);
  const [history, setHistory] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0); // จำนวนเงินที่เลือกจะถูกเก็บที่นี่

  // ฟังก์ชันเลือกจำนวนเงิน
  const handleSelectAmount = (amount) => {
    setSelectedAmount(selectedAmount + amount);  // เพิ่มจำนวนเงินที่เลือก
  };

  // ฟังก์ชันลบจำนวนเงินที่เลือก
  const handleRemoveAmount = () => {
    if (selectedAmount > 0) {
      setSelectedAmount(0);  // ลบจำนวนเงินที่เลือกทั้งหมด
    }
  };

  // ฟังก์ชันลบทั้งหมด (ลบการเลือกทั้งหมด)
  const handleRemoveAll = () => {
    setSelectedAmount(0);  // ลบการเลือกทั้งหมด
  };

  // ฟังก์ชันถอนเงิน
  const handleWithdraw = () => {
    if (selectedAmount === 0) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาเลือกจำนวนเงินที่ต้องการถอน',
        text: 'กรุณาเลือกจำนวนเงินจากปุ่มด้านล่าง',
      });
      return;
    }

    // ตรวจสอบยอดเงินในบัญชี
    if (selectedAmount > balance) {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้',
        text: 'ยอดเงินในบัญชีไม่เพียงพอสำหรับการถอนจำนวนนี้',
      });
      return;
    }

    // อัปเดตยอดเงินในบัญชี
    setBalance(balance - selectedAmount);

    // เพิ่มประวัติการถอน
    setHistory([...history, selectedAmount]);

    // เคลียร์จำนวนเงินที่เลือก
    setSelectedAmount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">โปรแกรมธนาคาร</h1>

        {/* กล่องสำหรับฟอร์มการถอนเงิน */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">ถอนเงิน</h2>

          <div className="mb-4">
            <h3 className="text-xl font-medium text-gray-700">ยอดเงินในบัญชี: <span className="text-green-600">{balance} บาท</span></h3>
          </div>

          {/* แสดงจำนวนเงินที่เลือกก่อนกดถอน */}
          <div className="mb-4">
            {selectedAmount > 0 ? (
              <p className="text-xl font-medium text-gray-800">จำนวนเงินที่เลือก: <span className="text-yellow-500">{selectedAmount} บาท</span></p>
            ) : (
              <p className="text-lg font-medium text-gray-500">กรุณาเลือกจำนวนเงินที่ต้องการถอน</p>
            )}
          </div>

          {/* ปุ่มสำหรับการเลือกจำนวนเงินที่ต้องการถอน */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleSelectAmount(100)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              100 บาท
            </button>
            <button
              onClick={() => handleSelectAmount(500)}
              className="w-full py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition"
            >
              500 บาท
            </button>
            <button
              onClick={() => handleSelectAmount(1000)}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition"
            >
              1000 บาท
            </button>
            <button
              onClick={() => handleSelectAmount(5000)}
              className="w-full py-3 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition"
            >
              5000 บาท
            </button>
          </div>

          {/* ปุ่มลบเงินทีละ 100 บาท */}
          <div className="mb-4">
            <button
              onClick={() => setSelectedAmount(selectedAmount > 100 ? selectedAmount - 100 : 0)}
              className="w-full py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
            >
              ลบทีละ 100 บาท
            </button>
          </div>

          {/* ปุ่มลบทั้งหมด */}
          <div className="mb-4">
            <button
              onClick={handleRemoveAll}
              className="w-full py-3 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition"
            >
              ลบทั้งหมด
            </button>
          </div>

          {/* ปุ่มถอน */}
          <div className="mb-4">
            <button
              onClick={handleWithdraw}
              className="w-full py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
            >
              ถอนเงิน
            </button>
          </div>
        </div>

        {/* กล่องสำหรับประวัติการถอนเงิน */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">ประวัติการถอนเงิน</h2>

          <ul className="space-y-4">
            {history.length === 0 ? (
              <li className="text-gray-500">ยังไม่มีการถอนเงิน</li>
            ) : (
              history.map((amount, index) => (
                <li key={index} className={`p-4 rounded-lg shadow-md ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'} flex justify-between items-center`}>
                  <span className="text-gray-800 font-medium">{amount} บาท</span>
                  <span className="text-gray-600 text-sm">{new Date().toLocaleString()}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
