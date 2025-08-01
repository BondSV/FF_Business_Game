import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Palette, 
  ShoppingCart, 
  Factory, 
  Truck, 
  Megaphone, 
  TrendingUp 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentState: any;
}

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BarChart3,
    description: 'Game progress and KPIs',
  },
  {
    id: 'design',
    label: 'Design & Pricing',
    icon: Palette,
    description: 'Set RRP and design choices',
    phases: ['strategy'],
  },
  {
    id: 'procurement',
    label: 'Procurement',
    icon: ShoppingCart,
    description: 'Secure materials from suppliers',
    phases: ['strategy', 'development'],
  },
  {
    id: 'production',
    label: 'Production',
    icon: Factory,
    description: 'Schedule manufacturing batches',
    phases: ['development'],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: Truck,
    description: 'Manage shipping and delivery',
    phases: ['development', 'sales'],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Megaphone,
    description: 'Allocate budget and set discounts',
    phases: ['sales'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    description: 'Performance metrics and insights',
  },
];

const gamePhases = [
  {
    name: 'Strategy',
    weeks: '1-2',
    color: 'bg-strategy',
    current: false,
  },
  {
    name: 'Development', 
    weeks: '1-6',
    color: 'bg-development',
    current: false,
  },
  {
    name: 'Sales',
    weeks: '7-12', 
    color: 'bg-sales',
    current: false,
  },
  {
    name: 'Run-out',
    weeks: '13-15',
    color: 'bg-runout',
    current: false,
  },
];

export default function Sidebar({ activeTab, onTabChange, currentState }: SidebarProps) {
  const currentWeek = currentState?.weekNumber || 1;
  
  const getCurrentPhase = () => {
    if (currentWeek <= 2) return 'strategy';
    if (currentWeek <= 6) return 'development';
    if (currentWeek <= 12) return 'sales';
    return 'runout';
  };

  const currentPhase = getCurrentPhase();

  const isTabAvailable = (item: any) => {
    // Overview and Analytics are always available
    if (item.id === 'overview' || item.id === 'analytics') return true;
    
    // Other tabs are available based on current phase
    if (!item.phases) return true;
    return item.phases.includes(currentPhase);
  };

  const getTabStatus = (item: any) => {
    if (!isTabAvailable(item)) return 'disabled';
    if (item.id === activeTab) return 'active';
    return 'available';
  };

  // Update phases to show current
  const phasesWithStatus = gamePhases.map(phase => {
    let isCurrent = false;
    if (phase.name.toLowerCase() === 'strategy' && currentWeek <= 2) isCurrent = true;
    if (phase.name.toLowerCase() === 'development' && currentWeek >= 1 && currentWeek <= 6) isCurrent = true;
    if (phase.name.toLowerCase() === 'sales' && currentWeek >= 7 && currentWeek <= 12) isCurrent = true;
    if (phase.name.toLowerCase() === 'run-out' && currentWeek >= 13) isCurrent = true;
    
    return { ...phase, current: isCurrent };
  });

  return (
    <nav className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Game Progress */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Game Progress</h3>
          <div className="space-y-2">
            {phasesWithStatus.map((phase) => (
              <div
                key={phase.name}
                className={`flex items-center p-2 rounded-lg ${
                  phase.current 
                    ? `${phase.color} bg-opacity-10 border border-opacity-20`
                    : 'opacity-60'
                }`}
                style={phase.current ? { borderColor: `var(--${phase.color.split('-')[1]})` } : {}}
              >
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${phase.color}`}
                ></div>
                <span className={`text-sm font-medium ${
                  phase.current 
                    ? `text-${phase.color.split('-')[1]}`
                    : 'text-gray-600'
                }`}>
                  {phase.name} (Week {phase.weeks})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Navigation</h3>
          {navigationItems.map((item) => {
            const status = getTabStatus(item);
            const Icon = item.icon;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start ${
                  status === 'active'
                    ? 'bg-primary bg-opacity-10 text-primary hover:bg-primary hover:bg-opacity-20'
                    : status === 'disabled'
                    ? 'text-gray-400 cursor-not-allowed opacity-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => status === 'available' || status === 'active' ? onTabChange(item.id) : undefined}
                disabled={status === 'disabled'}
              >
                <Icon className="mr-3" size={16} />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-xs opacity-75">{item.description}</div>
                  )}
                </div>
                {status === 'disabled' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Later
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Current Week Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Current Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Week:</span>
              <span className="font-medium">{currentWeek} of 15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phase:</span>
              <span className="font-medium capitalize">{currentPhase}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <Badge
                variant={currentState?.isCommitted ? "default" : "secondary"}
                className={currentState?.isCommitted ? "bg-green-100 text-green-700" : ""}
              >
                {currentState?.isCommitted ? 'Committed' : 'In Progress'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
