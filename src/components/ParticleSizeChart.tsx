
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  return (
    <Card className="metric-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">Particle size distribution</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="size" 
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
              label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="percentage" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ParticleSizeChart;
