import { useState, useEffect, useRef } from "react";

export default function Level_9({ onNext }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [color, setColor] = useState("#fff");
  const [activClick, setActivClick] = useState(false);
  const [userSequence, setUserSequence] = useState([]);
  const timeoutRef = useRef(null);

  const correct = [4, 2, 10];
  const colors = [
    "#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#a133ff",
    "#33fff5", "#f5ff33", "#ff8c33", "#8c33ff", "#33ff8c",
    "#ff3333", "#33ff33", "#3333ff", "#ffff33", "#ff33ff",
    "#33ffff", "#ff9933", "#9933ff", "#33ff99", "#99ff33",
    "#ff3399", "#3399ff", "#99ff33", "#ff6633", "#6633ff"
  ];

  useEffect(() => {
    const color_1 = setTimeout(() => {
      setSelectedCell(4);
      setColor("#a133ff");
    }, 1000);

    const color_2 = setTimeout(() => {
      setSelectedCell(2);
      setColor("#3357ff");
    }, 2000);

    const color_3 = setTimeout(() => {
      setSelectedCell(10);
      setColor("#ff3333");
    }, 3000);

    const color_4 = setTimeout(() => {
      setSelectedCell(null);
      setActivClick(true);
    }, 4000);

    return () => {
      clearTimeout(color_1);
      clearTimeout(color_2);
      clearTimeout(color_3);
      clearTimeout(color_4);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const colorClick = (i) => {
    if (activClick) {
      const newSequence = [...userSequence, i];
      setUserSequence(newSequence);
      setSelectedCell(i);
      setColor(colors[i]);

      const isCorrectUpToNow = newSequence.every((val, index) => val === correct[index]);

      if (!isCorrectUpToNow) {
        setColor("red");
        timeoutRef.current = setTimeout(() => {
          setSelectedCell(null);
          setColor("#fff");
          setUserSequence([]);
        }, 500);
      } else if (newSequence.length === correct.length) {
        timeoutRef.current = setTimeout(() => {
          setSelectedCell(null);
          setColor("#fff");
          onNext();
        }, 500);
      } else {
        timeoutRef.current = setTimeout(() => {
          setSelectedCell(null);
          setColor("#fff");
        }, 500);
      }
    }
  };

  return (
    <>
      <div className="border-1 rounded-2xl bg-[#1a1a1a] border-gray-300 mx-auto w-115 h-151 shadow-2xl mt-5">
        <div className="bg-[#2a2a2a] m-3 pl-3 pt-1 h-18 text-neutral-50">
          <p>Текст</p>
          <h3 className="font-bold text-2xl">Текст</h3>
        </div>

        <div className="ml-6 mr-5 my-1.5 h-105 w-105 grid grid-cols-5 grid-rows-5">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`bg-[#3e3e3e] h-19 w-19 gap-1 rounded-sm ${activClick ? "hover:bg-[#6c6c6c]" : ""}`}
              style={{ backgroundColor: selectedCell === i ? color : "" }}
              onClick={() => colorClick(i)}
            />
          ))}
        </div>

        <div className="border-b-neutral-200 bg-[#222222] mx-1.5 p-1 h-16 flex flex-row-reverse items-center">
          <button
            className="h-10 w-25 bg-[#333333] rounded-xl text-neutral-50"
            onClick={() => {
              // Optional: Add logic for final check if needed
            }}
          >
            Проверить
          </button>
        </div>
      </div>
    </>
  );
}