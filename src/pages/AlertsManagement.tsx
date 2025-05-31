
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { alerts as allAlerts } from "@/data/mockData";
import { 
  Filter, 
  User, 
  AlertTriangle, 
  AlertOctagon, 
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/AlertsList";
import AlertsList from "@/components/AlertsList";
import { AlertHistoryEntry } from "@/components/AlertHistoryTimeline";
import { cn } from "@/lib/utils";

const AlertsManagement = () => {
  const [alerts, setAlerts] = useState<Alert[]>(
    allAlerts.map(alert => ({ ...alert, history: [] }))
  );
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [status, setStatus] = useState<"all" | "new" | "acknowledged" | "resolved">("all");

  const addHistoryEntry = (alertId: string, entry: Omit<AlertHistoryEntry, 'id'>) => {
    const historyEntry: AlertHistoryEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };

    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              history: [...(alert.history || []), historyEntry]
            } 
          : alert
      )
    );
  };

  const handleAssign = (alertId: string, user: string | undefined) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => {
        if (alert.id === alertId) {
          const updatedAlert = { ...alert, assigned: user };
          
          // Add history entry
          const historyEntry = {
            type: user ? "assignment" as const : "unassignment" as const,
            user: user || alert.assigned || "Unknown",
            timestamp: new Date().toISOString()
          };
          
          addHistoryEntry(alertId, historyEntry);
          
          return updatedAlert;
        }
        return alert;
      })
    );
  };

  const handleAcknowledge = (alertId: string, reason: string, proof?: File) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => {
        if (alert.id === alertId) {
          const updatedAlert = { ...alert, status: "acknowledged" as const };
          
          // Add history entry
          const historyEntry = {
            type: "acknowledgment" as const,
            user: alert.assigned || "Unknown User",
            timestamp: new Date().toISOString(),
            reason,
            proofFile: proof?.name
          };
          
          addHistoryEntry(alertId, historyEntry);
          
          return updatedAlert;
        }
        return alert;
      })
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => {
        if (alert.id === alertId) {
          const updatedAlert = { ...alert, status: "resolved" as const };
          
          // Add history entry
          const historyEntry = {
            type: "resolution" as const,
            user: alert.assigned || "Unknown User",
            timestamp: new Date().toISOString()
          };
          
          addHistoryEntry(alertId, historyEntry);
          
          return updatedAlert;
        }
        return alert;
      })
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    let matchesSeverity = filter === "all" || alert.severity === filter;
    let matchesStatus = status === "all" || alert.status === status;
    return matchesSeverity && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alerts Management</h1>
            <p className="text-muted-foreground">
              Monitor and respond to system alerts across all conveyor systems
            </p>
          </div>
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="metric-card p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-accent/20">
                <AlertTriangle className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </Card>
          <Card className={cn("metric-card p-4", 
                alerts.filter(a => a.severity === "critical" && a.status !== "resolved").length > 0 ? 
                "border-alert-critical" : ""
          )}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">{alerts.filter(a => a.severity === "critical" && a.status !== "resolved").length}</p>
              </div>
              <div className="p-2 rounded-lg bg-alert-critical/20">
                <AlertOctagon className="h-5 w-5 text-alert-critical" />
              </div>
            </div>
          </Card>
          <Card className={cn("metric-card p-4", 
                alerts.filter(a => a.severity === "warning" && a.status !== "resolved").length > 0 ? 
                "border-alert-warning" : ""
          )}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold">{alerts.filter(a => a.severity === "warning" && a.status !== "resolved").length}</p>
              </div>
              <div className="p-2 rounded-lg bg-alert-warning/20">
                <AlertTriangle className="h-5 w-5 text-alert-warning" />
              </div>
            </div>
          </Card>
          <Card className="metric-card p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Unassigned</p>
                <p className="text-2xl font-bold">{alerts.filter(a => !a.assigned && a.status !== "resolved").length}</p>
              </div>
              <div className="p-2 rounded-lg bg-accent/20">
                <User className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="metric-card p-0 overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Alert List</h2>
              <p className="text-sm text-muted-foreground">Showing {filteredAlerts.length} alerts</p>
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Severity: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border border-border">
                  <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("critical")}>Critical</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("warning")}>Warning</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("info")}>Info</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border border-border">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatus("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus("new")}>New</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus("acknowledged")}>Acknowledged</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus("resolved")}>Resolved</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-6">
            <AlertsList
              alerts={filteredAlerts}
              onAssign={handleAssign}
              onAcknowledge={handleAcknowledge}
              onResolve={handleResolve}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlertsManagement;
