import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { Factory, Zap } from "lucide-react";

interface ProductionProps {
  gameSession: any;
  currentState: any;
}

export default function Production({ gameSession, currentState }: ProductionProps) {
  const capacityData = [
    { week: 3, capacity: 25000, used: 0 },
    { week: 4, capacity: 50000, used: 0 },
    { week: 5, capacity: 100000, used: 0 },
    { week: 6, capacity: 100000, used: 0 },
    { week: 7, capacity: 150000, used: 0 },
    { week: 8, capacity: 150000, used: 0 },
  ];

  const getCapacityPercentage = (used: number, capacity: number) => {
    return capacity > 0 ? (used / capacity) * 100 : 0;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Production Planning</h1>
        <p className="text-gray-600">Schedule production batches to meet launch deadline (Week 7)</p>
      </div>

      {/* Production Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* In-house Production */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory size={20} />
              <TooltipWrapper content="Your own manufacturing facility. It is cheaper per unit but has limited weekly capacity and longer production lead times (2-3 weeks).">
                <span className="cursor-help">In-house Production</span>
              </TooltipWrapper>
            </CardTitle>
            <p className="text-sm text-gray-600">Lower cost, longer lead times, capacity constraints</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Cost per unit:</span>
                <div className="font-medium">£8.00 - £15.00</div>
              </div>
              <div>
                <span className="text-gray-600">Lead time:</span>
                <div className="font-medium">2-3 weeks</div>
              </div>
              <div>
                <span className="text-gray-600">Batch size:</span>
                <div className="font-medium">25,000 units</div>
              </div>
              <div>
                <span className="text-gray-600">Capacity:</span>
                <div className="font-medium">Variable by week</div>
              </div>
            </div>
            
            {/* Capacity Timeline */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3">
                <TooltipWrapper content="The maximum number of units your in-house facility can produce each week. You cannot schedule more production than the available capacity.">
                  <span className="cursor-help">Weekly Capacity Schedule</span>
                </TooltipWrapper>
              </h4>
              <div className="space-y-2">
                {capacityData.map((week) => (
                  <div key={week.week} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Week {week.week}:</span>
                    <div className="flex items-center gap-2 flex-1 max-w-32">
                      <Progress 
                        value={getCapacityPercentage(week.used, week.capacity)} 
                        className="flex-1 h-2" 
                      />
                      <span className="font-mono text-xs">
                        {week.used.toLocaleString()}/{week.capacity.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outsourced Production */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} />
              <TooltipWrapper content="A third-party manufacturer. It is more expensive per unit but offers unlimited capacity and very fast lead times (1 week). Use this to quickly respond to demand or meet tight deadlines.">
                <span className="cursor-help">Outsourced Production</span>
              </TooltipWrapper>
            </CardTitle>
            <p className="text-sm text-gray-600">Higher cost, faster delivery, unlimited capacity</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Cost per unit:</span>
                <div className="font-medium">£14.00 - £25.00</div>
              </div>
              <div>
                <span className="text-gray-600">Lead time:</span>
                <div className="font-medium">1 week</div>
              </div>
              <div>
                <span className="text-gray-600">Capacity:</span>
                <div className="font-medium text-secondary">Unlimited</div>
              </div>
              <div>
                <span className="text-gray-600">Batch size:</span>
                <div className="font-medium">25,000 units</div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center p-3 bg-secondary bg-opacity-10 rounded-lg">
                <Zap className="text-secondary mr-3" size={20} />
                <div>
                  <div className="font-medium text-secondary">Fast Track Available</div>
                  <div className="text-sm text-gray-600">Perfect for tight deadlines</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Schedule */}
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle>Production Schedule</CardTitle>
          <p className="text-sm text-gray-600">Plan your production batches to meet the Week 7 launch deadline</p>
        </CardHeader>
        <CardContent>
          {/* Add Production Batch */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-4">Schedule New Production Batch</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jacket">Vintage Denim Jacket</SelectItem>
                    <SelectItem value="dress">Floral Print Dress</SelectItem>
                    <SelectItem value="pants">Corduroy Pants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Production Method</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inhouse">In-house (2-3 weeks, £8-15/unit)</SelectItem>
                    <SelectItem value="outsourced">Outsourced (1 week, £14-25/unit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Week</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Week 3</SelectItem>
                    <SelectItem value="4">Week 4</SelectItem>
                    <SelectItem value="5">Week 5</SelectItem>
                    <SelectItem value="6">Week 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  Add Batch
                </Button>
              </div>
            </div>
          </div>

          {/* Scheduled Batches */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Scheduled Production Batches</h3>
            <div className="text-center py-8 text-gray-500">
              <Factory className="mx-auto mb-2" size={48} />
              <p>No production batches scheduled yet</p>
              <p className="text-sm">Add your first batch above to get started</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
