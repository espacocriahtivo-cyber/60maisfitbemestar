import { ExerciseItem, HealthMetrics, EvolutionDataPoint, ReminderItem, SubscriptionPlan, UserProfile, AnamneseData, PhysicalAssessmentData } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Maria Silva',
  birthDate: '15/03/1956',
  weight: '62',
  height: '1,58',
  email: 'maria.silva@email.com',
  phone: '(11) 98765-4321',
  cpf: '123.456.789-00',
  goal: 'Ganhar força e independência',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwXmmQInZktZN_BfAfER7O3AI8zlS0i2wPh9tz6ro5ea7s1upIN2m4rQ5dC7BHlrfQmqdxZIQlC4yAeizjDa9w5CeU2UIz2Z6UoY_Kjfnjmw9He1S_jzouiZ0MldtpRQcnDeYh8J-C6Dbq2dBKN8SVXCvUljzfRWiMkKmgVoOOj2jdi-dgsCSiHqwlmKHPRXLjDE7FPbSiYQMCwNDmvZV3tokV6AkyPg3hpp4skQHMM6XNZs0TpBZl',
  role: 'student',
  completedWorkoutsThisMonth: 18,
  targetWeight: '58',
};

export const SPLASH_BACKGROUND_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGulXtfyeP0sjXBWduYAuXRH2EReS67VYqdlWiry2DkMEY2ARzjMWOnZsi1Bdo9gTDYXMiv1P-jqhvDjGS6tbUzClGO7BgAgcob6j_j86FtlkYgkkdS8eGzQDULeIk47orlUmjAG_savwB1ryxFQ_uNFDNpZhtgde4EIVkDpbMWAJEvuwK8pRcaMiqyR51qXCYeKfLxIx_HzWmLXJyf9HTfCNS9-VHgxy-0TGd9X6O_XqAGBhPdLzNMP-uxM_ILhjbow';

export const COUPLE_HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgm1y0X483EC9WWZoNXuMOiCDpzkAw5GXPmyuCk1T3QIvuywPdwQRNNWuhc_WI7NjTspXFT2nlWqHsWlRxTK16Ty2gFiSw2Y6g20SHfGvXMexy77tSl78KkKjAd8znJZOX64n4j6uql2yQULUPvOvVLqnODe7GsS4GgA1CgyDByRWVNicWZ26LQUUYFddxSPCYuTiWgcRU4rI6awdRKKh8_dkn3LqXw68Te5YYgPfuIgn1sGhTf-DS';

export const TRAINER_AVATAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWKinBi9WtQdx_k93Z9J9sm8NMXiqtYgcsAmqD1F91SttIZ2m3x0EJkSkCFn8vruMJIQlUXeTnI8iW01CueWy_wgF-vJL-HzWG5v3ocL08QO3nlIhmvF5UQLnbIHS36VDg6gPiRUf6pJpeUxISXdnA4tVIl0bIukVcl5RG6fhGsnR1n09UIks_hRrzQXl5ng4tmoCHtBhPL2-6LkoUUW8jtvDpkEEL3NeLSYlInyZq7d3t_lF1cF1K';

