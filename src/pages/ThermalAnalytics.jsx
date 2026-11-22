import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Thermometer,
  Flame,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Clock3,
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

import "../styles/analytics.css";

const temperatureData = [
  { time: "09:00", temperature: 42.2 },
  { time: "09:05", temperature: 43.1 },
  { time: "09:10", temperature: 43.0 },
  { time: "09:15", temperature: 42.8 },
  { time: "09:20", temperature: 45.2 },
  { time: "09:25", temperature: 45.6 },
  { time: "09:30", temperature: 44.8 },
  { time: "09:35", temperature: 46.3 },
  { time: "09:40", temperature: 45.8 },
  { time: "09:45", temperature: 47.1 },
  { time: "09:50", temperature: 46.4 },
  { time: "09:55", temperature: 48.1 },
];

const ranges = ["15M", "30M", "1H", "6H", "24H"];

function AnalyticsStat({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  variant = "",
}) {
  return (
    <div className={`analytics-stat-card ${variant}`}>
      <div className="analytics-stat-top">
        <span>{title}</span>

        <div className="analytics-stat-icon">
          <Icon size={19} />
        </div>
      </div>

      <div className="analytics-stat-value">
        {value}
        {unit && <span className="analytics-stat-unit">{unit}</span>}
      </div>

      <p className="analytics-stat-subtitle">{subtitle}</p>
    </div>
  );
}

