
import { Card } from "@/components/ui/card";
import { Camera, Clock } from "lucide-react";

interface ParticleDetection {
  id: string;
  timestamp: string;
  imageUrl: string;
  conveyorId: string;
  conveyorName: string;
}

const mockDetections: ParticleDetection[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:35:22",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
    conveyorId: "c001",
    conveyorName: "Primary Belt A"
  },
  {
    id: "2", 
    timestamp: "2024-01-15 14:34:18",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop",
    conveyorId: "c002",
    conveyorName: "Secondary Belt B"
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:33:45",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop",
    conveyorId: "c003", 
    conveyorName: "Loading Belt C"
  }
];

const LastParticlesDetected = () => {
  return (
    <Card className="chart-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Last Particles Detected
        </h3>
        <p className="text-sm text-muted-foreground">Recent particle detections from conveyor cameras</p>
      </div>
      
      <div className="space-y-4">
        {mockDetections.map((detection) => (
          <div key={detection.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="w-16 h-12 rounded-md overflow-hidden bg-muted">
              <img 
                src={detection.imageUrl} 
                alt="Particle detection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{detection.conveyorName}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {detection.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LastParticlesDetected;
