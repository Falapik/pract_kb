"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Lk() {
  const [nameInput, setNameInput] = useState({ value: "", isFocused: false });
  const [phoneInput, setPhoneInput] = useState({ value: "", isFocused: false });
  const [addressInput, setAddressInput] = useState({
    value: "",
    isFocused: false,
  });

  const [userData, setUserData] = useState({
    name: "Неизвестно",
    phone: "Неизвестно",
    address: "Неизвестно",
  });

  const [profileImage, setProfileImage] = useState("/lk.svg");

  const inputStyle =
    "w-full h-full px-4 pt-5 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#BE1010]";

  const labelStyle = (focused: boolean, value: string) =>
    `absolute left-4 top-2.5 text-gray-400 transition-all duration-200 bg-white ${
      focused || value
        ? "text-sm -top-3 px-2 ml-2 translate-y-[-20px] scale-90"
        : "text-base"
    }`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = nameInput.value || userData.name;
    const newPhone = phoneInput.value || userData.phone;
    const newAddress = addressInput.value || userData.address;
    setUserData({ name: newName, phone: newPhone, address: newAddress });
    localStorage.setItem(
      "userData",
      JSON.stringify({ name: newName, phone: newPhone, address: newAddress })
    );
    setNameInput({ value: "", isFocused: false });
    setPhoneInput({ value: "", isFocused: false });
    setAddressInput({ value: "", isFocused: false });
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/");
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10 px-6 lg:px-16">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-[#BE1010] mb-6">
          Личный кабинет
        </h1>

        <div className="flex items-start gap-10">
          <Image
            src={profileImage}
            alt=" "
            width={180}
            height={180}
            className="rounded-full border-4 border-[#BE1010] object-contain bg-gray-200"
          />
          <div className="text-lg space-y-4">
            <div>
              <p className="text-sm text-gray-500">Ваше имя</p>
              <p>{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ваш номер телефона</p>
              <p>{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ваш адрес доставки</p>
              <p>{userData.address}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-[#BE1010]">
          Ваш недавний заказ
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div className="flex gap-6">
            <Image
              src="/wer3.jpg"
              width={150}
              height={120}
              alt="Burger"
              className="rounded-xl"
            />
            <div>
              <h3 className="text-xl font-bold">Вода</h3>
              <p className="text-gray-600 mt-2">Обычная вода.</p>
            </div>
          </div>
          <div className="text-xl font-semibold text-[#BE1010]">23 руб</div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-[#BE1010] mb-6">
            Изменение информации
          </h2>

          <div className="relative w-full h-14 mb-6">
            <label className="cursor-text block">
              <span
                className={labelStyle(nameInput.isFocused, nameInput.value)}
              >
                Ваше имя
              </span>
              <input
                name="name"
                type="text"
                value={nameInput.value}
                onChange={(e) =>
                  setNameInput({ ...nameInput, value: e.target.value })
                }
                onFocus={() => setNameInput({ ...nameInput, isFocused: true })}
                onBlur={() => setNameInput({ ...nameInput, isFocused: false })}
                className={inputStyle}
              />
            </label>
          </div>

          <div className="relative w-full h-14 mb-6">
            <label className="cursor-text block">
              <span
                className={labelStyle(phoneInput.isFocused, phoneInput.value)}
              >
                Ваш телефон
              </span>
              <input
                name="phone"
                type="text"
                value={phoneInput.value}
                onChange={(e) =>
                  setPhoneInput({ ...phoneInput, value: e.target.value })
                }
                onFocus={() =>
                  setPhoneInput({ ...phoneInput, isFocused: true })
                }
                onBlur={() =>
                  setPhoneInput({ ...phoneInput, isFocused: false })
                }
                className={inputStyle}
              />
            </label>
          </div>

          <div className="relative w-full h-14 mb-6">
            <label className="cursor-text block">
              <span
                className={labelStyle(
                  addressInput.isFocused,
                  addressInput.value
                )}
              >
                Ваш адрес
              </span>
              <input
                name="address"
                type="text"
                value={addressInput.value}
                onChange={(e) =>
                  setAddressInput({ ...addressInput, value: e.target.value })
                }
                onFocus={() =>
                  setAddressInput({ ...addressInput, isFocused: true })
                }
                onBlur={() =>
                  setAddressInput({ ...addressInput, isFocused: false })
                }
                className={inputStyle}
              />
            </label>
          </div>

          <div className="mb-8">
            <label className="block text-gray-600 text-sm mb-1 mt-[80px]">
              Загрузить фото
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-upload"
            />
            <label
              htmlFor="profile-upload"
              className="block w-full text-center bg-gray-300 hover:bg-gray-400 text-white py-2 rounded-full cursor-pointer transition"
            >
              Изменить фото
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#83DE67] hover:bg-[#6fcf5b] text-white py-2 rounded-full font-medium transition"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
