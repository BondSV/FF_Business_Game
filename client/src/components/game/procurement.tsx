import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

interface ProcurementProps {
  gameSession: any;
  currentState: any;
}

export default function Procurement({ gameSession, currentState }: ProcurementProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Procurement</h1>
        <p className="text-gray-600">Secure materials from suppliers with optimal contract terms</p>
      </div>

      {/* Supplier Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Supplier 1 */}
        <Card className="border border-gray-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                <TooltipWrapper content="A premium supplier known for high-quality materials (0% defect rate) and reliability, but at a higher cost.">
                  <span className="cursor-help">Supplier-1 (Premium)</span>
                </TooltipWrapper>
              </CardTitle>
              <Badge className="bg-secondary text-white">0% Defects</Badge>
            </div>
            <p className="text-sm text-gray-600">Premium quality, higher cost, 2-week lead time</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Quality:</span>
                <div className="font-medium">Premium (0% defects)</div>
              </div>
              <div>
                <span className="text-gray-600">Lead Time:</span>
                <div className="font-medium">2 weeks</div>
              </div>
              <div>
                <span className="text-gray-600">Max Discount:</span>
                <div className="font-medium">15%</div>
              </div>
              <div>
                <span className="text-gray-600">Single Supplier Bonus:</span>
                <div className="font-medium">Yes</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3">Material Prices (per unit)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selvedge Denim:</span>
                  <span className="font-mono font-medium">£16.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Standard Denim:</span>
                  <span className="font-mono font-medium">£10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Egyptian Cotton:</span>
                  <span className="font-mono font-medium">£12.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Polyester Blend:</span>
                  <span className="font-mono font-medium">£7.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fine-Wale Corduroy:</span>
                  <span className="font-mono font-medium">£14.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wide-Wale Corduroy:</span>
                  <span className="font-mono font-medium">£9.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier 2 */}
        <Card className="border border-gray-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                <TooltipWrapper content="An economy supplier offering lower prices but with variable quality, resulting in up to a 5% defect rate on shipments. You must plan for potential material loss.">
                  <span className="cursor-help">Supplier-2 (Standard)</span>
                </TooltipWrapper>
              </CardTitle>
              <Badge className="bg-accent text-white">Up to 5% Defects</Badge>
            </div>
            <p className="text-sm text-gray-600">Standard quality, lower cost, 2-week lead time</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Quality:</span>
                <div className="font-medium">Standard (up to 5% defects)</div>
              </div>
              <div>
                <span className="text-gray-600">Lead Time:</span>
                <div className="font-medium">2 weeks</div>
              </div>
              <div>
                <span className="text-gray-600">Max Discount:</span>
                <div className="font-medium">10%</div>
              </div>
              <div>
                <span className="text-gray-600">Single Supplier Bonus:</span>
                <div className="font-medium">Yes</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3">Material Prices (per unit)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selvedge Denim:</span>
                  <span className="font-mono font-medium">£13.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Egyptian Cotton:</span>
                  <span className="font-mono font-medium">£10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Polyester Blend:</span>
                  <span className="font-mono font-medium">£6.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fine-Wale Corduroy:</span>
                  <span className="font-mono font-medium">£11.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wide-Wale Corduroy:</span>
                  <span className="font-mono font-medium">£7.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Types */}
      <Card className="border border-gray-100 mb-8">
        <CardHeader>
          <CardTitle>Contract Options</CardTitle>
          <p className="text-sm text-gray-600">Choose your procurement strategy for maximum discounts</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FVC Contract */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                <TooltipWrapper content="Contract Type: High-risk, high-reward. Requires a large upfront payment for all materials in Week 1. This is the best way to achieve the highest possible volume discounts.">
                  <span className="cursor-help">Full Volume Commitment (FVC)</span>
                </TooltipWrapper>
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>• Sign in Week 1 only</p>
                <p>• 25% down, 75% on delivery</p>
                <p>• Highest discount potential</p>
                <p>• Committed to full volume</p>
              </div>
              <Button className="w-full" variant="outline">
                Select FVC
              </Button>
            </div>

            {/* GMC Contract */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                <TooltipWrapper content="Contract Type: A balanced option. Commit to buying at least 70% of your total needs to secure a good discount, with payments spread across deliveries.">
                  <span className="cursor-help">Guaranteed Minimum (GMC)</span>
                </TooltipWrapper>
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>• Minimum 70% of season needs</p>
                <p>• 40% on signing, 30% each delivery</p>
                <p>• 20% penalty on undelivered</p>
                <p>• Good discount access</p>
              </div>
              <Button className="w-full" variant="outline">
                Select GMC
              </Button>
            </div>

            {/* Spot Purchases */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                <TooltipWrapper content="Contract Type: Maximum flexibility, highest cost. Order any amount of material, any week, with no commitment. You will pay the full list price with no discounts.">
                  <span className="cursor-help">Spot Purchases (SPT)</span>
                </TooltipWrapper>
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>• Order any week</p>
                <p>• Payment on delivery</p>
                <p>• Maximum flexibility</p>
                <p>• Minimal discounts</p>
              </div>
              <Button className="w-full" variant="outline" disabled>
                Available Later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volume Discount Tiers */}
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle>Volume Discount Tiers</CardTitle>
          <p className="text-sm text-gray-600">
            <TooltipWrapper content="A dynamic discount applied to your material costs based on the total volume you commit to a single supplier. Larger commitments unlock higher discounts.">
              <span className="cursor-help">Discounts based on total units committed to single supplier</span>
            </TooltipWrapper>
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Tier 1: 100,000 - 299,999 units</div>
                <div className="text-sm text-gray-600">Basic volume discount</div>
              </div>
              <div className="text-lg font-bold text-gray-900">3%</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary bg-opacity-10 rounded-lg">
              <div>
                <div className="font-medium text-secondary">Tier 2: 300,000 - 499,999 units</div>
                <div className="text-sm text-gray-600">Preferred partner discount</div>
              </div>
              <div className="text-lg font-bold text-secondary">7%</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary bg-opacity-10 rounded-lg">
              <div>
                <div className="font-medium text-primary">Tier 3: 500,000+ units</div>
                <div className="text-sm text-gray-600">Strategic partnership discount</div>
              </div>
              <div className="text-lg font-bold text-primary">12%</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div>
                <div className="font-medium text-yellow-800">Single Supplier Bonus</div>
                <div className="text-sm text-yellow-700">100% commitment to one supplier in Week 1</div>
              </div>
              <div className="text-lg font-bold text-yellow-800">15% (S1) / 10% (S2)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
