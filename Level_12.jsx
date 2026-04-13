import Image from "next/image";
import { useState, useEffect } from "react";

// Функция для генерации случайной разметки (не гарантирует решаемость)
function generateInitialGrid() {
  const tiles = [0, 1, 2, 3, 4, 5, 6, 7, null];
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}

export default function Level_12({ onNext }) {
  const [isRotating, setIsRotating] = useState(true); // Анимация сработает 1 раз
  const [grid, setGrid] = useState(generateInitialGrid());

  const images_1 = [
    "/Svet_1/Svetofor_1.jpg",
    "/Svet_1/Svetofor_2.jpg",
    "/Svet_1/Svetofor_3.jpg",
    "/Svet_1/Svetofor_4.jpg",
    "/Svet_1/Svetofor_5.jpg",
    "/Svet_1/Svetofor_6.jpg",
    "/Svet_1/Svetofor_7.jpg",
    "/Svet_1/Svetofor_8.jpg",
  ];
  const solvedGrid = [0, 1, 2, 3, 4, 5, 6, 7, null];
  const handleCheck_1 = () => {

    if (grid.toString() === solvedGrid.toString()) {
      onNext();
      setMessage('');
    } else {
      setMessage('Пазл ещё не решён. Попробуйте ещё раз!');
    }
  };
  console.log(grid.toString())
  console.log(solvedGrid.toString())
  // Анимация 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRotating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleResetClick = () => {
    // Анимация сброса отключена
    setGrid(generateInitialGrid());
  };

  const handleClick = (index) => {
    const emptyIndex = grid.indexOf(null);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    if (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    ) {
      const newGrid = [...grid];
      [newGrid[index], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[index]];
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    const solvedGrid = [0, 1, 2, 3, 4, 5, 6, 7, null];
    if (grid.toString() === solvedGrid.toString()) {
      onNext();
    }
  }, [grid, onNext]);

  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Текст</p>
          <h3 className="font-bold text-2xl">Текст</h3>
        </div>

        <div className="grid grid-cols-3 p-1 gap-1 h-110">
          {grid.map((tile, index) => (
            <div
              key={index}
              className={`w-36 h-36 border border-gray-300 flex items-center justify-center cursor-pointer 
                transition-transform duration-300 ease-in-out
                ${tile === null ? 'bg-gray-200' : ''}`}
              onClick={() => handleClick(index)}
            >
              {tile !== null && (
                <Image
                  src={images_1[tile]}
                  alt={`Tile ${tile}`}
                  width={144}
                  height={144}
                  className="object-cover rounded-md shadow-sm"
                />
              )}
            </div>
          ))}
        </div>
        <div className="border-t-1 mx-1.5 my-1 p-1 h-16 flex justify-between items-center">
          <Image 
            className={`ml-2 ${isRotating ? 'animate-spin' : ''}`}
            src="/reset.png"
            alt="Сбросить выбор"
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