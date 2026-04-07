export type TaskKey =
  | 'summarization'
  | 'decision_support'
  | 'recommendation'
  | 'ideation'
  | 'explanation'
  | 'risk_analysis'
  | 'writing';

export interface TaskDefinition {
  key: TaskKey;
  label: string;
  samplePrompt: string;
}

export interface Profile {
  key: string;
  label: string;
}

export interface TaskWinRates {
  task: TaskKey;
  values: Record<string, number>;
}

export interface LatencyEntry {
  task: TaskKey;
  neutral: number;
  values: Record<string, number>;
}

export interface Inputs {
  profileKey: string;
  weeklyLlmHours: number;
  hourlyWage: number;
  taskMix: Record<TaskKey, number>;
}

export interface TaskOpportunity {
  task: TaskKey;
  taskLabel: string;
  selectedRate: number;
  bestRate: number;
  gap: number;
  mix: number;
  weightedGap: number;
  selectedLatency: number;
  neutralLatency: number;
}

export interface CalculatorResult {
  calculatedProductivityFactor: number;
  weeklyHoursRecovered: number;
  annualHoursRecovered: number;
  weeklyValueCreated: number;
  annualValueCreated: number;
  taskRows: TaskOpportunity[];
  mixTotal: number;
  isMixValid: boolean;
}
