import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  return (
    <div className="app">
      <Topbar />
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
