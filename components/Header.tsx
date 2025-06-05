"use client";

import { useState, useEffect } from "react";
import { auth } from "../app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsRegisterMode(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthAction = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        alert("Ошибка: " + error.message);
      } else {
        alert("Произошла неизвестная ошибка");
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div className="w-full bg-gradient-to-r bg-[#E64030]  h-[94px] flex items-center justify-between px-6 md:px-12 shadow-md">
        <a href="/">
          <Image src="/logo123.svg" alt="Logo" width={130} height={40} />
        </a>
        <div className="hidden md:flex items-center gap-6">
          <input
            type="text"
            placeholder="Найти"
            className="h-[42px] w-[320px] bg-white rounded-xl text-gray-800 text-sm px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <a href="catalog" className="text-[18px] text-white hover:underline">
            Каталог
          </a>
          <a href="#" className="text-[18px] text-white hover:underline">
            Наши точки
          </a>
          <a href="backet" className="relative">
            <Image src="/backet.svg" alt="Cart" width={36} height={36} />
            {totalItemsInCart > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-black text-xs flex items-center justify-center rounded-full font-bold">
                {totalItemsInCart}
              </div>
            )}
          </a>
          {user ? (
            <button className="px-3 py-2 rounded-lg" onClick={handleSignOut}>
              <Image src="/logout.svg" alt="Exit" width={36} height={36} />
            </button>
          ) : (
            <button
              className="text-[18px] bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-100"
              onClick={toggleModal}
            >
              Войти
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <Image src="/burger.svg" alt="Menu" width={36} height={36} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#E64030] w-full p-6 space-y-6 shadow-md">
          <a href="catalog" className="text-[22px] text-white hover:underline">
            Меню
          </a>
          <a href="#" className="text-[22px] text-white hover:underline">
            Наши точки
          </a>
          <a href="backet" className="relative">
            <Image src="/backet.svg" alt="Cart" width={36} height={36} />
            {totalItemsInCart > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-white text-xs flex items-center justify-center rounded-full">
                {totalItemsInCart}
              </div>
            )}
          </a>
          {user ? (
            <button
              className="text-[20px] bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSignOut}
            >
              Выход
            </button>
          ) : (
            <button
              className="text-[20px] bg-white text-red-600 px-4 py-2 rounded-lg border border-red-400"
              onClick={toggleModal}
            >
              Войти
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-[500px] p-6 rounded-2xl shadow-xl relative flex flex-col items-center">
            <Image src="/logo123.svg" alt="Logo" width={220} height={72} />
            <h2 className="text-[22px] font-semibold mb-4 text-center">
              {isRegisterMode ? "Регистрация" : "Вход"}
            </h2>
            <form onSubmit={handleAuthAction} className="w-full">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Почта
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Введите вашу почту"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Введите ваш пароль"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                {isRegisterMode ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>
            <p
              className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
            >
              {isRegisterMode
                ? "Уже есть аккаунт? Войти"
                : "Нет аккаунта? Зарегистрируйтесь!"}
            </p>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
              onClick={toggleModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}
