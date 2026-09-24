export type ScreenType =
  | 'splash'
  | 'role-select'
  | 'login'
  | 'register'
  | 'anamnese'
  | 'physical-assessment'
  | 'student-home'
  | 'workout'
  | 'exercise-detail'
  | 'health'
  | 'evolution'
  | 'reminders'
  | 'plans'
  | 'profile'
  | 'professional';

export type UserRole = 'student' | 'professional';

export interface ExerciseItem {
  id: string;
  name: string;
  repetitions: string;
  series: number;
  restSeconds: number;
  imageUrl: string;
  instructionText: string;
  videoDurationSeconds: number;
}

export interface WorkoutData {
  id: string;
  title: string;
  subtitle: string;
  exercises: ExerciseItem[];
}

export interface HealthMetrics {
  heartRate: number;
  bloodPressure: string;
  oxygenSaturation: number;
  lastUpdated: string;
}

export interface EvolutionDataPoint {
  month: string;
  weight: number;
  forceIndex?: number;
  balanceScore?: number;
}

export interface ReminderItem {
  id: string;
  title: string;
  timeOrDate: string;
  iconType: 'calendar' | 'water' | 'heart' | 'clipboard' | 'medical';
  enabled: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  badgeText?: string;
  iconColor: string;
  bgColor: string;
  isPopular?: boolean;
}

export interface UserProfile {
  name: string;
  birthDate: string;
  weight: string;
  height: string;
  email: string;
  phone: string;
  cpf: string;
  goal: string;
  avatarUrl: string;
  role: UserRole;
  completedWorkoutsThisMonth: number;
  targetWeight: string;
}

export interface AnamneseData {
  hipertensao: boolean;
  diabetes: boolean;
  cardiacos: boolean;
  artrose: boolean;
  osteoporose: boolean;
  obesidade: boolean;
  outras: boolean;
  observacoes: string;
}

export interface PhysicalAssessmentData {
  weight: string;
  height: string;
  bloodPressure: string;
  heartRate: string;
  oxygenSaturation: string;
  functionalNotes?: string;
}

export interface AppAccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  ttsEnabled: boolean;
}
