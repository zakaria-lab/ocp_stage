"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  Wrench,
  ClipboardList,
  Calendar,
  Package,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
  Home,
  Plus,
  Search
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  userRole?: string
}

export function Sidebar({ className, userRole = "UTILISATEUR" }: SidebarProps) {
  const pathname = usePathname()

  console.log("Sidebar rendered with role:", userRole)

  const menuItems = [
    {
      title: "Tableau de Bord",
      href: "/dashboard",
      icon: Home,
      roles: ["UTILISATEUR", "TECHNICIEN_N1", "TECHNICIEN_N2", "TECHNICIEN_N3", "RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Nouvelle Demande",
      href: "/interventions/nouvelle",
      icon: Plus,
      roles: ["UTILISATEUR", "TECHNICIEN_N1", "TECHNICIEN_N2", "TECHNICIEN_N3", "RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Mes Interventions",
      href: "/interventions",
      icon: Wrench,
      roles: ["UTILISATEUR", "TECHNICIEN_N1", "TECHNICIEN_N2", "TECHNICIEN_N3", "RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Rechercher",
      href: "/recherche",
      icon: Search,
      roles: ["TECHNICIEN_N1", "TECHNICIEN_N2", "TECHNICIEN_N3", "RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Planification",
      href: "/planification",
      icon: Calendar,
      roles: ["RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Inventaire",
      href: "/inventaire",
      icon: Package,
      roles: ["TECHNICIEN_N2", "TECHNICIEN_N3", "RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Rapports",
      href: "/rapports",
      icon: BarChart3,
      roles: ["RESPONSABLE", "ADMINISTRATEUR"]
    },
    {
      title: "Utilisateurs",
      href: "/utilisateurs",
      icon: Users,
      roles: ["ADMINISTRATEUR"]
    },
    {
      title: "Configuration",
      href: "/configuration",
      icon: Settings,
      roles: ["ADMINISTRATEUR"]
    }
  ]

  const visibleItems = menuItems.filter(item => item.roles.includes(userRole))

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        {/* Header */}
        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 mb-4">
            <Building2 className="h-6 w-6 text-ocp-blue-500" />
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-ocp-blue-700">
                OCP IT Services
              </h2>
              <p className="text-xs text-muted-foreground">Site Khouribga</p>
            </div>
          </div>
          
          {/* Role Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {userRole.replace('_', ' ')}
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3">
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {visibleItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-ocp-blue-50 text-ocp-blue-700 border-ocp-blue-200"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Stats */}
        <div className="px-3">
          <div className="rounded-lg bg-ocp-blue-50 p-3 space-y-2">
            <h3 className="text-sm font-medium text-ocp-blue-700">Statut Rapide</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">En cours</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">En attente</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="px-3 pt-4 border-t">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-ocp-blue-100 flex items-center justify-center">
              <User className="h-4 w-4 text-ocp-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Utilisateur Test</p>
              <p className="text-xs text-muted-foreground truncate">user@ocp.ma</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  )
}