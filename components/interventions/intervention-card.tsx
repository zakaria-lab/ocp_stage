"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  Clock,
  User,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  MessageSquare,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface InterventionCardProps {
  intervention: {
    id: number
    numero: string
    titre: string
    description: string
    priorite: "BASSE" | "NORMALE" | "HAUTE" | "CRITIQUE"
    statut: "DEMANDEE" | "VALIDEE" | "ASSIGNEE" | "EN_COURS" | "SUSPENDUE" | "TERMINEE" | "ANNULEE" | "REJETEE"
    type: string
    niveau: number
    dateCreation: string
    dateEcheance?: string
    technicien?: {
      nom: string
      prenom: string
    }
    demandeur: {
      nom: string
      prenom: string
    }
    localisation?: string
    tempsEstime?: number
    tempsReel?: number
  }
  onView?: () => void
  onEdit?: () => void
  onComment?: () => void
  onComplete?: () => void
}

export function InterventionCard({ intervention, onView, onEdit, onComment, onComplete }: InterventionCardProps) {
  console.log("InterventionCard rendered:", intervention.numero)

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "CRITIQUE":
        return "bg-ocp-red-500 text-white"
      case "HAUTE":
        return "bg-orange-500 text-white"
      case "NORMALE":
        return "bg-ocp-blue-500 text-white"
      case "BASSE":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "DEMANDEE":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "VALIDEE":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "ASSIGNEE":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "EN_COURS":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "SUSPENDUE":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "TERMINEE":
        return "bg-ocp-green-100 text-ocp-green-700 border-ocp-green-200"
      case "ANNULEE":
      case "REJETEE":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityIcon = (priorite: string) => {
    if (priorite === "CRITIQUE" || priorite === "HAUTE") {
      return <AlertCircle className="h-4 w-4" />
    }
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const isOverdue = intervention.dateEcheance && new Date(intervention.dateEcheance) < new Date()

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow duration-200",
      isOverdue && intervention.statut !== "TERMINEE" && "border-ocp-red-200 bg-ocp-red-50/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-sm">{intervention.titre}</h3>
              {getPriorityIcon(intervention.priorite)}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
              <span>#{intervention.numero}</span>
              <Badge variant="outline" className="text-xs px-1 py-0">
                Niveau {intervention.niveau}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={cn("text-xs px-2 py-1", getPriorityColor(intervention.priorite))}>
              {intervention.priorite}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onComment}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ajouter commentaire
                </DropdownMenuItem>
                {intervention.statut === "EN_COURS" && (
                  <DropdownMenuItem onClick={onComplete}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Marquer terminé
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {intervention.description}
        </p>

        {/* Status and timing */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={cn("text-xs", getStatusColor(intervention.statut))}>
            {intervention.statut.replace('_', ' ')}
          </Badge>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Créé le {formatDate(intervention.dateCreation)}</span>
          </div>
        </div>

        {/* Assignee and location */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-ocp-blue-100 text-ocp-blue-600">
                {intervention.technicien 
                  ? `${intervention.technicien.prenom[0]}${intervention.technicien.nom[0]}`
                  : <User className="h-3 w-3" />
                }
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">
              {intervention.technicien 
                ? `${intervention.technicien.prenom} ${intervention.technicien.nom}`
                : "Non assigné"
              }
            </span>
          </div>

          {intervention.localisation && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{intervention.localisation}</span>
            </div>
          )}
        </div>

        {/* Progress bar for time estimation */}
        {intervention.tempsEstime && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progression</span>
              <span>
                {intervention.tempsReel || 0}h / {intervention.tempsEstime}h
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-ocp-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(((intervention.tempsReel || 0) / intervention.tempsEstime) * 100, 100)}%`
                }}
              />
            </div>
          </div>
        )}

        {/* Deadline warning */}
        {isOverdue && intervention.statut !== "TERMINEE" && (
          <div className="flex items-center space-x-2 text-xs text-ocp-red-600 bg-ocp-red-50 p-2 rounded">
            <AlertCircle className="h-3 w-3" />
            <span>Échéance dépassée : {formatDate(intervention.dateEcheance!)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}