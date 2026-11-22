import { useState } from "react";
import {
  Settings,
  Cpu,
  Thermometer,
  Radio,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  Clock3,
  SlidersHorizontal,
  Activity,
} from "lucide-react";
import "../styles/configuration.css";

const defaultSettings = {
  equipmentName: "Converter Shell",
  equipmentId: "CONV-01",
  controller: "ESP32",
  sensorType: "Infrared temperature sensor",
  location: "Industrial monitoring zone",
  temperatureUnit: "Celsius (°C)",
  warningThreshold: "70",
  criticalThreshold: "85",
  samplingInterval: "5",
  averagingWindow: "3",
  alertEnabled: true,
  warningAlert: true,
  criticalAlert: true,
  sensorAlert: true,
  connectionAlert: true,
  autoReconnect: true,
  connectionTimeout: "10",
  dataRetention: "30",
};

function ConfigSection({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="config-section">
      <div className="config-section-header">
        <div className="config-section-icon">
          <Icon size={18} />
        </div>

        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="config-section-content">
        {children}
      </div>
    </section>
  );
}

function ConfigField({
  label,
  description,
  children,
}) {
  return (
    <div className="config-field">
      <div className="config-field-label">
        <label>{label}</label>

        {description && (
          <span>{description}</span>
        )}
      </div>

      <div className="config-field-control">
        {children}
      </div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
}) {
  return (
    <div className="config-toggle-row">
      <div className="config-toggle-info">
        <strong>{label}</strong>
        {description && <p>{description}</p>}
      </div>

      <button
        type="button"
        className={`config-toggle ${
          checked ? "toggle-on" : ""
        }`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}

export default function Configuration() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    const warning = Number(settings.warningThreshold);
    const critical = Number(settings.criticalThreshold);
    const sampling = Number(settings.samplingInterval);

    if (
      settings.equipmentName.trim() === "" ||
      settings.equipmentId.trim() === ""
    ) {
      window.alert("Equipment name and ID are required.");
      return;
    }

    if (
      !Number.isFinite(warning) ||
      !Number.isFinite(critical) ||
      warning <= 0 ||
      critical <= warning
    ) {
      window.alert(
        "Critical threshold must be higher than the warning threshold."
      );
      return;
    }

    if (
      !Number.isFinite(sampling) ||
      sampling < 1 ||
      sampling > 3600
    ) {
      window.alert(
        "Sampling interval must be between 1 and 3600 seconds."
      );
      return;
    }

    setSaved(true);
    window.alert(
      "Configuration validated for this demonstration. Settings are not persisted."
    );
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaved(false);
  };

  return (
    <main className="main-content configuration-page">
      {/* PAGE HEADING */}

      <div className="config-page-heading">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-line" />
            SYSTEM CONTROL
          </div>

          <h1>Configuration & Settings</h1>

          <p>
            Configure equipment parameters, monitoring
            behaviour and system preferences.
          </p>
        </div>

        <div className="config-demo-badge">
          <Settings size={14} />
          DEMO CONFIGURATION
        </div>
      </div>

      {/* CONFIGURATION SUMMARY */}

      <div className="config-summary-strip">
        <div className="config-summary-item">
          <div className="config-summary-icon">
            <Cpu size={18} />
          </div>

          <div>
            <span>Equipment</span>
            <strong>{settings.equipmentId}</strong>
          </div>
        </div>

        <div className="config-summary-item">
          <div className="config-summary-icon">
            <Radio size={18} />
          </div>

          <div>
            <span>Controller</span>
            <strong>{settings.controller}</strong>
          </div>
        </div>

        <div className="config-summary-item">
          <div className="config-summary-icon">
            <Activity size={18} />
          </div>

          <div>
            <span>Sampling interval</span>
            <strong>{settings.samplingInterval} sec</strong>
          </div>
        </div>

        <div className="config-summary-item">
          <div className="config-summary-icon config-summary-muted">
            <ShieldCheck size={18} />
          </div>

          <div>
            <span>Configuration status</span>
            <strong>
              {saved ? "Validated" : "Not validated"}
            </strong>
          </div>
        </div>
      </div>

      {/* EQUIPMENT CONFIGURATION */}

      <ConfigSection
        icon={Cpu}
        title="Equipment configuration"
        subtitle="Identify the monitored equipment and controller."
      >
        <div className="config-form-grid">
          <ConfigField
            label="Equipment name"
            description="Display name"
          >
            <input
              type="text"
              value={settings.equipmentName}
              onChange={(e) =>
                updateSetting(
                  "equipmentName",
                  e.target.value
                )
              }
            />
          </ConfigField>

          <ConfigField
            label="Equipment ID"
            description="Unique equipment identifier"
          >
            <input
              type="text"
              value={settings.equipmentId}
              onChange={(e) =>
                updateSetting(
                  "equipmentId",
                  e.target.value
                )
              }
            />
          </ConfigField>

          <ConfigField
            label="Controller"
            description="Edge device"
          >
            <select
              value={settings.controller}
              onChange={(e) =>
                updateSetting(
                  "controller",
                  e.target.value
                )
              }
            >
              <option value="ESP32">ESP32</option>
              <option value="ESP32-S3">ESP32-S3</option>
              <option value="ESP8266">ESP8266</option>
              <option value="Arduino">Arduino</option>
              <option value="Other">Other</option>
            </select>
          </ConfigField>

          <ConfigField
            label="Sensor type"
            description="Measurement hardware"
          >
            <select
              value={settings.sensorType}
              onChange={(e) =>
                updateSetting(
                  "sensorType",
                  e.target.value
                )
              }
            >
              <option value="Infrared temperature sensor">
                Infrared temperature sensor
              </option>

              <option value="Thermocouple">
                Thermocouple
              </option>

              <option value="RTD">
                RTD
              </option>

              <option value="Thermistor">
                Thermistor
              </option>

              <option value="Not finalized">
                Not finalized
              </option>
            </select>
          </ConfigField>

          <ConfigField
            label="Monitoring location"
            description="Equipment location"
          >
            <input
              type="text"
              value={settings.location}
              onChange={(e) =>
                updateSetting(
                  "location",
                  e.target.value
                )
              }
            />
          </ConfigField>

          <ConfigField
            label="Temperature unit"
            description="Measurement unit"
          >
            <select
              value={settings.temperatureUnit}
              onChange={(e) =>
                updateSetting(
                  "temperatureUnit",
                  e.target.value
                )
              }
            >
              <option value="Celsius (°C)">
                Celsius (°C)
              </option>

              <option value="Fahrenheit (°F)">
                Fahrenheit (°F)
              </option>
            </select>
          </ConfigField>
        </div>
      </ConfigSection>

      {/* THRESHOLDS */}

      <ConfigSection
        icon={Thermometer}
        title="Thermal thresholds"
        subtitle="Set demonstration alert limits for the monitoring interface."
      >
        <div className="config-threshold-banner">
          <AlertTriangle size={17} />

          <p>
            <strong>Illustrative values only.</strong>{" "}
            Confirm actual temperature limits with
            equipment specifications and engineering
            validation before deployment.
          </p>
        </div>

        <div className="config-form-grid">
          <ConfigField
            label="Warning threshold"
            description="Temperature alert level"
          >
            <div className="config-input-with-unit">
              <input
                type="number"
                min="1"
                value={settings.warningThreshold}
                onChange={(e) =>
                  updateSetting(
                    "warningThreshold",
                    e.target.value
                  )
                }
              />

              <span>°C</span>
            </div>
          </ConfigField>

          <ConfigField
            label="Critical threshold"
            description="High temperature alert level"
          >
            <div className="config-input-with-unit">
              <input
                type="number"
                min="1"
                value={settings.criticalThreshold}
                onChange={(e) =>
                  updateSetting(
                    "criticalThreshold",
                    e.target.value
                  )
                }
              />

              <span>°C</span>
            </div>
          </ConfigField>
        </div>

        <div className="config-threshold-visual">
          <div className="config-zone-block config-zone-normal">
            <span>Normal zone</span>
            <strong>
              Below {settings.warningThreshold || "--"}°C
            </strong>
          </div>

          <div className="config-zone-block config-zone-warning">
            <span>Warning zone</span>
            <strong>
              {settings.warningThreshold || "--"}°C to{" "}
              {settings.criticalThreshold || "--"}°C
            </strong>
          </div>

          <div className="config-zone-block config-zone-critical">
            <span>Critical zone</span>
            <strong>
              Above {settings.criticalThreshold || "--"}°C
            </strong>
          </div>
        </div>
      </ConfigSection>

      {/* SAMPLING */}

      <ConfigSection
        icon={SlidersHorizontal}
        title="Sampling & data"
        subtitle="Configure the monitoring data collection behaviour."
      >
        <div className="config-form-grid">
          <ConfigField
            label="Sampling interval"
            description="Interval between readings"
          >
            <div className="config-input-with-unit">
              <input
                type="number"
                min="1"
                max="3600"
                value={settings.samplingInterval}
                onChange={(e) =>
                  updateSetting(
                    "samplingInterval",
                    e.target.value
                  )
                }
              />

              <span>sec</span>
            </div>
          </ConfigField>

          <ConfigField
            label="Averaging window"
            description="Sample count for averaging"
          >
            <select
              value={settings.averagingWindow}
              onChange={(e) =>
                updateSetting(
                  "averagingWindow",
                  e.target.value
                )
              }
            >
              <option value="1">1 reading</option>
              <option value="3">3 readings</option>
              <option value="5">5 readings</option>
              <option value="10">10 readings</option>
            </select>
          </ConfigField>

          <ConfigField
            label="Data retention"
            description="Demo retention period"
          >
            <div className="config-input-with-unit">
              <input
                type="number"
                min="1"
                max="365"
                value={settings.dataRetention}
                onChange={(e) =>
                  updateSetting(
                    "dataRetention",
                    e.target.value
                  )
                }
              />

              <span>days</span>
            </div>
          </ConfigField>
        </div>
      </ConfigSection>

      {/* ALERT SETTINGS */}

      <ConfigSection
        icon={Bell}
        title="Alert preferences"
        subtitle="Control the alert categories displayed by the system."
      >
        <ToggleSwitch
          checked={settings.alertEnabled}
          onChange={(value) =>
            updateSetting("alertEnabled", value)
          }
          label="Enable alert system"
          description="Enable or disable the alert preference simulation."
        />

        <div
          className={`config-alert-options ${
            settings.alertEnabled
              ? ""
              : "config-options-disabled"
          }`}
        >
          <ToggleSwitch
            checked={settings.warningAlert}
            onChange={(value) =>
              updateSetting("warningAlert", value)
            }
            label="Warning temperature alerts"
            description="Display alerts when the warning level is reached."
          />

          <ToggleSwitch
            checked={settings.criticalAlert}
            onChange={(value) =>
              updateSetting("criticalAlert", value)
            }
            label="Critical temperature alerts"
            description="Display alerts when the critical level is reached."
          />

          <ToggleSwitch
            checked={settings.sensorAlert}
            onChange={(value) =>
              updateSetting("sensorAlert", value)
            }
            label="Sensor fault alerts"
            description="Display sensor diagnostic fault notifications."
          />

          <ToggleSwitch
            checked={settings.connectionAlert}
            onChange={(value) =>
              updateSetting("connectionAlert", value)
            }
            label="Connectivity alerts"
            description="Display controller connection notifications."
          />
        </div>
      </ConfigSection>

      {/* CONNECTIVITY */}

      <ConfigSection
        icon={Wifi}
        title="Connectivity"
        subtitle="Configure connection behaviour for the edge controller."
      >
        <ToggleSwitch
          checked={settings.autoReconnect}
          onChange={(value) =>
            updateSetting("autoReconnect", value)
          }
          label="Automatic reconnection"
          description="Enable automatic reconnection in the planned device workflow."
        />

        <div className="config-form-grid config-connectivity-grid">
          <ConfigField
            label="Connection timeout"
            description="Illustrative timeout duration"
          >
            <div className="config-input-with-unit">
              <input
                type="number"
                min="1"
                max="120"
                value={settings.connectionTimeout}
                onChange={(e) =>
                  updateSetting(
                    "connectionTimeout",
                    e.target.value
                  )
                }
              />

              <span>sec</span>
            </div>
          </ConfigField>
        </div>

        <div className="config-connection-status">
          <div className="config-connection-status-icon">
            <Radio size={18} />
          </div>

          <div>
            <strong>Controller communication</strong>

            <p>
              Hardware connection has not been established.
              Settings represent a configuration preview.
            </p>
          </div>

          <span className="config-offline-tag">
            Offline
          </span>
        </div>
      </ConfigSection>

      {/* SAVE PANEL */}

      <section className="config-save-panel">
        <div className="config-save-info">
          <div className="config-save-icon">
            {saved ? (
              <CheckCircle2 size={20} />
            ) : (
              <Clock3 size={20} />
            )}
          </div>

          <div>
            <strong>
              {saved
                ? "Configuration validated"
                : "Configuration not validated"}
            </strong>

            <p>
              {saved
                ? "Demo validation completed. No settings were persisted."
                : "Review your settings and validate them using the save action."}
            </p>
          </div>
        </div>

        <div className="config-save-actions">
          <button
            type="button"
            className="config-reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="button"
            className="config-save-button"
            onClick={handleSave}
          >
            <Save size={16} />
            Validate configuration
          </button>
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