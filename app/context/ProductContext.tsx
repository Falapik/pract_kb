"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const initialData: Record<string, any[]> = {
  Вода: [
    {
      title: "Чикенбургер",
      description:
        "Наш фирменный куриный бургер с нежной курочкой в хрустящей панировке.",
      imageSrc: "/bb.png",
      weight: 200,
      price: 330,
    },
    {
      title: "Чизбургер",
      description: "Бифштекс из 100% говядины с ломтиком сыра.",
      imageSrc: "/bb2.png",
      weight: 250,
      price: 350,
    },
    {
      title: "Яйцебургер",
      description: "Нежная говяжья котлета с яйцом.",
      imageSrc: "/bb3.png",
      weight: 300,
      price: 420,
    },
    {
      title: 'Комбо "Чизбургер+фри+кетчуп"',
      description: "Чизбургер с картошкой фри и кетчупом.",
      imageSrc: "/bb4.png",
      weight: 400,
      price: 500,
    },
  ],
  Соки: [
    {
      title: "Маргарита",
      description: "Классическая пицца с сыром и томатным соусом.",
      imageSrc: "/marg.png",
      weight: 400,
      price: 450,
    },
    {
      title: "Пепперони",
      description: "Острая пицца с колбасой пепперони.",
      imageSrc: "/pep.jpg",
      weight: 500,
      price: 550,
    },
    {
      title: "Белуччи",
      description: "Острая пицца с колбасой пепперони.",
      imageSrc: "/bel.jpg",
      weight: 500,
      price: 550,
    },
    {
      title: "Космос",
      description: "Острая пицца с колбасой пепперони.",
      imageSrc: "/kos.png",
      weight: 500,
      price: 550,
    },
  ],
};

interface ProductContextType {
  items: Record<string, any[]>;
  setItems: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState(initialData);

  return (
    <ProductContext.Provider value={{ items, setItems }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
