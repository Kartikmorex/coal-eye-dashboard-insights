
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  iconColor?: string;
}

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  trendValue,
  className,
  iconColor = "text-primary"
}: KPICardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-alert-success";
      case "down":
        return "text-alert-critical";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("metric-card", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trendValue && (
              <span className={cn("text-sm font-medium", getTrendColor())}>
                {trendValue}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-2 rounded-lg bg-accent/20", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
};

export default KPICard;
