import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <span className="font-display text-2xl font-bold tracking-tight">
          <span className="gradient-text">K</span>ally
        </span>

        <div className="hidden items-center gap-8 md:flex">
          {["Planos", "Comandos", "Servidor de suporte"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:block"
        >
          <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50">
            Sign in
          </Button>
        </motion.div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              <a href="#planos" className="text-sm text-muted-foreground">Planos</a>
              <a href="#comandos" className="text-sm text-muted-foreground">Comandos</a>
              <a href="#suporte" className="text-sm text-muted-foreground">Servidor de suporte</a>
              <Button variant="outline" size="sm" className="w-fit border-primary/30">Sign in</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
