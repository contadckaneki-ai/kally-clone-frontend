import { useState, useCallback, useMemo, useRef, useEffect } from "react";
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
  Plus,
  Search,
  X,
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

const mockRoles = [
  { id: "1", name: "zamigaet svet" },
  { id: "2", name: "Jockie Music" },
  { id: "3", name: "Kally Premium" },
  { id: "4", name: "Moderador" },
  { id: "5", name: "Admin" },
  { id: "6", name: "VIP" },
];

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

  // Permissions state
  const [permissionsTab, setPermissionsTab] = useState<"roles" | "members">("roles");
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
  const [rolesSearch, setRolesSearch] = useState("");
  const [addedRoles, setAddedRoles] = useState<{ id: string; name: string }[]>([
    { id: "5", name: "Admin" },
    { id: "4", name: "Moderador" },
  ]);
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [addedMembers, setAddedMembers] = useState<{ id: string; name: string }[]>([
    { id: "m1", name: "usuario#1234" },
    { id: "m2", name: "jogador#5678" },
  ]);
  const rolesDropdownRef = useRef<HTMLDivElement>(null);

  const filteredRoles = mockRoles.filter(
    (r) =>
      r.name.toLowerCase().includes(rolesSearch.toLowerCase()) &&
      !addedRoles.some((ar) => ar.id === r.id)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rolesDropdownRef.current && !rolesDropdownRef.current.contains(e.target as Node)) {
        setShowRolesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  const renderSettingsContent = () => (
    <>
      <h1 className="font-display text-3xl font-bold">Configurações</h1>
      <p className="mt-1 text-muted-foreground">Configure as principais informações de funcionamento</p>

      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold">Configurações de comando</h2>
        <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
          <div className="border-l-2 border-primary pl-4">
            <p className="text-sm font-medium">Configure o prefixo para comandos em mensagem</p>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Prefixo</label>
              <Input value={currentSettings.prefix} onChange={(e) => updateSetting("prefix", e.target.value)} className="bg-background border-border" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome do CL</label>
              <Input value={currentSettings.botName} onChange={(e) => updateSetting("botName", e.target.value)} className="bg-background border-border" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-0 divide-y divide-border/50 rounded-lg border border-border/50 bg-card">
        <div className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-sm font-semibold">Deletar mensagem</h3>
            <p className="mt-1 text-sm text-muted-foreground">Ao executar um comando, irei deletar a mensagem do usuário</p>
          </div>
          <Switch checked={currentSettings.deleteMessage} onCheckedChange={(v) => updateSetting("deleteMessage", v)} />
        </div>
        <div className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-sm font-semibold">Permitir comandos em Slash</h3>
            <p className="mt-1 text-sm text-muted-foreground">Permitir que usuários utilizem comandos com "/"</p>
          </div>
          <Switch checked={currentSettings.slashCommands} onCheckedChange={(v) => updateSetting("slashCommands", v)} />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
        <div className="border-l-2 border-primary pl-4">
          <p className="text-sm font-medium">Os comandos da Kally funcionarão apenas em canais selecionados por você</p>
        </div>
        <div className="mt-6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Canais: 0</label>
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
    </>
  );

  const renderPermissionsContent = () => (
    <>
      <h1 className="font-display text-3xl font-bold">Permissões</h1>
      <p className="mt-1 text-muted-foreground">Configure as permissões de acesso ao sistema</p>

      {/* Tabs */}
      <div className="mt-8 flex gap-6 border-b border-border/50">
        <button
          onClick={() => setPermissionsTab("roles")}
          className={`pb-3 text-sm font-semibold transition-colors ${
            permissionsTab === "roles"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Cargos
        </button>
        <button
          onClick={() => setPermissionsTab("members")}
          className={`pb-3 text-sm font-semibold transition-colors ${
            permissionsTab === "members"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Membros
        </button>
      </div>

      <AnimatePresence mode="wait">
        {permissionsTab === "roles" ? (
          <motion.div
            key="roles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <div className="rounded-lg border border-border/50 bg-card p-6">
              {/* Header with + button */}
              <div className="relative" ref={rolesDropdownRef}>
                <div className="flex items-center justify-between border-l-2 border-primary pl-4">
                  <p className="text-sm font-medium">Lista de cargos</p>
                  <button
                    onClick={() => {
                      setShowRolesDropdown(!showRolesDropdown);
                      setRolesSearch("");
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border/50 bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {showRolesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-card shadow-xl"
                    >
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Pesquisar"
                            value={rolesSearch}
                            onChange={(e) => setRolesSearch(e.target.value)}
                            className="h-8 bg-background border-border pl-8 text-sm"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto px-1 pb-1">
                        {filteredRoles.length === 0 ? (
                          <p className="px-3 py-2 text-xs text-muted-foreground">Nenhum cargo encontrado</p>
                        ) : (
                          filteredRoles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => {
                                setAddedRoles((prev) => [...prev, role]);
                                setShowRolesDropdown(false);
                              }}
                              className="flex w-full items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                            >
                              {role.name}
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Added roles list */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {addedRoles.map((role) => (
                  <div
                    key={role.id}
                    className="flex h-8 items-center rounded bg-muted/60"
                  >
                    <div className="h-full w-full rounded bg-muted animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="members"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <div className="rounded-lg border border-border/50 bg-card p-6">
              {/* Header with + button */}
              <div className="flex items-center justify-between border-l-2 border-primary pl-4">
                <p className="text-sm font-medium">Lista de membros</p>
                <button
                  onClick={() => {
                    setShowMemberSearch(!showMemberSearch);
                    setMemberSearch("");
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border/50 bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Added members list (skeleton-like) */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {addedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex h-8 items-center rounded bg-muted/60"
                  >
                    <div className="h-full w-full rounded bg-muted animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Member search panel */}
              <AnimatePresence>
                {showMemberSearch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-lg border border-border/50 bg-background p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div />
                        <button
                          onClick={() => setShowMemberSearch(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Nome de usuário ou ID"
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          className="bg-card border-border"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          className="shrink-0 border-border"
                          onClick={() => {
                            if (memberSearch.trim()) {
                              setAddedMembers((prev) => [
                                ...prev,
                                { id: `m${Date.now()}`, name: memberSearch.trim() },
                              ]);
                              setMemberSearch("");
                              setShowMemberSearch(false);
                            }
                          }}
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

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
            <div className="flex items-center gap-3 border-b border-border/50 px-4 py-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />
              <span className="truncate text-sm font-medium">{serverName}</span>
            </div>
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
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl px-6 py-10 md:px-12"
          >
            {activeSection === "permissions" ? renderPermissionsContent() : renderSettingsContent()}
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
