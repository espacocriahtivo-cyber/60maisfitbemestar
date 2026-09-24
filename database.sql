-- ==============================================================================
-- 60+ FIT - Musculação e Funcionalidade
-- Script SQL para Banco de Dados na Hostinger (phpMyAdmin / MySQL / MariaDB / PostgreSQL)
-- ==============================================================================

-- 1. Criação do Banco de Dados (descomente caso necessário)
-- CREATE DATABASE IF NOT EXISTS `60plus_fit` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `60plus_fit`;

-- -----------------------------------------------------------------------------
-- Tabela 1: Usuários (Alunos e Profissionais)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `senha_hash` VARCHAR(255) NOT NULL,
  `papel` ENUM('aluno', 'profissional') NOT NULL DEFAULT 'aluno',
  `data_nascimento` DATE NOT NULL,
  `cpf` VARCHAR(14) UNIQUE,
  `telefone` VARCHAR(25),
  `peso` DECIMAL(5,2) DEFAULT 62.00,
  `altura` DECIMAL(4,2) DEFAULT 1.58,
  `objetivo` VARCHAR(150) DEFAULT 'Ganhar força e independência',
  `avatar_url` TEXT,
  `treinos_completados_mes` INT DEFAULT 18,
  `peso_meta` DECIMAL(5,2) DEFAULT 58.00,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_usuarios_email` (`email`),
  INDEX `idx_usuarios_papel` (`papel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabela 2: Anamnese Clínica
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `anamneses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `hipertensao` TINYINT(1) DEFAULT 0,
  `diabetes` TINYINT(1) DEFAULT 0,
  `cardiacos` TINYINT(1) DEFAULT 0,
  `artrose` TINYINT(1) DEFAULT 0,
  `osteoporose` TINYINT(1) DEFAULT 0,
  `obesidade` TINYINT(1) DEFAULT 0,
  `outras` TINYINT(1) DEFAULT 0,
  `observacoes` TEXT,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  INDEX `idx_anamnese_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabela 3: Sinais Vitais & Avaliações Físicas
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `metricas_saude` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `frequencia_cardiaca` INT NOT NULL,
  `pressao_arterial` VARCHAR(20) NOT NULL,
  `saturacao_spo2` INT NOT NULL,
  `peso_kg` DECIMAL(5,2),
  `altura_m` DECIMAL(4,2),
  `registrado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  INDEX `idx_metricas_usuario_data` (`usuario_id`, `registrado_em` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabela 4: Treinos Prescritos
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `treinos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `aluno_id` INT NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `subtitulo` VARCHAR(150),
  `ativo` TINYINT(1) DEFAULT 1,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  INDEX `idx_treinos_aluno_ativo` (`aluno_id`, `ativo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabela 5: Exercícios dos Treinos (com Links Diretos de Imagens/Vídeo)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `exercicios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `treino_id` INT NOT NULL,
  `nome` VARCHAR(150) NOT NULL,
  `repeticoes` VARCHAR(50) DEFAULT '3 x 12 repetições',
  `series` INT DEFAULT 3,
  `descanso_segundos` INT DEFAULT 30,
  `imagem_url` TEXT NOT NULL,
  `instrucao_texto` TEXT NOT NULL,
  `duracao_video_segundos` INT DEFAULT 10,
  `ordem` INT DEFAULT 1,
  FOREIGN KEY (`treino_id`) REFERENCES `treinos`(`id`) ON DELETE CASCADE,
  INDEX `idx_exercicios_treino` (`treino_id`, `ordem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Tabela 6: Lembretes Diários
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lembretes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NOT NULL,
  `titulo` VARCHAR(150) NOT NULL,
  `horario_ou_data` VARCHAR(30) NOT NULL,
  `icone_tipo` VARCHAR(20) DEFAULT 'calendar',
  `ativo` TINYINT(1) DEFAULT 1,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  INDEX `idx_lembretes_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Inserção de Dados Iniciais de Demonstração (Seed)
-- -----------------------------------------------------------------------------
INSERT INTO `usuarios` (`uuid`, `nome`, `email`, `senha_hash`, `papel`, `data_nascimento`, `cpf`, `telefone`, `peso`, `altura`, `objetivo`, `avatar_url`, `treinos_completados_mes`, `peso_meta`)
VALUES (
  'e2703dce-567b-4a6a-bd5d-maria',
  'Maria Silva',
  'maria.silva@email.com',
  '$2y$10$e8Z4N0W...demoHash',
  'aluno',
  '1956-03-15',
  '123.456.789-00',
  '(11) 98765-4321',
  62.00,
  1.58,
  'Ganhar força e independência',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAwXmmQInZktZN_BfAfER7O3AI8zlS0i2wPh9tz6ro5ea7s1upIN2m4rQ5dC7BHlrfQmqdxZIQlC4yAeizjDa9w5CeU2UIz2Z6UoY_Kjfnjmw9He1S_jzouiZ0MldtpRQcnDeYh8J-C6Dbq2dBKN8SVXCvUljzfRWiMkKmgVoOOj2jdi-dgsCSiHqwlmKHPRXLjDE7FPbSiYQMCwNDmvZV3tokV6AkyPg3hpp4skQHMM6XNZs0TpBZl',
  18,
  58.00
) ON DUPLICATE KEY UPDATE `nome` = VALUES(`nome`);

SET @usuario_id = LAST_INSERT_ID();

-- Anamnese da Maria Silva
INSERT INTO `anamneses` (`usuario_id`, `hipertensao`, `diabetes`, `cardiacos`, `artrose`, `osteoporose`, `obesidade`, `outras`, `observacoes`)
VALUES (@usuario_id, 1, 0, 0, 1, 0, 0, 0, 'Paciente relata dores leves no joelho direito após caminhadas longas. Liberação médica recente para musculação funcional.');

-- Sinais vitais
INSERT INTO `metricas_saude` (`usuario_id`, `frequencia_cardiaca`, `pressao_arterial`, `saturacao_spo2`, `peso_kg`, `altura_m`)
VALUES (@usuario_id, 72, '120 / 80', 98, 62.00, 1.58);

-- Treino A
INSERT INTO `treinos` (`id`, `aluno_id`, `titulo`, `subtitulo`, `ativo`)
VALUES (1, @usuario_id, 'Treino A', 'Força e funcionalidade', 1)
ON DUPLICATE KEY UPDATE `titulo` = VALUES(`titulo`);

-- Exercícios com links diretos
INSERT INTO `exercicios` (`treino_id`, `nome`, `repeticoes`, `series`, `descanso_segundos`, `imagem_url`, `instrucao_texto`, `duracao_video_segundos`, `ordem`)
VALUES
(1, 'Aquecimento', '3 x 12 repetições', 3, 30, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6LttPRFB_YjWMZb7kWYb8KZiUb-zXNoN80XKz08v9IXI6GemeT_zKavFm2fGeRYxcVHisn53tAq78PNfkJKTKVm4oq6jbg_yEpfKv-h-7n4pfQigu7XO5MZxakoH7CDLvcDqTreMiGwTI2Bb2k0FleYRqg0UErplxxHb62hopcJjYCkYvhVqwZqBgO6IE9KHnPN3SOsU6bNNTZgxiGDJHDQ0mc2I7mn5Y29NOk2M2OJDayyJADZlV', 'Movimente os braços e as pernas de forma suave para aquecer a musculatura e lubrificar as articulações.', 10, 1),
(1, 'Elevação de joelho com elástico', '3 x 12 repetições', 3, 30, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Hvb9mnWdCedQ71cQCF7OoJE3kkGlPOdNtuInVaCf0W2kgFShquUS2oqZTM7qhbE-IBJj5JGfJiZUrRvrDDUa3a27xsWRon_kywhzs30goxhRQj6BsBrZduvHpUocd8s4bteXDBofoadbl6dEg3E4GTE5i2Gek_2S7mABYSMwMLdt93sarkAf0Rn_wqGAcwxxtTw7ZFgUxpB9yGBr7xKfy-6PP0dlY_r1jpouzyGAlIuQtOMoAnmC', 'Mantenha a postura ereta e realize o movimento de forma controlada.', 10, 2),
(1, 'Sentar e levantar', '3 x 12 repetições', 3, 30, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgs873zWLIQwpEVMEEFpY6ljcSVTMe1wSQHzXz25iwi6bro7YtBNrEd5JX3QkITJ9drNGKaYetpbB1p5rKHMc70jQ16Rojc6gf1vCrPJIwdgMA0eP3x5i2DjFI88YYmejCy1cxNioljtqieUkWUA2Pa9C9m4QMbYZNX4tWCCshSqLkk-tHTX2WOOWkEASv9BlFZLfxMb3o-9-UHwiJHKHEI1S1JvVLDSqXP0NF-16xTyRSj-LxtF-y', 'Apoie os pés firmes no chão, projete o quadril para trás e levante com segurança usando a força das pernas.', 10, 3),
(1, 'Remada', '3 x 12 repetições', 3, 30, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-GUmj8SbWptGUuhbLEbHzMuCjM3ugdpSTZeNlaifEJjx7pKXr1AcTVOZzRt2kak0FkB9mVOZU-8l3xRUEZAbJGH1YEjtoJF2cHlUBUC-BXDCg3hLakeOPoBWyVJGU92FXyc3jtcd2g6wzM6d0a0_foATa51MuVWY4tbw4TBO_FSMqZ9Yc_GbxGJEaDmrVeBptWqC8CLbUmN3KA8NQ2D77kk8PGGephEiwp1q2Bs2RjlougSmAAcAe', 'Puxe o elástico em direção ao abdômen, mantendo as costas alinhadas e aproximando as escápulas.', 10, 4),
(1, 'Extensão de joelho', '3 x 12 repetições', 3, 30, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAK3khEt9FdSIiW7gflZDAvjPxXZCJwwipjq3lWcJIqi5NUqb84e8TgwEzgj7-hhwJmiXHRNSsWITytjrBDzQd3yFF-98pVHScPPuZ5K3-Mbs9Y1hMqrR_ugb9RFbz-WUbaz7GvngsIfjOBzfGG3PlFEU_nfMIwMyodJogFKhLMxAafOq3tOIdnB_Cme9XkyKbbhJBfXIQQzUuyxtw7-oMhLTC-eM2a0QZ3VWI8UGlX-QT0_Dyn-jq', 'Sentado com a postura correta, estenda a perna à frente contraindo o quadríceps e retorne lentamente.', 10, 5);

-- Lembretes
INSERT INTO `lembretes` (`usuario_id`, `titulo`, `horario_ou_data`, `icone_tipo`, `ativo`)
VALUES
(@usuario_id, 'Treino de hoje', '08:00', 'calendar', 1),
(@usuario_id, 'Tomar água', '10:00', 'water', 1),
(@usuario_id, 'Registrar pressão', '12:00', 'heart', 1),
(@usuario_id, 'Avaliação mensal', '01/10', 'clipboard', 0),
(@usuario_id, 'Consulta médica', '15/10', 'medical', 1);
