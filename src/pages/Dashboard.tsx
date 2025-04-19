import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirecting
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import axios from "axios";

type Trend = {
  date: string;
  legit: number;
  spam: number;
};

type Message = {
  message_id: number;
  message: string;
  sender_number: string;
  receiver_number: string;
  prediction: string;
  date: string;
};

type DashboardData = {
  totalMessages: number;
  spamCount: number;
  hamCount: number;
  spamPercentage: number;
  hamPercentage: number;
  modelAccuracy: number;
  trends: Trend[];
  inbox: Message[];
  spam: Message[];
  ham: Message[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate for redirect
  const [loading, setLoading] = useState(true); // Loading state to show "Loading..." message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
        const res = await axios.get<DashboardData>("http://localhost:8080/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData(); // Initial fetch
  
    const interval = setInterval(fetchData, 30000); // Fetch every 60 seconds
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);

  if (loading) return <div className="text-center mt-10">Loading...</div>; // Show loading message

  if (!data) return <div className="text-center mt-10">Failed to load data</div>; // Handle failure case

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                totalMessages={data.totalMessages}
                spamCount={data.spamCount}
                hamCount={data.hamCount}
                spamPercentage={data.spamPercentage}
                hamPercentage={data.hamPercentage}
                modelAccuracy={data.modelAccuracy}
              />

              <div className="px-4 lg:px-6">
                <ChartAreaInteractive trends={data.trends} />
              </div>

              <DataTable
                data={data.inbox}
                spamData={data.spam}
                hamData={data.ham}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
