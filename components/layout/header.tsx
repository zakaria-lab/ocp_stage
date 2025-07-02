"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Plus,
  User,
  Settings,
  LogOut,
  MessageSquare,
  AlertCircle
} from "lucide-react"

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title = "Tableau de Bord", subtitle }: HeaderProps) {
  console.log("Header rendered with title:", title)

  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Intervention critique",
      message: "Serveur principal en panne - Salle 101",
      time: "Il y a 5 min",
      unread: true
    },
    {
      id: 2,
      type: "info",
      title: "Nouvelle demande",
      message: "Installation logiciel - Bureau 205",
      time: "Il y a 15 min",
      unread: true
    },
    {
      id: 3,
      type: "success",
      title: "Intervention terminée",
      message: "Réparation imprimante - Bureau 103",
      time: "Il y a 1h",
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left section - Title */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une intervention, équipement..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <Button size="sm" className="bg-ocp-green-500 hover:bg-ocp-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Demande
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} non lues
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
                  <div className="flex-shrink-0">
                    {notification.type === "urgent" && (
                      <AlertCircle className="h-4 w-4 text-ocp-red-500" />
                    )}
                    {notification.type === "info" && (
                      <MessageSquare className="h-4 w-4 text-ocp-blue-500" />
                    )}
                    {notification.type === "success" && (
                      <div className="h-4 w-4 rounded-full bg-ocp-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className="h-2 w-2 rounded-full bg-ocp-blue-500 flex-shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-ocp-blue-600 hover:text-ocp-blue-700">
                Voir toutes les notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-ocp-blue-100 flex items-center justify-center">
                  <User className="h-3 w-3 text-ocp-blue-600" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-ocp-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}