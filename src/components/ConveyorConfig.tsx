
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus, X, Settings, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Camera {
  id: string;
  name: string;
  ipAddress: string;
  port: string;
}

interface Conveyor {
  id: string;
  name: string;
  description: string;
  location: string;
  cameras: Camera[];
}

interface ConveyorConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conveyor?: Conveyor;
  onSave: (conveyor: Omit<Conveyor, 'id'> & { id?: string }) => void;
  onDelete?: (conveyorId: string) => void;
}

const ConveyorConfig = ({ open, onOpenChange, conveyor, onSave, onDelete }: ConveyorConfigProps) => {
  const [formData, setFormData] = useState({
    name: conveyor?.name || "",
    description: conveyor?.description || "",
    location: conveyor?.location || "",
    cameras: conveyor?.cameras || []
  });

  const [newCamera, setNewCamera] = useState({
    name: "",
    ipAddress: "",
    port: "80"
  });

  const handleAddCamera = () => {
    if (newCamera.name && newCamera.ipAddress) {
      const camera: Camera = {
        id: `cam_${Date.now()}`,
        ...newCamera
      };
      setFormData(prev => ({
        ...prev,
        cameras: [...prev.cameras, camera]
      }));
      setNewCamera({ name: "", ipAddress: "", port: "80" });
    }
  };

  const handleRemoveCamera = (cameraId: string) => {
    setFormData(prev => ({
      ...prev,
      cameras: prev.cameras.filter(cam => cam.id !== cameraId)
    }));
  };

  const handleSave = () => {
    if (formData.name && formData.location && formData.cameras.length > 0) {
      onSave({
        ...(conveyor?.id && { id: conveyor.id }),
        ...formData
      });
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (conveyor?.id && onDelete) {
      onDelete(conveyor.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            {conveyor ? 'Edit Conveyor' : 'Add New Conveyor'}
          </DialogTitle>
          <DialogDescription>
            Configure conveyor settings and assign cameras for monitoring.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Conveyor Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Primary Belt A"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Processing Plant - Zone A"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description of the conveyor"
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Cameras</Label>
              <Badge variant="secondary">{formData.cameras.length} assigned</Badge>
            </div>
            
            {formData.cameras.length > 0 && (
              <div className="space-y-2">
                {formData.cameras.map((camera) => (
                  <div key={camera.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Camera className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{camera.name}</p>
                        <p className="text-sm text-muted-foreground">{camera.ipAddress}:{camera.port}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCamera(camera.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Card className="p-4 bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <Label htmlFor="camera-name">Camera Name</Label>
                  <Input
                    id="camera-name"
                    value={newCamera.name}
                    onChange={(e) => setNewCamera(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Camera 1"
                  />
                </div>
                <div>
                  <Label htmlFor="camera-ip">IP Address</Label>
                  <Input
                    id="camera-ip"
                    value={newCamera.ipAddress}
                    onChange={(e) => setNewCamera(prev => ({ ...prev, ipAddress: e.target.value }))}
                    placeholder="192.168.1.100"
                  />
                </div>
                <div>
                  <Label htmlFor="camera-port">Port</Label>
                  <Input
                    id="camera-port"
                    value={newCamera.port}
                    onChange={(e) => setNewCamera(prev => ({ ...prev, port: e.target.value }))}
                    placeholder="80"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCamera}
                disabled={!newCamera.name || !newCamera.ipAddress}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Camera
              </Button>
            </Card>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <div>
            {conveyor && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!formData.name || !formData.location || formData.cameras.length === 0}
            >
              {conveyor ? 'Update' : 'Create'} Conveyor
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConveyorConfig;
