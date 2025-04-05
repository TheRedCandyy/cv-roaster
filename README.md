# CV Roaster

Uma aplicação Next.js para "roastar" CVs de forma impiedosa e humorística usando IA.

## Funcionalidades

- ✅ Upload de CV em múltiplos formatos (PDF, DOCX, DOC, TXT)
- ✅ Processamento com OpenAI GPT-4
- ✅ Interface de utilizador moderna e intuitiva com shadcn/ui
- ✅ Roast impiedoso em português de Portugal
- ✅ Partilha fácil dos resultados

## Tecnologias utilizadas

- Next.js 15
- React 19
- OpenAI API
- shadcn/ui
- TailwindCSS
- TypeScript
- React Hook Form + Zod
- React Dropzone

## Configuração

### Pré-requisitos

- Node.js 18.17.0 ou superior
- Chave API da OpenAI

### Passos para instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/teu-usuario/cv-roaster.git
   cd cv-roaster
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um ficheiro `.env.local` na raiz do projeto
   - Adicione a chave API da OpenAI:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## Como utilizar

1. Carregue o seu CV utilizando o formulário (aceita formatos PDF, DOCX, DOC e TXT)
2. Clique no botão "Destrói o meu ego"
3. Aguarde enquanto a IA processa e gera um roast impiedoso do seu CV
4. Leia o resultado e partilhe-o se desejar

## Aviso

Esta aplicação foi concebida apenas para fins humorísticos. Os roasts são gerados por IA e podem ser bastante impiedosos. Use por sua conta e risco e não leve demasiado a sério!
