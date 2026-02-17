import { useState, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  LayoutDashboard,
  Shield,
  Sliders,
  CreditCard,
  Link2,
  ShieldAlert,
  Blocks,
  UserCog,
  SmilePlus,
  ScrollText,
  HandMetal,
  Gavel,
  Hash,
  MessageSquare,
  ListChecks,
  Pin,
  ChevronUp,
  ChevronDown,
  Save,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Banner from "@/components/Banner";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  id: string;
  badge?: string;
  badgeColor?: string;
}

interface SidebarGroup {
  title?: string;
  collapsible?: boolean;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
      { icon: Settings, label: "Configurações", id: "settings" },
      { icon: Sliders, label: "Permissões", id: "permissions" },
      { icon: CreditCard, label: "Financeiro", id: "financial" },
    ],
  },
  {
    title: "PROTEÇÃO",
    collapsible: true,
    items: [
      { icon: Link2, label: "Proteção de Uri", id: "uri-protection" },
      { icon: ShieldAlert, label: "Proteção de Servidor", id: "server-protection", badge: "Update", badgeColor: "bg-primary" },
    ],
  },
  {
    title: "KALLY ENGINE",
    collapsible: true,
    items: [
      { icon: Blocks, label: "Custom Modules", id: "custom-modules", badge: "New", badgeColor: "bg-green-600" },
    ],
  },
  {
    title: "GERENCIAMENTO DE SERVIDOR",
    collapsible: true,
    items: [
      { icon: UserCog, label: "Autorole", id: "autorole", badge: "Update", badgeColor: "bg-primary" },
      { icon: SmilePlus, label: "Reações automática", id: "auto-reactions", badge: "Update", badgeColor: "bg-primary" },
      { icon: ScrollText, label: "Logs de Eventos", id: "event-logs", badge: "Update", badgeColor: "bg-primary" },
      { icon: HandMetal, label: "Bem vindo & Adeus", id: "welcome" },
      { icon: Gavel, label: "Moderação", id: "moderation", badge: "Update", badgeColor: "bg-primary" },
      { icon: Hash, label: "Contadores", id: "counters", badge: "Update", badgeColor: "bg-primary" },
      { icon: MessageSquare, label: "Mensagens", id: "messages" },
      { icon: ListChecks, label: "Whitelist", id: "whitelist", badge: "Update", badgeColor: "bg-primary" },
      { icon: Pin, label: "Pin Checker", id: "pin-checker", badge: "Update", badgeColor: "bg-primary" },
    ],
  },
];

const servers: Record<string, string> = {
  "1": "catch me if u can",
  "2": "VALORANT - BR",
  "3": "NECRUM",
  "4": "Xeno",
  "5": "UwU Hub",
};

interface SettingsState {
  prefix: string;
  botName: string;
  deleteMessage: boolean;
  slashCommands: boolean;
}

const defaultSettings: SettingsState = {
  prefix: "k.",
  botName: "kally",
  deleteMessage: false,
  slashCommands: true,
};

const ServerSettings = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("settings");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const [savedSettings, setSavedSettings] = useState<SettingsState>({ ...defaultSettings });
  const [currentSettings, setCurrentSettings] = useState<SettingsState>({ ...defaultSettings });

  const hasChanges = useMemo(() => {
    return (
      currentSettings.prefix !== savedSettings.prefix ||
      currentSettings.botName !== savedSettings.botName ||
      currentSettings.deleteMessage !== savedSettings.deleteMessage ||
      currentSettings.slashCommands !== savedSettings.slashCommands
    );
  }, [currentSettings, savedSettings]);

  const handleSave = useCallback(() => {
    setSavedSettings({ ...currentSettings });
  }, [currentSettings]);

  const handleDiscard = useCallback(() => {
    setCurrentSettings({ ...savedSettings });
  }, [savedSettings]);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setCurrentSettings((prev) => ({ ...prev, [key]: value }));
  };

  const serverName = servers[id || "1"] || "Servidor";

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Banner />

      {/* Top navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-6">
          <Link to="/dashboard" className="font-display text-xl font-bold tracking-tight">
            <span className="gradient-text">K</span>ally
          </Link>
          <div className="h-8 w-8 rounded-full bg-muted" />
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="hidden w-56 shrink-0 border-r border-border/50 bg-card/50 md:block"
        >
          <div className="flex flex-col h-full">
            {/* Server name */}
            <div className="flex items-center gap-3 border-b border-border/50 px-4 py-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />
              <span className="truncate text-sm font-medium">{serverName}</span>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-2">
              {sidebarGroups.map((group, gi) => (
                <div key={gi} className="mb-1">
                  {group.title && (
                    <button
                      onClick={() => group.collapsible && toggleGroup(group.title!)}
                      className="flex w-full items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {group.title}
                      {group.collapsible && (
                        collapsedGroups[group.title] ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />
                      )}
                    </button>
                  )}
                  {!collapsedGroups[group.title || ""] && group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        activeSection === item.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={`${item.badgeColor} rounded px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl px-6 py-10 md:px-12"
          >
            <h1 className="font-display text-3xl font-bold">Configurações</h1>
            <p className="mt-1 text-muted-foreground">Configure as principais informações de funcionamento</p>

            {/* Command settings */}
            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold">Configurações de comando</h2>

              <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-sm font-medium">Configure o prefixo para comandos em mensagem</p>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Prefixo
                    </label>
                    <Input
                      value={currentSettings.prefix}
                      onChange={(e) => updateSetting("prefix", e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Nome do CL
                    </label>
                    <Input
                      value={currentSettings.botName}
                      onChange={(e) => updateSetting("botName", e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle settings */}
            <div className="mt-6 space-y-0 divide-y divide-border/50 rounded-lg border border-border/50 bg-card">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-sm font-semibold">Deletar mensagem</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ao executar um comando, irei deletar a mensagem do usuário
                  </p>
                </div>
                <Switch checked={currentSettings.deleteMessage} onCheckedChange={(v) => updateSetting("deleteMessage", v)} />
              </div>

              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-sm font-semibold">Permitir comandos em Slash</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Permitir que usuários utilizem comandos com "/"
                  </p>
                </div>
                <Switch checked={currentSettings.slashCommands} onCheckedChange={(v) => updateSetting("slashCommands", v)} />
              </div>
            </div>

            {/* Channel selection */}
            <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-sm font-medium">
                  Os comandos da Kally funcionarão apenas em canais selecionados por você
                </p>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Canais: 0
                </label>
                <Select>
                  <SelectTrigger className="w-full max-w-xs bg-background border-border">
                    <SelectValue placeholder="Selecione canais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">general</SelectItem>
                    <SelectItem value="commands">commands</SelectItem>
                    <SelectItem value="bot">bot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Unsaved changes bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/95 px-6 py-3 shadow-lg shadow-background/50 backdrop-blur-xl">
              <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Você tem alterações não salvas
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDiscard}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Limpar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Salvar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServerSettings;
