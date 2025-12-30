const STREAK_KEY = 'currentStreak';
const PREVIOUS_KEY = 'previousStreak';
const LAST_TASK_KEY = 'lastCompletedTask';

export const getStreaks = () =>
  JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');

export const setStreaks = (data) =>
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));

export const getUserStreak = (userId) => {
  const streaks = getStreaks();
  return streaks[userId]?.value ?? 0;
};

export const setUserStreak = (userId, value) => {
  const streaks = getStreaks();
  streaks[userId] = { value };
  setStreaks(streaks);
};

export const getPreviousStreaks = () =>
  JSON.parse(localStorage.getItem(PREVIOUS_KEY) || '{}');

export const setPreviousStreak = (userId, value) => {
  const prev = getPreviousStreaks();
  prev[userId] = { value };
  localStorage.setItem(PREVIOUS_KEY, JSON.stringify(prev));
};

export const getPreviousUserStreak = (userId) => {
  const prev = getPreviousStreaks();
  return prev[userId]?.value ?? 0;
};

export const getLastCompletedTask = (userId) =>
  localStorage.getItem(`${LAST_TASK_KEY}_${userId}`);

export const setLastCompletedTask = (userId, date) =>
  localStorage.setItem(`${LAST_TASK_KEY}_${userId}`, date);
