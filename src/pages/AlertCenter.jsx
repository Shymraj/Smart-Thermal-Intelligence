
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BellRing,
  Check,
  CheckCheck,
  Clock3,
  Filter,
  ShieldAlert,
  Thermometer,
  Activity,
  CircleAlert,
  Info,
  Search,
  RotateCcw,
} from "lucide-react";

import "../styles/alerts.css";

const initialAlerts = [
  {
    id: 1,
    severity: "critical",
    title: "Critical temperature threshold exceeded",
    message:
      "Illustrative temperature value crossed the configured demo critical threshold.",
    equipment: "CONV-01",
    timestamp: "09:55:00",
    category: "Temperature",
    acknowledged: false,
  },
  {
    id: 2,
    severity: "warning",
    title: "Rapid temperature rise observed",
    message:
      "Temperature trend indicates an increase across the sample observation window.",
    equipment: "CONV-01",
    timestamp: "09:50:00",
    category: "Trend",
    acknowledged: false,
  },
  {
    id: 3,
    severity: "warning",
    title: "Sensor connection unavailable",
    message:
      "The monitoring interface has no active hardware connection.",
    equipment: "CONV-01",
    timestamp: "09:45:00",
    category: "Connectivity",
    acknowledged: false,
  },
  {
    id: 4,
    severity: "info",
    title: "Demo monitoring session initialized",
    message:
      "Illustrative monitoring session was initialized for the interface preview.",
    equipment: "CONV-01",
    timestamp: "09:40:00",
    category: "System",
    acknowledged: true,
  },
  {
    id: 5,
    severity: "warning",
    title: "Data validation pending",
    message:
      "Sensor calibration and measurement validation have not been completed.",
    equipment: "CONV-01",
    timestamp: "09:35:00",
    category: "Data Quality",
    acknowledged: false,
  },
  {
    id: 6,
    severity: "info",
    title: "Sample records loaded",
    message:
      "Illustrative sample readings loaded into the monitoring preview.",
    equipment: "CONV-01",
    timestamp: "09:30:00",
    category: "System",
    acknowledged: true,
  },
];

function SeverityIcon({ severity }) {
  if (severity === "critical") {
    return <ShieldAlert size={18} />;
  }

  if (severity === "warning") {
    return <AlertTriangle size={18} />;
  }

  return <Info size={18} />;
}

function AlertStatCard({
  title,
  value,
  detail,
  icon: Icon,
  accent,
}) {
  return (
    <div className="alert-stat-card">
      <div className="alert-stat-top">
        <span>{title}</span>

        <div className={`alert-stat-icon ${accent}`}>
          <Icon size={19} />
        </div>
      </div>

      <h3>{value}</h3>

      <p>{detail}</p>
    </div>
  );
}

