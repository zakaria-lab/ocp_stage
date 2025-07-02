"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Wrench, Users, BarChart3, LogIn } from "lucide-react"

export default function Home() {
  const router = useRouter()

  console.log("Home page loaded")

  // Auto-redirect to dashboard after 3 seconds (simulate auth check)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocp-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-ocp-blue-500 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-ocp-blue-700">
                  OCP IT Services
                </h1>
                <p className="text-lg text-ocp-blue-600">Site Khouribga</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion des Interventions IT
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plateforme centralisée pour la gestion, le suivi et la planification 
            des interventions informatiques du Group OCP
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-ocp-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-ocp-blue-600" />
              </div>
              <CardTitle className="text-ocp-blue-700">Gestion des Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Création, suivi et gestion complète des demandes d'intervention 
                avec génération automatique de fiches détaillées
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-ocp-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-ocp-green-600" />
              </div>
              <CardTitle className="text-ocp-green-700">Gestion Multi-Rôles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interface adaptée selon les rôles : Administrateurs, Responsables, 
                Techniciens (N1, N2, N3) et Utilisateurs
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-700">Tableaux de Bord</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Statistiques détaillées, métriques de performance et exports 
                pour une analyse complète des activités
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto bg-gradient-to-r from-ocp-blue-500 to-ocp-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Accès à la Plateforme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-ocp-blue-100">
                Connectez-vous pour accéder à votre tableau de bord personnalisé
              </p>
              <Button 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-white text-ocp-blue-600 hover:bg-gray-100"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Accéder au Dashboard
              </Button>
              <p className="text-xs text-ocp-blue-200 mt-4">
                Redirection automatique dans 3 secondes...
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>&copy; 2025 Group OCP - Service Informatique Site Khouribga</p>
        </div>
      </div>
    </div>
  )
}
