"use client";

import React, { useState, useEffect, useRef } from "react";
import { tabItems as initialTabItems } from "../catalog/catalogData";
import { motion, AnimatePresence } from "framer-motion";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tabItems, setTabItems] = useState(() => {
    const savedItems = localStorage.getItem("tabItems");
    return savedItems ? JSON.parse(savedItems) : initialTabItems;
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newItemCategory, setNewItemCategory] = useState("");
  const [categories, setCategories] = useState(Object.keys(initialTabItems));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("tabItems", JSON.stringify(tabItems));
  }, [tabItems]);

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setIsCreating(false);
    setImagePreview(item.imageSrc || null);
    setImageFile(null);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedItem({
      title: "",
      description: "",
      imageSrc: "",
      weight: 0,
      price: 0,
    });
    setIsCreating(true);
    setImagePreview(null);
    setImageFile(null);
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки изображения");
      }

      const data = await response.json();
      return data.filePath;
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      return null;
    }
  };

  const handleSave = async () => {
    if (isCreating) {
      if (!newItemCategory) {
        alert("Пожалуйста, выберите категорию для нового товара");
        return;
      }
    }

    let imagePath = selectedItem.imageSrc;

    // Upload new image if selected
    if (imageFile) {
      const uploadedPath = await uploadImage();
      if (uploadedPath) {
        imagePath = uploadedPath;
      } else {
        alert("Не удалось загрузить изображение");
        return;
      }
    }

    const updatedItem = {
      ...selectedItem,
      price: Number(selectedItem.price),
      weight: Number(selectedItem.weight),
      imageSrc: imagePath,
    };

    if (isCreating) {
      const updatedItems = { ...tabItems };
      updatedItems[newItemCategory] = [
        ...updatedItems[newItemCategory],
        updatedItem,
      ];
      setTabItems(updatedItems);
    } else {
      const updatedItems = { ...tabItems };
      Object.keys(updatedItems).forEach((category) => {
        updatedItems[category] = updatedItems[category].map((item) =>
          item.title === selectedItem.title ? updatedItem : item
        );
      });
      setTabItems(updatedItems);
    }

    try {
      const response = await fetch("/api/updateCatalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tabItems),
      });

      const result = await response.json();
      console.log("Ответ сервера:", result);

      if (!response.ok) {
        throw new Error(result.error || "Ошибка обновления каталога");
      }

      alert("Каталог успешно обновлён!");
    } catch (error: any) {
      console.error("Полная ошибка:", error);
      alert("Ошибка: " + error.message);
    }

    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) return;

    const updatedItems = { ...tabItems };
    Object.keys(updatedItems).forEach((category) => {
      updatedItems[category] = updatedItems[category].filter(
        (item) => item.title !== selectedItem.title
      );
    });

    setTabItems(updatedItems);
    setModalOpen(false);

    try {
      const response = await fetch("/api/updateCatalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItems),
      });

      if (!response.ok) throw new Error("Ошибка обновления каталога");

      alert("Товар успешно удалён!");
    } catch (error: any) {
      alert("Ошибка: " + error.message);
    }
  };

  const handleAddCategory = () => {
    const categoryName = prompt("Введите название новой категории:");
    if (categoryName && !categories.includes(categoryName)) {
      const updatedItems = { ...tabItems, [categoryName]: [] };
      setTabItems(updatedItems);
      setCategories([...categories, categoryName]);
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md w-80"
        >
          <h2 className="text-xl font-semibold mb-4">Введите пароль</h2>
          <input
            type="password"
            className="bg-gray-100 border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#BE1010]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-[#BE1010] hover:bg-red-700 transition-colors w-full p-2 rounded text-white font-medium"
            onClick={() => {
              if (password === "123") {
                setAuthenticated(true);
              } else {
                alert("Доступ запрещен!");
              }
            }}
          >
            Войти
          </button>
        </motion.div>
      </div>
    );
  }

  const allItems = Object.values(tabItems).flat();

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 px-6 py-10">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Панель администратора
      </motion.h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCreateClick}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
        >
          Добавить товар
        </button>
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          Добавить категорию
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {allItems.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-base font-semibold">Цена: {item.price}₽</p>
                <p className="text-base font-semibold mb-3">
                  Вес: {item.weight}г
                </p>
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-[#BE1010] hover:bg-red-700 text-white py-1 px-4 rounded transition-colors mr-2"
                >
                  Изменить
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <motion.div className="bg-white text-gray-900 p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">
                {isCreating ? "Добавить товар" : "Редактировать товар"}
              </h2>

              {isCreating && (
                <label className="block mb-3">
                  <span className="block mb-1">Категория</span>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded"
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="block mb-3">
                <span className="block mb-1">Изображение</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 border border-gray-300 p-2 rounded mb-2"
                >
                  Выберите файл
                </button>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 object-contain"
                    />
                  </div>
                )}
              </label>

              {["title", "description", "price", "weight"].map((field) => (
                <label key={field} className="block mb-3">
                  <span className="block mb-1 capitalize">
                    {field === "price"
                      ? "Цена"
                      : field === "weight"
                      ? "Вес (г)"
                      : field}
                  </span>
                  <input
                    type={
                      field === "price" || field === "weight"
                        ? "number"
                        : "text"
                    }
                    name={field}
                    value={selectedItem[field]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded"
                  />
                </label>
              ))}

              <div className="flex justify-between mt-4">
                {!isCreating && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Удалить
                  </button>
                )}
                <div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 px-4 rounded mr-2"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-[#BE1010] hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
