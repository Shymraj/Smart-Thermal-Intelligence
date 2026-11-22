
import { useState } from "react";
import {
  BrainCircuit,
  Activity,
  ShieldAlert,
  ScanLine,
  TrendingUp,
  Gauge,
  Lightbulb,
  CircleCheck,
  AlertTriangle,
  Thermometer,
  Clock3,
  Sparkles,
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

import "../styles/intelligence.css";

const intelligenceData = [
  { time: "09:00", temp: 42.2 },
  { time: "09:05", temp: 43.1 },
  { time: "09:10", temp: 43.0 },
  { time: "09:15", temp: 42.8 },
  { time: "09:20", temp: 45.2 },
  { time: "09:25", temp: 45.6 },
  { time: "09:30", temp: 44.8 },
  { time: "09:35", temp: 46.3 },
  { time: "09:40", temp: 45.8 },
  { time: "09:45", temp: 47.1 },
  { time: "09:50", temp: 46.4 },
  { time: "09:55", temp: 48.1 },
];

function IntelligenceMetric({ icon: Icon, title, value, detail, accent }) {
  return (
    <div className="intel-metric-card">
      <div className="intel-metric-top">
        <span>{title}</span>
        <div className={`intel-metric-icon ${accent || ""}`}>
          <Icon size={19} />
        </div>
      </div>

      <h3>{value}</h3>
      <p>{detail}</p>
    </div>
  );
}

export default function AIIntelligence() {
  const [analysisMode, setAnalysisMode] = useState("overview");

  const temperatures = intelligenceData.map((item) => item.temp);

  const average =
    temperatures.reduce((sum, value) => sum + value, 0) /
    temperatures.length;

  const peak = Math.max(...temperatures);

  const rising =
    intelligenceData[intelligenceData.length - 1].temp -
    intelligenceData[0].temp;

  const anomalyDetected = peak > 50;

  return (
    <div className="intel-page">
      {/* HEADER */}

      <header className="intel-header">
        <div>
          <span className="intel-eyebrow">
            SMART ANALYSIS ENGINE
          </span>

          <h1>AI Intelligence</h1>

          <p>
            Thermal behavior analysis, anomaly monitoring and
            intelligent operational insights.
          </p>
        </div>

        <div className="intel-demo-tag">
          <Sparkles size={16} />
          Intelligence Demo
        </div>
      </header>

      {/* ENGINE STATUS */}

      <section className="intel-engine-banner">
        <div className="intel-engine-main">
          <div className="intel-engine-icon">
            <BrainCircuit size={27} />
          </div>

          <div>
            <h3>Thermal Intelligence Engine</h3>
            <p>Converter Shell · CVT-001</p>
          </div>
        </div>

        <div className="intel-engine-state">
          <span className="intel-state-dot" />
          Simulation Engine Active
        </div>
      </section>

      {/* METRICS */}

      <div className="intel-metrics-grid">
        <IntelligenceMetric
          icon={Gauge}
          title="Analysis Status"
          value="Demo Active"
          detail="Sample-data analysis"
          accent="intel-icon-green"
        />

        <IntelligenceMetric
          icon={ScanLine}
          title="Anomaly Detection"
          value={anomalyDetected ? "Signal Detected" : "No Signal"}
          detail="Based on illustrative rule"
          accent="intel-icon-orange"
        />

        <IntelligenceMetric
          icon={TrendingUp}
          title="Thermal Variation"
          value={`+${rising.toFixed(1)} °C`}
          detail="Change across sample window"
          accent="intel-icon-blue"
        />

        <IntelligenceMetric
          icon={ShieldAlert}
          title="Risk Classification"
          value="Unvalidated"
          detail="Engineering thresholds pending"
          accent="intel-icon-purple"
        />
      </div>

      {/* ANALYSIS CHART */}

      <section className="intel-panel">
        <div className="intel-panel-header">
          <div>
            <div className="intel-panel-title">
              <Activity size={20} />
              <h2>Thermal Behavior Analysis</h2>
            </div>

            <p>Temperature profile used for demo analysis</p>
          </div>

          <span className="intel-chart-label">
            <span />
            Temperature
          </span>
        </div>

        <div className="intel-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={intelligenceData}
              margin={{
                top: 15,
                right: 12,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="intelTemperatureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#14b8a6"
                    stopOpacity={0.22}
                  />
                  <stop
                    offset="100%"
                    stopColor="#14b8a6"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" />

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
              />

              <Area
                type="monotone"
                dataKey="temp"
                stroke="#14b8a6"
                strokeWidth={2.8}
                fill="url(#intelTemperatureGradient)"
                dot={false}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="intel-chart-footnote">
          <Activity size={15} />
          <span>
            Illustrative dataset · Average {average.toFixed(1)}°C ·
            Peak {peak.toFixed(1)}°C
          </span>
        </div>
      </section>

      {/* ANALYSIS CONTENT */}

      <div className="intel-analysis-grid">
        {/* DETECTION */}

        <section className="intel-panel intel-detection-panel">
          <div className="intel-panel-header">
            <div>
              <div className="intel-panel-title">
                <ScanLine size={20} />
                <h2>Detection Analysis</h2>
              </div>

              <p>Rule-based demonstration</p>
            </div>
          </div>

          <div className="intel-detection-status">
            <div className="intel-detection-status-icon">
              {anomalyDetected ? (
                <AlertTriangle size={22} />
              ) : (
                <CircleCheck size={22} />
              )}
            </div>

            <div>
              <h3>
                {anomalyDetected
                  ? "Potential Thermal Anomaly"
                  : "No Demo Anomaly Flag"}
              </h3>

              <p>
                {anomalyDetected
                  ? "The sample exceeds the configured demonstration threshold."
                  : "The sample does not exceed the configured demonstration threshold."}
              </p>
            </div>
          </div>

          <div className="intel-rule-card">
            <span>DEMO DETECTION RULE</span>
            <strong>Temperature above 50°C</strong>
            <p>
              This placeholder rule is used to demonstrate a detection
              interface. It is not an operational safety limit.
            </p>
          </div>

          <div className="intel-detection-footer">
            <Activity size={16} />
            <span>
              Detection is simulated and not connected to sensor
              hardware.
            </span>
          </div>
        </section>

        {/* INSIGHTS */}

        <section className="intel-panel intel-insights-panel">
          <div className="intel-panel-header">
            <div>
              <div className="intel-panel-title">
                <Lightbulb size={20} />
                <h2>Intelligent Insights</h2>
              </div>

              <p>Observations generated from sample values</p>
            </div>
          </div>

          <div className="intel-insight">
            <div className="intel-insight-icon intel-icon-orange">
              <TrendingUp size={18} />
            </div>

            <div>
              <h3>Temperature Trend</h3>
              <p>
                Sample temperature increased by {rising.toFixed(1)}°C
                across the displayed time window.
              </p>
            </div>
          </div>

          <div className="intel-insight">
            <div className="intel-insight-icon intel-icon-blue">
              <Thermometer size={18} />
            </div>

            <div>
              <h3>Peak Observation</h3>
              <p>
                Maximum sample value observed was {peak.toFixed(1)}°C.
              </p>
            </div>
          </div>

          <div className="intel-insight">
            <div className="intel-insight-icon intel-icon-purple">
              <Clock3 size={18} />
            </div>

            <div>
              <h3>Data Context</h3>
              <p>
                The dataset represents demonstration readings,
                not a validated historical record.
              </p>
            </div>
          </div>

          <div className="intel-insight-disclaimer">
            <Sparkles size={16} />
            <p>
              These insights are descriptive observations. Predictive
              AI, model training and real hardware integration are
              not implemented yet.
            </p>
          </div>
        </section>
      </div>

      {/* ANALYSIS MODE */}

      <section className="intel-panel intel-mode-panel">
        <div className="intel-panel-header">
          <div>
            <div className="intel-panel-title">
              <BrainCircuit size={20} />
              <h2>Intelligence Modules</h2>
            </div>

            <p>Interactive demonstration modules</p>
          </div>
        </div>

        <div className="intel-mode-selector">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: Activity,
            },
            {
              id: "anomaly",
              label: "Anomaly Logic",
              icon: ScanLine,
            },
            {
              id: "risk",
              label: "Risk Framework",
              icon: ShieldAlert,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={
                  analysisMode === item.id
                    ? "intel-mode-active"
                    : ""
                }
                onClick={() => setAnalysisMode(item.id)}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="intel-mode-content">
          {analysisMode === "overview" && (
            <>
              <h3>Thermal monitoring overview</h3>
              <p>
                This module demonstrates how temperature data can be
                processed to provide trends, observation signals
                and monitoring context.
              </p>
            </>
          )}

          {analysisMode === "anomaly" && (
            <>
              <h3>Rule-based anomaly demonstration</h3>
              <p>
                A demonstration threshold of 50°C is used to
                illustrate how a temperature event may be flagged.
                The rule is not a validated equipment protection
                threshold.
              </p>
            </>
          )}

          {analysisMode === "risk" && (
            <>
              <h3>Risk assessment framework</h3>
              <p>
                A future version can combine validated temperature
                limits, rate of temperature change, sensor health,
                equipment context and persistence of abnormal
                conditions to support risk assessment.
              </p>
            </>
          )}
        </div>
      </section>

      {/* DISCLAIMER */}

      <div className="intel-global-disclaimer">
        <ShieldAlert size={17} />

        <p>
          <strong>Prototype notice:</strong> All data, detection
          signals and intelligence observations on this page are
          illustrative. No actual AI prediction, equipment diagnosis
          or safety determination is being performed.
        </p>
      </div>
    </div>
  );
}
