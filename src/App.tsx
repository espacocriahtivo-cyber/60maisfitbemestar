import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  UserRole,
  ExerciseItem,
  AppAccessibilitySettings,
  UserProfile,
  AnamneseData,
  PhysicalAssessmentData,
  HealthMetrics,
  ReminderItem
} from './types';
import { apiService, AppRemoteState } from './services/apiService';

// Components
import { PhoneFrame } from './components/PhoneFrame';
import { AccessibilityModal } from './components/AccessibilityModal';
import { JsonDataModal } from './components/JsonDataModal';
import { SqlArchitectureModal } from './components/SqlArchitectureModal';
import { HostingerDeployModal } from './components/HostingerDeployModal';
import { OfflineIndicator } from './components/OfflineIndicator';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { RoleSelectScreen } from './screens/RoleSelectScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { AnamneseScreen } from './screens/AnamneseScreen';
import { PhysicalAssessmentScreen } from './screens/PhysicalAssessmentScreen';
import { StudentHomeScreen } from './screens/StudentHomeScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { ExerciseDetailScreen } from './screens/ExerciseDetailScreen';
import { HealthScreen } from './screens/HealthScreen';
import { EvolutionScreen } from './screens/EvolutionScreen';
import { RemindersScreen } from './screens/RemindersScreen';
import { PlansScreen } from './screens/PlansScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProfessionalScreen } from './screens/ProfessionalScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);

  // App data loaded dynamically from simulated API / LocalStorage
  const [appData, setAppData] = useState<AppRemoteState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [isHostingerModalOpen, setIsHostingerModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Accessibility
  const [accessibility, setAccessibility] = useState<AppAccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    ttsEnabled: true,
  });

  // Initial load
  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.fetchAppData();
      setAppData(data);
      if (!selectedExercise && data.exercises.length > 0) {
        // Default to "Elevação de joelho com elástico" (screen 9)
        const joelhoEx = data.exercises.find((e) => e.name.includes('joelho')) || data.exercises[1];
        setSelectedExercise(joelhoEx);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do app', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update accessibility settings
  const handleUpdateAccessibility = (newSettings: Partial<AppAccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...newSettings }));
  };

  if (isLoading || !appData) {
    return (
      <div className="min-h-screen bg-[#040806] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#7ce000] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide text-[#7ce000]">Carregando 60+ FIT...</span>
        </div>
      </div>
    );
  }

  // Handlers for user interactions
  const handleStartFromSplash = () => {
    setCurrentScreen('role-select');
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'professional') {
      setCurrentScreen('professional');
    } else {
      setCurrentScreen('student-home');
    }
  };

  const handleLogin = () => {
    if (userRole === 'professional') {
      setCurrentScreen('professional');
    } else {
      setCurrentScreen('student-home');
    }
  };

  const handleRegisterContinue = async (userData: Partial<UserProfile>) => {
    await apiService.updateProfile(userData);
    await loadData();
    setCurrentScreen('anamnese');
  };

  const handleSaveAnamnese = async (data: AnamneseData) => {
    await apiService.saveAnamnese(data);
    await loadData();
    setCurrentScreen('physical-assessment');
  };

  const handleSavePhysicalAssessment = async (data: PhysicalAssessmentData) => {
    await apiService.savePhysicalAssessment(data);
    await loadData();
    setCurrentScreen('student-home');
  };

  const handleSaveProfile = async (updates: Partial<UserProfile>) => {
    await apiService.updateProfile(updates);
    await loadData();
  };

  const handleRecordHealth = async (metrics: Partial<HealthMetrics>) => {
    await apiService.recordHealthMetrics(metrics);
    await loadData();
  };

  const handleToggleReminder = async (id: string, enabled: boolean) => {
    await apiService.toggleReminder(id, enabled);
    await loadData();
  };

  const handleAddReminder = async (item: Omit<ReminderItem, 'id'>) => {
    await apiService.addReminder(item);
    await loadData();
  };

  const handleCompleteExercise = async () => {
    if (selectedExercise) {
      await apiService.completeExercise(selectedExercise.id);
      await loadData();
      setCurrentScreen('workout');
    }
  };

  const handleSubscribePlan = (planId: string) => {
    alert(`Plano "${planId.toUpperCase()}" selecionado com sucesso! Redirecionando para área segura de pagamento.`);
    setCurrentScreen('student-home');
  };

  // Font size class mapping
  const getFontSizeClass = () => {
    if (accessibility.fontSize === 'large') return 'font-size-large';
    if (accessibility.fontSize === 'xlarge') return 'font-size-xlarge';
    return '';
  };

  return (
    <div
      className={`min-h-screen ${accessibility.highContrast ? 'high-contrast' : ''} ${getFontSizeClass()}`}
    >
      <PhoneFrame
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        userRole={userRole}
      >
        {/* Render the active screen according to user flow */}
        {currentScreen === 'splash' && (
          <SplashScreen
            backgroundImage={appData.branding.splashBg}
            onStart={handleStartFromSplash}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          />
        )}

        {currentScreen === 'role-select' && (
          <RoleSelectScreen
            coupleHeroImage={appData.branding.coupleHero}
            trainerAvatarImage={appData.branding.trainerAvatar}
            onSelectRole={handleSelectRole}
            onBack={() => setCurrentScreen('splash')}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onLogin={handleLogin}
            onCreateAccount={() => setCurrentScreen('register')}
            onSelectRole={(r) => setUserRole(r)}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen
            onContinue={handleRegisterContinue}
            onGoToLogin={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('login')}
          />
        )}

        {currentScreen === 'anamnese' && (
          <AnamneseScreen
            initialData={appData.anamnese}
            onNext={handleSaveAnamnese}
            onBack={() => setCurrentScreen('register')}
          />
        )}

        {currentScreen === 'physical-assessment' && (
          <PhysicalAssessmentScreen
            initialData={appData.physicalAssessment}
            onSave={handleSavePhysicalAssessment}
            onBack={() => setCurrentScreen('anamnese')}
          />
        )}

        {currentScreen === 'student-home' && (
          <StudentHomeScreen
            user={appData.user}
            onNavigate={setCurrentScreen}
            onSelectProgram={(program) => {
              console.log('Selected program:', program);
            }}
          />
        )}

        {currentScreen === 'workout' && (
          <WorkoutScreen
            exercises={appData.exercises}
            onSelectExercise={(ex) => {
              setSelectedExercise(ex);
              setCurrentScreen('exercise-detail');
            }}
            onStartWorkout={() => {
              if (appData.exercises.length > 0) {
                setSelectedExercise(appData.exercises[1]); // Elevação de joelho default
                setCurrentScreen('exercise-detail');
              }
            }}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}

        {currentScreen === 'exercise-detail' && selectedExercise && (
          <ExerciseDetailScreen
            exercise={selectedExercise}
            onComplete={handleCompleteExercise}
            onBack={() => setCurrentScreen('workout')}
            ttsEnabled={accessibility.ttsEnabled}
          />
        )}

        {currentScreen === 'health' && (
          <HealthScreen
            metrics={appData.health}
            onRecordNewData={handleRecordHealth}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}

        {currentScreen === 'evolution' && (
          <EvolutionScreen
            data={appData.evolution}
            user={appData.user}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}

        {currentScreen === 'reminders' && (
          <RemindersScreen
            reminders={appData.reminders}
            onToggleReminder={handleToggleReminder}
            onAddReminder={handleAddReminder}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}

        {currentScreen === 'plans' && (
          <PlansScreen
            plans={appData.plans}
            onSubscribe={handleSubscribePlan}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={appData.user}
            onSaveProfile={handleSaveProfile}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}

        {currentScreen === 'professional' && (
          <ProfessionalScreen
            students={[appData.user]}
            onNavigate={setCurrentScreen}
            onOpenSqlModal={() => setIsSqlModalOpen(true)}
            onBack={() => setCurrentScreen('student-home')}
          />
        )}
      </PhoneFrame>

      {/* Global Modals */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibility}
        onUpdateSettings={handleUpdateAccessibility}
      />

      <JsonDataModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        appData={appData}
        onDataUpdated={loadData}
      />

      <SqlArchitectureModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />

      <HostingerDeployModal
        isOpen={isHostingerModalOpen}
        onClose={() => setIsHostingerModalOpen(false)}
      />

      <OfflineIndicator />
    </div>
  );
}
