"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userRole?: string
}

export function MainLayout({ 
  children, 
  title = "Tableau de Bord", 
  subtitle,
  userRole = "UTILISATEUR" 
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  console.log("MainLayout rendered")

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 transform bg-white border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Sidebar userRole={userRole} className="lg:border-r-0" />
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile menu button */}
        <div className="sticky top-0 z-30 lg:hidden">
          <div className="flex items-center justify-between bg-white border-b px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Header - Hidden on mobile */}
        <div className="hidden lg:block">
          <Header title={title} subtitle={subtitle} />
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}