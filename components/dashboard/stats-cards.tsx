"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardsProps {
  userRole?: string
}

interface StatCard {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    label: string
  }
  icon: React.ElementType
  color: string
  description?: string
}

export function StatsCards({ userRole = "UTILISATEUR" }: StatsCardsProps) {
  console.log("StatsCards rendered for role:", userRole)

  // Mock data - in real app, this would come from API
  const getStatsForRole = (role: string): StatCard[] => {
    const baseStats = [
      {
        title: "Interventions Actives",
        value: 23,
        change: { value: 12, type: 'increase' as const, label: 'vs mois dernier' },
        icon: Wrench,
        color: "text-ocp-blue-600",
        description: "En cours de traitement"
      },
      {
        title: "Temps Moyen",
        value: "2.4h",
        change: { value: 8, type: 'decrease' as const, label: 'amélioration' },
        icon: Clock,
        color: "text-ocp-green-600",
        description: "Résolution moyenne"
      },
      {
        title: "Terminées Aujourd'hui",
        value: 8,
        change: { value: 15, type: 'increase' as const, label: 'vs hier' },
        icon: CheckCircle,
        color: "text-ocp-green-500",
        description: "Complétées avec succès"
      },
      {
        title: "Urgentes",
        value: 3,
        change: { value: 2, type: 'increase' as const, label: 'nouvelles' },
        icon: AlertTriangle,
        color: "text-ocp-red-500",
        description: "Nécessitent attention"
      }
    ]

    // Add role-specific stats
    if (role === "RESPONSABLE" || role === "ADMINISTRATEUR") {
      baseStats.push(
        {
          title: "Techniciens Actifs",
          value: 12,
          change: { value: 2, type: 'increase' as const, label: 'disponibles' },
          icon: Users,
          color: "text-purple-600",
          description: "Équipe opérationnelle"
        },
        {
          title: "Planifiées Semaine",
          value: 45,
          change: { value: 5, type: 'increase' as const, label: 'vs sem. passée' },
          icon: Calendar,
          color: "text-indigo-600",
          description: "Interventions programmées"
        }
      )
    }

    return baseStats
  }

  const stats = getStatsForRole(userRole)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        const isIncrease = stat.change?.type === 'increase'
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <IconComponent className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                
                {stat.change && (
                  <div className="flex items-center space-x-2 text-xs">
                    {isIncrease ? (
                      <TrendingUp className="h-3 w-3 text-ocp-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-ocp-red-500" />
                    )}
                    <span className={cn(
                      "font-medium",
                      isIncrease ? "text-ocp-green-600" : "text-ocp-red-600"
                    )}>
                      {isIncrease ? '+' : '-'}{stat.change.value}%
                    </span>
                    <span className="text-muted-foreground">
                      {stat.change.label}
                    </span>
                  </div>
                )}
                
                {stat.description && (
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}