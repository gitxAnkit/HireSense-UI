import {
  Home,
  LayoutDashboard,
  MessageSquare,
  User,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;

  // Candidate Menu
  const candidateItems = [
    {
      title: "Dashboard",
      url: "/candidate/dashboard",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];

  // Interviewer Menu
  const interviewerItems = [
    {
      title: "Dashboard",
      url: "/interviewer/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Jobs",
      url: "/interviewer/jobs",
      icon: FileText,
    },
    {
      title: "Feedback",
      url: "/interviewer/feedback",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];

  const items =
    role === "candidate"
      ? candidateItems
      : role === "interviewer"
      ? interviewerItems
      : [];

  return (
    <Sidebar className="bg-slate-900 text-gray-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>HireSense</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
