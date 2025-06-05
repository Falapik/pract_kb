import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";

export default function Home() {
  const recommendations = [
    { title: "Соки", bg: "bg-card-image" },
    { title: "Мороженое", bg: "bg-card-image2" },
    { title: "Чипсы", bg: "bg-card-image3" },
    { title: "Макароны", bg: "bg-card-image4" },
    { title: "Снеки", bg: "bg-card-image5" },
    { title: "Консервы", bg: "bg-card-image6" },
  ];

  const popular = [
    {
      title: 'Вода "Алтайский источник"',
      desc: "Вода с настоящего источника в Алтае",
      price: "33₽",
      img: "/wer3.jpg",
    },
    {
      title: 'Сок Яблоко "Добрый"',
      desc: "Сок из натуральных продуктов, без добавок",
      price: "149₽",
      img: "/apple.jpeg",
    },
    {
      title: "Чипсы Lay's",
      desc: "Чипсы Lay's со вкусом лосося",
      price: "169₽",
      img: "/lays.jpg",
    },
    {
      title: "Макароны Макфа",
      desc: "Ракушки, натуральный продукт, 400 гр",
      price: "48₽",
      img: "/makfa.jpg",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-10 space-y-16 bg-white relative">
      <div className="absolute top-[521px] right-[800px] z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image
            src="/person1.png"
            alt="Человек выглядывает"
            width={150}
            height={150}
            className="object-contain"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[400px] rounded-3xl overflow-hidden bg-custom-image bg-cover bg-center shadow-xl"
      >
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">
            Новые поставки продуктов
          </h1>
          <Image src="/next.svg" alt="Иконка" width={50} height={50} />
        </div>
      </motion.div>

      <section className="relative">
        <h2 className="text-3xl font-bold mb-6">Рекомендации</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`h-[220px] rounded-3xl ${item.bg} bg-cover bg-center shadow-md flex flex-col justify-between p-6 hover:shadow-lg transition-shadow`}
            >
              <h3 className="text-2xl font-bold text-white drop-shadow">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Часто заказывают</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popular.map((product, idx) => (
            <a href="catalog" key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={product.img}
                  alt={product.title}
                  width={313}
                  height={269}
                  className="w-full h-[260px] object-contain"
                />
                <div className="p-5 space-y-2">
                  <div className="text-rose-500 text-xl font-semibold">
                    {product.price}
                  </div>
                  <div className="text-lg font-medium">{product.title}</div>
                  <div className="text-sm text-gray-500">{product.desc}</div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <Link href="/catalog">
          <button className="px-8 py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-all shadow-md">
            Посмотреть в каталоге
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
