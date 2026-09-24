import {
  UserProfile,
  ExerciseItem,
  HealthMetrics,
  EvolutionDataPoint,
  ReminderItem,
  SubscriptionPlan,
  AnamneseData,
  PhysicalAssessmentData
} from '../types';
import {
  INITIAL_USER,
  INITIAL_EXERCISES,
  INITIAL_HEALTH_METRICS,
  INITIAL_EVOLUTION,
  INITIAL_REMINDERS,
  INITIAL_PLANS,
  INITIAL_ANAMNESE,
  INITIAL_PHYSICAL_ASSESSMENT,
  SPLASH_BACKGROUND_IMAGE,
  COUPLE_HERO_IMAGE,
  TRAINER_AVATAR_IMAGE
} from '../data/initialData';

export interface AppRemoteState {
  branding: {
    splashBg: string;
    coupleHero: string;
    trainerAvatar: string;
  };
  user: UserProfile;
  exercises: ExerciseItem[];
  health: HealthMetrics;
  evolution: EvolutionDataPoint[];
  reminders: ReminderItem[];
  plans: SubscriptionPlan[];
  anamnese: AnamneseData;
  physicalAssessment: PhysicalAssessmentData;
}

const STORAGE_KEY = '60plus_fit_app_data_v1';

class ApiService {
  private state: AppRemoteState;

  constructor() {
    this.state = this.loadFromStorage();
  }

  private loadFromStorage(): AppRemoteState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Erro ao carregar do localStorage', e);
    }
    return {
      branding: {
        splashBg: SPLASH_BACKGROUND_IMAGE,
        coupleHero: COUPLE_HERO_IMAGE,
        trainerAvatar: TRAINER_AVATAR_IMAGE,
      },
      user: { ...INITIAL_USER },
      exercises: [...INITIAL_EXERCISES],
      health: { ...INITIAL_HEALTH_METRICS },
      evolution: [...INITIAL_EVOLUTION],
      reminders: [...INITIAL_REMINDERS],
      plans: [...INITIAL_PLANS],
      anamnese: { ...INITIAL_ANAMNESE },
      physicalAssessment: { ...INITIAL_PHYSICAL_ASSESSMENT },
    };
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage', e);
    }
  }

  /**
   * Simula uma requisição fetch assíncrona para obter os dados do aplicativo
   */
  async fetchAppData(): Promise<AppRemoteState> {
    // Simula latência de rede realista de 150ms
    await new Promise((resolve) => setTimeout(resolve, 150));
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Atualiza os dados do perfil do aluno
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    this.state.user = { ...this.state.user, ...updates };
    this.saveToStorage();
    return { ...this.state.user };
  }

  /**
   * Salva dados da Anamnese
   */
  async saveAnamnese(anamnese: AnamneseData): Promise<AnamneseData> {
    this.state.anamnese = { ...anamnese };
    this.saveToStorage();
    return { ...this.state.anamnese };
  }

  /**
   * Salva avaliação física
   */
  async savePhysicalAssessment(assessment: PhysicalAssessmentData): Promise<PhysicalAssessmentData> {
    this.state.physicalAssessment = { ...assessment };
    // Atualiza também nos dados do usuário para consistência
    this.state.user.weight = assessment.weight;
    this.state.user.height = assessment.height;
    this.saveToStorage();
    return { ...this.state.physicalAssessment };
  }

  /**
   * Registra novas métricas de saúde (batimento, pressão, saturação)
   */
  async recordHealthMetrics(metrics: Partial<HealthMetrics>): Promise<HealthMetrics> {
    const updated: HealthMetrics = {
      ...this.state.health,
      ...metrics,
      lastUpdated: 'Agora há pouco',
    };
    this.state.health = updated;
    this.saveToStorage();
    return { ...this.state.health };
  }

  /**
   * Alterna estado de um lembrete (liga/desliga)
   */
  async toggleReminder(id: string, enabled: boolean): Promise<ReminderItem[]> {
    this.state.reminders = this.state.reminders.map((r) =>
      r.id === id ? { ...r, enabled } : r
    );
    this.saveToStorage();
    return [...this.state.reminders];
  }

  /**
   * Adiciona um novo lembrete
   */
  async addReminder(reminder: Omit<ReminderItem, 'id'>): Promise<ReminderItem> {
    const newItem: ReminderItem = {
      ...reminder,
      id: `rem-${Date.now()}`,
    };
    this.state.reminders.push(newItem);
    this.saveToStorage();
    return newItem;
  }

  /**
   * Permite editar o link direto da imagem de um exercício (carregamento dinâmico)
   */
  async updateExerciseImage(exerciseId: string, newImageUrl: string): Promise<ExerciseItem[]> {
    this.state.exercises = this.state.exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, imageUrl: newImageUrl } : ex
    );
    this.saveToStorage();
    return [...this.state.exercises];
  }

  /**
   * Conclui um exercício e atualiza contador de treinos
   */
  async completeExercise(exerciseId: string): Promise<{ success: boolean; totalWorkouts: number }> {
    this.state.user.completedWorkoutsThisMonth += 1;
    this.saveToStorage();
    return { success: true, totalWorkouts: this.state.user.completedWorkoutsThisMonth };
  }

  /**
   * Importa JSON customizado externo
   */
  importCustomJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        this.state = {
          ...this.state,
          ...parsed,
        };
        this.saveToStorage();
        return true;
      }
    } catch (e) {
      console.error('Falha ao importar JSON', e);
    }
    return false;
  }

  /**
   * Restaura dados iniciais de fábrica
   */
  resetToDefaults(): AppRemoteState {
    localStorage.removeItem(STORAGE_KEY);
    this.state = {
      branding: {
        splashBg: SPLASH_BACKGROUND_IMAGE,
        coupleHero: COUPLE_HERO_IMAGE,
        trainerAvatar: TRAINER_AVATAR_IMAGE,
      },
      user: { ...INITIAL_USER },
      exercises: [...INITIAL_EXERCISES],
      health: { ...INITIAL_HEALTH_METRICS },
      evolution: [...INITIAL_EVOLUTION],
      reminders: [...INITIAL_REMINDERS],
      plans: [...INITIAL_PLANS],
      anamnese: { ...INITIAL_ANAMNESE },
      physicalAssessment: { ...INITIAL_PHYSICAL_ASSESSMENT },
    };
    return JSON.parse(JSON.stringify(this.state));
  }
}

export const apiService = new ApiService();
