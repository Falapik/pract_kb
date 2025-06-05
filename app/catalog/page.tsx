"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Accordion from "@/components/Accordion";
import { useProducts } from "@/app/context/ProductContext";
import { tabItems as initialTabItems } from "./catalogData";
import { useCart } from "@/app/context/CartContext";

export default function Catalog() {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [activeTab, setActiveTab] = useState<string>("Вода");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [modalData, setModalData] = useState<{
    title?: string;
    description?: string;
    imageSrc?: string;
    weight?: string;
    price?: string;
  }>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const { items } = useProducts();
  const { addToCart } = useCart();
  const [tabItems, setTabItems] = useState(initialTabItems);

  useEffect(() => {
    const savedItems = localStorage.getItem("tabItems");
    if (savedItems) {
      setTabItems(JSON.parse(savedItems));
    }
  }, []);

  const handleAddToCart = () => {
    if (modalData.title) {
      const itemWithQuantity = {
        ...modalData,
        quantity,
        price: parseInt(modalData.price.replace(/[^\d]/g, ""), 10),
      };
      addToCart(itemWithQuantity);
      setModalOpen(false);
      setQuantity(1);
    }
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption1(event.target.value);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption2(event.target.value);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption3(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleOpenModal = (data: {
    title: string;
    description: string;
    imageSrc: string;
    weight: string;
    price: string;
  }) => {
    setModalData(data);
    setQuantity(1);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filteredItems =
    tabItems[activeTab]
      ?.filter((item) => item.title.toLowerCase().includes(searchQuery))
      .sort((a, b) => {
        if (option2 === "Дорогое") return b.price - a.price;
        if (option2 === "Недорогое") return a.price - b.price;
        if (option3 === "Макси") return b.weight - a.weight;
        if (option3 === "Мини") return a.weight - b.weight;
        return 0;
      }) || [];

  return (
    <div className="bg-white min-h-screen text-black px-5 pb-10">
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold">Каталог</h1>
        <div className="flex gap-3 flex-wrap">
          <select
            value={option1}
            onChange={handleChange1}
            className="bg-gray-50 border border-neutral-300 px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="">По популярности</option>
            <option value="Популярное">Популярное</option>
            <option value="Непопулярное">Непопулярное</option>
          </select>
          <select
            value={option2}
            onChange={handleChange2}
            className="bg-gray-50 border border-neutral-300 px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="">По цене</option>
            <option value="Дорогое">Дорогое</option>
            <option value="Недорогое">Недорогое</option>
          </select>
          <select
            value={option3}
            onChange={handleChange3}
            className="bg-gray-50 border border-neutral-300 px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="">По граммовке</option>
            <option value="Мини">Мини</option>
            <option value="Макси">Макси</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-lg text-gray-500">
        {`${option1} ${option2} ${option3}`}
      </p>

      <div className="flex flex-wrap mt-6">
        <div className="w-full sm:w-1/4 pr-4">
          <Accordion
            items={[
              { title: "Вода", content: ["Вода", "Соки", "Газировка"] },
              { title: "Снеки", content: ["Чипсы", "Кириешки", "Орешки"] },
              { title: "Макароны", content: ["Рожки", "Спагетти", "Паутинка"] },
              {
                title: "Чипсы",
                content: ["Lay's", "Pringles", "Русская картошка"],
              },
            ]}
            onTabClick={setActiveTab}
          />
        </div>
        <div className="w-full sm:w-3/4">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 rounded-md bg-gray-50 text-black border border-neutral-300 mb-6 placeholder:text-gray-400 focus:outline-none"
          />

          {activeTab ? (
            <div>
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] duration-300 cursor-pointer"
                      onClick={() =>
                        handleOpenModal({
                          title: item.title,
                          description: item.description,
                          imageSrc: item.imageSrc,
                          weight: `${item.weight} г`,
                          price: `${item.price}₽`,
                        })
                      }
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        width={313}
                        height={269}
                        className="w-full h-[269px] object-contain"
                      />
                      <div className="p-4 space-y-1">
                        <div className="text-black text-xl font-bold">
                          {item.price}₽
                        </div>
                        <div className="text-black text-base">{item.title}</div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-4">
                  В данный момент у нас нет этого продукта. Приносим извинения
                  :(
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Выберите элемент из каталога</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white text-black rounded-xl p-6 max-w-2xl w-full shadow-lg flex flex-col sm:flex-row gap-6">
            <Image
              src={modalData.imageSrc}
              alt="Product"
              width={200}
              height={200}
              className="rounded-lg object-contain"
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">{modalData.title}</h2>
              <p>{modalData.description}</p>
              <p className="text-sm text-gray-600">Вес: {modalData.weight}</p>
              <p className="text-sm text-gray-600">Цена: {modalData.price}</p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-lg rounded-md"
                >
                  –
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-lg rounded-md"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#BE1010] hover:bg-[#a50d0d] transition-colors text-white px-4 py-2 rounded-md"
                >
                  Добавить в корзину
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-200 hover:bg-gray-300 transition-colors text-black px-4 py-2 rounded-md"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
