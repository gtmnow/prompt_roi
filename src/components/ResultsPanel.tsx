import type { CalculatorResult } from '../types';
import { formatCurrency, formatHours, formatPercent } from '../utils/calculator';

interface ResultsPanelProps {
  result: CalculatorResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">Results</div>

      <div className="panel-body">
        <div className="results-grid">
          <Metric
            label="Calculated productivity factor"
            value={formatPercent(result.calculatedProductivityFactor)}
            info="This shows your potential efficiency gain from better prompt-persona alignment."
          />

          <Metric
            label="Weekly value created"
            value={formatCurrency(result.weeklyValueCreated)}
            info="Estimated weekly economic value of time recovered based on your inputs."
          />

          <Metric
            label="Annual hours recovered"
            value={formatHours(result.annualHoursRecovered)}
            info="Total hours you could recover annually if efficiency gains are realized."
          />

          <Metric
            label="Annual value created"
            value={formatCurrency(result.annualValueCreated)}
            info="Estimated annual economic value created from improved efficiency."
            className="metric-card-emphasis"
          />
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  info,
  className = '',
}: {
  label: string;
  value: string;
  info?: string;
  className?: string;
}) {
  const classes = ['metric-card', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="metric-label">
        <span>{label}</span>
        {info && (
          <span className="info-icon">
            ⓘ
            <span className="tooltip">{info}</span>
          </span>
        )}
      </div>

      <div className="metric-value">{value}</div>
    </div>
  );
}