export const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: 'ex-1',
    name: 'Aquecimento',
    repetitions: '3 x 12 repetições',
    series: 3,
    restSeconds: 30,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6LttPRFB_YjWMZb7kWYb8KZiUb-zXNoN80XKz08v9IXI6GemeT_zKavFm2fGeRYxcVHisn53tAq78PNfkJKTKVm4oq6jbg_yEpfKv-h-7n4pfQigu7XO5MZxakoH7CDLvcDqTreMiGwTI2Bb2k0FleYRqg0UErplxxHb62hopcJjYCkYvhVqwZqBgO6IE9KHnPN3SOsU6bNNTZgxiGDJHDQ0mc2I7mn5Y29NOk2M2OJDayyJADZlV',
    instructionText: 'Movimente os braços e as pernas de forma suave para aquecer a musculatura e lubrificar as articulações.',
    videoDurationSeconds: 10,
  },
  {
    id: 'ex-2',
    name: 'Elevação de joelho com elástico',
    repetitions: '3 x 12 repetições',
    series: 3,
    restSeconds: 30,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Hvb9mnWdCedQ71cQCF7OoJE3kkGlPOdNtuInVaCf0W2kgFShquUS2oqZTM7qhbE-IBJj5JGfJiZUrRvrDDUa3a27xsWRon_kywhzs30goxhRQj6BsBrZduvHpUocd8s4bteXDBofoadbl6dEg3E4GTE5i2Gek_2S7mABYSMwMLdt93sarkAf0Rn_wqGAcwxxtTw7ZFgUxpB9yGBr7xKfy-6PP0dlY_r1jpouzyGAlIuQtOMoAnmC',
    instructionText: 'Mantenha a postura ereta e realize o movimento de forma controlada.',
    videoDurationSeconds: 10,
  },
  {
    id: 'ex-3',
    name: 'Sentar e levantar',
    repetitions: '3 x 12 repetições',
    series: 3,
    restSeconds: 30,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgs873zWLIQwpEVMEEFpY6ljcSVTMe1wSQHzXz25iwi6bro7YtBNrEd5JX3QkITJ9drNGKaYetpbB1p5rKHMc70jQ16Rojc6gf1vCrPJIwdgMA0eP3x5i2DjFI88YYmejCy1cxNioljtqieUkWUA2Pa9C9m4QMbYZNX4tWCCshSqLkk-tHTX2WOOWkEASv9BlFZLfxMb3o-9-UHwiJHKHEI1S1JvVLDSqXP0NF-16xTyRSj-LxtF-y',
    instructionText: 'Apoie os pés firmes no chão, projete o quadril para trás e levante com segurança usando a força das pernas.',
    videoDurationSeconds: 10,
  },
  {
    id: 'ex-4',
    name: 'Remada',
    repetitions: '3 x 12 repetições',
    series: 3,
    restSeconds: 30,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-GUmj8SbWptGUuhbLEbHzMuCjM3ugdpSTZeNlaifEJjx7pKXr1AcTVOZzRt2kak0FkB9mVOZU-8l3xRUEZAbJGH1YEjtoJF2cHlUBUC-BXDCg3hLakeOPoBWyVJGU92FXyc3jtcd2g6wzM6d0a0_foATa51MuVWY4tbw4TBO_FSMqZ9Yc_GbxGJEaDmrVeBptWqC8CLbUmN3KA8NQ2D77kk8PGGephEiwp1q2Bs2RjlougSmAAcAe',
    instructionText: 'Puxe o elástico em direção ao abdômen, mantendo as costas alinhadas e aproximando as escápulas.',
    videoDurationSeconds: 10,
  },
  {
    id: 'ex-5',
    name: 'Extensão de joelho',
    repetitions: '3 x 12 repetições',
    series: 3,
    restSeconds: 30,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAK3khEt9FdSIiW7gflZDAvjPxXZCJwwipjq3lWcJIqi5NUqb84e8TgwEzgj7-hhwJmiXHRNSsWITytjrBDzQd3yFF-98pVHScPPuZ5K3-Mbs9Y1hMqrR_ugb9RFbz-WUbaz7GvngsIfjOBzfGG3PlFEU_nfMIwMyodJogFKhLMxAafOq3tOIdnB_Cme9XkyKbbhJBfXIQQzUuyxtw7-oMhLTC-eM2a0QZ3VWI8UGlX-QT0_Dyn-jq',
    instructionText: 'Sentado com a postura correta, estenda a perna à frente contraindo o quadríceps e retorne lentamente.',
    videoDurationSeconds: 10,
  },
];

export const INITIAL_HEALTH_METRICS: HealthMetrics = {
  heartRate: 72,
  bloodPressure: '120 / 80',
  oxygenSaturation: 98,
  lastUpdated: 'Hoje, 09:30',
};

export const INITIAL_EVOLUTION: EvolutionDataPoint[] = [
  { month: 'Jan', weight: 60, forceIndex: 65, balanceScore: 70 },
  { month: 'Fev', weight: 59, forceIndex: 68, balanceScore: 72 },
  { month: 'Mar', weight: 62, forceIndex: 74, balanceScore: 77 },
  { month: 'Abr', weight: 63, forceIndex: 78, balanceScore: 82 },
  { month: 'Mai', weight: 62, forceIndex: 83, balanceScore: 86 },
  { month: 'Jun', weight: 61, forceIndex: 88, balanceScore: 90 },
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  { id: 'rem-1', title: 'Treino de hoje', timeOrDate: '08:00', iconType: 'calendar', enabled: true },
  { id: 'rem-2', title: 'Tomar água', timeOrDate: '10:00', iconType: 'water', enabled: true },
  { id: 'rem-3', title: 'Registrar pressão', timeOrDate: '12:00', iconType: 'heart', enabled: true },
  { id: 'rem-4', title: 'Avaliação mensal', timeOrDate: '01/10', iconType: 'clipboard', enabled: false },
  { id: 'rem-5', title: 'Consulta médica', timeOrDate: '15/10', iconType: 'medical', enabled: true },
];

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'gratuito',
    name: 'Gratuito',
    price: 'R$ 0,00',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-100',
  },
  {
    id: 'essencial',
    name: 'Essencial',
    price: 'R$ 29,90',
    period: '/mês',
    badgeText: 'Acesso aos programas',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 49,90',
    period: '/mês',
    badgeText: 'Todos os recursos',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'personalizado',
    name: 'Personalizado',
    price: 'R$ 89,90 – 149,90',
    period: '/mês',
    badgeText: 'Acompanhamento individual',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export const INITIAL_ANAMNESE: AnamneseData = {
  hipertensao: true,
  diabetes: false,
  cardiacos: false,
  artrose: true,
  osteoporose: false,
  obesidade: false,
  outras: false,
  observacoes: 'Paciente relata dores leves no joelho direito após caminhadas longas. Liberação médica recente para musculação funcional.',
};

export const INITIAL_PHYSICAL_ASSESSMENT: PhysicalAssessmentData = {
  weight: '62',
  height: '1,58',
  bloodPressure: '120 / 80 mmHg',
  heartRate: '72 bpm',
  oxygenSaturation: '98%',
  functionalNotes: 'Boa amplitude articular nos ombros. Equilíbrio unipodal estável por 12 segundos com apoio leve.',
};
