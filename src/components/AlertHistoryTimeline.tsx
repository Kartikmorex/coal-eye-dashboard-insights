
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, User, CheckCircle, AlertTriangle, FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertHistoryEntry {
  id: string;
  type: "assignment" | "unassignment" | "acknowledgment" | "resolution";
  user: string;
  timestamp: string;
  reason?: string;
  proofFile?: string;
}

interface AlertHistoryTimelineProps {
  history: AlertHistoryEntry[];
  alertDescription: string;
}

const AlertHistoryTimeline = ({ history, alertDescription }: AlertHistoryTimelineProps) => {
  const getIcon = (type: AlertHistoryEntry['type']) => {
    switch (type) {
      case "assignment":
      case "unassignment":
        return <User className="h-4 w-4" />;
      case "acknowledgment":
        return <AlertTriangle className="h-4 w-4" />;
      case "resolution":
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getColor = (type: AlertHistoryEntry['type']) => {
    switch (type) {
      case "assignment":
        return "text-blue-600 bg-blue-100";
      case "unassignment":
        return "text-gray-600 bg-gray-100";
      case "acknowledgment":
        return "text-yellow-600 bg-yellow-100";
      case "resolution":
        return "text-green-600 bg-green-100";
    }
  };

  const getActionText = (entry: AlertHistoryEntry) => {
    switch (entry.type) {
      case "assignment":
        return `Assigned to ${entry.user}`;
      case "unassignment":
        return `Unassigned from ${entry.user}`;
      case "acknowledgment":
        return `Acknowledged by ${entry.user}`;
      case "resolution":
        return `Resolved by ${entry.user}`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border border-border">
        <DialogHeader>
          <DialogTitle>Alert History</DialogTitle>
          <p className="text-sm text-muted-foreground">{alertDescription}</p>
        </DialogHeader>
        
        <div className="max-h-[400px] overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No history available</p>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div key={entry.id} className="flex gap-3">
                  <div className={cn("rounded-full p-2 flex-shrink-0", getColor(entry.type))}>
                    {getIcon(entry.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{getActionText(entry)}</p>
                      <time className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </time>
                    </div>
                    {entry.reason && (
                      <div className="mt-1 p-2 bg-muted rounded text-sm">
                        <div className="flex items-start gap-2">
                          <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{entry.reason}</span>
                        </div>
                      </div>
                    )}
                    {entry.proofFile && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Image className="h-3 w-3" />
                        <span>Proof attached: {entry.proofFile}</span>
                      </div>
                    )}
                    {index < history.length - 1 && (
                      <div className="w-px h-4 bg-border ml-4 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertHistoryTimeline;
