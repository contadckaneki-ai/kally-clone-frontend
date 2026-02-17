import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <span className="font-display text-2xl font-bold tracking-tight">
          <span className="gradient-text">K</span>ally
        </span>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#planos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Planos
          </a>
          <a href="#comandos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Comandos
          </a>
          <a href="#suporte" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Servidor de suporte
          </a>
        </div>

        <div className="hidden md:block">
          <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50">
            Sign in
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#planos" className="text-sm text-muted-foreground">Planos</a>
            <a href="#comandos" className="text-sm text-muted-foreground">Comandos</a>
            <a href="#suporte" className="text-sm text-muted-foreground">Servidor de suporte</a>
            <Button variant="outline" size="sm" className="w-fit border-primary/30">Sign in</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
