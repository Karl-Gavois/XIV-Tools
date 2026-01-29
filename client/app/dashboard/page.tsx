// app/dashboard/page.tsx
import { Metadata } from "next";
import DashboardContent from "./dashboardcontent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Votre tableau de bord",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
