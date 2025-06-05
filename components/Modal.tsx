import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  imageSrc?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  imageSrc,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {imageSrc && (
          <div className="mb-4">
            <Image
              src={imageSrc}
              alt={title || "Modal Image"}
              width={400}
              height={300}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
        {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
        {description && <p className="text-gray-700">{description}</p>}
      </div>
    </div>
  );
};

export default Modal;
