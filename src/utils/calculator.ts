import { defaultTaskMix, latencyData, taskWinRates, tasks } from '../data/evalData';
import type { CalculatorResult, Inputs } from '../types';

export function calculateRoi(inputs: Inputs): CalculatorResult {
  const taskRows = tasks.map((task) => {
    const winRow = taskWinRates.find((row) => row.task === task.key);
    const latencyRow = latencyData.find((row) => row.task === task.key);

    if (!winRow || !latencyRow) {
      throw new Error(`Missing task data for ${task.key}`);
    }

    const selectedRate = winRow.values[inputs.profileKey];
    const selectedLatency = latencyRow.values[inputs.profileKey];

    if (selectedRate == null) {
      throw new Error(`Missing win-rate data for profile ${inputs.profileKey} on task ${task.key}`);
    }

    if (selectedLatency == null) {
      throw new Error(`Missing latency data for profile ${inputs.profileKey} on task ${task.key}`);
    }

    const bestRate = Math.max(...Object.values(winRow.values));
    const gap = Math.max(0, bestRate - selectedRate);
    const mix = inputs.taskMix[task.key] ?? defaultTaskMix[task.key];
    const weightedGap = gap * mix;

    return {
      task: task.key,
      taskLabel: task.label,
      selectedRate,
      bestRate,
      gap,
      mix,
      weightedGap,
      selectedLatency,
      neutralLatency: latencyRow.neutral,
    };
  });

  const calculatedProductivityFactor = taskRows.reduce(
    (sum, row) => sum + row.weightedGap,
    0,
  );

  const weeklyHoursRecovered = inputs.weeklyLlmHours * calculatedProductivityFactor;
  const annualHoursRecovered = weeklyHoursRecovered * 52;
  const weeklyValueCreated = weeklyHoursRecovered * inputs.hourlyWage;
  const annualValueCreated = weeklyValueCreated * 52;
  const mixTotal = taskRows.reduce((sum, row) => sum + row.mix, 0);
  const isMixValid = Math.abs(mixTotal - 1) < 0.00001;

  return {
    calculatedProductivityFactor,
    weeklyHoursRecovered,
    annualHoursRecovered,
    weeklyValueCreated,
    annualValueCreated,
    taskRows,
    mixTotal,
    isMixValid,
  };
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatHours(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}