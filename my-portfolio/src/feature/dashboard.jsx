import {
  BicepsFlexed,
  Building,
  Eye,
  GraduationCap,
  Image,
  Laugh,
  TrophyIcon,
  Workflow,
} from "lucide-react";
import React from "react";
import DashboardSmallCard from "../components/dashboardSmallCard.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
  return (
    <div className="bg-slate-100 min-h-screen flex">
      <Sidebar />
      <div className="max-w-5xl mx-auto py-16 flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-3">
          <DashboardSmallCard
            icon={<Eye size={30} />}
            bg_color="blue"
            title="Total Visitors"
            number="100,000"
            col_span={2}
          />
          <DashboardSmallCard
            icon={<BicepsFlexed size={30} />}
            bg_color="violet"
            title="Skills"
            number="14"
          />
          <DashboardSmallCard
            icon={<Workflow size={30} />}
            bg_color="green"
            title="Projects"
            number="8"
          />
          <DashboardSmallCard
            icon={<TrophyIcon size={30} />}
            bg_color="red"
            title="Archievements"
            number="12"
          />
          <DashboardSmallCard
            icon={<Building size={30} />}
            bg_color="yellow"
            title="Internship"
            number="12"
          />
          <DashboardSmallCard
            icon={<Laugh size={30} />}
            bg_color="lime"
            title="Activities"
            number="12"
          />
          <DashboardSmallCard
            icon={<GraduationCap size={30} />}
            bg_color="cyan"
            title="Educations"
            number="16"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          <DashboardSmallCard
            icon={<Image size={30} />}
            bg_color="sky"
            title="Total thumbnail images"
            number="23"
          />
          <DashboardSmallCard
            icon={<Image size={30} />}
            bg_color="amber"
            title="Total gallery images"
            number="46"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
