import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/14 days",
      subtitle: "Perfect for evaluation",
      features: ["50 verifications", "Basic analytics", "Email support", "API access"],
      variant: "outline",
      buttonText: "Start Free Trial"
    },
    {
      name: "Annual Plan",
      price: "$299",
      period: "/year",
      subtitle: "Best for growing institutions",
      popular: true,
      features: ["Unlimited verifications", "Advanced analytics", "Priority support", "API access"],
      variant: "primary", // Will handle custom gradient in component
      buttonText: "Get Started"
    },
    {
      name: "Lifetime Access",
      price: "$999",
      period: "/forever",
      subtitle: "One-time payment",
      features: ["Everything in Annual", "White-label option", "Dedicated account manager", "Custom integrations"],
      variant: "outline",
      buttonText: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20 gradient-bg">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl font-bold mb-4 text-slate-900">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 text-lg">Choose the plan that fits your institution's needs. All plans include our core verification features.</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card 
            key={plan.name} 
            delay={index * 0.1} 
            className={`relative flex flex-col p-8 ${plan.popular ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white border-none' : 'bg-white'}`}
            hoverEffect={true}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-sm font-semibold rounded-full shadow-md">
                Most Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className={`font-heading text-xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
              <p className={`text-sm ${plan.popular ? 'text-sky-100' : 'text-slate-500'}`}>{plan.subtitle}</p>
            </div>

            <div className="mb-6">
              <span className={`font-heading text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
              <span className={`${plan.popular ? 'text-sky-100' : 'text-slate-500'}`}>{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className={`flex items-center gap-3 ${plan.popular ? 'text-white' : 'text-slate-600'}`}>
                  <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-sky-200' : 'text-sky-500'}`} />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full justify-center ${
                plan.popular 
                  ? 'bg-white text-sky-600 hover:bg-sky-50 border-none' 
                  : 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
