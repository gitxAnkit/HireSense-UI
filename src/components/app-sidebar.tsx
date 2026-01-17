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
      title: "Job Listing",
      url: "/candidate/jobs",
      icon: FileText,
    },
    {
      title: "Applications",
      url: "/candidate/applications",
      icon: MessageSquare,
    },
  ];

  // Recruiter Menu
  const recruiterItems = [
    {
      title: "Dashboard",
      url: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Job Listing",
      url: "/recruiter/jobs",
      icon: FileText,
    },
    {
      title: "Applications",
      url: "/recruiter/applications",
      icon: MessageSquare,
    },
  ];

  const items =
    role === "candidate"
      ? candidateItems
      : role === "recruiter"
      ? recruiterItems
      : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>HireSense</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
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
