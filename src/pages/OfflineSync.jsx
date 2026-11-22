
import { useState } from "react";
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  Cloud,
  CheckCircle2,
  Clock3,
  HardDrive,
  ArrowUpDown,
  AlertTriangle,
  Activity,
  ShieldCheck,
  CircleDot,
  RotateCcw,
} from "lucide-react";

import "../styles/offlineSync.css";

const initialRecords = [
  {
    id: "SYNC-1048",
    time: "09:55:12",
    type: "Temperature reading",
    value: "47.4 °C",
    status: "Pending",
  },
  {
    id: "SYNC-1047",
    time: "09:50:12",
    type: "Temperature reading",
    value: "48.1 °C",
    status: "Pending",
  },
  {
    id: "SYNC-1046",
    time: "09:45:12",
    type: "Temperature reading",
    value: "46.5 °C",
    status: "Pending",
  },
  {
    id: "SYNC-1045",
    time: "09:40:12",
    type: "Temperature reading",
    value: "47.2 °C",
    status: "Pending",
  },
  {
    id: "SYNC-1044",
    time: "09:35:12",
    type: "Temperature reading",
    value: "45.8 °C",
    status: "Pending",
  },
];

export default function OfflineSync() {
  const [records, setRecords] = useState(initialRecords);
  const [connection, setConnection] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Never");
  const [syncMessage, setSyncMessage] = useState(
    "Waiting for connection"
  );

  const pendingCount = records.filter(
    (record) => record.status === "Pending"
  ).length;

  const syncedCount = records.filter(
    (record) => record.status === "Synced"
  ).length;

  function toggleConnection() {
    const nextState = !connection;

    setConnection(nextState);

    setSyncMessage(
      nextState
        ? "Network connection restored"
        : "Device is now offline"
    );
  }

  function handleSync() {
    if (!connection) {
      setSyncMessage("Connection unavailable. Cannot sync.");
      return;
    }

    if (pendingCount === 0) {
      setSyncMessage("All records are already synchronized.");
      return;
    }

    setSyncing(true);
    setSyncMessage("Synchronization in progress...");

    setTimeout(() => {
      setRecords((previousRecords) =>
        previousRecords.map((record) => ({
          ...record,
          status: "Synced",
        }))
      );

      setLastSync(new Date().toLocaleTimeString());
      setSyncing(false);
      setSyncMessage("Synchronization completed successfully.");
    }, 1500);
  }

  function resetDemo() {
    setRecords(initialRecords);
    setConnection(false);
    setSyncing(false);
    setLastSync("Never");
    setSyncMessage("Demo reset. Waiting for connection.");
  }

  return (
    <main className="main-content offline-sync-page">
      {/* HEADER */}

      <div className="offline-heading">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-line" />
            DATA RELIABILITY
          </div>

          <h1>Offline & Sync</h1>

          <p>
            Manage offline data retention and synchronization
            status for the monitoring system.
          </p>
        </div>

        <div className="offline-demo-badge">
          <CircleDot size={13} />
          SIMULATION MODE
        </div>
      </div>

      {/* DEVICE INFORMATION */}

      <section className="offline-device-strip">
        <div className="offline-device-left">
          <div className="offline-device-icon">
            <HardDrive size={21} />
          </div>

          <div>
            <span className="offline-device-label">
              MONITORING DEVICE
            </span>

            <h3>Converter Shell · CONV-01</h3>

            <p>ESP32 edge controller</p>
          </div>
        </div>

        <div
          className={`offline-connection-status ${
            connection ? "connected" : "disconnected"
          }`}
        >
          {connection ? (
            <Wifi size={16} />
          ) : (
            <WifiOff size={16} />
          )}

          {connection ? "Connected" : "Offline"}
        </div>
      </section>

      {/* METRICS */}

      <div className="offline-metrics-grid">
        <div className="offline-metric-card">
          <div className="offline-metric-top">
            <span>Pending records</span>

            <div className="offline-metric-icon amber">
              <Database size={18} />
            </div>
          </div>

          <h2>{pendingCount}</h2>

          <p>Waiting for synchronization</p>
        </div>

        <div className="offline-metric-card">
          <div className="offline-metric-top">
            <span>Synced records</span>

            <div className="offline-metric-icon green">
              <CheckCircle2 size={18} />
            </div>
          </div>

          <h2>{syncedCount}</h2>

          <p>Successfully synchronized</p>
        </div>

        <div className="offline-metric-card">
          <div className="offline-metric-top">
            <span>Network status</span>

            <div className="offline-metric-icon blue">
              {connection ? (
                <Wifi size={18} />
              ) : (
                <WifiOff size={18} />
              )}
            </div>
          </div>

          <h2 className="offline-status-value">
            {connection ? "Online" : "Offline"}
          </h2>

          <p>
            {connection
              ? "Connection available"
              : "Connection unavailable"}
          </p>
        </div>

        <div className="offline-metric-card">
          <div className="offline-metric-top">
            <span>Last sync</span>

            <div className="offline-metric-icon purple">
              <Clock3 size={18} />
            </div>
          </div>

          <h2 className="offline-status-value">
            {lastSync}
          </h2>

          <p>Synchronization timestamp</p>
        </div>
      </div>

      {/* SYNC CONTROL */}

      <section className="panel offline-control-panel">
        <div className="offline-control-header">
          <div>
            <div className="panel-title-row">
              <h3>Synchronization control</h3>

              <span className="panel-tag">
                DEMO CONTROL
              </span>
            </div>

            <p>
              Simulate network availability and data synchronization.
            </p>
          </div>

          <div className="offline-control-icon">
            <ArrowUpDown size={19} />
          </div>
        </div>

        <div className="offline-control-grid">
          <div className="offline-control-box">
            <div className="offline-control-box-top">
              <div className="offline-control-box-icon">
                {connection ? (
                  <Wifi size={20} />
                ) : (
                  <WifiOff size={20} />
                )}
              </div>

              <div>
                <strong>Network simulation</strong>

                <span>
                  {connection
                    ? "Network is available"
                    : "Network is unavailable"}
                </span>
              </div>
            </div>

            <button
              className={`offline-toggle-btn ${
                connection ? "toggle-connected" : ""
              }`}
              onClick={toggleConnection}
              disabled={syncing}
            >
              {connection
                ? "Disconnect network"
                : "Restore connection"}
            </button>
          </div>

          <div className="offline-control-box">
            <div className="offline-control-box-top">
              <div className="offline-control-box-icon sync">
                <RefreshCw size={20} />
              </div>

              <div>
                <strong>Manual synchronization</strong>

                <span>
                  {pendingCount} records awaiting sync
                </span>
              </div>
            </div>

            <button
              className="offline-sync-btn"
              onClick={handleSync}
              disabled={syncing}
            >
              <RefreshCw
                size={16}
                className={syncing ? "sync-rotating" : ""}
              />

              {syncing ? "Syncing..." : "Sync now"}
            </button>
          </div>
        </div>

        <div
          className={`offline-message ${
            connection ? "message-success" : "message-warning"
          }`}
        >
          {connection ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertTriangle size={16} />
          )}

          <span>{syncMessage}</span>
        </div>
      </section>

      {/* STORAGE AND SYNC FLOW */}

      <div className="offline-content-grid">
        <section className="panel offline-storage-panel">
          <div className="panel-header">
            <div>
              <h3>Local storage overview</h3>

              <p>Offline data queue simulation</p>
            </div>

            <div className="offline-storage-icon">
              <Database size={18} />
            </div>
          </div>

          <div className="storage-visual">
            <div className="storage-visual-top">
              <div className="storage-ring">
                <Database size={26} />

                <strong>{records.length}</strong>
              </div>

              <div>
                <strong>Local queue</strong>

                <p>Demo records retained</p>
              </div>
            </div>

            <div className="storage-bar">
              <span
                style={{
                  width: `${Math.min(
                    (records.length / 20) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="storage-bar-footer">
              <span>{records.length} records</span>
              <span>Demo capacity: 20</span>
            </div>
          </div>

          <div className="storage-features">
            <div>
              <CheckCircle2 size={16} />

              <span>Offline queue preview</span>
            </div>

            <div>
              <CheckCircle2 size={16} />

              <span>Record status tracking</span>
            </div>

            <div>
              <CheckCircle2 size={16} />

              <span>Sync state visibility</span>
            </div>
          </div>
        </section>

        <section className="panel offline-flow-panel">
          <div className="panel-header">
            <div>
              <h3>Data synchronization flow</h3>

              <p>Conceptual system workflow</p>
            </div>
          </div>

          <div className="sync-flow">
            <div className="sync-flow-step">
              <div className="sync-flow-icon">
                <Activity size={19} />
              </div>

              <div>
                <strong>Data collection</strong>

                <span>Temperature samples</span>
              </div>
            </div>

            <div className="sync-flow-connector" />

            <div className="sync-flow-step">
              <div className="sync-flow-icon">
                <HardDrive size={19} />
              </div>

              <div>
                <strong>Local retention</strong>

                <span>Offline queue</span>
              </div>
            </div>

            <div className="sync-flow-connector" />

            <div className="sync-flow-step">
              <div className="sync-flow-icon">
                <Wifi size={19} />
              </div>

              <div>
                <strong>Network recovery</strong>

                <span>Connectivity restored</span>
              </div>
            </div>

            <div className="sync-flow-connector" />

            <div className="sync-flow-step">
              <div className="sync-flow-icon flow-cloud">
                <Cloud size={19} />
              </div>

              <div>
                <strong>Data synchronization</strong>

                <span>Sync destination concept</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* RECORD TABLE */}

      <section className="panel offline-records-panel">
        <div className="panel-header offline-records-header">
          <div>
            <h3>Offline data queue</h3>

            <p>Sample records awaiting or completing sync</p>
          </div>

          <button
            className="offline-reset-btn"
            onClick={resetDemo}
            disabled={syncing}
          >
            <RotateCcw size={15} />
            Reset demo
          </button>
        </div>

        <div className="offline-table-wrapper">
          <table className="offline-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Timestamp</th>
                <th>Data type</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <span className="offline-record-id">
                      {record.id}
                    </span>
                  </td>

                  <td>{record.time}</td>

                  <td>{record.type}</td>

                  <td>
                    <strong className="offline-record-value">
                      {record.value}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`offline-record-status ${
                        record.status === "Synced"
                          ? "record-synced"
                          : "record-pending"
                      }`}
                    >
                      <span />

                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {records.length === 0 && (
          <div className="offline-empty-state">
            <Database size={24} />

            <strong>No queued records</strong>

            <span>There are currently no records.</span>
          </div>
        )}
      </section>

      {/* SECURITY NOTICE */}

      <section className="offline-notice">
        <div className="offline-notice-icon">
          <ShieldCheck size={18} />
        </div>

        <div>
          <strong>Data reliability design</strong>

          <p>
            The intended architecture supports temporary
            data retention during connectivity loss and
            synchronization after network recovery. Actual
            local storage, retry logic, data integrity
            verification and cloud synchronization are not
            implemented in this frontend demonstration.
          </p>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="dashboard-footer">
        <span>SmartShell Thermal Intelligence</span>

        <span>PS-007 · THEME-02</span>
      </footer>
    </main>
  );
}
