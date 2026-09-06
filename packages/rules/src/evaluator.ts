import jsonLogic from 'json-logic-js';
import { diseaseRules } from './definitions';

export interface EvaluationInput {
  species: string;
  temperature_celsius: number;
  symptoms: string[];
}

export class RuleEvaluator {
  rules = diseaseRules;

  evaluateSymptoms(data: EvaluationInput) {
    let maxRisk = 'LOW';
    const suspected_diseases: any[] = [];
    const alerts: any[] = [];

    for (const ruleDef of this.rules) {
      if (!ruleDef.target_species.includes(data.species.toUpperCase())) {
        continue;
      }

      const isMatch = jsonLogic.apply(ruleDef.rule, data);

      if (isMatch) {
        suspected_diseases.push({
          disease: ruleDef.name,
          confidence: 'HIGH',
          severity: ruleDef.severity,
          action: ruleDef.action,
          differential_diagnosis: ruleDef.differential
        });

        if (ruleDef.biosafety_alert) {
          alerts.push({
            type: ruleDef.biosafety_alert,
            message: ruleDef.action
          });
        }
      }
    }

    if (suspected_diseases.some(d => d.severity === 'CRITICAL')) {
      maxRisk = 'CRITICAL';
    } else if (suspected_diseases.some(d => d.severity === 'HIGH')) {
      maxRisk = 'HIGH';
    }

    return {
      risk_level: maxRisk,
      suspected_diseases,
      alerts
    };
  }
}
