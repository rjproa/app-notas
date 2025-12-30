import { useState, useEffect, useCallback } from "react";
import {
  getUserStreak,
  setUserStreak,
  getPreviousUserStreak,
  setPreviousStreak,
  getLastCompletedTask,
  setLastCompletedTask
} from './helpers/StreakStorage';

export default function Streak({ userId }) {

  const getInitialStreak = () => {
    if (!userId) return { current: 0, previous: 0 };

    const lastCompletedDate = getLastCompletedTask(userId);
    const current = getUserStreak(userId);
    const previous = getPreviousUserStreak(userId);

    if (!lastCompletedDate) {
      return { current, previous };
    }

    const lastDate = new Date(lastCompletedDate);
    const today = new Date();

    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays === 1) {
      return { current, previous };
    }

    // más de un día → reset
    setPreviousStreak(userId, current);
    setUserStreak(userId, 0);

    return { current: 0, previous: current };
  };

  const [streak, setStreak] = useState(getInitialStreak);

  const updateTaskCompletion = useCallback(() => {
    if (!userId) return;

    const todayISO = new Date().toISOString();
    const lastCompletedDate = getLastCompletedTask(userId);
    const current = getUserStreak(userId);

    if (!lastCompletedDate) {
      setLastCompletedTask(userId, todayISO);
      setUserStreak(userId, 1);
      setPreviousStreak(userId, 0);
      setStreak({ current: 1, previous: 0 });
      return;
    }

    const lastDate = new Date(lastCompletedDate);
    const today = new Date();

    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return; // ya completó hoy
    }

    if (diffDays === 1) {
      const newStreak = current + 1;
      setUserStreak(userId, newStreak);
      setLastCompletedTask(userId, todayISO);
      setStreak(prev => ({ ...prev, current: newStreak }));
      return;
    }

    // más de un día → reset
    setPreviousStreak(userId, current);
    setUserStreak(userId, 1);
    setLastCompletedTask(userId, todayISO);
    setStreak({ current: 1, previous: current });
  }, [userId]);

  useEffect(() => {
    window.updateTaskCompletion = updateTaskCompletion;
    return () => {
      delete window.updateTaskCompletion;
    };
  }, [updateTaskCompletion]);

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-md">
      <div className="text-[#3CC370]">
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          {streak.current === 0 ? (
            <span className="text-sm md:text-base font-semibold text-[#267D48]">
              Iniciar racha
            </span>
          ) : (
            <>
              <span className="text-2xl md:text-3xl font-bold text-[#1C5A33]">
                {streak.current}
              </span>
              <span className="text-xs md:text-sm text-[#5FCE8A] font-medium">
                {streak.current === 1 ? 'día' : 'días'}
              </span>
            </>
          )}
        </div>

        {streak.previous > 0 && streak.current === 0 && (
          <span className="text-xs text-[#82D9A3]">
            Última racha: {streak.previous} {streak.previous === 1 ? 'día' : 'días'}
          </span>
        )}
      </div>
    </div>
  );
}
