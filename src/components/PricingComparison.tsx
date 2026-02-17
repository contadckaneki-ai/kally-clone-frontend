import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Desenvolvido com base na opinião da comunidade",
  "Opções de personalização detalhadas",
  "Gerenciamento de servidor completo",
  "Painel de controle intuitivo",
  "Recursos gratuitos",
  "99.99% uptime",
  "Proteção avançada e muito mais!",
];

const competitors = [
  { name: "Bot A", price: "R$ 55,00" },
  { name: "Bot B", price: "R$ 30,00" },
  { name: "Bot C", price: "R$ 30,00" },
];

const PricingComparison = () => {
  return (
    <section className="py-24" id="planos">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Economize tempo e{" "}
            <span className="gradient-text">dinheiro</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Equipe seu servidor com um arsenal completo de ferramentas, todas
            acessíveis em um único painel.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Kally card */}
          <div className="rounded-xl border border-primary/30 bg-card p-8 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-bold">
                <span className="gradient-text">K</span>ally Bot
              </span>
            </div>

            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <span className="font-display text-3xl font-bold">
                R$ 0 - R$ 15
              </span>
              <span className="text-muted-foreground">/mês</span>
              <p className="mt-2 text-sm text-muted-foreground">
                A melhor ferramenta em um único lugar
              </p>
            </div>

            <Button className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Ver Preços
            </Button>
          </div>

          {/* Competitors card */}
          <div className="rounded-xl border border-border/50 bg-card p-8">
            <p className="mb-6 text-sm font-medium text-muted-foreground">
              Alternativa: múltiplas assinaturas
            </p>

            <div className="space-y-4">
              {competitors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-destructive">
                    {c.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <span className="font-display text-3xl font-bold text-destructive">
                +R$ 115
              </span>
              <span className="text-muted-foreground">/mês</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Você teria que gerenciar várias assinaturas separadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
