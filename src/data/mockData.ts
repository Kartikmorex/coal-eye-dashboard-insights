
export interface Conveyor {
  id: string;
  name: string;
  status: "operational" | "warning" | "critical";
  efficiency: number;
  alertCount: number;
  lastUpdated: string;
  avgParticleSize: number;
  throughput: number;
  location: string;
}

export interface ParticleSizeData {
  size: string;
  percentage: number;
  count: number;
}

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

export const conveyors: Conveyor[] = [
  {
    id: "c001",
    name: "Main Transfer Conveyor",
    status: "operational",
    efficiency: 92,
    alertCount: 0,
    lastUpdated: "2025-05-30 07:45:22",
    avgParticleSize: 24.5,
    throughput: 420,
    location: "North Section"
  },
  {
    id: "c002",
    name: "Secondary Crusher Feed",
    status: "warning",
    efficiency: 78,
    alertCount: 2,
    lastUpdated: "2025-05-30 07:42:18",
    avgParticleSize: 38.7,
    throughput: 315,
    location: "Processing Plant"
  },
  {
    id: "c003",
    name: "Stockpile Reclaimer",
    status: "critical",
    efficiency: 61,
    alertCount: 3,
    lastUpdated: "2025-05-30 07:30:45",
    avgParticleSize: 42.2,
    throughput: 270,
    location: "Stockyard Area"
  },
  {
    id: "c004",
    name: "East Wing Conveyor",
    status: "operational",
    efficiency: 89,
    alertCount: 0,
    lastUpdated: "2025-05-30 07:44:10",
    avgParticleSize: 26.8,
    throughput: 380,
    location: "East Section"
  },
  {
    id: "c005",
    name: "Final Product Line",
    status: "operational",
    efficiency: 94,
    alertCount: 1,
    lastUpdated: "2025-05-30 07:40:33",
    avgParticleSize: 22.1,
    throughput: 460,
    location: "Loading Facility"
  }
];

export const particleSizeDistribution: ParticleSizeData[] = [
  { size: "0-10mm", percentage: 15, count: 1250 },
  { size: "10-20mm", percentage: 28, count: 2340 },
  { size: "20-30mm", percentage: 32, count: 2680 },
  { size: "30-40mm", percentage: 18, count: 1510 },
  { size: "40-50mm", percentage: 5, count: 420 },
  { size: "50-60mm", percentage: 1.5, count: 125 },
  { size: ">60mm", percentage: 0.5, count: 42 }
];

export const conveyorSpecificSizeDistribution: Record<string, ParticleSizeData[]> = {
  "c001": [
    { size: "0-10mm", percentage: 18, count: 580 },
    { size: "10-20mm", percentage: 32, count: 1040 },
    { size: "20-30mm", percentage: 28, count: 910 },
    { size: "30-40mm", percentage: 16, count: 520 },
    { size: "40-50mm", percentage: 4, count: 130 },
    { size: "50-60mm", percentage: 1.2, count: 38 },
    { size: ">60mm", percentage: 0.8, count: 26 }
  ],
  "c002": [
    { size: "0-10mm", percentage: 10, count: 320 },
    { size: "10-20mm", percentage: 22, count: 710 },
    { size: "20-30mm", percentage: 28, count: 910 },
    { size: "30-40mm", percentage: 24, count: 780 },
    { size: "40-50mm", percentage: 10, count: 330 },
    { size: "50-60mm", percentage: 4, count: 130 },
    { size: ">60mm", percentage: 2, count: 65 }
  ],
  "c003": [
    { size: "0-10mm", percentage: 8, count: 180 },
    { size: "10-20mm", percentage: 18, count: 410 },
    { size: "20-30mm", percentage: 25, count: 570 },
    { size: "30-40mm", percentage: 26, count: 590 },
    { size: "40-50mm", percentage: 15, count: 340 },
    { size: "50-60mm", percentage: 5, count: 110 },
    { size: ">60mm", percentage: 3, count: 68 }
  ],
  "c004": [
    { size: "0-10mm", percentage: 16, count: 510 },
    { size: "10-20mm", percentage: 30, count: 960 },
    { size: "20-30mm", percentage: 32, count: 1030 },
    { size: "30-40mm", percentage: 15, count: 480 },
    { size: "40-50mm", percentage: 5, count: 160 },
    { size: "50-60mm", percentage: 1.5, count: 48 },
    { size: ">60mm", percentage: 0.5, count: 16 }
  ],
  "c005": [
    { size: "0-10mm", percentage: 20, count: 730 },
    { size: "10-20mm", percentage: 38, count: 1390 },
    { size: "20-30mm", percentage: 30, count: 1100 },
    { size: "30-40mm", percentage: 9, count: 320 },
    { size: "40-50mm", percentage: 2, count: 73 },
    { size: "50-60mm", percentage: 0.8, count: 29 },
    { size: ">60mm", percentage: 0.2, count: 7 }
  ]
};

