import DashboardShell from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Safai Dashboard",
  description: "Admin console",
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}