function ThermalAnalytics() {
  const [selectedRange, setSelectedRange] = useState("1H");

  const averageTemperature =
    temperatureData.reduce(
      (total, reading) => total + reading.temperature,
      0
    ) / temperatureData.length;

  const peakTemperature = Math.max(
    ...temperatureData.map((reading) => reading.temperature)
  );

  const firstTemperature = temperatureData[0].temperature;
  const lastTemperature =
    temperatureData[temperatureData.length - 1].temperature;

  const temperatureChange = lastTemperature - firstTemperature;

  return (
    <div className="analytics-page">
      {/* PAGE HEADER */}
      <div className="analytics-heading">
        <div>
          <div className="analytics-eyebrow">
            INTELLIGENCE & PERFORMANCE
          </div>

          <h1>Thermal Analytics</h1>

          <p>
            Analyze temperature trends, thermal behavior and monitoring
            performance.
          </p>
        </div>

        <div className="analytics-demo-badge">
          <Activity size={16} />
          Simulation Data
        </div>
      </div>

      {/* EQUIPMENT OVERVIEW */}
      <div className="analytics-equipment-strip">
        <div className="analytics-equipment-left">
          <div className="analytics-equipment-icon">
            <Thermometer size={24} />
          </div>

          <div>
            <h3>Converter Shell</h3>
            <p>Equipment ID: CVT-001</p>
          </div>
        </div>

        <div className="analytics-equipment-status">
          <span className="analytics-status-dot" />
          Offline · Demo Mode
        </div>
      </div>

      {/* ANALYTICS METRICS */}
      <div className="analytics-stats-grid">
        <AnalyticsStat
          title="Average Temperature"
          value={averageTemperature.toFixed(1)}
          unit="°C"
          subtitle="Average of illustrative readings"
          icon={Thermometer}
        />

        <AnalyticsStat
          title="Peak Temperature"
          value={peakTemperature.toFixed(1)}
          unit="°C"
          subtitle="Highest sample in this dataset"
          icon={Flame}
          variant="analytics-stat-primary"
        />

        <AnalyticsStat
          title="Temperature Trend"
          value={`${temperatureChange >= 0 ? "+" : ""}${temperatureChange.toFixed(1)}`}
          unit="°C"
          subtitle="Change across sample window"
          icon={TrendingUp}
        />

        <AnalyticsStat
          title="Data Reliability"
          value="Unverified"
          subtitle="Hardware validation pending"
          icon={ShieldCheck}
        />
      </div>

      {/* TEMPERATURE CHART */}
      <section className="analytics-chart-panel">
        <div className="analytics-chart-header">
          <div>
            <div className="analytics-chart-title">
              <BarChart3 size={20} />
              <h2>Temperature Trend</h2>
            </div>

            <p>Illustrative shell temperature readings</p>
          </div>

          <div className="analytics-chart-legend">
            <span className="analytics-legend-dot" />
            Temperature
          </div>
        </div>

        <div className="analytics-range-selector">
          {ranges.map((range) => (
            <button
              key={range}
              className={
                selectedRange === range
                  ? "analytics-range-active"
                  : ""
              }
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="analytics-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={temperatureData}
              margin={{
                top: 20,
                right: 15,
                left: 0,
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
                    stopColor="#ff7a1a"
                    stopOpacity={0.22}
                  />
                  <stop
                    offset="100%"
                    stopColor="#ff7a1a"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical
                horizontal
              />

              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />

              <YAxis
                domain={[40, 55]}
                ticks={[40, 45, 50, 55]}
                tickFormatter={(value) => `${value}°`}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(1)} °C`,
                  "Temperature",
                ]}
                labelFormatter={(label) => `Time: ${label}`}
              />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#ff720e"
                strokeWidth={3}
                fill="url(#temperatureGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#ff720e",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-chart-note">
          <Clock3 size={14} />
          <span>
            Displaying illustrative sample data · Selected range:{" "}
            {selectedRange}
          </span>
        </div>

        <div className="analytics-chart-disclaimer">
          The range selector is a UI demonstration. The sample dataset
          currently remains the same for all ranges.
        </div>
      </section>

      {/* THRESHOLD + INSIGHTS */}
      <div className="analytics-bottom-grid">
        <section className="analytics-threshold-panel">
          <div className="analytics-panel-heading">
            <div>
              <h2>Thermal Threshold Zones</h2>
              <p>Conceptual temperature classification</p>
            </div>
          </div>

          <div className="analytics-zone-list">
            <div className="analytics-zone analytics-normal">
              <div className="analytics-zone-top">
                <span className="analytics-zone-indicator" />
                <strong>Normal Zone</strong>
                <span className="analytics-zone-range">
                  Below 50°C
                </span>
              </div>

              <div className="analytics-zone-bar">
                <div style={{ width: "60%" }} />
              </div>

              <p>
                Illustrative operating region. Actual limits require
                engineering validation.
              </p>
            </div>

            <div className="analytics-zone analytics-warning">
              <div className="analytics-zone-top">
                <span className="analytics-zone-indicator" />
                <strong>Warning Zone</strong>
                <span className="analytics-zone-range">
                  50°C – 70°C
                </span>
              </div>

              <div className="analytics-zone-bar">
                <div style={{ width: "60%" }} />
              </div>

              <p>
                Conceptual alert region for temperature escalation.
              </p>
            </div>

            <div className="analytics-zone analytics-critical">
              <div className="analytics-zone-top">
                <span className="analytics-zone-indicator" />
                <strong>Critical Zone</strong>
                <span className="analytics-zone-range">
                  Above 70°C
                </span>
              </div>

              <div className="analytics-zone-bar">
                <div style={{ width: "60%" }} />
              </div>

              <p>
                Conceptual critical region requiring an appropriate
                response.
              </p>
            </div>
          </div>

          <div className="analytics-zone-note">
            <ShieldCheck size={16} />
            <span>
              Thresholds shown are placeholders, not validated
              converter safety limits.
            </span>
          </div>
        </section>

        <section className="analytics-insights-panel">
          <div className="analytics-panel-heading">
            <div>
              <h2>Thermal Insights</h2>
              <p>Observations from the sample dataset</p>
            </div>
          </div>

          <div className="analytics-insights-top">
            <div className="analytics-insights-icon">
              <Lightbulb size={21} />
            </div>

            <div>
              <h3>Data-based observations</h3>
              <p>Generated from illustrative readings</p>
            </div>
          </div>

          <div className="analytics-insight-item">
            <ArrowUpRight size={18} />
            <div>
              <strong>Temperature Increase</strong>
              <p>
                Temperature increased by{" "}
                {temperatureChange.toFixed(1)}°C during the sample
                window.
              </p>
            </div>
          </div>

          <div className="analytics-insight-item">
            <Activity size={18} />
            <div>
              <strong>Peak Observation</strong>
              <p>
                The highest recorded sample in this dataset is{" "}
                {peakTemperature.toFixed(1)}°C.
              </p>
            </div>
          </div>

          <div className="analytics-insight-item">
            <ShieldCheck size={18} />
            <div>
              <strong>Monitoring Validation</strong>
              <p>
                Sensor calibration, hardware connection and actual
                operating limits are yet to be validated.
              </p>
            </div>
          </div>

          <div className="analytics-insight-disclaimer">
            <span>DEMO INTELLIGENCE</span>
            <p>
              These are basic observations from sample data, not
              machine-learning predictions or real-time diagnostics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ThermalAnalytics;
