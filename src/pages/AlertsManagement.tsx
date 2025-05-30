
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { alerts as allAlerts } from "@/data/mockData";
import { 
  Check, 
  X, 
  Filter, 
  User, 
  AlertTriangle, 
  AlertOctagon, 
  BarChart3, 
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/AlertsList";
import { cn } from "@/lib/utils";

const AlertsManagement = () => {
  const [alerts, setAlerts] = useState<Alert[]>(allAlerts);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [status, setStatus] = useState<"all" | "new" | "acknowledged" | "resolved">("all");

  const handleAssign = (alertId: string, user: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, assigned: user } : alert
      )
    );
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, status: "acknowledged" } : alert
      )
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    let matchesSeverity = filter === "all" || alert.severity === filter;
    let matchesStatus = status === "all" || alert.status === status;
    return matchesSeverity && matchesStatus;
  });

  const getAlertTypeIcon = (type: Alert["type"]) => {
    switch (type) {
      case "large-particle":
        return <BarChart3 className="h-4 w-4" />;
      case "foreign-object":
        return <AlertOctagon className="h-4 w-4" />;
      case "system":
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge variant="outline" className="border-alert-warning text-alert-warning">Warning</Badge>;
      case "info":
        return <Badge variant="outline" className="border-alert-info text-alert-info">Info</Badge>;
    }
  };

  const getStatusBadge = (status: Alert["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="bg-card/50">New</Badge>;
      case "acknowledged":
        return <Badge variant="outline" className="border-alert-info text-alert-info">Acknowledged</Badge>;
      case "resolved":
        return <Badge variant="outline" className="border-alert-success text-alert-success">Resolved</Badge>;
    }
  };

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
                <DropdownMenuContent align="end">
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
                <DropdownMenuContent align="end">
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
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Conveyor</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No alerts match your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getAlertTypeIcon(alert.type)}
                          <span className="capitalize">{alert.type.replace('-', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell>{alert.description}</TableCell>
                      <TableCell>{alert.conveyorName}</TableCell>
                      <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        {alert.assigned ? (
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{alert.assigned}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {!alert.assigned && (
                            <Button variant="outline" size="sm" onClick={() => handleAssign(alert.id, "John Doe")}>
                              <User className="h-4 w-4" />
                              <span className="sr-only">Assign</span>
                            </Button>
                          )}
                          {alert.status === "new" && (
                            <Button variant="outline" size="sm" onClick={() => handleAcknowledge(alert.id)}>
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Acknowledge</span>
                            </Button>
                          )}
                          {(alert.status === "new" || alert.status === "acknowledged") && (
                            <Button variant="outline" size="sm" onClick={() => handleResolve(alert.id)}>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Resolve</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlertsManagement;
