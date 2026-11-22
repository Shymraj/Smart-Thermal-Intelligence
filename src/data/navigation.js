
import {
  LayoutDashboard,
  Activity,
  ChartNoAxesCombined,
  BrainCircuit,
  BellRing,
  History,
  ShieldCheck,
  Wifi,
  Settings2
} from "lucide-react";

export const navigation = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/" },
      { name: "Live Monitor", icon: Activity, path: "/monitor" },
      { name: "Thermal Analytics", icon: ChartNoAxesCombined, path: "/analytics" },
      { name: "AI Intelligence", icon: BrainCircuit, path: "/intelligence" }
    ]
  },
  {
    label: "OPERATIONS",
    items: [
      { name: "Alert Center", icon: BellRing, path: "/alerts" },
      { name: "Incident Timeline", icon: History, path: "/incidents" },
      { name: "Sensor Diagnostics", icon: ShieldCheck, path: "/diagnostics" },
      { name: "Offline & Sync", icon: Wifi, path: "/sync" }
    ]
  },
  {
    label: "SYSTEM",
    items: [
      { name: "Configuration", icon: Settings2, path: "/settings" }
    ]
  }
];
