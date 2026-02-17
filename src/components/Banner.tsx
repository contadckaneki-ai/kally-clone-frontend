import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="gradient-banner py-2 text-center text-sm font-medium text-primary-foreground">
      <div className="container flex items-center justify-center gap-2">
        <span className="rounded-md bg-background/20 px-2 py-0.5 text-xs font-bold">
          50% OFF!
        </span>
        <span>Em todos os planos durante o mês de fevereiro!</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
};

export default Banner;
