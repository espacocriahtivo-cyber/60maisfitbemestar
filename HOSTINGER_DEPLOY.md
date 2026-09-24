# Guia Completo de Implantação do 60+ FIT AppWeb na Hostinger

Este documento fornece o passo a passo detalhado para implantar o **60+ FIT AppWeb (Progressive Web Application)** em qualquer plano da **Hostinger** (Hospedagem Compartilhada, Cloud Hosting ou VPS).

### O que torna este projeto uma versão "AppWeb" ideal para a Hostinger?
1. **Instalável no Celular e Desktop (PWA):** Os alunos e professores podem instalar o app diretamente pelo navegador (Safari no iPhone ou Chrome no Android/PC) sem precisar de lojas de aplicativos (Google Play / App Store).
2. **Modo Duplo Responsivo:** Funciona tanto no **Modo Celular (iPhone)** quanto no **Modo AppWeb Amplo (Desktop/Tablet)** para academias e consultórios.
3. **Cache Inteligente & Suporte Offline:** Service Worker (`sw.js`) e Web App Manifest pré-gerados com Workbox, carregando treinos e telas mesmo em conexões lentas ou instáveis.
4. **Deploy de 1 Clique via hPanel:** Roda 100% no servidor web LiteSpeed / Apache da Hostinger com `.htaccess` anti-erro 404 para SPAs.

---

## Opção 1: Hospedagem Compartilhada / Cloud Hosting (hPanel)
*(Método mais simples, econômico e rápido - recomendado para a maioria dos casos)*

Neste método, o Vite compila o aplicativo para arquivos estáticos HTML, CSS, JavaScript e imagens otimizadas, e o arquivo `.htaccess` pré-configurado garante o roteamento SPA (Single Page Application) e cache ultra-rápido via servidor LiteSpeed da Hostinger.

### Passo 1: Gerar os arquivos de produção
No terminal do seu projeto, execute o comando:
```bash
npm run build
```
Isso criará a pasta `dist/` contendo:
- `index.html`
- `assets/` (scripts JS e estilos CSS minificados)
- `.htaccess` (já copiado automaticamente da pasta `public/`)

### Passo 2: Acessar o Gerenciador de Arquivos da Hostinger
1. Faça login no seu painel [hPanel da Hostinger](https://hpanel.hostinger.com/).
2. Vá em **Sites** > Selecione seu domínio e clique em **Gerenciar**.
3. Na barra lateral ou no painel principal, procure por **Gerenciador de Arquivos** (File Manager).
4. Abra o diretório **`public_html`**.

### Passo 3: Enviar os arquivos
1. Compacte o conteúdo **de dentro da pasta `dist/`** em um arquivo `.zip` (ex: `site.zip`).
   > **Atenção:** Compacte o que está *dentro* da pasta `dist/`, de modo que o `index.html` e o `.htaccess` fiquem na raiz do `public_html`.
2. No Gerenciador de Arquivos da Hostinger, clique no botão **Upload** (ícone de seta para cima) e envie o `site.zip`.
3. Clique com o botão direito sobre o arquivo enviado e escolha **Extrair** (Extract) selecionando o próprio diretório `public_html`.
4. Certifique-se de que o arquivo `.htaccess` está presente no `public_html` (caso não esteja visível, ative "Mostrar arquivos ocultos" nas configurações do Gerenciador de Arquivos).

---

## Opção 2: Hostinger VPS / Servidor Node.js (Full-Stack)
*(Para quem deseja executar a API Express integrada e backend Node.js contínuo)*

O projeto já inclui o servidor `server.ts` e o arquivo de controle de processos `ecosystem.config.cjs` (PM2).

### Passo 1: Conectar ao VPS via SSH
```bash
ssh root@SEU_IP_HOSTINGER
```

### Passo 2: Instalar Node.js e Git (caso não estejam instalados)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
npm install -g pm2
```

### Passo 3: Clonar o projeto e instalar dependências
```bash
git clone SEU_REPOSITORIO_GIT /var/www/60plus-fit
cd /var/www/60plus-fit
npm install
npm run build
```

### Passo 4: Iniciar o processo com PM2
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### Passo 5: Configurar Nginx (Reverse Proxy)
Edite a configuração do Nginx (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Reinicie o Nginx:
```bash
sudo systemctl restart nginx
```

---

## Configuração do Banco de Dados SQL na Hostinger

O projeto inclui o script pronto `database.sql` com as tabelas, índices e dados iniciais da aluna Maria Silva e dos exercícios.

### Como importar via phpMyAdmin (hPanel):
1. No hPanel da Hostinger, vá em **Bancos de Dados** > **Bancos de Dados MySQL**.
2. Crie um novo banco de dados:
   - **Nome do banco:** `u123456789_60fit`
   - **Usuário:** `u123456789_fituser`
   - **Senha:** `DefinaUmaSenhaSegura123!`
3. Clique em **Entrar no phpMyAdmin**.
4. No menu superior do phpMyAdmin, clique na aba **Importar** (Import).
5. Selecione o arquivo `database.sql` incluído na raiz deste projeto.
6. Clique em **Executar** (Go) no rodapé.
7. Todas as 6 tabelas (`usuarios`, `anamneses`, `metricas_saude`, `treinos`, `exercicios`, `lembretes`) serão criadas instantaneamente com índices e dados de teste.

---

## Ativação do Certificado SSL Gratuito na Hostinger
1. No painel hPanel, vá em **Segurança** > **SSL**.
2. Clique em **Instalar SSL** (Let's Encrypt gratuito ilimitado).
3. Ative a opção **Forçar HTTPS** para que todo o tráfego seja criptografado e seguro para os alunos sêniores.

---

## Suporte a PWA / Instalação no Celular
O aplicativo é responsivo e otimizado para navegação mobile. Os alunos podem acessar pelo navegador do celular (Chrome / Safari) e selecionar **"Adicionar à tela de início"**, funcionando como um aplicativo nativo.
