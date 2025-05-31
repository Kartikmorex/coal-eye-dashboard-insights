
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
import { cn } from "@/lib/utils";
import UserSelector from "./UserSelector";
import AcknowledgmentDialog from "./AcknowledgmentDialog";
import AlertHistoryTimeline, { AlertHistoryEntry } from "./AlertHistoryTimeline";

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
  history?: AlertHistoryEntry[];
}

interface AlertsListProps {
  alerts: Alert[];
  onAssign?: (alertId: string, user: string | undefined) => void;
  onAcknowledge?: (alertId: string, reason: string, proof?: File) => void;
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
  const [acknowledgeAlert, setAcknowledgeAlert] = useState<Alert | null>(null);
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

  const handleAcknowledgeSubmit = (reason: string, proof?: File) => {
    if (acknowledgeAlert && onAcknowledge) {
      onAcknowledge(acknowledgeAlert.id, reason, proof);
    }
  };

  return (
    <>
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
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{alert.description}</p>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.conveyorName} • {new Date(alert.timestamp).toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-3 mb-3">
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
                        
                        {!compact && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <UserSelector
                              selectedUser={alert.assigned}
                              onUserSelect={(user) => onAssign?.(alert.id, user)}
                            />
                            
                            {alert.status === "new" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setAcknowledgeAlert(alert)}
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Acknowledge
                              </Button>
                            )}
                            
                            {(alert.status === "new" || alert.status === "acknowledged") && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => onResolve?.(alert.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Resolve
                              </Button>
                            )}
                            
                            <AlertHistoryTimeline
                              history={alert.history || []}
                              alertDescription={alert.description}
                            />
                          </div>
                        )}
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
                        <DropdownMenuContent align="end" className="w-48 bg-background border border-border z-50">
                          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setAcknowledgeAlert(alert)}>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <span>Acknowledge with reason</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onResolve?.(alert.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Mark as resolved</span>
                          </DropdownMenuItem>
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

      <AcknowledgmentDialog
        open={!!acknowledgeAlert}
        onOpenChange={(open) => !open && setAcknowledgeAlert(null)}
        onSubmit={handleAcknowledgeSubmit}
        alertDescription={acknowledgeAlert?.description || ""}
      />
    </>
  );
};

export default AlertsList;
