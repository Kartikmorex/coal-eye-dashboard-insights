
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HistoricalData } from "@/data/mockData";

interface HistoricalDataTableProps {
  data: HistoricalData[];
  title?: string;
}

const HistoricalDataTable = ({ data, title = "Historical Data" }: HistoricalDataTableProps) => {
  return (
    <Card className="metric-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          15-minute interval data showing particle size and coal color distribution
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plant name</TableHead>
              <TableHead>Camera ID</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>0-2mm%</TableHead>
              <TableHead>2-6mm%</TableHead>
              <TableHead>6-8mm%</TableHead>
              <TableHead>8-15mm%</TableHead>
              <TableHead>Black %</TableHead>
              <TableHead>Gray %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.plantName}</TableCell>
                <TableCell>{row.cameraId}</TableCell>
                <TableCell className="text-sm">{row.createdAt}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {row.particleSize0_2.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {row.particleSize2_6.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {row.particleSize6_8.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {row.particleSize8_15.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {row.blackPercentage.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
                    {row.grayPercentage.toFixed(2)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
        <span>Rows per page: 10</span>
        <span>1-{Math.min(10, data.length)} of {data.length}</span>
      </div>
    </Card>
  );
};

export default HistoricalDataTable;
