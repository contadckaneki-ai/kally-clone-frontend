import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingComparison from "@/components/PricingComparison";

const plans = [
  {
    name: "Mensal",
    originalPrice: "R$ 29,99",
    price: "R$ 14,99",
    period: "Cobrado mensalmente",
    cta: "Assinar mensal",
    popular: false,
  },
  {
    name: "Trimensal",
    originalPrice: "R$ 89,99",
    price: "R$ 44,99",
    period: "Cobrado a cada 3 meses",
    cta: "Assinar trimensal",
    popular: true,
  },
  {
    name: "Anual",
    originalPrice: "R$ 359,99",
    price: "R$ 180,00",
    period: "Cobrado anualmente",
    cta: "Assinar anual",
    popular: false,
  },
];

const Plans = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Banner />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 text-center md:py-24">
          <div className="container">
            <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <Crown className="h-5 w-5 text-gold" />
              PREMIUM
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Leve a Kally para uma nova aventura!
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
              Imagine seu servidor, apenas 10x mais leve e fácil para seus
              membros interagir, socializar e jogar!
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="pb-24">
          <div className="container">
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-6 text-center ${
                    plan.popular
                      ? "border-primary glow-border"
                      : "border-border/50 bg-card"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-0 left-0 right-0 mx-auto w-fit rounded-t-lg bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground -translate-y-full rounded-b-none">
                      Popular
                    </span>
                  )}

                  <h3 className="font-display text-lg font-semibold">
                    {plan.name}
                  </h3>

                  <span className="mt-3 inline-block rounded-md bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                    50% OFF
                  </span>

                  <p className="mt-2 text-sm text-muted-foreground line-through">
                    {plan.originalPrice}
                  </p>

                  <p className="font-display text-3xl font-bold md:text-4xl">
                    {plan.price}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.period}
                  </p>

                  <div className="mt-auto pt-8">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border-border/50 bg-card hover:bg-muted"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingComparison />
      </main>

      <Footer />
    </div>
  );
};

export default Plans;
