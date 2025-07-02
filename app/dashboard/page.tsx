"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { InterventionChart } from "@/components/dashboard/intervention-chart"
import { InterventionCard } from "@/components/interventions/intervention-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  Plus,
  ArrowRight
} from "lucide-react"

export default function DashboardPage() {
  console.log("Dashboard page loaded")

  // Mock user role - in real app, this would come from auth context
  const userRole = "RESPONSABLE"

  // Mock recent interventions
  const recentInterventions = [
    {
      id: 1,
      numero: "INT-2025-001",
      titre: "Serveur principal en panne",
      description: "Le serveur principal de la salle 101 ne répond plus. Problème critique affectant tous les postes de travail du bâtiment A.",
      priorite: "CRITIQUE" as const,
      statut: "EN_COURS" as const,
      type: "MATERIEL",
      niveau: 3,
      dateCreation: "2025-01-02T09:30:00",
      dateEcheance: "2025-01-02T14:00:00",
      technicien: {
        nom: "Alaoui",
        prenom: "Ahmed"
      },
      demandeur: {
        nom: "Bennani",
        prenom: "Fatima"
      },
      localisation: "Salle 101 - Bât A",
      tempsEstime: 4,
      tempsReel: 2
    },
    {
      id: 2,
      numero: "INT-2025-002",
      titre: "Installation Office 365",
      description: "Demande d'installation de la suite Office 365 sur 5 nouveaux postes de travail.",
      priorite: "NORMALE" as const,
      statut: "ASSIGNEE" as const,
      type: "LOGICIEL",
      niveau: 1,
      dateCreation: "2025-01-02T10:15:00",
      technicien: {
        nom: "Idrissi",
        prenom: "Youssef"
      },
      demandeur: {
        nom: "Hassani",
        prenom: "Meriem"
      },
      localisation: "Bureau 205 - Bât B",
      tempsEstime: 2
    },
    {
      id: 3,
      numero: "INT-2025-003",
      titre: "Problème connexion réseau",
      description: "Perte de connexion internet intermittente dans le service comptabilité.",
      priorite: "HAUTE" as const,
      statut: "VALIDEE" as const,
      type: "RESEAU",
      niveau: 2,
      dateCreation: "2025-01-02T11:45:00",
      demandeur: {
        nom: "Mouhib",
        prenom: "Said"
      },
      localisation: "Service Comptabilité - Bât C"
    }
  ]

  // Mock today's schedule
  const todaySchedule = [
    {
      time: "09:00",
      title: "Maintenance serveurs",
      type: "maintenance",
      location: "Salle serveurs"
    },
    {
      time: "11:30",
      title: "Formation utilisateurs",
      type: "formation",
      location: "Salle de réunion A"
    },
    {
      time: "14:00",
      title: "Installation matériel",
      type: "installation",
      location: "Bureau direction"
    },
    {
      time: "16:30",
      title: "Audit sécurité",
      type: "securite",
      location: "Réseau principal"
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-100 text-blue-700"
      case "formation":
        return "bg-green-100 text-green-700"
      case "installation":
        return "bg-orange-100 text-orange-700"
      case "securite":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <MainLayout 
      title="Tableau de Bord IT" 
      subtitle="Vue d'ensemble des interventions - Site Khouribga"
      userRole={userRole}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-ocp-blue-500 to-ocp-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Bonjour, Responsable IT 👋
              </h2>
              <p className="text-ocp-blue-100 mb-4">
                Voici un aperçu de l'activité du service informatique aujourd'hui
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString("fr-FR", { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>12 techniciens actifs</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Intervention
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards userRole={userRole} />

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <InterventionChart
            type="bar"
            title="Évolution Mensuelle des Interventions"
          />
          <InterventionChart
            type="pie"
            title="Répartition par Type d'Intervention"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Interventions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Interventions Récentes
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Voir tout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentInterventions.map((intervention) => (
                  <InterventionCard
                    key={intervention.id}
                    intervention={intervention}
                    onView={() => console.log("View intervention:", intervention.id)}
                    onEdit={() => console.log("Edit intervention:", intervention.id)}
                    onComment={() => console.log("Comment intervention:", intervention.id)}
                    onComplete={() => console.log("Complete intervention:", intervention.id)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-ocp-blue-500" />
                  <span>Planning Aujourd'hui</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-xs font-mono text-muted-foreground mt-1 w-12">
                      {item.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.location}
                      </p>
                      <Badge variant="outline" className={`text-xs mt-1 ${getTypeColor(item.type)}`}>
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer Intervention
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Planifier Maintenance
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Générer Rapport
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Voir Alertes
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Métriques Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SLA Respect</span>
                    <span className="font-medium text-ocp-green-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ocp-green-500 h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Satisfaction Client</span>
                    <span className="font-medium text-ocp-blue-600">4.6/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ocp-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficacité Équipe</span>
                    <span className="font-medium text-purple-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}