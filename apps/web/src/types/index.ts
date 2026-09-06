export enum UserRole {
  ADMIN = 'ADMIN',
  VET = 'VET',
  OFFICER = 'OFFICER',
}

export enum AnimalStatus {
  HEALTHY = 'HEALTHY',
  SICK = 'SICK',
  DEAD = 'DEAD',
}

export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum CaseStatus {
  SUSPECTED = 'SUSPECTED',
  CONFIRMED = 'CONFIRMED',
  RESOLVED = 'RESOLVED',
}

export enum SampleStatus {
  COLLECTED = 'COLLECTED',
  IN_TRANSIT = 'IN_TRANSIT',
  TESTING = 'TESTING',
  COMPLETED = 'COMPLETED',
}

export enum AlertType {
  OUTBREAK = 'OUTBREAK',
  INFO = 'INFO',
}

export interface User { id: string; email: string; name: string; role: UserRole; jurisdiction?: string; }
export interface Animal { id: string; tag_number: string; species: string; breed: string; birth_date: string; sex: string; owner: string; status: AnimalStatus; latitude: number; longitude: number; }
export interface Herd { id: string; name: string; location: string; }
export interface HealthRecord { id: string; animal_id: string; date: string; symptoms: string[]; temperature: number; severity: Severity; diagnosis?: string; notes?: string; }
export interface Disease { id: string; name: string; type: string; }
export interface Symptom { id: string; name: string; }
export interface Vaccination { id: string; animal_id: string; date: string; disease: string; next_due: string; }
export interface DiseaseReport { id: string; animal_id: string; date: string; suspected_disease: string; severity: Severity; status: CaseStatus; description: string; latitude: number; longitude: number; }
export interface MortalityReport { id: string; animal_id: string; date: string; cause: string; }
export interface Sample { id: string; barcode: string; report_id: string; type: string; status: SampleStatus; }
export interface LabResult { id: string; sample_id: string; result: string; date: string; }
export interface Alert { id: string; title: string; message: string; severity: Severity; type: AlertType; date: string; active: boolean; }
export interface RiskZone { id: string; name: string; risk_level: string; polygon: number[][]; }

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
