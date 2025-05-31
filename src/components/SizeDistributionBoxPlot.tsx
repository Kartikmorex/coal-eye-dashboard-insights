
import { Card } from "@/components/ui/card";
import { Tooltip, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

interface BoxPlotData {
  date: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

interface SizeDistributionBoxPlotProps {
  data: BoxPlotData[];
  title: string;
  className?: string;
}

const SizeDistributionBoxPlot = ({ data, title, className }: SizeDistributionBoxPlotProps) => {
  // Transform data for scatter plot representation of box plots
  const transformedData = data.map((item, index) => {
    const boxData = [
      { x: index, y: item.min, type: 'whisker' },
      { x: index, y: item.q1, type: 'box' },
      { x: index, y: item.median, type: 'median' },
      { x: index, y: item.q3, type: 'box' },
      { x: index, y: item.max, type: 'whisker' },
    ];
    
    // Add outliers if they exist
    if (item.outliers) {
      item.outliers.forEach(outlier => {
        boxData.push({ x: index, y: outlier, type: 'outlier' });
      });
    }
    
    return { date: item.date, index, ...item, boxData };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataIndex = Math.round(payload[0].payload.x);
      const originalData = data[dataIndex];
      
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-foreground font-medium">{originalData.date}</p>
          <div className="space-y-1 text-sm">
            <p className="text-alert-critical">Maximum: {originalData.max.toFixed(2)}mm</p>
            <p className="text-primary">Q3: {originalData.q3.toFixed(2)}mm</p>
            <p className="text-accent">Median: {originalData.median.toFixed(2)}mm</p>
            <p className="text-primary">Q1: {originalData.q1.toFixed(2)}mm</p>
            <p className="text-muted-foreground">Minimum: {originalData.min.toFixed(2)}mm</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'outlier': return '#f59e0b';
      case 'median': return '#10b981';
      case 'box': return '#3b82f6';
      case 'whisker': return '#6b7280';
      default: return '#3b82f6';
    }
  };

  const allPoints = transformedData.flatMap(item => 
    item.boxData.map(point => ({ ...point, date: item.date }))
  );

  return (
    <Card className={`metric-card ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">Statistical distribution of particle sizes over time</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            data={allPoints}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              type="number"
              dataKey="x"
              domain={[0, data.length - 1]}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickFormatter={(value) => data[Math.round(value)]?.date || ''}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              type="number"
              dataKey="y"
              stroke="#94a3b8"
              fontSize={12}
              label={{ value: 'Size (mm)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Box plot visualization using scatter points */}
            <Scatter 
              dataKey="y" 
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                switch (payload.type) {
                  case 'outlier':
                    return <circle cx={cx} cy={cy} r={3} fill="#f59e0b" />;
                  case 'median':
                    return <rect x={cx - 15} y={cy - 1} width={30} height={2} fill="#10b981" />;
                  case 'box':
                    return <rect x={cx - 10} y={cy - 1} width={20} height={2} fill="#3b82f6" />;
                  case 'whisker':
                    return <rect x={cx - 5} y={cy - 1} width={10} height={2} fill="#6b7280" />;
                  default:
                    return <circle cx={cx} cy={cy} r={2} fill="#3b82f6" />;
                }
              }}
            >
              {allPoints.map((point, index) => (
                <Cell key={`cell-${index}`} fill={getPointColor(point.type)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-alert-warning"></div>
          <span className="text-muted-foreground">Outliers</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-0.5 bg-alert-success"></div>
          <span className="text-muted-foreground">Median</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-0.5 bg-primary"></div>
          <span className="text-muted-foreground">Quartiles</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-0.5 bg-muted-foreground"></div>
          <span className="text-muted-foreground">Whiskers</span>
        </div>
      </div>
    </Card>
  );
};

export default SizeDistributionBoxPlot;
