import DashboardHeader from "./components/Header/DashboardHeader";
import { useAuth } from "../../utils/useAuth";
import TaskGroups from "./components/Notes/Tasks";
import DashboardWithNotices from "./components/Notices/DashboardWithNotices";


export default function Dashboard() {
  const { user } = useAuth();
  const isReady = Boolean(user?.id);

  if (!isReady) return null;

  return (
    <>
      <DashboardHeader user={user} />
      <DashboardWithNotices>
        <TaskGroups userId={user.id} />
      </DashboardWithNotices>
    </>
  );
}
