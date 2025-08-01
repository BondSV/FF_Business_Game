import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { BarChart3, LogOut } from "lucide-react";

interface HeaderProps {
  currentState: any;
  onCommitWeek: () => void;
}

export default function Header({ currentState, onCommitWeek }: HeaderProps) {
  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getPhaseInfo = (week: number) => {
    if (week <= 2) return { name: 'Strategy Phase', color: 'bg-strategy text-white' };
    if (week <= 6) return { name: 'Development Phase', color: 'bg-development text-white' };
    if (week <= 12) return { name: 'Sales Phase', color: 'bg-sales text-white' };
    return { name: 'Run-out Phase', color: 'bg-runout text-white' };
  };

  const currentWeek = currentState?.weekNumber || 1;
  const phase = getPhaseInfo(currentWeek);
  const cashOnHand = Number(currentState?.cashOnHand || 1000000);
  const serviceLevel = 94.2; // This would come from calculations
  const economicProfit = 850000; // This would come from calculations

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Vintage Revival Simulation</h1>
            <p className="text-sm text-gray-600">Operations & Project Management</p>
          </div>
        </div>

        {/* KPI Display */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="text-center">
            <TooltipWrapper content="The percentage of customer demand you successfully met during the main sales period (Weeks 7-12). A low level indicates you had stock-outs and lost sales. Target: ≥95%.">
              <div className="cursor-help">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Service Level</p>
                <p className="text-lg font-bold text-gray-900">
                  {currentWeek >= 7 ? `${serviceLevel.toFixed(1)}%` : '--%'}
                </p>
              </div>
            </TooltipWrapper>
          </div>

          <div className="text-center">
            <TooltipWrapper content="Your ultimate measure of profitability. It is your total revenue minus ALL costs, including a 10% annual charge on the capital you employed. This is more comprehensive than simple profit.">
              <div className="cursor-help">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Economic Profit</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(economicProfit)}
                </p>
              </div>
            </TooltipWrapper>
          </div>

          <div className="text-center">
            <TooltipWrapper content="Your current liquid cash available. This does not include your available credit line. All operational expenses are paid from this.">
              <div className="cursor-help">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cash on Hand</p>
                <p className="text-lg font-bold text-gray-900 font-mono">
                  {formatCurrency(cashOnHand)}
                </p>
              </div>
            </TooltipWrapper>
          </div>
        </div>

        {/* Week and Actions */}
        <div className="flex items-center space-x-4">
          {/* Week Indicator */}
          <Badge className={`${phase.color} px-4 py-2`}>
            Week {currentWeek} - {phase.name}
          </Badge>

          {/* Commit Week Button */}
          <Button 
            onClick={onCommitWeek}
            className="bg-primary hover:bg-blue-700"
            disabled={currentState?.isCommitted}
          >
            {currentState?.isCommitted ? 'Week Committed' : 'Commit Week'}
          </Button>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-600"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
