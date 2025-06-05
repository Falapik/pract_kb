import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-[50px] bg-[#fff] shadow-[0px_4px_80px_0px_rgba(0,0,0,0.15)] rounded-t-[40px] pt-[30px] pb-[40px] px-[30px]">
      <div className="h-[3px] bg-[#BE1010] mb-[40px] mx-[20px]"></div>
      <div className="flex flex-col md:flex-row justify-between gap-[40px] max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap gap-[40px] w-full max-w-[950px]">
          <div className="text-[28px] font-bold flex flex-col gap-5 min-w-[150px]">
            <Image
              src="/logo123.svg"
              alt="Info Logo"
              width={158}
              height={52}
              className="mb-[10px] max-w-[158px]"
            />
            <h1 className="cursor-pointer hover:text-[#BE1010] transition-colors">
              Меню
            </h1>
            <h1 className="cursor-pointer hover:text-[#BE1010] transition-colors">
              Магазины
            </h1>
            <h1 className="cursor-pointer hover:text-[#BE1010] transition-colors">
              О нас
            </h1>
            <div className="flex items-center gap-[16px] justify-center md:justify-start mt-[10px] md:mt-[0px]">
              <Image
                src="/vk.svg"
                alt="VK"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <Image
                src="/tg.svg"
                alt="Telegram"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>

          <div className="text-[19px] text-[#7E7E7E] font-semibold flex flex-col gap-2 min-w-[170px] ml-[120px]">
            <div className="mb-[10px] text-black text-[20px] font-bold">
              Помощь
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Вопросы и ответы
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Доставка
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Обратная связь
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Возврат
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Карта сайта
            </div>
          </div>

          <div className="text-[19px] text-[#7E7E7E] font-semibold flex flex-col gap-2 min-w-[170px]">
            <div className="mb-[10px] text-black text-[20px] font-bold">
              Наша компания
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Бонусная программа
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Сотрудничество
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Партнеры
            </div>
          </div>

          <div className="text-[19px] text-[#7E7E7E] font-semibold flex flex-col gap-2 min-w-[170px]">
            <div className="mb-[10px] text-black text-[20px] font-bold">
              Наши точки
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Карта
            </div>
            <div className="cursor-pointer hover:text-black transition-colors">
              Открытие
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
