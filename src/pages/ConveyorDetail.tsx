
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import KPICard from "@/components/KPICard";
import ParticleSizeChart from "@/components/ParticleSizeChart";
import AlertsList from "@/components/AlertsList";
import TimeRangePicker from "@/components/TimeRangePicker";
import CoalColorAnalysis from "@/components/CoalColorAnalysis";
import SizeDistributionBoxPlot from "@/components/SizeDistributionBoxPlot";
import LastParticlesDetected from "@/components/LastParticlesDetected";
import { 
  getConveyorById, 
  getAlertsForConveyor, 
  conveyorSpecificSizeDistribution,
  coalColorSummary,
  coalColorDistribution,
  sizeDistributionBoxPlot,
  particleSizeDistribution
} from "@/data/mockData";
import { 
  ArrowLeft, 
  Settings, 
  BarChart3, 
  Gauge, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Scale,
  Info
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/AlertsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const timeSeriesData = [
  { time: '08:00', avgSize: 22.5 },
  { time: '09:00', avgSize: 23.2 },
  { time: '10:00', avgSize: 24.1 },
  { time: '11:00', avgSize: 24.8 },
  { time: '12:00', avgSize: 25.3 },
  { time: '13:00', avgSize: 25.0 },
  { time: '14:00', avgSize: 24.6 },
  { time: '15:00', avgSize: 24.2 },
  { time: '16:00', avgSize: 24.5 },
  { time: '17:00', avgSize: 25.1 },
  { time: '18:00', avgSize: 26.3 },
  { time: '19:00', avgSize: 27.2 },
  { time: '20:00', avgSize: 26.9 },
];

const ConveyorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [conveyor, setConveyor] = useState(getConveyorById(id || ""));
  const [alerts, setAlerts] = useState<Alert[]>(getAlertsForConveyor(id || ""));
  const [timeRange, setTimeRange] = useState("24h");

  const handleTimeRangeChange = (range: string, startDate?: Date, endDate?: Date) => {
    setTimeRange(range);
    console.log('Time range changed:', { range, startDate, endDate });
  };

  const handleAssign = (alertId: string, user: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, assigned: user } : alert
      )
    );
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, status: "acknowledged" } : alert
      )
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  if (!conveyor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4 font-outfit">Conveyor Not Found</h1>
          <p className="text-muted-foreground mb-8 font-outfit">The conveyor you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="font-outfit">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (conveyor.status) {
      case "operational":
        return "bg-alert-success";
      case "warning":
        return "bg-alert-warning";
      case "critical":
        return "bg-alert-critical";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = () => {
    switch (conveyor.status) {
      case "operational":
        return "Operational";
      case "warning":
        return "Warning";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  // Get conveyor-specific data with fallback to general data
  const conveyorData = conveyorSpecificSizeDistribution[conveyor.id] || particleSizeDistribution;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-foreground font-outfit">{conveyor.name}</h1>
              <Badge 
                variant={conveyor.status === "operational" ? "outline" : "destructive"}
                className={cn("ml-4 font-outfit", conveyor.status === "operational" && "border-alert-success text-alert-success")}
              >
                {getStatusText()}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1 font-outfit">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {conveyor.location}
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-1" />
                ID: {conveyor.id}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Last Updated: {conveyor.lastUpdated}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangePicker onTimeRangeChange={handleTimeRangeChange} />
            <Button variant="outline" className="font-outfit">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Efficiency"
            value={`${conveyor.efficiency}%`}
            icon={Gauge}
            iconColor={conveyor.efficiency > 85 ? "text-alert-success" : 
                      conveyor.efficiency > 70 ? "text-alert-warning" : "text-alert-critical"}
          />
          <KPICard
            title="Avg. Particle Size"
            value={`${conveyor.avgParticleSize}mm`}
            icon={Scale}
          />
          <KPICard
            title="Throughput"
            value={`${conveyor.throughput} TPH`}
            icon={BarChart3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="metric-card lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground font-outfit">Particle Size Trend</h3>
              <p className="text-sm text-muted-foreground font-outfit">Average particle size over time (mm)</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis 
                    stroke="#64748b" 
                    domain={[20, 30]} 
                    label={{ value: 'Size (mm)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#e2e8f0',
                      color: '#0f172a',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgSize" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    activeDot={{ r: 6, fill: '#3b82f6' }} 
                    dot={{ r: 4, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <LastParticlesDetected />
        </div>

        <div className="mb-8">
          <Tabs defaultValue="particle-size" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="particle-size" className="font-outfit">Particle Size Distribution</TabsTrigger>
              <TabsTrigger value="color-analysis" className="font-outfit">Coal Color Analysis</TabsTrigger>
              <TabsTrigger value="box-plot" className="font-outfit">Size Distribution Box Plot</TabsTrigger>
            </TabsList>
            <TabsContent value="particle-size" className="mt-0">
              <div className="chart-card">
                <ParticleSizeChart 
                  data={conveyorData} 
                  title="Particle Size Distribution" 
                />
              </div>
            </TabsContent>
            <TabsContent value="color-analysis" className="mt-0">
              <div className="chart-card">
                <CoalColorAnalysis 
                  summaryData={coalColorSummary}
                  distributionData={coalColorDistribution}
                />
              </div>
            </TabsContent>
            <TabsContent value="box-plot" className="mt-0">
              <div className="chart-card">
                <SizeDistributionBoxPlot 
                  data={sizeDistributionBoxPlot}
                  title="Size Distribution Box Plot"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mb-8">
          <AlertsList 
            alerts={alerts} 
            onAssign={handleAssign}
            onAcknowledge={handleAcknowledge}
            onResolve={handleResolve}
          />
        </div>
      </div>
    </div>
  );
};

export default ConveyorDetail;
