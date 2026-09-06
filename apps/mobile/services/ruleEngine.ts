import { RuleEvaluator } from '@pashurax/rules';

const evaluator = new RuleEvaluator();

export function evaluateAnimalSymptoms(data) {
  return evaluator.evaluateSymptoms(data);
}
