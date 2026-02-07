import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      features: ["Up to 1,000 verifications", "Basic API Access", "Email Support", "Community Access"],
      variant: "outline"
    },
    {
      name: "Pro",
      price: "$99",
      popular: true,
      features: ["Unlimited verifications", "Priority API Access", "24/7 Phone Support", "Audit Logs", "Custom Branding"],
      variant: "glow"
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Dedicated Infrastructure", "SLA Guarantee", "Account Manager", "On-premise Deployment"],
      variant: "outline"
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 text-lg">Choose the plan that fits your security needs.</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card 
            key={plan.name} 
            delay={index * 0.1} 
            className={`relative flex flex-col ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider shadow-lg">
                  Popular
                </span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-slate-900">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-slate-500">/month</span>}
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant={plan.variant === "glow" ? "primary" : "outline"} className="w-full justify-center">
              Choose {plan.name}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
