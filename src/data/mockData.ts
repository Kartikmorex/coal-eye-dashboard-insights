
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

export interface HistoricalData {
  plantName: string;
  cameraId: string;
  createdAt: string;
  particleSize0_2: number;
  particleSize2_6: number;
  particleSize6_8: number;
  particleSize8_15: number;
  blackPercentage: number;
  grayPercentage: number;
}

export const conveyors: Conveyor[] = [
  {
    id: "c001",
    name: "Main Transfer Conveyor",
    status: "operational",
    efficiency: 92,
    alertCount: 0,
    lastUpdated: "2025-05-30 07:45:22",
    avgParticleSize: 4.5, // 2-6mm range
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
    avgParticleSize: 7.2, // 6-8mm range
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
    avgParticleSize: 9.5, // 8-15mm range
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
    avgParticleSize: 1.8, // 0-2mm range
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
    avgParticleSize: 3.1, // 2-6mm range
    throughput: 460,
    location: "Loading Facility"
  }
];

// Updated particle size distribution with correct categories
export const particleSizeDistribution = [
  { size: "0-2mm", percentage: 35.2, count: 1520 },
  { size: "2-6mm", percentage: 42.8, count: 2145 },
  { size: "6-8mm", percentage: 15.6, count: 890 },
  { size: "8-15mm", percentage: 6.4, count: 325 }
];

// Coal color analysis data
export const coalColorSummary = [
  { color: "black", percentage: 77.6, label: "Black" },
  { color: "gray", percentage: 22.4, label: "Gray" }
];

export const coalColorDistribution = [
  { date: "23 May", gray: 28, black: 72 },
  { date: "24 May", gray: 24, black: 76 },
  { date: "25 May", gray: 21, black: 79 },
  { date: "26 May", gray: 20, black: 80 },
  { date: "27 May", gray: 20, black: 80 },
  { date: "28 May", gray: 19, black: 81 },
  { date: "29 May", gray: 24, black: 76 }
];

// Size distribution box plot data
export const sizeDistributionBoxPlot = [
  { 
    date: "23 May", 
    min: 1.30, 
    q1: 2.05, 
    median: 2.15, 
    q3: 2.24, 
    max: 2.51,
    outliers: [1.25]
  },
  { 
    date: "24 May", 
    min: 1.75, 
    q1: 2.00, 
    median: 2.10, 
    q3: 2.20, 
    max: 2.65
  },
  { 
    date: "25 May", 
    min: 1.95, 
    q1: 2.15, 
    median: 2.25, 
    q3: 2.35, 
    max: 2.55
  },
  { 
    date: "26 May", 
    min: 1.30, 
    q1: 2.05, 
    median: 2.15, 
    q3: 2.24, 
    max: 2.51,
    outliers: [3.10]
  },
  { 
    date: "27 May", 
    min: 1.85, 
    q1: 2.20, 
    median: 2.30, 
    q3: 2.40, 
    max: 3.00
  },
  { 
    date: "28 May", 
    min: 2.00, 
    q1: 2.25, 
    median: 2.35, 
    q3: 2.45, 
    max: 2.75
  },
  { 
    date: "29 May", 
    min: 1.85, 
    q1: 2.30, 
    median: 2.45, 
    q3: 2.60, 
    max: 3.50,
    outliers: [1.20]
  }
];

// Updated conveyor-specific data with correct conveyor IDs and size ranges
export const conveyorSpecificSizeDistribution: { [key: string]: any[] } = {
  "c001": [
    { size: "0-2mm", percentage: 38.5, count: 1650 },
    { size: "2-6mm", percentage: 40.2, count: 2020 },
    { size: "6-8mm", percentage: 14.8, count: 820 },
    { size: "8-15mm", percentage: 6.5, count: 310 }
  ],
  "c002": [
    { size: "0-2mm", percentage: 32.1, count: 1380 },
    { size: "2-6mm", percentage: 45.6, count: 2280 },
    { size: "6-8mm", percentage: 16.2, count: 950 },
    { size: "8-15mm", percentage: 6.1, count: 290 }
  ],
  "c003": [
    { size: "0-2mm", percentage: 34.8, count: 1520 },
    { size: "2-6mm", percentage: 41.9, count: 2145 },
    { size: "6-8mm", percentage: 17.1, count: 920 },
    { size: "8-15mm", percentage: 6.2, count: 315 }
  ],
  "c004": [
    { size: "0-2mm", percentage: 36.2, count: 1580 },
    { size: "2-6mm", percentage: 43.1, count: 2190 },
    { size: "6-8mm", percentage: 14.5, count: 840 },
    { size: "8-15mm", percentage: 6.2, count: 285 }
  ],
  "c005": [
    { size: "0-2mm", percentage: 33.7, count: 1440 },
    { size: "2-6mm", percentage: 44.8, count: 2260 },
    { size: "6-8mm", percentage: 15.9, count: 890 },
    { size: "8-15mm", percentage: 5.6, count: 270 }
  ]
};

