export enum UserRole {
  FARMER = 'FARMER',
  FIELD_VET = 'FIELD_VET',
  LAB_TECH = 'LAB_TECH',
  DISTRICT_OFFICER = 'DISTRICT_OFFICER',
  STATE_ADMIN = 'STATE_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum AnimalStatus {
  HEALTHY = 'HEALTHY',
  SICK = 'SICK',
  UNDER_TREATMENT = 'UNDER_TREATMENT',
  QUARANTINED = 'QUARANTINED',
  DECEASED = 'DECEASED'
}

export enum Severity {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum CaseStatus {
  SUSPECTED = 'SUSPECTED',
  CONFIRMED = 'CONFIRMED',
  RESOLVED = 'RESOLVED'
}

export enum SampleStatus {
  COLLECTED = 'COLLECTED',
  IN_TRANSIT = 'IN_TRANSIT',
  RECEIVED = 'RECEIVED',
  TESTING = 'TESTING',
  COMPLETED = 'COMPLETED'
}

export enum AlertType {
  OUTBREAK = 'OUTBREAK',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ACTION_REQUIRED = 'ACTION_REQUIRED'
}

export enum AnimalSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum Species {
  CATTLE = 'CATTLE',
  BUFFALO = 'BUFFALO',
  GOAT = 'GOAT',
  SHEEP = 'SHEEP',
  PIG = 'PIG',
  POULTRY = 'POULTRY',
  HORSE = 'HORSE',
  DONKEY = 'DONKEY',
  CAMEL = 'CAMEL'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  jurisdiction?: string;
}

export interface Animal {
  id: string;
  tag_number: string;
  species: Species;
  breed?: string;
  birth_date: string;
  sex: AnimalSex;
  status: AnimalStatus;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Herd {
  id: string;
  name: string;
  owner_id: string;
}

export interface HealthRecord {
  id: string;
  animal_id: string;
  date: string;
  symptoms: string[];
  temperature: number;
  notes?: string;
  recorded_by: string;
}

export interface Disease {
  id: string;
  name: string;
  species_affected: Species[];
}

export interface Symptom {
  id: string;
  name: string;
}

export interface Vaccination {
  id: string;
  animal_id: string;
  disease_target: string;
  vaccine_name: string;
  administered_date: string;
  next_due?: string;
  batch_number?: string;
}

export interface DiseaseReport {
  id: string;
  animal_id: string;
  disease_id: string;
  status: CaseStatus;
  severity: Severity;
  reported_by: string;
  reported_at: string;
}

export interface MortalityReport {
  id: string;
  animal_id: string;
  date: string;
  cause?: string;
}

export interface Sample {
  id: string;
  animal_id: string;
  sample_type: string;
  barcode: string;
  collected_at: string;
  status: SampleStatus;
}

export interface LabResult {
  id: string;
  sample_id: string;
  test_type: string;
  result: string;
  date: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: Severity;
  message: string;
  created_at: string;
}

export interface RiskZone {
  id: string;
  name: string;
  level: Severity;
}

export interface SyncTombstone {
  id: string;
  table: string;
  deleted_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  code: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SyncPullRequest {
  last_pulled_at: number;
}

export interface SyncPullResponse {
  changes: any;
  timestamp: number;
}

export interface SyncPushRequest {
  changes: any;
  last_pulled_at: number;
}

export interface SyncPushResponse {
  success: boolean;
}
