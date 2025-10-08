
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Calendar, List, Phone, Leaf, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Request Service",
    url: createPageUrl("RequestService"),
    icon: Calendar,
  },
  {
    title: "My Requests",
    url: createPageUrl("MyRequests"),
    icon: List,
  },
  {
    title: "Contact Us",
    url: createPageUrl("Contact"),
    icon: Phone,
  },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: 142 71% 45%;
          --primary-foreground: 0 0% 100%;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <Sidebar className="border-r border-emerald-100/50 bg-white/95 backdrop-blur-xl hidden md:flex">
          <SidebarHeader className="border-b border-emerald-100/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Hollis Williams</h2>
                <p className="text-xs text-emerald-600 font-medium">Professional Landscaping</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                            : 'text-gray-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/95 backdrop-blur-xl border-b border-emerald-100/50 px-4 md:px-6 py-4 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden hover:bg-emerald-50 p-2 rounded-lg transition-colors duration-200">
                  <Menu className="w-5 h-5" />
                </SidebarTrigger>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-gray-900">Hollis Williams LLC</h1>
                    <p className="text-xs text-emerald-600">Professional Landscaping Services</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <a href="tel:555-123-4567" className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">(555) 123-4567</span>
                </a>
                <Link to={createPageUrl("RequestService")}>
                  <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Book Service</span>
                    <span className="sm:hidden">Book</span>
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>

          <footer className="bg-gradient-to-r from-emerald-900 to-green-900 text-white py-8 px-4 md:px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Hollis Williams LLC</h3>
                </div>
                <p className="text-emerald-100 text-sm">
                  Professional landscaping services for residential and commercial properties.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <div className="space-y-2 text-sm text-emerald-100">
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: info@holliswilliams.com</p>
                  <p>Hours: Mon-Sat, 7am-6pm</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Services</h4>
                <div className="space-y-1 text-sm text-emerald-100">
                  <p>• Lawn Maintenance</p>
                  <p>• Landscape Design</p>
                  <p>• Seasonal Cleanups</p>
                  <p>• Tree & Shrub Care</p>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-emerald-800 text-center text-sm text-emerald-200">
              <p>© 2024 Hollis Williams LLC. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
