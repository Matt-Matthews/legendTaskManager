import React from "react";
import Navbar from "../components/Navbar";
import DashboardView from "../components/DashboardView";


function Dashboard() {
  
  return (
    <main className="h-screen">
      <Navbar />
      <DashboardView />
    </main>
  );
}

export default Dashboard;
