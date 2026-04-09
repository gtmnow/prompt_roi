import { useMemo, useState } from 'react';
import { InputsPanel } from './components/InputsPanel';
import { MethodologyPanel } from './components/MethodologyPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { defaultTaskMix } from './data/evalData';
import type { Inputs, TaskKey } from './types';
import { calculateRoi } from './utils/calculator';

const initialInputs: Inputs = {
  profileKey: 'peacemaker',
  weeklyLlmHours: 4,
  annualSalary: 156000,
  taskMix: { ...defaultTaskMix },
};

function getUiScale(): number {
  if (typeof window === 'undefined') return 0.7;

  const params = new URLSearchParams(window.location.search);
  const rawScale = params.get('scale');

  if (!rawScale) return 0.7;

  const parsed = Number(rawScale);

  if (!Number.isFinite(parsed)) return 0.7;

  return Math.min(Math.max(parsed, 0.5), 1.5);
}

function App() {
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const result = useMemo(() => calculateRoi(inputs), [inputs]);

  const uiScale = useMemo(() => getUiScale(), []);
  const scaledWidth = `${100 / uiScale}%`;

  function updateInput<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function updateTaskMix(task: TaskKey, value: number) {
    const normalizedValue = Number.isFinite(value) ? Math.max(0, value) : 0;

    setInputs((current) => ({
      ...current,
      taskMix: {
        ...current.taskMix,
        [task]: normalizedValue,
      },
    }));
  }

  function normalizeTaskMix() {
    const total = Object.values(inputs.taskMix).reduce((sum, value) => sum + value, 0);
    if (total <= 0) return;

    const normalizedEntries = Object.entries(inputs.taskMix).map(([task, value]) => [
      task,
      value / total,
    ]);

    setInputs((current) => ({
      ...current,
      taskMix: Object.fromEntries(normalizedEntries) as Inputs['taskMix'],
    }));
  }

  return (
    <div className="app-scale-viewport">
      <div
        className="app-scale-frame"
        style={{
          transform: `scale(${uiScale})`,
          width: scaledWidth,
        }}
      >
        <div className="app-shell">
          <main className="single-column-layout">
            <section className="intro-panel">
              <h1>Estimate the potential value of better prompt-persona alignment.</h1>
              <p className="intro-copy">
                Enter weekly AI usage, an hourly wage, and your prompt mix to estimate recoverable
                time and value.
              </p>
            </section>

            <InputsPanel
              inputs={inputs}
              mixTotal={result.mixTotal}
              isMixValid={result.isMixValid}
              onInputChange={updateInput}
              onTaskMixChange={updateTaskMix}
              onNormalize={normalizeTaskMix}
            />

            <ResultsPanel result={result} />
            <MethodologyPanel />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;