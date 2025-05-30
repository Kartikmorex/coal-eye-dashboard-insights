
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Truck, AlertTriangle, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      title: "Overview",
      href: "/",
      icon: Home,
    },
    {
      title: "Alerts",
      href: "/alerts",
      icon: AlertTriangle,
    },
  ];

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Coal Monitor
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="status-indicator bg-alert-success"></div>
            <span className="text-sm text-muted-foreground">System Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
