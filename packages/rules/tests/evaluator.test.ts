import { RuleEvaluator } from '../src/evaluator';

describe('RuleEvaluator', () => {
  const evaluator = new RuleEvaluator();

  it('matches FMD', () => {
    const res = evaluator.evaluateSymptoms({
      species: 'CATTLE',
      temperature_celsius: 40.2,
      symptoms: ['oral_vesicles', 'drooling_salivation']
    });
    expect(res.suspected_diseases.length).toBeGreaterThan(0);
    expect(res.suspected_diseases[0].disease).toBe('Foot-and-Mouth Disease');
  });

  it('triggers Anthrax biosafety alert', () => {
    const res = evaluator.evaluateSymptoms({
      species: 'CATTLE',
      temperature_celsius: 38,
      symptoms: ['sudden_death', 'blood_from_orifices']
    });
    expect(res.alerts.length).toBeGreaterThan(0);
    expect(res.alerts[0].type).toBe('ANTHRAX_BIOHAZARD');
  });

  it('filters species correctly', () => {
    const res = evaluator.evaluateSymptoms({
      species: 'CATTLE',
      temperature_celsius: 41,
      symptoms: ['nasal_discharge', 'diarrhea']
    });
    // Should not trigger PPR for cattle
    expect(res.suspected_diseases.find(d => d.disease === 'Peste des Petits Ruminants')).toBeUndefined();
  });
});
