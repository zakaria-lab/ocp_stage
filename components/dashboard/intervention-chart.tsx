"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

interface InterventionChartProps {
  type?: "bar" | "line" | "pie"
  title: string
  data?: any[]
  className?: string
}

export function InterventionChart({ 
  type = "bar", 
  title, 
  data, 
  className 
}: InterventionChartProps) {
  console.log("InterventionChart rendered:", title, type)

  // Mock data for different chart types
  const mockBarData = [
    { name: "Jan", enCours: 12, terminees: 35, nouvelle: 8 },
    { name: "Fév", enCours: 19, terminees: 42, nouvelle: 12 },
    { name: "Mar", enCours: 15, terminees: 38, nouvelle: 15 },
    { name: "Avr", enCours: 23, terminees: 45, nouvelle: 18 },
    { name: "Mai", enCours: 18, terminees: 52, nouvelle: 14 },
    { name: "Jun", enCours: 16, terminees: 48, nouvelle: 20 },
  ]

  const mockLineData = [
    { name: "Sem 1", tempsResolution: 2.8, satisfaction: 4.2 },
    { name: "Sem 2", tempsResolution: 2.6, satisfaction: 4.3 },
    { name: "Sem 3", tempsResolution: 2.4, satisfaction: 4.5 },
    { name: "Sem 4", tempsResolution: 2.2, satisfaction: 4.4 },
    { name: "Sem 5", tempsResolution: 2.1, satisfaction: 4.6 },
    { name: "Sem 6", tempsResolution: 2.3, satisfaction: 4.5 },
  ]

  const mockPieData = [
    { name: "Matériel", value: 35, color: "#1e40af" },
    { name: "Logiciel", value: 28, color: "#059669" },
    { name: "Réseau", value: 18, color: "#dc2626" },
    { name: "Sécurité", value: 12, color: "#f59e0b" },
    { name: "Autres", value: 7, color: "#8b5cf6" },
  ]

  const chartData = data || (type === "line" ? mockLineData : type === "pie" ? mockPieData : mockBarData)

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tempsResolution" 
                stroke="#1e40af" 
                strokeWidth={3}
                dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                name="Temps de résolution (h)"
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#059669" 
                strokeWidth={3}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                name="Satisfaction (sur 5)"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Pourcentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="ml-4 space-y-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {item.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="nouvelle" 
                fill="#f59e0b" 
                name="Nouvelles"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="enCours" 
                fill="#1e40af" 
                name="En cours"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="terminees" 
                fill="#059669" 
                name="Terminées"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  )
}