export default function AlertCenter() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const criticalCount = alerts.filter(
    (alert) => alert.severity === "critical"
  ).length;

  const warningCount = alerts.filter(
    (alert) => alert.severity === "warning"
  ).length;

  const unacknowledgedCount = alerts.filter(
    (alert) => !alert.acknowledged
  ).length;

  const acknowledgedCount = alerts.filter(
    (alert) => alert.acknowledged
  ).length;

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSeverity =
        severityFilter === "all" ||
        alert.severity === severityFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "acknowledged" &&
          alert.acknowledged) ||
        (statusFilter === "unacknowledged" &&
          !alert.acknowledged);

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        alert.title.toLowerCase().includes(query) ||
        alert.message.toLowerCase().includes(query) ||
        alert.equipment.toLowerCase().includes(query) ||
        alert.category.toLowerCase().includes(query);

      return matchesSeverity && matchesStatus && matchesSearch;
    });
  }, [alerts, severityFilter, statusFilter, searchQuery]);

  const acknowledgeAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
  };

  const acknowledgeAll = () => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) => ({
        ...alert,
        acknowledged: true,
      }))
    );
  };

  const resetDemo = () => {
    setAlerts(initialAlerts);
    setSeverityFilter("all");
    setStatusFilter("all");
    setSearchQuery("");
  };

  return (
    <main className="main-content alert-page">
      {/* PAGE HEADER */}

      <div className="alert-page-heading">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-line" />
            EVENT MANAGEMENT
          </div>

          <h1>Alert Center</h1>

          <p>
            Review thermal events, monitoring notifications
            and system conditions.
          </p>
        </div>

        <div className="alert-demo-badge">
          <BellRing size={16} />
          SIMULATION MODE
        </div>
      </div>

      {/* EQUIPMENT STRIP */}

      <div className="alert-equipment-strip">
        <div className="alert-equipment-left">
          <div className="alert-equipment-icon">
            <Thermometer size={22} />
          </div>

          <div>
            <h3>Converter Shell</h3>
            <p>Equipment ID: CONV-01</p>
          </div>
        </div>

        <div className="alert-equipment-status">
          <span />
          Demo event records
        </div>
      </div>

      {/* STATS */}

      <div className="alert-stats-grid">
        <AlertStatCard
          icon={Bell}
          title="Total Alerts"
          value={alerts.length}
          detail="Alert records in demo"
          accent="alert-icon-blue"
        />

        <AlertStatCard
          icon={ShieldAlert}
          title="Critical"
          value={criticalCount}
          detail="Critical demo alerts"
          accent="alert-icon-red"
        />

        <AlertStatCard
          icon={AlertTriangle}
          title="Warnings"
          value={warningCount}
          detail="Warning-level demo alerts"
          accent="alert-icon-orange"
        />

        <AlertStatCard
          icon={CircleAlert}
          title="Unacknowledged"
          value={unacknowledgedCount}
          detail="Require acknowledgement"
          accent="alert-icon-purple"
        />
      </div>

      {/* ACKNOWLEDGEMENT SUMMARY */}

      <div className="alert-summary-strip">
        <div className="alert-summary-item">
          <div className="alert-summary-dot alert-dot-pending" />

          <div>
            <span>Pending</span>
            <strong>{unacknowledgedCount}</strong>
          </div>
        </div>

        <div className="alert-summary-divider" />

        <div className="alert-summary-item">
          <div className="alert-summary-dot alert-dot-ack" />

          <div>
            <span>Acknowledged</span>
            <strong>{acknowledgedCount}</strong>
          </div>
        </div>

        <div className="alert-summary-actions">
          <button
            className="alert-ack-all-btn"
            onClick={acknowledgeAll}
            disabled={unacknowledgedCount === 0}
          >
            <CheckCheck size={16} />
            Acknowledge All
          </button>

          <button
            className="alert-reset-btn"
            onClick={resetDemo}
          >
            <RotateCcw size={16} />
            Reset Demo
          </button>
        </div>
      </div>

      {/* ALERT LIST */}

      <section className="panel alert-list-panel">
        <div className="alert-list-header">
          <div>
            <div className="alert-panel-title">
              <BellRing size={20} />
              <h2>Alert History</h2>
            </div>

            <p>
              Event records, status and monitoring context
            </p>
          </div>

          <span className="alert-history-badge">
            {filteredAlerts.length} RECORDS
          </span>
        </div>

        {/* FILTERS */}

        <div className="alert-filter-toolbar">
          <div className="alert-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />
          </div>

          <div className="alert-filter-group">
            <Filter size={16} />

            <select
              value={severityFilter}
              onChange={(event) =>
                setSeverityFilter(event.target.value)
              }
            >
              <option value="all">All severity</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Information</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="all">All status</option>
              <option value="unacknowledged">
                Pending
              </option>
              <option value="acknowledged">
                Acknowledged
              </option>
            </select>
          </div>
        </div>

        {/* ALERT CARDS */}

        <div className="alert-records">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <article
                key={alert.id}
                className={`alert-record alert-record-${alert.severity} ${
                  alert.acknowledged
                    ? "alert-record-acknowledged"
                    : ""
                }`}
              >
                <div
                  className={`alert-record-icon alert-record-icon-${alert.severity}`}
                >
                  <SeverityIcon severity={alert.severity} />
                </div>

                <div className="alert-record-content">
                  <div className="alert-record-top">
                    <div className="alert-record-title-wrap">
                      <h3>{alert.title}</h3>

                      <span
                        className={`alert-severity-badge alert-badge-${alert.severity}`}
                      >
                        {alert.severity}
                      </span>
                    </div>

                    <span className="alert-record-time">
                      <Clock3 size={14} />
                      {alert.timestamp}
                    </span>
                  </div>

                  <p className="alert-record-message">
                    {alert.message}
                  </p>

                  <div className="alert-record-meta">
                    <span className="alert-meta-equipment">
                      <Activity size={14} />
                      {alert.equipment}
                    </span>

                    <span className="alert-meta-category">
                      {alert.category}
                    </span>

                    <span
                      className={`alert-ack-status ${
                        alert.acknowledged
                          ? "alert-ack-complete"
                          : "alert-ack-pending"
                      }`}
                    >
                      {alert.acknowledged ? (
                        <>
                          <Check size={13} />
                          Acknowledged
                        </>
                      ) : (
                        <>
                          <CircleAlert size={13} />
                          Pending
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {!alert.acknowledged && (
                  <button
                    className="alert-ack-btn"
                    onClick={() =>
                      acknowledgeAlert(alert.id)
                    }
                    title="Acknowledge alert"
                  >
                    <Check size={16} />
                    <span>Acknowledge</span>
                  </button>
                )}
              </article>
            ))
          ) : (
            <div className="alert-empty-state">
              <div className="alert-empty-icon">
                <Bell size={24} />
              </div>

              <h3>No alerts found</h3>

              <p>
                Try adjusting your filters or search
                criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER NOTICE */}

      <div className="alert-notice">
        <Info size={17} />

        <p>
          <strong>Prototype notice:</strong> These are
          illustrative alert records. They are not generated
          by a live sensor, real equipment conditions or
          validated protection thresholds. Acknowledgement
          is a local demo interaction.
        </p>
      </div>

      {/* FOOTER */}

      <footer className="dashboard-footer">
        <span>SmartShell Thermal Intelligence</span>
        <span>PS-007 · THEME-02</span>
      </footer>
    </main>
  );
}
