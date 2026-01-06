import {
  Home,
  LayoutDashboard,
  MessageSquare,
  User,
  Video,
  FileText,
  // Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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

// Menu items
const items = [
  {
    title: "Admin Dashboard",
    url: "/dashboard-admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Dashboard",
    url: "/dashboard-user",
    icon: Home,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: FileText,
  },
  {
    title: "Interview Room",
    url: "/interview",
    icon: Video,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const location = useLocation();

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
