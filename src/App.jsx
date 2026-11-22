
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EquipmentVisualization from "./components/EquipmentVisualization";
import ThermalAnalytics from "./pages/ThermalAnalytics";
import AIIntelligence from "./pages/AIIntelligence";
import AlertCenter from "./pages/AlertCenter";
import IncidentTimeline from "./pages/IncidentTimeline";
import SensorDiagnostics from "./pages/SensorDiagnostics";
import OfflineSync from "./pages/OfflineSync";
import Configuration from "./pages/Configuration";

import {
  Activity,
  ArrowUpRight,
  Clock3,
  Cpu,
  ShieldCheck,
  Thermometer,
  Radio,
  Wifi,
  Gauge,
  RefreshCw,
  Zap,
  TrendingUp,
  AlertTriangle,
  CircleDot,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/monitor.css";

// --------------------------------------------------
// DASHBOARD
// --------------------------------------------------

function DashboardFoundation() {
  return (
    <main className="main-content">
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-line" />
            INDUSTRIAL MONITORING
          </div>

          <h1>Thermal Overview</h1>

          <p>
            Monitor converter conditions, thermal behaviour
            and system health.
          </p>
        </div>

        <div className="demo-badge">
          <span className="demo-dot" />
          DEMO ENVIRONMENT
        </div>
      </div>

      <div className="machine-banner">
        <div className="machine-banner-content">
          <div className="machine-label">
            <Cpu size={15} />
            EQUIPMENT PROFILE
          </div>

          <h2>Converter Shell</h2>

          <p>
            Thermal monitoring unit
            <span className="banner-divider">/</span>
            CONV-01
          </p>
        </div>

        <div className="machine-banner-right">
          <div className="machine-icon">
            <Activity size={26} />
          </div>

          <span className="machine-status">
            <span className="status-dot" />
            Monitoring setup
          </span>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h3>System snapshot</h3>
          <p>Monitoring interface preview</p>
        </div>

        <div className="updated-label">
          <Clock3 size={14} />
          Demo data
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card metric-primary">
          <div className="metric-card-top">
            <span className="metric-label">
              Shell temperature
            </span>

            <div className="metric-icon teal-icon">
              <Activity size={18} />
            </div>
          </div>

          <div className="metric-value">
            --<span className="metric-unit">°C</span>
          </div>

          <div className="metric-footer">
            <span className="metric-neutral">
              <Clock3 size={13} />
              Waiting for sensor
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">
              Thermal condition
            </span>

            <div className="metric-icon amber-icon">
              <ShieldCheck size={18} />
            </div>
          </div>

          <div className="metric-value metric-text-value">
            Pending
          </div>

          <div className="metric-footer">
            <span className="metric-neutral">
              No live assessment yet
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">
              Data integrity
            </span>

            <div className="metric-icon blue-icon">
              <ShieldCheck size={18} />
            </div>
          </div>

          <div className="metric-value metric-text-value">
            Unverified
          </div>

          <div className="metric-footer">
            <span className="metric-neutral">
              Sensor validation pending
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">
              Connectivity
            </span>

            <div className="metric-icon purple-icon">
              <Cpu size={18} />
            </div>
          </div>

          <div className="metric-value metric-text-value">
            Offline
          </div>

          <div className="metric-footer">
            <span className="metric-neutral">
              Device not connected
            </span>
          </div>
        </div>
      </div>

      <EquipmentVisualization />

      <div className="content-grid">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title-row">
                <h3>Thermal behaviour</h3>
                <span className="panel-tag">PREVIEW</span>
              </div>

              <p>
                Temperature history will appear here
              </p>
            </div>

            <button className="icon-action">
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="chart-placeholder">
            <div className="chart-placeholder-icon">
              <Activity size={26} />
            </div>

            <strong>
              Waiting for temperature data
            </strong>

            <p>
              Connect the monitoring device to visualise
              thermal trends.
            </p>
          </div>
        </section>

        <section className="panel health-panel">
          <div className="panel-header">
            <div>
              <h3>System health</h3>
              <p>Device readiness</p>
            </div>
          </div>

          <div className="health-list">
            <div className="health-item">
              <div className="health-item-icon">
                <Cpu size={17} />
              </div>

              <div className="health-item-info">
                <strong>Edge controller</strong>
                <span>ESP32</span>
              </div>

              <span className="health-state state-pending">
                Pending
              </span>
            </div>

            <div className="health-item">
              <div className="health-item-icon">
                <Activity size={17} />
              </div>

              <div className="health-item-info">
                <strong>Temperature sensor</strong>
                <span>Infrared sensing</span>
              </div>

              <span className="health-state state-pending">
                Pending
              </span>
            </div>

            <div className="health-item">
              <div className="health-item-icon">
                <ShieldCheck size={17} />
              </div>

              <div className="health-item-info">
                <strong>Sensor validation</strong>
                <span>Reading integrity</span>
              </div>

              <span className="health-state state-pending">
                Pending
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="content-grid bottom-grid">
        <section className="panel event-panel">
          <div className="panel-header">
            <div>
              <h3>Recent activity</h3>
              <p>Event history and system activity</p>
            </div>
          </div>

          <div className="empty-activity">
            <Clock3 size={20} />

            <span>
              Events will appear after system activity begins.
            </span>
          </div>
        </section>

        <section className="panel innovation-panel">
          <div className="innovation-top">
            <div className="innovation-icon">
              <ShieldCheck size={19} />
            </div>

            <span>INTELLIGENCE MODULE</span>
          </div>

          <h3>Sensor Trust Intelligence</h3>

          <p>
            Monitor reading quality, sensor validity and data
            freshness as part of the monitoring workflow.
          </p>

          <div className="innovation-status">
            <span className="status-dot status-muted" />
            Awaiting device integration
          </div>
        </section>
      </div>

      <footer className="dashboard-footer">
        <span>SmartShell Thermal Intelligence</span>
        <span>PS-007 · THEME-02</span>
      </footer>
    </main>
  );
}

// --------------------------------------------------
// LIVE MONITOR — PHASE 1.2
// --------------------------------------------------

const simulatedReadings = [
  { time: "09:00", temperature: 42.4 },
  { time: "09:05", temperature: 43.1 },
  { time: "09:10", temperature: 42.8 },
  { time: "09:15", temperature: 44.2 },
  { time: "09:20", temperature: 45.1 },
  { time: "09:25", temperature: 44.7 },
  { time: "09:30", temperature: 46.3 },
  { time: "09:35", temperature: 45.8 },
  { time: "09:40", temperature: 47.2 },
  { time: "09:45", temperature: 46.5 },
  { time: "09:50", temperature: 48.1 },
  { time: "09:55", temperature: 47.4 },
];

function LiveMonitor() {
  const [timeRange, setTimeRange] = useState("1H");

  const ranges = ["15M", "30M", "1H", "6H", "24H"];

  return (
    <main className="main-content monitor-page">
      <div className="monitor-heading">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-line" />
            REAL-TIME MONITORING
          </div>

          <h1>Live Monitor</h1>

          <p>
            Continuous thermal observation and equipment
            monitoring interface.
          </p>
        </div>

        <div className="monitor-demo-badge">
          <CircleDot size={13} />
          SIMULATION MODE
        </div>
      </div>

      <div className="monitor-device-strip">
        <div className="monitor-device-main">
          <div className="monitor-device-icon">
            <Cpu size={20} />
          </div>

          <div>
            <span className="monitor-device-label">
              EQUIPMENT
            </span>

            <h3>Converter Shell · CONV-01</h3>
          </div>
        </div>

        <div className="monitor-device-meta">
          <span className="monitor-meta-item">
            <Radio size={15} />
            ESP32
          </span>

          <span className="monitor-meta-item">
            <Thermometer size={15} />
            Thermal sensor
          </span>

          <span className="monitor-meta-item monitor-disconnected">
            <Wifi size={15} />
            Not connected
          </span>
        </div>
      </div>

      <section className="live-reading-panel">
        <div className="live-reading-top">
          <div className="live-reading-heading">
            <div className="live-reading-icon">
              <Thermometer size={19} />
            </div>

            <div>
              <span className="live-reading-label">
                SHELL TEMPERATURE
              </span>

              <p>Primary measurement</p>
            </div>
          </div>

          <span className="reading-status-pill">
            <span />
            DEMO READING
          </span>
        </div>

        <div className="live-reading-body">
          <div className="temperature-display">
            <span className="temperature-number">
              47.4
            </span>

            <span className="temperature-unit">
              °C
            </span>
          </div>

          <div className="reading-description">
            <div className="reading-description-icon">
              <TrendingUp size={18} />
            </div>

            <div>
              <strong>Illustrative measurement</strong>

              <p>
                Simulated value for interface demonstration.
                Not connected to hardware.
              </p>
            </div>
          </div>
        </div>

        <div className="live-reading-bottom">
          <div className="reading-detail">
            <span>Device</span>
            <strong>CONV-01</strong>
          </div>

          <div className="reading-detail">
            <span>Measurement</span>
            <strong>Temperature</strong>
          </div>

          <div className="reading-detail">
            <span>Data source</span>
            <strong>Simulated</strong>
          </div>

          <div className="reading-detail">
            <span>Connection</span>
            <strong className="reading-offline">
              Offline
            </strong>
          </div>
        </div>
      </section>

      <div className="monitor-status-grid">
        <div className="monitor-status-card">
          <div className="monitor-status-top">
            <span>Thermal classification</span>

            <div className="monitor-status-icon monitor-amber">
              <Gauge size={17} />
            </div>
          </div>

          <h3>Unvalidated</h3>
          <p>Operating limits not configured</p>
        </div>

        <div className="monitor-status-card">
          <div className="monitor-status-top">
            <span>Sensor connection</span>

            <div className="monitor-status-icon monitor-blue">
              <Radio size={17} />
            </div>
          </div>

          <h3>Disconnected</h3>
          <p>Awaiting device integration</p>
        </div>

        <div className="monitor-status-card">
          <div className="monitor-status-top">
            <span>Data quality</span>

            <div className="monitor-status-icon monitor-purple">
              <ShieldCheck size={17} />
            </div>
          </div>

          <h3>Unverified</h3>
          <p>Simulated data only</p>
        </div>

        <div className="monitor-status-card">
          <div className="monitor-status-top">
            <span>Sampling status</span>

            <div className="monitor-status-icon monitor-teal">
              <RefreshCw size={17} />
            </div>
          </div>

          <h3>Inactive</h3>
          <p>No sensor sampling</p>
        </div>
      </div>

      <section className="panel monitor-chart-panel">
        <div className="monitor-chart-header">
          <div>
            <div className="panel-title-row">
              <h3>Thermal trend</h3>
              <span className="panel-tag">SIMULATED</span>
            </div>

            <p>
              Illustrative temperature history for CONV-01
            </p>
          </div>

          <div className="monitor-chart-tools">
            <div className="chart-range-selector">
              {ranges.map((range) => (
                <button
                  key={range}
                  className={
                    timeRange === range
                      ? "range-active"
                      : ""
                  }
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="monitor-chart-legend">
          <span className="legend-temp">
            <span />
            Temperature (°C)
          </span>

          <span className="chart-legend-note">
            Sample visualization
          </span>
        </div>

        <div className="monitor-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={simulatedReadings}
              margin={{
                top: 12,
                right: 12,
                left: -12,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="temperatureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#14B8A6"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#14B8A6"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#26343F"
                strokeDasharray="4 5"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                tick={{ fill: "#8494A5", fontSize: 11 }}
                axisLine={{ stroke: "#26343F" }}
                tickLine={false}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#8494A5", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#101A23",
                  border: "1px solid #26343F",
                  borderRadius: "10px",
                  color: "#E5EDF5",
                }}
                labelStyle={{ color: "#8FA4B7" }}
                formatter={(value) => [
                  `${value} °C`,
                  "Temperature",
                ]}
              />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#14B8A6"
                strokeWidth={2.5}
                fill="url(#temperatureGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#14B8A6",
                  stroke: "#0D1720",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-disclaimer">
          <AlertTriangle size={14} />

          <span>
            Graph contains illustrative data only. It does
            not represent real equipment measurements.
          </span>
        </div>
      </section>

      <section className="panel threshold-panel">
        <div className="panel-header">
          <div>
            <h3>Thermal threshold framework</h3>
            <p>Conceptual operating zones</p>
          </div>

          <div className="threshold-icon">
            <Zap size={17} />
          </div>
        </div>

        <div className="threshold-zones">
          <div className="threshold-zone">
            <span className="threshold-color threshold-normal" />

            <div className="threshold-zone-info">
              <strong>Normal</strong>

              <span>
                Within the validated operating range
              </span>
            </div>

            <span className="threshold-zone-tag">
              SAFE RANGE
            </span>
          </div>

          <div className="threshold-zone">
            <span className="threshold-color threshold-warning" />

            <div className="threshold-zone-info">
              <strong>Warning</strong>

              <span>
                Approaching configured temperature limit
              </span>
            </div>

            <span className="threshold-zone-tag">
              ATTENTION
            </span>
          </div>

          <div className="threshold-zone">
            <span className="threshold-color threshold-critical" />

            <div className="threshold-zone-info">
              <strong>Critical</strong>

              <span>
                Critical threshold reached or exceeded
              </span>
            </div>

            <span className="threshold-zone-tag">
              ACTION
            </span>
          </div>
        </div>

        <div className="threshold-note">
          Threshold values will be established based on
          equipment specifications and validated operating
          limits. No thresholds are currently configured.
        </div>
      </section>

      <section className="panel monitor-history-panel">
        <div className="panel-header">
          <div>
            <h3>Recent sample records</h3>
            <p>Illustrative historical values</p>
          </div>

          <span className="panel-tag">
            DEMO RECORDS
          </span>
        </div>

        <div className="monitor-table-wrapper">
          <table className="monitor-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Equipment</th>
                <th>Temperature</th>
                <th>Source</th>
                <th>Validation</th>
              </tr>
            </thead>

            <tbody>
              {simulatedReadings
                .slice(-5)
                .reverse()
                .map((record) => (
                  <tr key={record.time}>
                    <td>{record.time}</td>

                    <td>
                      <span className="table-device">
                        <Cpu size={14} />
                        CONV-01
                      </span>
                    </td>

                    <td>
                      <strong className="table-temp">
                        {record.temperature.toFixed(1)} °C
                      </strong>
                    </td>

                    <td>
                      <span className="table-source">
                        Simulation
                      </span>
                    </td>

                    <td>
                      <span className="table-validation">
                        <span />
                        Unverified
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>SmartShell Thermal Intelligence</span>
        <span>PS-007 · THEME-02</span>
      </footer>
    </main>
  );
}

// --------------------------------------------------
// APP ROUTING
// --------------------------------------------------

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div className="app-main">
          <Header setMobileOpen={setMobileOpen} />

          <Routes>
            {/* Dashboard */}
            <Route
              path="/"
              element={<DashboardFoundation />}
            />

            {/* Live Monitor */}
            <Route
              path="/monitor"
              element={<LiveMonitor />}
            />

            {/* Thermal Analytics */}
            <Route
              path="/analytics"
              element={<ThermalAnalytics />}
            />

            {/* AI Intelligence */}
            <Route
              path="/intelligence"
              element={<AIIntelligence />}
            />

            {/* Alert Center */}
            <Route
              path="/alerts"
              element={<AlertCenter />}
            />

            {/* Incident Timeline — Phase 1.6 */}
            <Route
              path="/incidents"
              element={<IncidentTimeline />}
            />

            {/* Sensor Diagnostics — Phase 1.7 */}
            <Route
              path="/diagnostics"
              element={<SensorDiagnostics />}
            />

            {/* Offline & Sync — Phase 1.8 */}
            <Route
              path="/sync"
              element={<OfflineSync />}
            />

            {/* Configuration — Phase 1.9 */}
            <Route
              path="/settings"
              element={<Configuration />}
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<DashboardFoundation />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
