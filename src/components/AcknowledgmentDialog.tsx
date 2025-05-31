
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Upload } from "lucide-react";

interface AcknowledgmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string, proof?: File) => void;
  alertDescription: string;
}

const AcknowledgmentDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  alertDescription 
}: AcknowledgmentDialogProps) => {
  const [reason, setReason] = useState("");
  const [proof, setProof] = useState<File | undefined>();

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason, proof);
      setReason("");
      setProof(undefined);
      onOpenChange(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProof(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-alert-warning" />
            Acknowledge Alert
          </DialogTitle>
          <DialogDescription>
            {alertDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for acknowledgment *</Label>
            <Textarea
              id="reason"
              placeholder="Describe the action taken or reason for acknowledgment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="proof">Upload proof (image/video)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="proof"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="file:mr-2 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:text-sm"
              />
              {proof && (
                <div className="text-sm text-muted-foreground">
                  {proof.name}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!reason.trim()}>
            <Upload className="h-4 w-4 mr-2" />
            Acknowledge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcknowledgmentDialog;
