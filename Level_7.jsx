import Image from "next/image";
import { useState } from "react";
export default function Level_2({ onNext }) {
  // Состояние для отслеживания выбранных изображений
  const [isRotating, setIsRotating] = useState(false);
  // Состояние для переключения между изображениями

  const handleResetClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleCheck_1 = () => {
    if (localStorage.getItem('veri') === 'true') {
      onNext();
    } else {
      alert('не верно');
    }
  };



  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Выберите квадрат другого цвета </p>
          <h3 className="font-bold text-2xl">Проверка зрения</h3>
        </div>

        {/* Контейнер с изображениями */}
        <div className="grid grid-cols-4 p-1 gap-1">
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ef21f7] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
            <div className="bg-[#ec55f1] h-27"></div>
        </div>

        <div className="border-t-1 mx-1.5 my-1 p-1 h-16 flex justify-between items-center">
          <Image 
            className={`ml-2 ${isRotating ? 'animate-spin' : ''}`}
            src="/reset.png"
            alt="Описание картинки" 
            width={20}
            height={20} 
            onClick={handleResetClick}
          />
          <button 
            className="h-10 w-25 bg-[#488ddd] text-neutral-50"
            onClick={handleCheck_1}
          >
            Проверить
          </button>
        </div>
      </div>
    </>
  );
}