export const alerts: Alert[] = [
  {
    id: "a001",
    conveyorId: "c002",
    conveyorName: "Secondary Crusher Feed",
    type: "large-particle",
    severity: "warning",
    timestamp: "2025-05-30T07:35:12",
    description: "Large particle (65mm+) detected",
    status: "new"
  },
  {
    id: "a002",
    conveyorId: "c002",
    conveyorName: "Secondary Crusher Feed",
    type: "system",
    severity: "info",
    timestamp: "2025-05-30T07:30:45",
    description: "Belt speed fluctuation detected",
    assigned: "Michael T.",
    status: "acknowledged"
  },
  {
    id: "a003",
    conveyorId: "c003",
    conveyorName: "Stockpile Reclaimer",
    type: "foreign-object",
    severity: "critical",
    timestamp: "2025-05-30T07:28:03",
    description: "Metal object detected on belt",
    status: "new"
  },
  {
    id: "a004",
    conveyorId: "c003",
    conveyorName: "Stockpile Reclaimer",
    type: "large-particle",
    severity: "warning",
    timestamp: "2025-05-30T07:25:19",
    description: "Multiple large particles detected",
    status: "new"
  },
  {
    id: "a005",
    conveyorId: "c003",
    conveyorName: "Stockpile Reclaimer",
    type: "system",
    severity: "critical",
    timestamp: "2025-05-30T07:15:34",
    description: "Belt alignment critical deviation",
    status: "acknowledged",
    assigned: "Sarah L."
  },
  {
    id: "a006",
    conveyorId: "c005",
    conveyorName: "Final Product Line",
    type: "system",
    severity: "warning",
    timestamp: "2025-05-30T07:10:22",
    description: "Sensor 3 calibration required",
    status: "new"
  }
];

export const getConveyorById = (id: string): Conveyor | undefined => {
  return conveyors.find(conveyor => conveyor.id === id);
};

export const getAlertsForConveyor = (conveyorId: string): Alert[] => {
  return alerts.filter(alert => alert.conveyorId === conveyorId);
};

export const getActiveAlerts = (): Alert[] => {
  return alerts.filter(alert => alert.status !== "resolved");
};

export const getSystemStats = () => {
  const totalThroughput = conveyors.reduce((acc, curr) => acc + curr.throughput, 0);
  const avgEfficiency = conveyors.reduce((acc, curr) => acc + curr.efficiency, 0) / conveyors.length;
  const totalAlerts = alerts.filter(a => a.status !== "resolved").length;
  
  return {
    totalConveyors: conveyors.length,
    operationalCount: conveyors.filter(c => c.status === "operational").length,
    warningCount: conveyors.filter(c => c.status === "warning").length,
    criticalCount: conveyors.filter(c => c.status === "critical").length,
    totalThroughput,
    avgEfficiency,
    totalAlerts
  };
};

export const getSeverityDistribution = () => {
  const activeAlerts = alerts.filter(a => a.status !== "resolved");
  const critical = activeAlerts.filter(a => a.severity === "critical").length;
  const warning = activeAlerts.filter(a => a.severity === "warning").length;
  const info = activeAlerts.filter(a => a.severity === "info").length;
  
  return [
    { name: "Critical", value: critical },
    { name: "Warning", value: warning },
    { name: "Info", value: info }
  ];
};
