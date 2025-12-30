import { useState, useEffect } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="text-5xl font-bold text-[#267D48] tracking-wider">
        {`${hours}:${minutes}`}
      </div>
    </div>
  )
}