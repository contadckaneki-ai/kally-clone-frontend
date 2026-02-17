import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import builderPreview from "@/assets/builder-preview.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pt-24">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container text-center">
        {/* Savings badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm opacity-0 animate-fade-up">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            Na Kally você economiza{" "}
            <span className="font-semibold text-foreground">+R$1,380/ano</span>
          </span>
          <span className="text-primary">Saiba mais</span>
        </div>

        {/* Main headline */}
        <h1
          className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight opacity-0 animate-fade-up md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          De um simples bot para Discord, para uma{" "}
          <span className="gradient-text">plataforma no-code</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 animate-fade-up md:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Crie sistemas complexos, automações poderosas e integrações avançadas
          sem escrever uma linha de código. Transforme ideias em realidade com
          nosso builder intuitivo!
        </p>

        {/* CTA */}
        <div
          className="mt-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 text-base glow-border"
          >
            Acessar Painel
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Trust bar */}
        <div
          className="mt-16 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Utilizado por mais de <span className="text-foreground font-bold">4.000</span> servidores
          </p>
          <div className="flex items-center justify-center gap-6 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 rounded-lg bg-card border border-border/50"
              />
            ))}
          </div>
        </div>

        {/* Builder preview */}
        <div
          className="relative mx-auto mt-20 max-w-5xl opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="overflow-hidden rounded-xl border border-border/50 glow-border">
            <img
              src={builderPreview}
              alt="Builder Preview"
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
            Esta funcionalidade está em beta
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
