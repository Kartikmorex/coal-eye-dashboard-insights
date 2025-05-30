
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertOctagon, MoreHorizontal, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Alert {
  id: string;
  conveyorId: string;
  conveyorName: string;
  type: "large-particle" | "foreign-object" | "system";
  severity: "critical" | "warning" | "info";
  timestamp: string;
  description: string;
  assigned?: string;
  status: "new" | "acknowledged" | "resolved";
}

interface AlertsListProps {
  alerts: Alert[];
  onAssign?: (alertId: string, user: string) => void;
  onAcknowledge?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  compact?: boolean;
  limit?: number;
}

const AlertsList = ({ 
  alerts, 
  onAssign, 
  onAcknowledge, 
  onResolve, 
  compact = false,
  limit 
}: AlertsListProps) => {
  const displayAlerts = limit ? alerts.slice(0, limit) : alerts;
  
  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case "critical":
        return <AlertOctagon className="h-5 w-5 text-alert-critical" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-alert-warning" />;
      default:
        return null;
    }
  };
  
  const getSeverityBadge = (severity: Alert['severity']) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge variant="outline" className="border-alert-warning text-alert-warning">Warning</Badge>;
      case "info":
        return <Badge variant="outline" className="border-alert-info text-alert-info">Info</Badge>;
    }
  };

  return (
    <Card className={cn("metric-card overflow-hidden", { "p-0": !compact })}>
      {!compact && (
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
          <p className="text-sm text-muted-foreground">Recent events requiring attention</p>
        </div>
      )}
      
      <div className={cn({ "p-0": !compact })}>
        {displayAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <CheckCircle className="h-10 w-10 mb-2" />
            <p>No active alerts</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {displayAlerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-card/80 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{alert.description}</p>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.conveyorName} • {new Date(alert.timestamp).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-3">
                        {alert.status === "new" ? (
                          <Badge variant="outline" className="bg-card/50">New</Badge>
                        ) : alert.status === "acknowledged" ? (
                          <Badge variant="outline" className="border-alert-info text-alert-info">Acknowledged</Badge>
                        ) : (
                          <Badge variant="outline" className="border-alert-success text-alert-success">Resolved</Badge>
                        )}
                        {alert.assigned && (
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{alert.assigned}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {!compact && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {!alert.assigned && onAssign && (
                          <DropdownMenuItem onClick={() => onAssign(alert.id, "John Doe")}>
                            <User className="h-4 w-4 mr-2" />
                            <span>Assign to me</span>
                          </DropdownMenuItem>
                        )}
                        {alert.status === "new" && onAcknowledge && (
                          <DropdownMenuItem onClick={() => onAcknowledge(alert.id)}>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <span>Acknowledge</span>
                          </DropdownMenuItem>
                        )}
                        {(alert.status === "new" || alert.status === "acknowledged") && onResolve && (
                          <DropdownMenuItem onClick={() => onResolve(alert.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Mark as resolved</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

import { cn } from "@/lib/utils";

export default AlertsList;
