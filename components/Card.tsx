import Image from "next/image";

export default function Card() {
  return (
    <div className="max-w-[313px] w-full h-[407px] bg-[#3b3b3b] rounded-[23px] flex flex-col items-center gap-3">
      <Image
        src="/image-card.svg"
        alt="Vercel Logo"
        width={24}
        height={24}
        className="max-w-[313px] w-full h-[269px] rounded-tl-[23px] rounded-tr-[23px]"
      />
      <div className="ml-[20px]">
        <div className="text-[#d6de66] text-xl font-bold ">435₽</div>
        <div className="text-white text-base font-normal ">Много еды</div>
        <div className="flex items-center">
          <div className="max-w-[262px] w-full text-[#c6c6c6] text-sm font-normal ">
            Много еды описание Много еды описание Много еды описание
          </div>
          <Image
            src="/next.svg"
            alt="Vercel Logo"
            width={24}
            height={24}
            className="mr-[30px]"
          />
        </div>
      </div>
    </div>
  );
}
