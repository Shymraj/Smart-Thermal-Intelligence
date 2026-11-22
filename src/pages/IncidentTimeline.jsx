
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Clock3,
  Cpu,
  Filter,
  Info,
  Search,
  ShieldAlert,
  Thermometer,
  Wifi,
  Zap,
} from "lucide-react";

import "../styles/incidents.css";

const initialEvents = [
  {
    id: 1,
    time: "09:55:00",
    date: "Today",
    severity: "critical",
    category: "Temperature",
    title: "Critical thermal event detected",
    description:
      "Illustrative temperature data reached the demo critical event level. This record is simulated and is not a real equipment alarm.",
    equipment: "CONV-01",
    source: "Simulation Engine",
    status: "Unacknowledged",
  },
  {
    id: 2,
    time: "09:50:00",
    date: "Today",
    severity: "warning",
    category: "Trend",
    title: "Thermal trend increase recorded",
    description:
      "A rising trend is shown in the illustrative temperature dataset. Actual thermal trend analysis requires validated sensor readings.",
    equipment: "CONV-01",
    source: "Trend Preview",
    status: "Unacknowledged",
  },
  {
    id: 3,
    time: "09:45:00",
    date: "Today",
    severity: "warning",
    category: "Connectivity",
    title: "Controller connection unavailable",
    description:
      "The interface currently has no connected ESP32 controller. Hardware connection and telemetry are pending.",
    equipment: "CONV-01",
    source: "System Monitor",
    status: "Unacknowledged",
  },
  {
    id: 4,
    time: "09:40:00",
    date: "Today",
    severity: "info",
    category: "System",
    title: "Monitoring preview initialized",
    description:
      "The SmartShell monitoring interface was initialized in simulation mode.",
    equipment: "CONV-01",
    source: "Application",
    status: "Acknowledged",
  },
  {
    id: 5,
    time: "09:35:00",
    date: "Today",
    severity: "warning",
    category: "Data Quality",
    title: "Sensor validation pending",
    description:
      "Sensor calibration, installation and data validation have not been completed.",
    equipment: "CONV-01",
    source: "Data Integrity",
    status: "Unacknowledged",
  },
  {
    id: 6,
    time: "09:30:00",
    date: "Today",
    severity: "info",
    category: "System",
    title: "Sample data loaded",
    description:
      "Illustrative temperature sample records were loaded into the preview.",
    equipment: "CONV-01",
    source: "Simulation Engine",
    status: "Acknowledged",
  },
  {
    id: 7,
    time: "09:25:00",
    date: "Today",
    severity: "info",
    category: "Configuration",
    title: "Equipment profile created",
    description:
      "Converter shell monitoring equipment profile CONV-01 is available in the prototype.",
    equipment: "CONV-01",
    source: "Configuration",
    status: "Acknowledged",
  },
  {
    id: 8,
    time: "09:20:00",
    date: "Today",
    severity: "info",
    category: "System",
    title: "Monitoring session started",
    description:
      "An illustrative monitoring session was started for the SmartShell UI.",
    equipment: "CONV-01",
    source: "Application",
    status: "Acknowledged",
  },
];

const severityOrder = {
  critical: 0,
  warning: 1,
  info: 2,
};

function EventIcon({ severity, category }) {
  if (severity === "critical") return <ShieldAlert size={19} />;
  if (severity === "warning") return <AlertTriangle size={19} />;
  if (category === "Connectivity") return <Wifi size={19} />;
  if (category === "Temperature") return <Thermometer size={19} />;
  if (category === "Configuration") return <Cpu size={19} />;
  if (category === "Trend") return <Activity size={19} />;
  return <Info size={19} />;
}

