
import { Activity, Radio, ScanLine } from "lucide-react";

export default function EquipmentVisualization() {
  return (
    <section className="equipment-visual-panel">
      <div className="equipment-visual-header">
        <div>
          <div className="equipment-eyebrow">
            <ScanLine size={14} />
            EQUIPMENT SCHEMATIC
          </div>
          <h3>Thermal sensing zone</h3>
          <p>Converter shell · Non-contact monitoring concept</p>
        </div>

        <div className="schematic-tag">SCHEMATIC</div>
      </div>

      <div className="equipment-visual-stage">
        <div className="schematic-grid" />

        <svg
          className="converter-svg"
          viewBox="0 0 560 310"
          role="img"
          aria-label="Illustrative converter enclosure with non-contact temperature sensing position"
        >
          <defs>
            <linearGradient id="shellBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#293b47" />
              <stop offset="55%" stopColor="#1c2b35" />
              <stop offset="100%" stopColor="#111e28" />
            </linearGradient>

            <linearGradient id="shellTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#354b57" />
              <stop offset="100%" stopColor="#233541" />
            </linearGradient>

            <radialGradient id="sensorGlow">
              <stop offset="0%" stopColor="#20d6c2" stopOpacity=".32" />
              <stop offset="100%" stopColor="#20d6c2" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient sensing glow */}
          <circle
            cx="385"
            cy="160"
            r="95"
            fill="url(#sensorGlow)"
          />

          {/* Enclosure top */}
          <path
            d="M120 85 L360 35 L462 84 L222 134 Z"
            fill="url(#shellTop)"
            stroke="#536c79"
            strokeWidth="1.4"
          />

          {/* Enclosure side */}
          <path
            d="M222 134 L462 84 L462 245 L222 295 Z"
            fill="#15232d"
            stroke="#425966"
            strokeWidth="1.4"
          />

          {/* Main enclosure face */}
          <path
            d="M120 85 L222 134 L222 295 L120 246 Z"
            fill="url(#shellBody)"
            stroke="#526a77"
            strokeWidth="1.4"
          />

          {/* Face panel */}
          <path
            d="M140 103 L201 133 L201 271 L140 242 Z"
            fill="#1b2a34"
            stroke="#354d59"
          />

          {/* Ventilation lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="151"
              y1={120 + i * 14}
              x2="188"
              y2={138 + i * 14}
              stroke="#49616e"
              strokeWidth="2"
              opacity=".65"
            />
          ))}

          {/* Side heat surface */}
          <path
            d="M240 150 L440 109 L440 225 L240 266 Z"
            fill="#182833"
            stroke="#304651"
          />

          {/* Heat fins */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1={258 + i * 20}
              y1={145 - i * 4}
              x2={258 + i * 20}
              y2={251 - i * 4}
              stroke="#435966"
              strokeWidth="3"
              opacity=".65"
            />
          ))}

          {/* Sensor target point */}
          <circle
            cx="355"
            cy="175"
            r="28"
            fill="#20d6c2"
            opacity=".08"
          />

          <circle
            cx="355"
            cy="175"
            r="16"
            fill="none"
            stroke="#20d6c2"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <circle
            cx="355"
            cy="175"
            r="5"
            fill="#20d6c2"
          />

          {/* Sensor targeting lines */}
          <path
            d="M355 175 L355 120 L415 120"
            fill="none"
            stroke="#20d6c2"
            strokeWidth="1.4"
            strokeDasharray="4 4"
          />

          {/* Sensor label */}
          <rect
            x="414"
            y="104"
            width="108"
            height="30"
            rx="6"
            fill="#122b30"
            stroke="#20d6c2"
            strokeOpacity=".35"
          />

          <text
            x="468"
            y="123"
            textAnchor="middle"
            fill="#20d6c2"
            fontSize="10"
            fontWeight="700"
          >
            SENSOR ZONE
          </text>

          {/* Equipment identity */}
          <rect
            x="260"
            y="206"
            width="92"
            height="24"
            rx="4"
            fill="#203641"
            stroke="#435b68"
          />

          <text
            x="306"
            y="221"
            textAnchor="middle"
            fill="#a9c2ce"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1"
          >
            CONV-01
          </text>

          {/* Bottom base */}
          <path
            d="M120 246 L222 295 L462 245 L462 258 L222 307 L120 258 Z"
            fill="#101b24"
            stroke="#3d5663"
            strokeWidth="1"
          />

          {/* Mounting feet */}
          <path
            d="M145 258 L160 265 L160 281 L145 274 Z"
            fill="#293b47"
            stroke="#526a77"
          />

          <path
            d="M400 265 L415 262 L415 279 L400 282 Z"
            fill="#293b47"
            stroke="#526a77"
          />
        </svg>

        <div className="schematic-legend">
          <div>
            <span className="legend-marker legend-teal" />
            <span>Target sensing area</span>
          </div>

          <div>
            <span className="legend-marker legend-grey" />
            <span>Converter enclosure</span>
          </div>
        </div>
      </div>

      <div className="equipment-visual-footer">
        <div className="equipment-footer-icon">
          <Radio size={16} />
        </div>

        <div className="equipment-footer-text">
          <strong>Non-contact sensing concept</strong>
          <span>
            Sensor placement is illustrative and must be
            validated against the actual converter.
          </span>
        </div>

        <Activity className="equipment-footer-activity" size={18} />
      </div>
    </section>
  );
}
