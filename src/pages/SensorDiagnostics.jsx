
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  Cpu,
  Gauge,
  Radio,
  RefreshCw,
  ShieldCheck,
  Thermometer,
  Wifi,
  XCircle,
  Clock3,
  Zap,
} from "lucide-react";
import "../styles/diagnostics.css";

const diagnosticItems = [
  {
    name: "Sensor Communication",
    description: "Communication interface availability",
    icon: Radio,
    status: "Pending",
    detail: "Hardware connection not established",
  },
  {
    name: "Temperature Input",
    description: "Temperature data acquisition",
    icon: Thermometer,
    status: "Pending",
    detail: "Sensor input not validated",
  },
  {
    name: "Signal Integrity",
    description: "Signal consistency and quality",
    icon: Activity,
    status: "Pending",
    detail: "Signal integrity test awaiting hardware",
  },
  {
    name: "Calibration Status",
    description: "Sensor calibration validation",
    icon: Gauge,
    status: "Pending",
    detail: "Calibration reference not available",
  },
  {
    name: "Controller Status",
    description: "Controller readiness and interface",
    icon: Cpu,
    status: "Pending",
    detail: "ESP32 controller not connected",
  },
  {
    name: "Alert Pipeline",
    description: "Monitoring and alert processing readiness",
    icon: Zap,
    status: "Pending",
    detail: "Alert pipeline awaiting live inputs",
  },
];

function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <div className="diag-stat-card">
      <div className="diag-stat-top">
        <span className="diag-stat-icon">
          <Icon size={18} />
        </span>
        <span className="diag-stat-label">{label}</span>
      </div>

      <h3>{value}</h3>
      <p>{detail}</p>
    </div>
  );
}

function DiagnosticCheck({ item, result }) {
  const Icon = item.icon;

  return (
    <div className="diag-check-row">
      <div className="diag-check-icon">
        <Icon size={19} />
      </div>

      <div className="diag-check-info">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <span className="diag-check-detail">
          {result ? result.detail : item.detail}
        </span>
      </div>

      <div
        className={`diag-check-status ${
          result ? result.status.toLowerCase() : "pending"
        }`}
      >
        {result ? (
          result.status === "Pass" ? (
            <CheckCircle2 size={15} />
          ) : (
            <XCircle size={15} />
          )
        ) : (
          <CircleHelp size={15} />
        )}

        {result ? result.status : "Pending"}
      </div>
    </div>
  );
}

