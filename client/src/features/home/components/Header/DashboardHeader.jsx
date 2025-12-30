import Clock from './components/Clock';
import Title from './components/Title';
import Logout from './components/Logout';
import Streak from './components/Streak';

export default function DashboardHeader({ user }) {

  return (
    <header className="bg-[#EBF9F1] h-24 md:h-[100px] px-4 md:px-8 flex items-center justify-between shadow-sm">
      <Title userName={user?.name} />
      <Clock />
      <Streak userId={user?.id} />
      <Logout userName={user?.name} />
    </header>
  );
}