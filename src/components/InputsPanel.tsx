import { profiles, tasks } from '../data/evalData';
import type { Inputs, ProfileKey, TaskKey } from '../types';
import { formatPercent } from '../utils/calculator';

interface InputsPanelProps {
  inputs: Inputs;
  mixTotal: number;
  isMixValid: boolean;
  onInputChange: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void;
  onTaskMixChange: (task: TaskKey, value: number) => void;
  onNormalize: () => void;
}

export function InputsPanel({
  inputs,
  mixTotal,
  isMixValid,
  onInputChange,
  onTaskMixChange,
  onNormalize,
}: InputsPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">Inputs</div>

      <div className="panel-body stack-gap">
        <div className="input-grid compact-grid">
          <label>
            <span>Persona profile</span>
            <select
              value={inputs.profileKey}
              onChange={(event) => onInputChange('profileKey', event.target.value as ProfileKey)}
            >
              {profiles.map((profile) => (
                <option key={profile.key} value={profile.key}>
                  {profile.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Weekly LLM use (hours)</span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={inputs.weeklyLlmHours}
              onChange={(event) => onInputChange('weeklyLlmHours', Number(event.target.value))}
            />
          </label>

          <label>
            <span>Hourly wage (dollars)</span>
            <div className="currency-input-wrap">
              <span className="currency-prefix">$</span>
              <input
                className="currency-input"
                type="number"
                min="0"
                step="1"
                value={inputs.hourlyWage}
                onChange={(event) => onInputChange('hourlyWage', Number(event.target.value))}
              />
            </div>
          </label>
        </div>

        <div>
          <div className="subsection-title">
            <span>Task mix</span>
            <span className="info-icon">
              ⓘ
              <span className="tooltip">
                Set the amount of time by percentage you spend performing each type of task.
              </span>
            </span>
          </div>
          <div className="task-table-wrap">
            <table className="task-table">
              <thead>
                <tr>
                  <th className="center-header">Task</th>
                  <th className="center-header">Mix</th>
                  <th className="center-header">Example prompt</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.key}>
                    <td>{task.label}</td>
                    <td>
                      <div className="mix-cell">
                        <input
                          className="mix-input"
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={(inputs.taskMix[task.key] * 100).toFixed(0)}
                          onChange={(event) =>
                            onTaskMixChange(task.key, Number(event.target.value) / 100)
                          }
                        />
                        <span className="mix-suffix">%</span>
                      </div>
                    </td>
                    <td className="sample-prompt">{task.samplePrompt}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{formatPercent(mixTotal)}</td>
                  <td>{isMixValid ? 'Ready' : 'Must equal 100%'}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="inline-actions">
            <button type="button" className="ghost-button" onClick={onNormalize}>
              Normalize to 100%
            </button>
            <span className={isMixValid ? 'status-ok' : 'status-warn'}>
              {isMixValid
                ? 'Task mix is valid.'
                : 'Adjust or normalize the mix so the total equals 100%.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
