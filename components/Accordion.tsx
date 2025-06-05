import { useState, ReactNode } from "react";

type AccordionItem = {
  title: string;
  content: string[];
};

type AccordionProps = {
  items: AccordionItem[];
  onTabClick: (tab: string) => void;
};

export default function Accordion({ items, onTabClick }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-lg ml-[35px]">
      {items.map((item, index) => (
        <div key={index} className="mb-1 border-b">
          <button
            onClick={() => handleToggle(index)}
            className="text-left w-full px-4 py-3 font-semibold hover:bg-gray-200 "
          >
            {item.title}
          </button>
          {activeIndex === index && (
            <ul className="px-4 py-3 bg-white space-y-2 flex flex-col items-start">
              {item.content.map((line, lineIndex) => (
                <button
                  key={lineIndex}
                  className="text-gray-700 hover:text-[#e65050]"
                  onClick={() => onTabClick(line)}
                >
                  {line}
                </button>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