export default function SensorDiagnostics() {
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState(null);

  const runDiagnostics = () => {
    setRunning(true);

    // Frontend-only demonstration diagnostic sequence.
    // These results do not represent actual hardware.
    setTimeout(() => {
      const demoResults = [
        {
          status: "Fail",
          detail: "No active sensor communication detected",
        },
        {
          status: "Fail",
          detail: "Temperature input is not available",
        },
        {
          status: "Fail",
          detail: "Signal quality cannot be measured",
        },
        {
          status: "Fail",
          detail: "Calibration cannot be verified",
        },
        {
          status: "Fail",
          detail: "ESP32 controller connection unavailable",
        },
        {
          status: "Fail",
          detail: "Alert pipeline is awaiting live sensor input",
        },
      ];

      setResults(demoResults);
      setLastRun(new Date().toLocaleTimeString());
      setRunning(false);
    }, 1200);
  };

  const resetDiagnostics = () => {
    setResults(null);
    setLastRun(null);
  };

  const passedCount = results
    ? results.filter((item) => item.status === "Pass").length
    : 0;

  const failedCount = results
    ? results.filter((item) => item.status === "Fail").length
    : 0;

  const pendingCount = results
    ? 0
    : diagnosticItems.length;

  const healthScore = results
    ? Math.round((passedCount / diagnosticItems.length) * 100)
    : null;

  return (
    <div className="diagnostics-page">
      {/* HEADER */}
      <div className="diag-page-header">
        <div>
          <div className="diag-eyebrow">
            <span className="diag-eyebrow-dot" />
            SYSTEM DIAGNOSTICS
          </div>

          <h1>Sensor Diagnostics</h1>

          <p>
            Monitor sensor readiness, communication health,
            calibration status and system diagnostic checks.
          </p>
        </div>

        <div className="diag-header-actions">
          <button
            className="diag-reset-btn"
            onClick={resetDiagnostics}
            disabled={running}
          >
            <RefreshCw size={16} />
            Reset
          </button>

          <button
            className="diag-run-btn"
            onClick={runDiagnostics}
            disabled={running}
          >
            <RefreshCw
              size={16}
              className={running ? "diag-spin" : ""}
            />
            {running ? "Running checks..." : "Run Diagnostics"}
          </button>
        </div>
      </div>

      {/* DEVICE STRIP */}
      <div className="diag-device-strip">
        <div className="diag-device">
          <div className="diag-device-icon">
            <Cpu size={20} />
          </div>

          <div>
            <span>Controller</span>
            <strong>ESP32</strong>
          </div>
        </div>

        <div className="diag-device">
          <div className="diag-device-icon">
            <Thermometer size={20} />
          </div>

          <div>
            <span>Temperature Sensor</span>
            <strong>Not Finalized</strong>
          </div>
        </div>

        <div className="diag-device">
          <div className="diag-device-icon">
            <Wifi size={20} />
          </div>

          <div>
            <span>Connection</span>
            <strong className="diag-offline">Disconnected</strong>
          </div>
        </div>

        <div className="diag-device">
          <div className="diag-device-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Last Diagnostic</span>
            <strong>{lastRun || "Not performed"}</strong>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="diag-stats-grid">
        <StatCard
          icon={ShieldCheck}
          label="Health Score"
          value={healthScore === null ? "--" : `${healthScore}%`}
          detail={
            healthScore === null
              ? "Awaiting diagnostics"
              : "Based on simulated checks"
          }
        />

        <StatCard
          icon={CheckCircle2}
          label="Passed Checks"
          value={results ? passedCount : "--"}
          detail="Successful validation checks"
        />

        <StatCard
          icon={AlertTriangle}
          label="Failed Checks"
          value={results ? failedCount : "--"}
          detail="Checks requiring attention"
        />

        <StatCard
          icon={CircleHelp}
          label="Pending Checks"
          value={pendingCount}
          detail={
            results
              ? "Diagnostic run completed"
              : "Awaiting diagnostic run"
          }
        />
      </div>

      {/* DIAGNOSTIC PANEL */}
      <section className="diag-panel">
        <div className="diag-panel-header">
          <div>
            <h2>Diagnostic Checklist</h2>
            <p>
              System readiness assessment and component
              validation.
            </p>
          </div>

          <span className="diag-demo-badge">
            SIMULATION
          </span>
        </div>

        {running && (
          <div className="diag-running-banner">
            <RefreshCw size={17} className="diag-spin" />
            Running diagnostic sequence...
          </div>
        )}

        <div className="diag-check-list">
          {diagnosticItems.map((item, index) => (
            <DiagnosticCheck
              key={item.name}
              item={item}
              result={results ? results[index] : null}
            />
          ))}
        </div>
      </section>

      {/* CONNECTION HEALTH */}
      <section className="diag-panel">
        <div className="diag-panel-header">
          <div>
            <h2>Communication Health</h2>
            <p>Controller and sensor interface overview.</p>
          </div>
        </div>

        <div className="diag-communication-grid">
          <div className="diag-communication-item">
            <Radio size={22} />
            <div>
              <span>Communication Protocol</span>
              <strong>To Be Configured</strong>
            </div>
            <span className="diag-neutral-status">Pending</span>
          </div>

          <div className="diag-communication-item">
            <Wifi size={22} />
            <div>
              <span>Network Availability</span>
              <strong>Not Connected</strong>
            </div>
            <span className="diag-failed-status">Offline</span>
          </div>

          <div className="diag-communication-item">
            <Activity size={22} />
            <div>
              <span>Signal Quality</span>
              <strong>Unavailable</strong>
            </div>
            <span className="diag-neutral-status">Pending</span>
          </div>

          <div className="diag-communication-item">
            <Cpu size={22} />
            <div>
              <span>Controller Runtime</span>
              <strong>Not Detected</strong>
            </div>
            <span className="diag-failed-status">Offline</span>
          </div>
        </div>
      </section>

      {/* CALIBRATION */}
      <section className="diag-panel">
        <div className="diag-panel-header">
          <div>
            <h2>Calibration & Validation</h2>
            <p>
              Calibration readiness and temperature measurement
              validation overview.
            </p>
          </div>
        </div>

        <div className="diag-calibration-grid">
          <div className="diag-calibration-item">
            <span className="diag-calibration-label">
              Calibration Status
            </span>
            <h3>Unverified</h3>
            <p>
              Calibration reference and procedure are not yet
              established.
            </p>
          </div>

          <div className="diag-calibration-item">
            <span className="diag-calibration-label">
              Reference Temperature
            </span>
            <h3>Unavailable</h3>
            <p>
              Reference equipment is required for validation.
            </p>
          </div>

          <div className="diag-calibration-item">
            <span className="diag-calibration-label">
              Validation Status
            </span>
            <h3>Awaiting Hardware</h3>
            <p>
              Accuracy verification will be performed after
              sensor integration.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER NOTICE */}
      <div className="diag-prototype-notice">
        <AlertTriangle size={18} />

        <div>
          <strong>Prototype diagnostic environment</strong>

          <p>
            Diagnostic results are simulated frontend
            demonstrations. Actual sensor health, signal
            integrity, calibration and controller status
            require physical hardware integration.
          </p>
        </div>
      </div>
    </div>
  );
}
