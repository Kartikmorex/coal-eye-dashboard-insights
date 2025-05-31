
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from "@/components/ui/card";

interface ParticleSizeData {
  size: string;
  percentage: number;
  count: number;
}

interface ParticleSizeChartProps {
  data: ParticleSizeData[];
  title: string;
}

const ParticleSizeChart = ({ data, title }: ParticleSizeChartProps) => {
  // Add fallback for undefined data
  const chartData = data || [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-foreground font-medium">{`Size: ${label}`}</p>
          <p className="text-primary">
            {`Percentage: ${payload[0].value}%`}
          </p>
          <p className="text-muted-foreground text-sm">
            {`Count: ${payload[0].payload.count} particles`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Define subtle, professional color mapping
  const getParticleColor = (size: string) => {
    switch (size) {
      case "0-2mm":
        return "#f59e0b"; // Amber instead of bright yellow
      case "2-6mm":
        return "#3b82f6"; // Blue
      case "6-8mm":
        return "#10b981"; // Emerald
      case "8-15mm":
        return "#8b5cf6"; // Violet
      default:
        return "#6b7280"; // Gray
    }
  };

  return (
    <Card className="chart-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">Particle size distribution</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="size" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="percentage" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getParticleColor(entry.size)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend for particle sizes with updated colors */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
          <span className="text-xs text-muted-foreground">0-2mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
          <span className="text-xs text-muted-foreground">2-6mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
          <span className="text-xs text-muted-foreground">6-8mm</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#8b5cf6" }}></div>
          <span className="text-xs text-muted-foreground">8-15mm</span>
        </div>
      </div>
    </Card>
  );
};

export default ParticleSizeChart;
