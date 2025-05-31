
import { useState } from "react";
import Navigation from "@/components/Navigation";
import KPICard from "@/components/KPICard";
import ConveyorCard from "@/components/ConveyorCard";
import ParticleSizeChart from "@/components/ParticleSizeChart";
import AlertsList from "@/components/AlertsList";
import TimeRangePicker from "@/components/TimeRangePicker";
import CoalColorAnalysis from "@/components/CoalColorAnalysis";
import SizeDistributionBoxPlot from "@/components/SizeDistributionBoxPlot";
import HistoricalDataTable from "@/components/HistoricalDataTable";
import LastParticlesDetected from "@/components/LastParticlesDetected";
import ConveyorConfig from "@/components/ConveyorConfig";
import { 
  conveyors, 
  particleSizeDistribution, 
  getSystemStats, 
  getActiveAlerts,
  coalColorSummary,
  coalColorDistribution,
  sizeDistributionBoxPlot,
  getAggregatedParticleSizeData,
  getFilteredHistoricalData
} from "@/data/mockData";
import { BarChart3, Gauge, AlertTriangle, Loader2, Scale, Activity, TrendingUp, Settings, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedConveyor, setSelectedConveyor] = useState("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [configOpen, setConfigOpen] = useState(false);
  const [editingConveyor, setEditingConveyor] = useState<any>(null);
  
  const systemStats = getSystemStats();
  const activeAlerts = getActiveAlerts();
  
  // Get aggregated particle size data based on selected conveyors
  const selectedConveyors = selectedConveyor === "all" ? [] : [selectedConveyor];
  const aggregatedParticleSizeData = getAggregatedParticleSizeData(selectedConveyors);
  
  // Get historical data filtered by time range and conveyors
  const historicalData = getFilteredHistoricalData(startDate, endDate, selectedConveyors);

  const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B'];

  const handleTimeRangeChange = (range: string, startDate?: Date, endDate?: Date) => {
    setTimeRange(range);
    setStartDate(startDate);
    setEndDate(endDate);
    console.log('Time range changed:', { range, startDate, endDate });
  };

  const handleConveyorChange = (conveyorId: string) => {
    setSelectedConveyor(conveyorId);
    console.log('Conveyor changed:', conveyorId);
  };

  const handleAddConveyor = () => {
    setEditingConveyor(null);
    setConfigOpen(true);
  };

  const handleEditConveyor = (conveyor: any) => {
    setEditingConveyor(conveyor);
    setConfigOpen(true);
  };

  const handleSaveConveyor = (conveyorData: any) => {
    console.log('Saving conveyor:', conveyorData);
    // Here you would typically save to your data store
  };

  const handleDeleteConveyor = (conveyorId: string) => {
    console.log('Deleting conveyor:', conveyorId);
    // Here you would typically delete from your data store
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2 font-outfit">Coal Sizing Monitoring Dashboard</h1>
              <p className="text-muted-foreground font-outfit">
                Real-time monitoring and analysis of coal particle sizes across all conveyor systems
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground font-outfit">Conveyor:</span>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Operational Conveyors"
            value={`${systemStats.operationalCount}/${systemStats.totalConveyors}`}
            icon={Gauge}
            iconColor="text-alert-success"
          />
          <KPICard
            title="Average Throughput Efficiency"
            value={`${systemStats.avgEfficiency.toFixed(1)}%`}
            icon={Activity}
            trend={systemStats.avgEfficiency > 85 ? "up" : "down"}
            trendValue={systemStats.avgEfficiency > 85 ? "+2.4%" : "-3.1%"}
          />
          <KPICard
            title="Total Throughput"
            value={`${systemStats.totalThroughput} TPH`}
            icon={TrendingUp}
          />
          <KPICard
            title="Active Alerts"
            value={systemStats.totalAlerts}
            icon={AlertTriangle}
            iconColor={systemStats.totalAlerts > 0 ? "text-alert-warning" : "text-primary"}
          />
        </div>

        {/* Main Analytics Section */}
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
                <div className="chart-card">
                  <ParticleSizeChart data={aggregatedParticleSizeData} title="Particle Size Distribution" />
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
              <TabsContent value="alerts" className="mt-0">
                <div className="chart-card">
                  <AlertsList alerts={activeAlerts} limit={5} compact />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="metric-card">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground font-outfit">Particle Size Distribution</h3>
                <p className="text-sm text-muted-foreground font-outfit">Current distribution by size ranges</p>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aggregatedParticleSizeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ size, percentage }) => `${size}: ${percentage.toFixed(1)}%`}
                    >
                      {aggregatedParticleSizeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4F46E5" }}></div>
                  <span className="text-xs text-muted-foreground font-outfit">0-2mm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#06B6D4" }}></div>
                  <span className="text-xs text-muted-foreground font-outfit">2-6mm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10B981" }}></div>
                  <span className="text-xs text-muted-foreground font-outfit">6-8mm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }}></div>
                  <span className="text-xs text-muted-foreground font-outfit">8-15mm</span>
                </div>
              </div>
            </Card>
            
            <LastParticlesDetected />
          </div>
        </div>

        {/* Historical Data Table */}
        <div className="mb-8">
          <HistoricalDataTable data={historicalData} title="Historical Data Analysis" />
        </div>

        {/* Conveyor Systems Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground font-outfit">Conveyor Systems</h2>
              <p className="text-muted-foreground font-outfit">Manage and monitor all conveyor systems</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleAddConveyor} className="font-outfit">
                <Plus className="h-4 w-4 mr-2" />
                Add Conveyor
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground font-outfit">Last updated: Just now</span>
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conveyors
              .filter(conveyor => selectedConveyor === "all" || conveyor.id === selectedConveyor)
              .map((conveyor) => (
              <div key={conveyor.id} className="relative group">
                <ConveyorCard 
                  id={conveyor.id}
                  name={conveyor.name}
                  status={conveyor.status}
                  efficiency={conveyor.efficiency}
                  alertCount={conveyor.alertCount}
                  lastUpdated={conveyor.lastUpdated}
                  avgParticleSize={conveyor.avgParticleSize}
                  throughput={conveyor.throughput}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleEditConveyor(conveyor)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <ConveyorConfig
          open={configOpen}
          onOpenChange={setConfigOpen}
          conveyor={editingConveyor}
          onSave={handleSaveConveyor}
          onDelete={handleDeleteConveyor}
        />
      </div>
    </div>
  );
};

export default Index;
