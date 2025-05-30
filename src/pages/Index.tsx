
import { useState } from "react";
import Navigation from "@/components/Navigation";
import KPICard from "@/components/KPICard";
import ConveyorCard from "@/components/ConveyorCard";
import ParticleSizeChart from "@/components/ParticleSizeChart";
import AlertsList from "@/components/AlertsList";
import TimeRangePicker from "@/components/TimeRangePicker";
import CoalColorAnalysis from "@/components/CoalColorAnalysis";
import SizeDistributionBoxPlot from "@/components/SizeDistributionBoxPlot";
import { 
  conveyors, 
  particleSizeDistribution, 
  getSystemStats, 
  getActiveAlerts,
  coalColorSummary,
  coalColorDistribution,
  sizeDistributionBoxPlot
} from "@/data/mockData";
import { BarChart3, Gauge, AlertTriangle, Loader2, Scale, Activity, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedConveyor, setSelectedConveyor] = useState("all");
  const systemStats = getSystemStats();
  const activeAlerts = getActiveAlerts();

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

  const handleTimeRangeChange = (range: string, startDate?: Date, endDate?: Date) => {
    setTimeRange(range);
    console.log('Time range changed:', { range, startDate, endDate });
    // Here you would typically fetch new data based on the time range
  };

  const handleConveyorChange = (conveyorId: string) => {
    setSelectedConveyor(conveyorId);
    console.log('Conveyor changed:', conveyorId);
    // Here you would typically filter data for the specific conveyor
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">Coal Sizing Monitoring Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time monitoring and analysis of coal particle sizes across all conveyor systems
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Conveyor:</span>
                <Select value={selectedConveyor} onValueChange={handleConveyorChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conveyors</SelectItem>
                    {conveyors.map((conveyor) => (
                      <SelectItem key={conveyor.id} value={conveyor.id}>
                        {conveyor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TimeRangePicker onTimeRangeChange={handleTimeRangeChange} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Operational Conveyors"
            value={`${systemStats.operationalCount}/${systemStats.totalConveyors}`}
            icon={Gauge}
            iconColor="text-alert-success"
          />
          <KPICard
            title="Average Efficiency"
            value={`${systemStats.avgEfficiency.toFixed(1)}%`}
            icon={Activity}
            trend={systemStats.avgEfficiency > 85 ? "up" : "down"}
            trendValue={systemStats.avgEfficiency > 85 ? "+2.4%" : "-3.1%"}
          />
          <KPICard
            title="Total Throughput"
            value={`${systemStats.totalThroughput}t/h`}
            icon={TrendingUp}
          />
          <KPICard
            title="Active Alerts"
            value={systemStats.totalAlerts}
            icon={AlertTriangle}
            iconColor={systemStats.totalAlerts > 0 ? "text-alert-warning" : "text-primary"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="particle-size" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="particle-size">Particle Size</TabsTrigger>
                <TabsTrigger value="color-analysis">Color Analysis</TabsTrigger>
                <TabsTrigger value="box-plot">Box Plot</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="particle-size" className="mt-0">
                <ParticleSizeChart data={particleSizeDistribution} title="Particle Size Distribution" />
              </TabsContent>
              <TabsContent value="color-analysis" className="mt-0">
                <CoalColorAnalysis 
                  summaryData={coalColorSummary}
                  distributionData={coalColorDistribution}
                />
              </TabsContent>
              <TabsContent value="box-plot" className="mt-0">
                <SizeDistributionBoxPlot 
                  data={sizeDistributionBoxPlot}
                  title="Size Distribution Box Plot"
                />
              </TabsContent>
              <TabsContent value="alerts" className="mt-0">
                <AlertsList alerts={activeAlerts} limit={5} compact />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <div className="metric-card h-full">
              <h3 className="text-lg font-semibold text-foreground mb-4">Alert Severity Distribution</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Critical", value: activeAlerts.filter(a => a.severity === "critical").length },
                        { name: "Warning", value: activeAlerts.filter(a => a.severity === "warning").length },
                        { name: "Info", value: activeAlerts.filter(a => a.severity === "info").length }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[0, 1, 2].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-alert-critical"></div>
                  <span className="text-xs text-muted-foreground">Critical</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-alert-warning"></div>
                  <span className="text-xs text-muted-foreground">Warning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-alert-info"></div>
                  <span className="text-xs text-muted-foreground">Info</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Conveyor Systems</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Last updated: Just now</span>
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conveyors
              .filter(conveyor => selectedConveyor === "all" || conveyor.id === selectedConveyor)
              .map((conveyor) => (
              <ConveyorCard 
                key={conveyor.id}
                id={conveyor.id}
                name={conveyor.name}
                status={conveyor.status}
                efficiency={conveyor.efficiency}
                alertCount={conveyor.alertCount}
                lastUpdated={conveyor.lastUpdated}
                avgParticleSize={conveyor.avgParticleSize}
                throughput={conveyor.throughput}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
