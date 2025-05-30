
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ColorData {
  color: string;
  percentage: number;
  label: string;
}

interface CoalColorAnalysisProps {
  summaryData: ColorData[];
  distributionData: Array<{
    date: string;
    gray: number;
    black: number;
  }>;
  className?: string;
}

const CoalColorAnalysis = ({ summaryData, distributionData, className }: CoalColorAnalysisProps) => {
  const COLORS = {
    gray: '#6B7280',
    black: '#1F2937'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-foreground font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Summary Pie Chart */}
        <Card className="metric-card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Color Summary</h3>
            <p className="text-sm text-muted-foreground">Coal color distribution</p>
          </div>
          <div className="h-64 flex">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="percentage"
                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                  >
                    {summaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.color as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-2 ml-4">
              {summaryData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[entry.color as keyof typeof COLORS] }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{entry.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Color Distribution Over Time */}
        <Card className="metric-card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Color Distribution</h3>
            <p className="text-sm text-muted-foreground">Daily color percentage trends</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#94a3b8"
                  fontSize={12}
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gray" stackId="a" fill={COLORS.gray} />
                <Bar dataKey="black" stackId="a" fill={COLORS.black} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoalColorAnalysis;
