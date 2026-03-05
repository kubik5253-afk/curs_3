import Image from "next/image";
import { useState, useEffect, useRef } from "react";



export default function Level_8({ onNext }) {
  const [isRotating, setIsRotating] = useState(false);

  const handleResetClick = () => {
    setSelected_1([]);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleClick_1 = (index) => {
    setSelected_1(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Состояние позиции и поворота машины
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);
  
  // Состояние для управления движениями
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const [isTurningLeft, setIsTurningLeft] = useState(false);
  const [isTurningRight, setIsTurningRight] = useState(false);
  
  // Состояние для отслеживания проигрыша
  const [gameOver, setGameOver] = useState(false);

  // Параметры игры
  const rotationSpeed = 3; // Скорость поворота в градусах
  const moveSpeed = 3; // Скорость движения в пикселях
  const rotationRef = useRef(rotation); // Реф для угла поворота
  const moveIntervalRef = useRef(null); // Реф для интервала игры
  const gameOverRef = useRef(false); // Реф для отслеживания проигрыша

  // Определяем стенку
  const wall = {
    x: 280,
    y: 200,
    width: 100,
    height: 200
  };

  // Обновляем реф угла поворота
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Обновляем реф состояния игры
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  // Обработчик событий клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setIsMovingForward(true);
          break;
        case "ArrowDown":
          setIsMovingBackward(true);
          break;
        case "ArrowLeft":
          setIsTurningLeft(true);
          break;
        case "ArrowRight":
          setIsTurningRight(true);
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setIsMovingForward(false);
          break;
        case "ArrowDown":
          setIsMovingBackward(false);
          break;
        case "ArrowLeft":
          setIsTurningLeft(false);
          break;
        case "ArrowRight":
          setIsTurningRight(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Проверка коллизии с учётом реальных размеров машины
  const isCollision = (newX, newY) => {
    // Хитбокс машины (60x60 пикселей)
    const carLeft = newX;
    const carRight = newX + 60;
    const carTop = newY;
    const carBottom = newY + 60;

    // Хитбокс стенки
    const wallLeft = wall.x;
    const wallRight = wall.x + wall.width;
    const wallTop = wall.y;
    const wallBottom = wall.y + wall.height;

    return (
      carRight > wallLeft &&
      carLeft < wallRight &&
      carBottom > wallTop &&
      carTop < wallBottom
    );
  };

  // Основной игровой цикл
  useEffect(() => {
    const gameLoop = () => {
      // Если игра окончена, останавливаем цикл
      if (gameOverRef.current) {
        clearInterval(moveIntervalRef.current);
        return;
      }

      // Обновляем поворот только при движении
      if (isMovingForward || isMovingBackward) {
        let newRotation = rotationRef.current;
        
        // Инвертируем повороты при движении назад
        if (isMovingBackward) {
          if (isTurningLeft) {
            newRotation = (rotationRef.current + rotationSpeed) % 360;
          }
          if (isTurningRight) {
            newRotation = (rotationRef.current - rotationSpeed) % 360;
          }
        } else {
          if (isTurningLeft) {
            newRotation = (rotationRef.current - rotationSpeed) % 360;
          }
          if (isTurningRight) {
            newRotation = (rotationRef.current + rotationSpeed) % 360;
          }
        }
        
        // Обновляем реф и состояние только при изменении угла
        if (newRotation !== rotationRef.current) {
          rotationRef.current = newRotation;
          setRotation(newRotation);
        }
      }
      
      // Обновляем позицию с проверкой коллизии
      if (isMovingForward || isMovingBackward) {
        const rad = ((rotationRef.current - 90) * Math.PI) / 180;
        const dx = Math.cos(rad) * moveSpeed;
        const dy = Math.sin(rad) * moveSpeed;
        
        // Рассчитываем новую позицию
        const newX = x + (isMovingForward ? dx : isMovingBackward ? -dx : 0);
        const newY = y + (isMovingForward ? dy : isMovingBackward ? -dy : 0);
        
        // Проверяем коллизию
        if (isCollision(newX, newY)) {
          // Если столкнулись - завершаем игру
          setGameOver(true);
          clearInterval(moveIntervalRef.current);
          return;
        } else {
          // Обновляем позицию
          setX(newX);
          setY(newY);
        }
      }
    };

    moveIntervalRef.current = setInterval(gameLoop, 16);
    return () => clearInterval(moveIntervalRef.current);
  }, [isMovingForward, isMovingBackward, isTurningLeft, isTurningRight, x, y]);
  console.log(x)
  console.log(y)

  const handleCheck_1 = () => {
  const correctIndex = [9]; // Теперь это массив
  if (JSON.stringify(correctIndex.sort()) === JSON.stringify(selected_1.sort())) {
    onNext();
  }
};
  return (
    <>
      <div className="border-1 border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#488ddd] m-1.5 pl-3 pt-1 h-18 text-neutral-50">
          <p>Выберите квадрат другого цвета</p>
          <h3 className="font-bold text-2xl">Проверка зрения</h3>
        </div>

        <div className="">
          {/* Отображаем сообщение о проигрыше */}
      {gameOver && (
        <div style={{ 
          color: "red", 
          fontSize: "24px", 
          marginBottom: "20px",
          fontWeight: "bold"
        }}>
          Вы проиграли
        </div>
      )}
      
      <div style={{ 
        position: "relative", 
        width: "100%", 
        height: "500px", 
        border: "1px solid #ccc",
        overflow: "hidden"
      }}>
        {/* Фон дороги */}
        <Image
          src="/bg-road.avif"
          alt="Фон дороги"
          width={600}
          height={600}
        />
        
        {/* Стенка */}
        <div style={{ 
          position: "absolute",
          left: `${wall.x}px`,
          top: `${wall.y}px`,
          width: `${wall.width}px`,
          height: `${wall.height}px`,
          backgroundColor: "red",
          opacity: 0.5,
          zIndex: 1
        }} />
        
        {/* Машина */}
        <div style={{ 
          position: "absolute", 
          left: `${x}px`, 
          top: `${y}px`,
          transform: `rotate(${rotation}deg)`,
        }}>
          <Image
            src="/Car_10.png"
            alt="Машина"
            width={60}
            height={60}
          />
        </div>
        
        {/* Дополнительная машина (декоративная) */}
        <Image
          src="/Car_8.png"
          alt="Декоративная машина"
          width={60}
          height={60}
        />
      </div>
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