// Historical data for 15-minute intervals
export const historicalData: HistoricalData[] = [
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 11:56:33 AM",
    particleSize0_2: 66.51,
    particleSize2_6: 25.86,
    particleSize6_8: 6.46,
    particleSize8_15: 0.61,
    blackPercentage: 86.41,
    grayPercentage: 13.59
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 11:48:09 AM",
    particleSize0_2: 66.64,
    particleSize2_6: 25.71,
    particleSize6_8: 6.48,
    particleSize8_15: 0.63,
    blackPercentage: 86.37,
    grayPercentage: 13.63
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 11:45:43 AM",
    particleSize0_2: 75.44,
    particleSize2_6: 16.83,
    particleSize6_8: 7.76,
    particleSize8_15: 0.77,
    blackPercentage: 80.43,
    grayPercentage: 19.57
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 11:41:14 AM",
    particleSize0_2: 71.1,
    particleSize2_6: 19.91,
    particleSize6_8: 8.79,
    particleSize8_15: 1.59,
    blackPercentage: 82.24,
    grayPercentage: 17.76
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 11:33:42 AM",
    particleSize0_2: 72.99,
    particleSize2_6: 16.1,
    particleSize6_8: 7.66,
    particleSize8_15: 1.79,
    blackPercentage: 83.72,
    grayPercentage: 16.28
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 11:02:32 AM",
    particleSize0_2: 73.73,
    particleSize2_6: 16.83,
    particleSize6_8: 7.96,
    particleSize8_15: 0.77,
    blackPercentage: 85.14,
    grayPercentage: 14.86
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 10:40:09 AM",
    particleSize0_2: 65.87,
    particleSize2_6: 26.38,
    particleSize6_8: 6.26,
    particleSize8_15: 0.62,
    blackPercentage: 87.94,
    grayPercentage: 12.06
  },
  {
    plantName: "Power_Plant",
    cameraId: "Ripik-ThermalCoal",
    createdAt: "31/05/25 10:37:02 AM",
    particleSize0_2: 73.09,
    particleSize2_6: 19.5,
    particleSize6_8: 6.91,
    particleSize8_15: 0.83,
    blackPercentage: 86.7,
    grayPercentage: 13.3
  }
];

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

// Function to filter historical data based on time range and selected conveyors
export const getFilteredHistoricalData = (
  startDate?: Date,
  endDate?: Date,
  selectedConveyors?: string[]
): HistoricalData[] => {
  let filteredData = [...historicalData];
  
  // Time filtering would be implemented here based on startDate and endDate
  // For now, returning all data as mock implementation
  
  return filteredData;
};

// Function to get aggregated particle size data for selected conveyors
export const getAggregatedParticleSizeData = (selectedConveyors: string[]) => {
  if (selectedConveyors.length === 0 || selectedConveyors.includes("all")) {
    return particleSizeDistribution;
  }
  
  // Aggregate data from selected conveyors
  const aggregatedData = selectedConveyors.reduce((acc, conveyorId) => {
    const conveyorData = conveyorSpecificSizeDistribution[conveyorId];
    if (conveyorData) {
      conveyorData.forEach((item, index) => {
        if (!acc[index]) {
          acc[index] = { size: item.size, percentage: 0, count: 0 };
        }
        acc[index].percentage += item.percentage;
        acc[index].count += item.count;
      });
    }
    return acc;
  }, [] as ParticleSizeData[]);
  
  // Average the percentages
  const conveyorCount = selectedConveyors.length;
  return aggregatedData.map(item => ({
    ...item,
    percentage: item.percentage / conveyorCount
  }));
};
