
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConveyorCardProps {
  id: string;
  name: string;
  status: "operational" | "warning" | "critical";
  efficiency: number;
  alertCount: number;
  lastUpdated: string;
  avgParticleSize: number;
  throughput: number;
}

const ConveyorCard = ({
  id,
  name,
  status,
  efficiency,
  alertCount,
  lastUpdated,
  avgParticleSize,
  throughput
}: ConveyorCardProps) => {
  const getStatusColor = () => {
    switch (status) {
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
    switch (status) {
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

  return (
    <Card className="metric-card group hover:scale-[1.02] transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn("status-indicator", getStatusColor())}></div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">ID: {id}</p>
          </div>
        </div>
        <Badge variant={status === "operational" ? "default" : "destructive"}>
          {getStatusText()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Efficiency</p>
          <p className="text-xl font-bold text-foreground">{efficiency}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Throughput</p>
          <p className="text-xl font-bold text-foreground">{throughput}t/h</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg. Particle Size</p>
          <p className="text-xl font-bold text-foreground">{avgParticleSize}mm</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Active Alerts</p>
          <div className="flex items-center space-x-2">
            <p className="text-xl font-bold text-foreground">{alertCount}</p>
            {alertCount > 0 && <AlertTriangle className="h-4 w-4 text-alert-warning" />}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
        <Link to={`/conveyor/${id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
            <Eye className="h-4 w-4 mr-2"  />
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ConveyorCard;
