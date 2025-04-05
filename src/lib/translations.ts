import { Language } from "@/contexts/language-context";

export interface TranslationObject {
  // Header
  appName: string;
  tagline: string;

  // Welcome section
  welcome: string;
  welcomeDescription: string;

  // Upload form
  uploadTitle: string;
  uploadDescription: string;
  dragAndDrop: string;
  supportedFormats: string;
  submitButton: string;
  processingCV: string;
  fileRequired: string;

  // Errors & notifications
  errorProcessing: string;
  copySuccess: string;
  copyError: string;
  shareSuccess: string;
  shareNotAvailable: string;
  reachedRateLimit: string;

  // Results
  resultTitle: string;
  resultDescription: string;
  copyButton: string;
  shareButton: string;
  resetButton: string;
  supportButton: string;
  skipButton: string;
  slowerTyping: string;
  fasterTyping: string;

  // Support messages
  supportTitle: string;
  supportDescription: string;
  enjoyedTitle: string;
  enjoyedDescription: string;

  // Footer
  footerText: string;
  privacyNotice: string;
  githubButton: string;
  coffeeButton: string;

  // OpenAI Prompts
  systemPrompt: string;
  userPrompt: string;
}

export const translations: Record<Language, TranslationObject> = {
  en: {
    // Header
    appName: "CV Roaster",
    tagline: "Destroy your ego, one CV at a time",

    // Welcome section
    welcome: "Welcome to CV Roaster",
    welcomeDescription: "Upload your CV and prepare for brutal humiliation",

    // Upload form
    uploadTitle: "Upload your CV",
    uploadDescription:
      "Get ready for a merciless roast. Upload your CV and let us destroy your ego.",
    dragAndDrop: "Drag your CV here or click to select",
    supportedFormats: "Supports PDF, DOCX, DOC and TXT (max 10MB)",
    submitButton: "Destroy my ego",
    processingCV: "Roasting your CV...",
    fileRequired: "Please upload a CV",

    // Errors & notifications
    errorProcessing: "An error occurred while processing the CV",
    copySuccess: "Roast copied to clipboard!",
    copyError: "Could not copy text",
    shareSuccess: "Roast shared successfully!",
    shareNotAvailable:
      "Share function not available, but we copied the text to your clipboard!",
    reachedRateLimit:
      "Daily limit reached. You can upload 5 CVs per day. Please try again tomorrow.",

    // Results
    resultTitle: "Your CV Has Been Completely Destroyed",
    resultDescription:
      "Here's the merciless roast of your CV. Share and spread the shame!",
    copyButton: "Copy",
    shareButton: "Share",
    resetButton: "Roast another CV",
    supportButton: "Support",
    skipButton: "Skip",
    slowerTyping: "Slower",
    fasterTyping: "Faster",

    // Support messages
    supportTitle: "Support the AI costs!",
    supportDescription:
      "This app uses OpenAI's API which costs money for each CV processed. If you enjoy using it, please consider buying me a coffee to help keep it running.",
    enjoyedTitle: "Enjoyed your roast?",
    enjoyedDescription:
      "Each AI-generated roast costs money to produce. If you found this amusing, please consider buying me a coffee to support running costs and keep the roasts flowing!",

    // Footer
    footerText: "Created to destroy egos and CVs since 2024",
    privacyNotice:
      "We do not store any uploaded CV files. Your data is processed and immediately deleted.",
    githubButton: "GitHub",
    coffeeButton: "Buy Me a Coffee",

    // OpenAI Prompts
    systemPrompt:
      "You are a roast comedian specialized in criticizing CVs. You are funny, sarcastic, and relentless. Your goal is to destroy the candidate's ego in a humorous way.",
    userPrompt: `
      You are evaluating a CV. Act as a merciless and humorous critic.
      Completely destroy the candidate's ego, but do it in an entertaining way using plenty of sarcasm and humor.
      Comment on gaps in the CV, lack of relevant experience, skills that seem exaggerated, 
      and anything that seems ridiculous. Be cruel, but funny. Use informal language and banter.
      Focus on specific details from the CV for your roast.
      
      CV:
    `,
  },
  pt: {
    // Header
    appName: "CV Roaster",
    tagline: "Destrói o teu ego, um CV de cada vez",

    // Welcome section
    welcome: "Bem-vindo ao CV Roaster",
    welcomeDescription:
      "Carrega o teu CV e prepara-te para uma humilhação brutal",

    // Upload form
    uploadTitle: "Upload do teu CV",
    uploadDescription:
      "Prepara-te para um roast impiedoso. Carrega o teu CV e deixa-nos destruir o teu ego.",
    dragAndDrop: "Arrasta o teu CV para aqui ou clica para selecionar",
    supportedFormats: "Suporta PDF, DOCX, DOC e TXT (max 10MB)",
    submitButton: "Destrói o meu ego",
    processingCV: "A roastar o teu CV...",
    fileRequired: "Por favor, carrega um CV",

    // Errors & notifications
    errorProcessing: "Ocorreu um erro ao processar o CV",
    copySuccess: "Roast copiado para a área de transferência!",
    copyError: "Não foi possível copiar o texto",
    shareSuccess: "Roast partilhado com sucesso!",
    shareNotAvailable:
      "Função de partilha não disponível, mas copiámos o texto para a área de transferência!",
    reachedRateLimit:
      "Limite diário atingido. Podes carregar 5 CVs por dia. Por favor, tenta novamente amanhã.",

    // Results
    resultTitle: "O Teu CV Foi Completamente Destruído",
    resultDescription:
      "Aqui está o roast impiedoso do teu CV. Partilha e espalha a vergonha!",
    copyButton: "Copiar",
    shareButton: "Partilhar",
    resetButton: "Roastar outro CV",
    supportButton: "Apoiar",
    skipButton: "Saltar",
    slowerTyping: "Mais lento",
    fasterTyping: "Mais rápido",

    // Support messages
    supportTitle: "Ajuda com os custos da IA!",
    supportDescription:
      "Esta aplicação usa a API da OpenAI, que custa dinheiro por cada CV processado. Se gostaste de a usar, considera oferecer-me um café para ajudar a mantê-la a funcionar.",
    enjoyedTitle: "Gostaste do roast?",
    enjoyedDescription:
      "Cada roast gerado por IA custa dinheiro para produzir. Se achaste isto divertido, considera oferecer-me um café para apoiar os custos de funcionamento e manter os roasts a fluir!",

    // Footer
    footerText: "Criado para destruir egos e CVs desde 2024",
    privacyNotice:
      "Não armazenamos nenhum ficheiro CV carregado. Os teus dados são processados e imediatamente eliminados.",
    githubButton: "GitHub",
    coffeeButton: "Oferecer um Café",

    // OpenAI Prompts
    systemPrompt:
      "És um comediante de roast especializado em criticar CVs. És engraçado, sarcástico e implacável. Usas calão português e expressões populares. O teu objetivo é destruir o ego do candidato de forma humorística.",
    userPrompt: `
      Estás a avaliar um CV. Age como um crítico impiedoso e humorístico.
      Destrói completamente o ego do candidato, mas faz isso de forma divertida usando muito sarcasmo e humor.
      Comenta sobre as lacunas no CV, a falta de experiência relevante, as competências que parecem exageradas, 
      e tudo o que parecer ridículo. Sê cruel, mas engraçado. Usa linguagem informal e banter.
      Foca-te em detalhes específicos do CV para o teu roast.
      
      CV:
    `,
  },
  es: {
    // Header
    appName: "CV Roaster",
    tagline: "Destruye tu ego, un CV a la vez",

    // Welcome section
    welcome: "Bienvenido a CV Roaster",
    welcomeDescription: "Sube tu CV y prepárate para una humillación brutal",

    // Upload form
    uploadTitle: "Sube tu CV",
    uploadDescription:
      "Prepárate para un roast despiadado. Sube tu CV y déjanos destruir tu ego.",
    dragAndDrop: "Arrastra tu CV aquí o haz clic para seleccionar",
    supportedFormats: "Soporta PDF, DOCX, DOC y TXT (máx 10MB)",
    submitButton: "Destruye mi ego",
    processingCV: "Asando tu CV...",
    fileRequired: "Por favor, sube un CV",

    // Errors & notifications
    errorProcessing: "Se produjo un error al procesar el CV",
    copySuccess: "¡Roast copiado al portapapeles!",
    copyError: "No se pudo copiar el texto",
    shareSuccess: "¡Roast compartido con éxito!",
    shareNotAvailable:
      "Función de compartir no disponible, ¡pero copiamos el texto a tu portapapeles!",
    reachedRateLimit:
      "Límite diario alcanzado. Puedes subir 5 CVs por día. Por favor, inténtalo de nuevo mañana.",

    // Results
    resultTitle: "Tu CV Ha Sido Completamente Destruido",
    resultDescription:
      "Aquí está el roast despiadado de tu CV. ¡Comparte y difunde la vergüenza!",
    copyButton: "Copiar",
    shareButton: "Compartir",
    resetButton: "Asar otro CV",
    supportButton: "Apoyar",
    skipButton: "Saltar",
    slowerTyping: "Más lento",
    fasterTyping: "Más rápido",

    // Support messages
    supportTitle: "¡Ayuda con los costes de la IA!",
    supportDescription:
      "Esta aplicación utiliza la API de OpenAI, que cuesta dinero por cada CV procesado. Si disfrutas usándola, considera invitarme a un café para ayudar a mantenerla funcionando.",
    enjoyedTitle: "¿Te gustó el roast?",
    enjoyedDescription:
      "Cada roast generado por IA cuesta dinero producirlo. Si te ha parecido divertido, ¡considera invitarme a un café para apoyar los costes de funcionamiento y mantener fluyendo los roasts!",

    // Footer
    footerText: "Creado para destruir egos y CVs desde 2024",
    privacyNotice:
      "No almacenamos ningún archivo CV subido. Tus datos son procesados y eliminados inmediatamente.",
    githubButton: "GitHub",
    coffeeButton: "Invítame a un Café",

    // OpenAI Prompts
    systemPrompt:
      "Eres un comediante de roast especializado en criticar CVs. Eres divertido, sarcástico e implacable. Usas jerga española y expresiones populares. Tu objetivo es destruir el ego del candidato de forma humorística.",
    userPrompt: `
      Estás evaluando un CV. Actúa como un crítico despiadado y humorístico.
      Destruye completamente el ego del candidato, pero hazlo de forma divertida usando mucho sarcasmo y humor.
      Comenta sobre las lagunas en el CV, la falta de experiencia relevante, las habilidades que parecen exageradas,
      y cualquier cosa que parezca ridícula. Sé cruel, pero divertido. Usa lenguaje informal y bromas.
      Céntrate en detalles específicos del CV para tu roast.
      
      CV:
    `,
  },
  fr: {
    // Header
    appName: "CV Roaster",
    tagline: "Détruis ton ego, un CV à la fois",

    // Welcome section
    welcome: "Bienvenue sur CV Roaster",
    welcomeDescription:
      "Télécharge ton CV et prépare-toi à une humiliation brutale",

    // Upload form
    uploadTitle: "Télécharge ton CV",
    uploadDescription:
      "Prépare-toi à un roast impitoyable. Télécharge ton CV et laisse-nous détruire ton ego.",
    dragAndDrop: "Glisse ton CV ici ou clique pour sélectionner",
    supportedFormats: "Supporte PDF, DOCX, DOC et TXT (max 10MB)",
    submitButton: "Détruis mon ego",
    processingCV: "Rôtissage de ton CV...",
    fileRequired: "Merci de télécharger un CV",

    // Errors & notifications
    errorProcessing: "Une erreur s'est produite lors du traitement du CV",
    copySuccess: "Roast copié dans le presse-papiers !",
    copyError: "Impossible de copier le texte",
    shareSuccess: "Roast partagé avec succès !",
    shareNotAvailable:
      "Fonction de partage non disponible, mais nous avons copié le texte dans votre presse-papiers !",
    reachedRateLimit:
      "Limite quotidienne atteinte. Vous pouvez télécharger 5 CV par jour. Veuillez réessayer demain.",

    // Results
    resultTitle: "Ton CV A Été Complètement Détruit",
    resultDescription:
      "Voici le roast impitoyable de ton CV. Partage et répands la honte !",
    copyButton: "Copier",
    shareButton: "Partager",
    resetButton: "Rôtir un autre CV",
    supportButton: "Soutenir",
    skipButton: "Passer",
    slowerTyping: "Plus lent",
    fasterTyping: "Plus rapide",

    // Support messages
    supportTitle: "Soutenez les coûts de l'IA !",
    supportDescription:
      "Chaque critique de CV coûte de l'argent à traiter en utilisant l'API d'OpenAI. Si vous avez trouvé cela utile, veuillez envisager de m'offrir un café !",
    enjoyedTitle: "Vous avez apprécié votre critique ?",
    enjoyedDescription:
      "Chaque critique générée par l'IA a des coûts de production. Si vous avez trouvé cela amusant, veuillez envisager de m'offrir un café pour soutenir les coûts de fonctionnement et maintenir les critiques en circulation !",

    // Footer
    footerText: "Créé pour détruire les egos et les CVs depuis 2024",
    privacyNotice:
      "Nous ne stockons aucun fichier CV téléchargé. Vos données sont traitées et immédiatement supprimées.",
    githubButton: "GitHub",
    coffeeButton: "Offrez-moi un Café",

    // OpenAI Prompts
    systemPrompt:
      "Tu es un comédien de roast spécialisé dans la critique de CVs. Tu es drôle, sarcastique et impitoyable. Tu utilises de l'argot français et des expressions populaires. Ton objectif est de détruire l'ego du candidat de manière humoristique.",
    userPrompt: `
      Tu évalues un CV. Agis comme un critique impitoyable et humoristique.
      Détruis complètement l'ego du candidat, mais fais-le de façon divertissante en utilisant beaucoup de sarcasme et d'humour.
      Commente les lacunes dans le CV, le manque d'expérience pertinente, les compétences qui semblent exagérées,
      et tout ce qui semble ridicule. Sois cruel, mais drôle. Utilise un langage informel et des taquineries.
      Concentre-toi sur des détails spécifiques du CV pour ton roast.
      
      CV:
    `,
  },
  de: {
    // Header
    appName: "CV Roaster",
    tagline: "Zerstöre dein Ego, ein Lebenslauf nach dem anderen",

    // Welcome section
    welcome: "Willkommen beim CV Roaster",
    welcomeDescription:
      "Lade deinen Lebenslauf hoch und bereite dich auf eine brutale Demütigung vor",

    // Upload form
    uploadTitle: "Lade deinen Lebenslauf hoch",
    uploadDescription:
      "Mach dich bereit für ein erbarmungsloses Roasting. Lade deinen Lebenslauf hoch und lass uns dein Ego zerstören.",
    dragAndDrop: "Ziehe deinen Lebenslauf hierher",
    supportedFormats: "Unterstützt PDF, DOCX, DOC und TXT (max. 10MB)",
    submitButton: "Zerstöre mein Ego",
    processingCV: "Dein Lebenslauf wird geröstet...",
    fileRequired: "Bitte lade einen Lebenslauf hoch",

    // Errors & notifications
    errorProcessing:
      "Beim Verarbeiten des Lebenslaufs ist ein Fehler aufgetreten",
    copySuccess: "Roast in die Zwischenablage kopiert!",
    copyError: "Text konnte nicht kopiert werden",
    shareSuccess: "Roast erfolgreich geteilt!",
    shareNotAvailable:
      "Teilen-Funktion nicht verfügbar, aber wir haben den Text in deine Zwischenablage kopiert!",
    reachedRateLimit:
      "Tageslimit erreicht. Du kannst 5 Lebensläufe pro Tag hochladen. Bitte versuche es morgen erneut.",

    // Results
    resultTitle: "Dein Lebenslauf Wurde Komplett Zerstört",
    resultDescription:
      "Hier ist das erbarmungslose Roasting deines Lebenslaufs. Teile und verbreite die Schande!",
    copyButton: "Kopieren",
    shareButton: "Teilen",
    resetButton: "Zurücksetzen",
    supportButton: "Unterstützen",
    skipButton: "Überspringen",
    slowerTyping: "Langsamer",
    fasterTyping: "Schneller",

    // Support messages
    supportTitle: "Unterstützen Sie die KI-Kosten!",
    supportDescription:
      "Jede Lebenslauf-Kritik kostet Geld für die Verarbeitung mit der OpenAI-API. Wenn Sie dies nützlich fanden, erwägen Sie bitte, mir einen Kaffee zu spendieren!",
    enjoyedTitle: "Hat Ihnen Ihre Kritik gefallen?",
    enjoyedDescription:
      "Jede KI-generierte Kritik verursacht Produktionskosten. Wenn Sie dies amüsant fanden, erwägen Sie bitte, mir einen Kaffee zu spendieren, um die Betriebskosten zu unterstützen und die Kritiken am Laufen zu halten!",

    // Footer
    footerText: "Erstellt, um Egos und Lebensläufe seit 2024 zu zerstören",
    privacyNotice:
      "Wir speichern keine hochgeladenen Lebenslauf-Dateien. Ihre Daten werden verarbeitet und sofort gelöscht.",
    githubButton: "GitHub",
    coffeeButton: "Spendieren Sie mir einen Kaffee",

    // OpenAI Prompts
    systemPrompt:
      "Du bist ein Roast-Comedian, der sich auf die Kritik von Lebensläufen spezialisiert hat. Du bist witzig, sarkastisch und unnachgiebig. Du verwendest deutschen Slang und populäre Ausdrücke. Dein Ziel ist es, das Ego des Kandidaten auf humorvolle Weise zu zerstören.",
    userPrompt: `
      Du bewertest einen Lebenslauf. Agiere als unbarmherziger und humorvoller Kritiker.
      Zerstöre das Ego des Kandidaten vollständig, aber mache es unterhaltsam mit viel Sarkasmus und Humor.
      Kommentiere Lücken im Lebenslauf, fehlende relevante Erfahrung, Fähigkeiten, die übertrieben erscheinen,
      und alles, was lächerlich erscheint. Sei grausam, aber witzig. Verwende informelle Sprache und lockere Späße.
      Konzentriere dich für dein Roasting auf spezifische Details aus dem Lebenslauf.
      
      Lebenslauf:
    `,
  },
};

export function useTranslations(language: Language) {
  return translations[language];
}