function EventCard({ event, expanded, onToggle }) {
  return (
    <article className={`incident-event incident-${event.severity}`}>
      <div className="incident-timeline-rail">
        <div className={`incident-timeline-marker marker-${event.severity}`}>
          <EventIcon severity={event.severity} category={event.category} />
        </div>
      </div>

      <div className="incident-event-card">
        <div className="incident-event-header">
          <div className="incident-event-title-group">
            <h3>{event.title}</h3>

            <span className={`incident-severity incident-severity-${event.severity}`}>
              {event.severity}
            </span>
          </div>

          <div className="incident-event-time">
            <Clock3 size={14} />
            <span>{event.time}</span>
          </div>
        </div>

        <div className="incident-event-meta">
          <span className="incident-category">
            {event.category}
          </span>

          <span className="incident-equipment">
            <Cpu size={13} />
            {event.equipment}
          </span>

          <span
            className={`incident-status ${
              event.status === "Acknowledged"
                ? "incident-status-ack"
                : "incident-status-pending"
            }`}
          >
            {event.status === "Acknowledged" ? (
              <CheckCircle2 size={13} />
            ) : (
              <CircleAlert size={13} />
            )}
            {event.status}
          </span>
        </div>

        <button
          className="incident-expand-btn"
          onClick={onToggle}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Hide event details <ChevronUp size={15} />
            </>
          ) : (
            <>
              View event details <ChevronDown size={15} />
            </>
          )}
        </button>

        {expanded && (
          <div className="incident-event-details">
            <p>{event.description}</p>

            <div className="incident-details-grid">
              <div>
                <span>Event source</span>
                <strong>{event.source}</strong>
              </div>

              <div>
                <span>Equipment ID</span>
                <strong>{event.equipment}</strong>
              </div>

              <div>
                <span>Event date</span>
                <strong>{event.date}</strong>
              </div>

              <div>
                <span>Event status</span>
                <strong>{event.status}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function IncidentTimeline() {
  const [events] = useState(initialEvents);
  const [severity, setSeverity] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedEvents, setExpandedEvents] = useState([]);

  const criticalCount = events.filter(
    (event) => event.severity === "critical"
  ).length;

  const warningCount = events.filter(
    (event) => event.severity === "warning"
  ).length;

  const infoCount = events.filter(
    (event) => event.severity === "info"
  ).length;

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesSeverity =
          severity === "all" || event.severity === severity;

        const matchesCategory =
          category === "all" || event.category === category;

        const matchesStatus =
          status === "all" || event.status === status;

        const query = search.toLowerCase();

        const matchesSearch =
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.equipment.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.source.toLowerCase().includes(query);

        return (
          matchesSeverity &&
          matchesCategory &&
          matchesStatus &&
          matchesSearch
        );
      })
      .sort((a, b) => {
        return (
          severityOrder[a.severity] - severityOrder[b.severity] ||
          b.time.localeCompare(a.time)
        );
      });
  }, [events, severity, category, status, search]);

  const toggleEvent = (id) => {
    setExpandedEvents((current) =>
      current.includes(id)
        ? current.filter((eventId) => eventId !== id)
        : [...current, id]
    );
  };

  const expandAll = () => {
    setExpandedEvents(filteredEvents.map((event) => event.id));
  };

  const collapseAll = () => {
    setExpandedEvents([]);
  };

  const resetFilters = () => {
    setSeverity("all");
    setCategory("all");
    setStatus("all");
    setSearch("");
    setExpandedEvents([]);
  };

  return (
    <main className="main-content incident-page">
      {/* HEADER */}

      <div className="incident-page-heading">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-line" />
            EVENT TRACEABILITY
          </div>

          <h1>Incident Timeline</h1>

          <p>
            Chronological overview of monitoring events,
            system notifications and thermal incidents.
          </p>
        </div>

        <div className="incident-demo-badge">
          <Clock3 size={15} />
          DEMO TIMELINE
        </div>
      </div>

      {/* EQUIPMENT STRIP */}

      <div className="incident-equipment-strip">
        <div className="incident-equipment-left">
          <div className="incident-equipment-icon">
            <Cpu size={22} />
          </div>

          <div>
            <h3>Converter Shell</h3>
            <p>CONV-01 · Thermal monitoring</p>
          </div>
        </div>

        <div className="incident-equipment-right">
          <span className="incident-online-dot" />
          Simulation records
        </div>
      </div>

      {/* STATISTICS */}

      <div className="incident-stats-grid">
        <div className="incident-stat-card">
          <div className="incident-stat-top">
            <span>Total events</span>
            <div className="incident-stat-icon stat-blue">
              <Activity size={18} />
            </div>
          </div>

          <h3>{events.length}</h3>
          <p>Records in this demo timeline</p>
        </div>

        <div className="incident-stat-card">
          <div className="incident-stat-top">
            <span>Critical events</span>
            <div className="incident-stat-icon stat-red">
              <ShieldAlert size={18} />
            </div>
          </div>

          <h3>{criticalCount}</h3>
          <p>Critical demo records</p>
        </div>

        <div className="incident-stat-card">
          <div className="incident-stat-top">
            <span>Warnings</span>
            <div className="incident-stat-icon stat-orange">
              <AlertTriangle size={18} />
            </div>
          </div>

          <h3>{warningCount}</h3>
          <p>Warning demo records</p>
        </div>

        <div className="incident-stat-card">
          <div className="incident-stat-top">
            <span>Informational</span>
            <div className="incident-stat-icon stat-purple">
              <Bell size={18} />
            </div>
          </div>

          <h3>{infoCount}</h3>
          <p>System and informational events</p>
        </div>
      </div>

      {/* FILTER PANEL */}

      <section className="panel incident-filter-panel">
        <div className="incident-filter-heading">
          <div>
            <div className="incident-filter-title">
              <Filter size={18} />
              <h2>Timeline filters</h2>
            </div>

            <p>Filter events by type, severity or status</p>
          </div>

          <button
            className="incident-clear-btn"
            onClick={resetFilters}
          >
            Clear filters
          </button>
        </div>

        <div className="incident-filter-grid">
          <div className="incident-search-field">
            <label>Search events</label>

            <div className="incident-input-wrap">
              <Search size={16} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search timeline..."
              />
            </div>
          </div>

          <div className="incident-select-field">
            <label>Severity</label>

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="all">All severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Information</option>
            </select>
          </div>

          <div className="incident-select-field">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              <option value="Temperature">Temperature</option>
              <option value="Trend">Trend</option>
              <option value="Connectivity">Connectivity</option>
              <option value="Data Quality">Data Quality</option>
              <option value="System">System</option>
              <option value="Configuration">Configuration</option>
            </select>
          </div>

          <div className="incident-select-field">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Unacknowledged">Pending</option>
            </select>
          </div>
        </div>
      </section>

      {/* TIMELINE */}

      <section className="panel incident-timeline-panel">
        <div className="incident-timeline-header">
          <div>
            <div className="incident-timeline-title">
              <Clock3 size={20} />
              <h2>Event chronology</h2>
            </div>

            <p>
              {filteredEvents.length} matching events
            </p>
          </div>

          <div className="incident-timeline-actions">
            <button onClick={expandAll}>
              <ChevronDown size={15} />
              Expand
            </button>

            <button onClick={collapseAll}>
              <ChevronUp size={15} />
              Collapse
            </button>
          </div>
        </div>

        <div className="incident-timeline-body">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                expanded={expandedEvents.includes(event.id)}
                onToggle={() => toggleEvent(event.id)}
              />
            ))
          ) : (
            <div className="incident-empty">
              <div className="incident-empty-icon">
                <Search size={24} />
              </div>

              <h3>No events found</h3>

              <p>
                No timeline records match the current filters.
              </p>

              <button onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROTOTYPE NOTICE */}

      <div className="incident-notice">
        <Info size={17} />

        <p>
          <strong>Simulation notice:</strong> Timeline
          entries are illustrative frontend records. They
          are not actual equipment incidents, validated
          thermal alarms or records received from a connected
          sensor. Timeline data is not persistent.
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
