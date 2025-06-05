"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Backet() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      alert("Пожалуйста, введите корректный номер телефона.");
      return;
    }

    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <main className="px-6 py-10 bg-gray-100 min-h-screen text-gray-900">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        🛒 Корзина
      </motion.h1>

      <AnimatePresence>
        {cartItems.length > 0 ? (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row bg-white rounded-2xl shadow p-4 md:p-6 items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={item.imageSrc}
                  width={228}
                  height={174}
                  alt={item.title}
                  className="rounded-lg object-contain"
                />
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm mt-2 text-gray-700">
                    Количество: {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                  <div className="text-xl font-semibold text-[#3d3d3d]">
                    {item.price * item.quantity} ₽
                  </div>
                  <button
                    onClick={() => removeFromCart(item.title)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Удалить
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Корзина пуста
          </motion.p>
        )}
      </AnimatePresence>

      {cartItems.length > 0 && (
        <motion.form
          onSubmit={handlePayment}
          className="mt-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <hr className="border-gray-300" />
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Оставьте свой номер телефона:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="w-full md:w-[400px] bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="text-sm text-gray-600">Скидка: нет</div>
          <div className="text-lg font-semibold">
            Итого: {totalPrice.toLocaleString()} ₽
          </div>
          <button
            type="submit"
            disabled={paymentProcessing}
            className="bg-[#E64030] hover:bg-[#E13D2D] px-6 py-3 rounded-lg text-white font-medium transition"
          >
            {paymentProcessing ? "Оплата..." : "Оплатить"}
          </button>
        </motion.form>
      )}

      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl w-[90%] max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-green-600">
                Оплата прошла успешно!
              </h2>
              <p className="mt-4 text-sm text-gray-700">
                Ваш заказ оформлен. Ожидайте звонка оператора.
              </p>
              <a href="/catalog">
                <button
                  onClick={() => setPaymentSuccess(false)}
                  className="mt-6 w-full bg-[#DC2626] hover:bg-[#ec5151] text-white font-medium py-2 rounded-lg transition"
                >
                  Вернуться в каталог
                </button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
