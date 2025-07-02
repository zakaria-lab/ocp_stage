"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { InterventionCard } from "@/components/interventions/intervention-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Filter,
  Plus,
  Download,
  SortAsc,
  Calendar,
  User,
  AlertCircle
} from "lucide-react"
import { useState } from "react"

export default function InterventionsPage() {
  console.log("Interventions page loaded")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  // Mock interventions data
  const mockInterventions = [
    {
      id: 1,
      numero: "INT-2025-001",
      titre: "Serveur principal en panne",
      description: "Le serveur principal de la salle 101 ne répond plus. Problème critique affectant tous les postes de travail du bâtiment A. Nécessite intervention immédiate d'un technicien niveau 3.",
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
      description: "Demande d'installation de la suite Office 365 sur 5 nouveaux postes de travail dans le service comptabilité.",
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
      description: "Perte de connexion internet intermittente dans le service comptabilité. Les utilisateurs rapportent des déconnexions fréquentes.",
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
    },
    {
      id: 4,
      numero: "INT-2025-004",
      titre: "Mise à jour antivirus",
      description: "Mise à jour des définitions antivirus sur l'ensemble du parc informatique selon la politique de sécurité.",
      priorite: "BASSE" as const,
      statut: "TERMINEE" as const,
      type: "SECURITE",
      niveau: 1,
      dateCreation: "2025-01-01T14:20:00",
      technicien: {
        nom: "Amrani",
        prenom: "Hassan"
      },
      demandeur: {
        nom: "Responsable IT",
        prenom: "Système"
      },
      localisation: "Tous bâtiments",
      tempsEstime: 6,
      tempsReel: 5
    },
    {
      id: 5,
      numero: "INT-2025-005",
      titre: "Configuration imprimante réseau",
      description: "Configuration et installation d'une nouvelle imprimante réseau multifonction dans le service RH.",
      priorite: "NORMALE" as const,
      statut: "DEMANDEE" as const,
      type: "MATERIEL",
      niveau: 1,
      dateCreation: "2025-01-02T13:10:00",
      demandeur: {
        nom: "Zahra",
        prenom: "Aicha"
      },
      localisation: "Service RH - Bât A"
    }
  ]

  // Filter interventions
  const filteredInterventions = mockInterventions.filter(intervention => {
    const matchesSearch = intervention.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "all" || intervention.statut === selectedStatus
    const matchesPriority = selectedPriority === "all" || intervention.priorite === selectedPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Group interventions by status
  const groupedInterventions = {
    all: filteredInterventions,
    urgent: filteredInterventions.filter(i => i.priorite === "CRITIQUE" || i.priorite === "HAUTE"),
    inProgress: filteredInterventions.filter(i => i.statut === "EN_COURS"),
    pending: filteredInterventions.filter(i => i.statut === "DEMANDEE" || i.statut === "VALIDEE"),
    completed: filteredInterventions.filter(i => i.statut === "TERMINEE")
  }

  const getStatusCount = (status: keyof typeof groupedInterventions) => {
    return groupedInterventions[status].length
  }

  return (
    <MainLayout 
      title="Gestion des Interventions" 
      subtitle="Suivi et gestion des demandes d'intervention"
      userRole="RESPONSABLE"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par numéro, titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="p-2 space-y-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Statut</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="DEMANDEE">Demandée</SelectItem>
                        <SelectItem value="VALIDEE">Validée</SelectItem>
                        <SelectItem value="ASSIGNEE">Assignée</SelectItem>
                        <SelectItem value="EN_COURS">En cours</SelectItem>
                        <SelectItem value="SUSPENDUE">Suspendue</SelectItem>
                        <SelectItem value="TERMINEE">Terminée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Priorité</label>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes priorités</SelectItem>
                        <SelectItem value="CRITIQUE">Critique</SelectItem>
                        <SelectItem value="HAUTE">Haute</SelectItem>
                        <SelectItem value="NORMALE">Normale</SelectItem>
                        <SelectItem value="BASSE">Basse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm" className="bg-ocp-green-500 hover:bg-ocp-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Intervention
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total", count: getStatusCount("all"), color: "bg-gray-100" },
            { label: "Urgentes", count: getStatusCount("urgent"), color: "bg-ocp-red-100 text-ocp-red-700" },
            { label: "En cours", count: getStatusCount("inProgress"), color: "bg-orange-100 text-orange-700" },
            { label: "En attente", count: getStatusCount("pending"), color: "bg-yellow-100 text-yellow-700" },
            { label: "Terminées", count: getStatusCount("completed"), color: "bg-ocp-green-100 text-ocp-green-700" }
          ].map((stat, index) => (
            <div key={index} className={`p-3 rounded-lg ${stat.color}`}>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="relative">
              Toutes
              <Badge variant="secondary" className="ml-2 text-xs">
                {getStatusCount("all")}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="urgent" className="relative">
              Urgentes
              {getStatusCount("urgent") > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {getStatusCount("urgent")}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="inProgress">
              En cours
              <Badge variant="secondary" className="ml-2 text-xs">
                {getStatusCount("inProgress")}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              En attente
              <Badge variant="secondary" className="ml-2 text-xs">
                {getStatusCount("pending")}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminées
              <Badge variant="secondary" className="ml-2 text-xs">
                {getStatusCount("completed")}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {Object.entries(groupedInterventions).map(([key, interventions]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {interventions.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {interventions.map((intervention) => (
                    <InterventionCard
                      key={intervention.id}
                      intervention={intervention}
                      onView={() => console.log("View intervention:", intervention.id)}
                      onEdit={() => console.log("Edit intervention:", intervention.id)}
                      onComment={() => console.log("Comment intervention:", intervention.id)}
                      onComplete={() => console.log("Complete intervention:", intervention.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    Aucune intervention trouvée
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? "Essayez de modifier vos critères de recherche" : "Il n'y a aucune intervention dans cette catégorie"}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  )
}