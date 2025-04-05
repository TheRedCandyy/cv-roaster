"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { CVUploadForm } from "@/components/cv-upload-form";
import { RoastResult } from "@/components/roast-result";
import { Flame, Github, Coffee } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useTranslations } from "@/lib/translations";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [roastResult, setRoastResult] = useState<string | null>(null);

  const handleRoastComplete = (roast: string) => {
    setRoastResult(roast);
  };

  const handleReset = () => {
    setRoastResult(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col min-h-screen">
        <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur w-full">
          <div className="container flex items-center h-14 px-4 md:px-6">
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
              <Flame className="h-5 w-5 text-red-500" />
              <span>{t.appName}</span>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">
              <span>{t.tagline}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-10 px-4 md:px-6 flex flex-col items-center">
          <div className="w-full max-w-3xl relative">
            <div className="absolute top-6 right-6 z-10">
              <LanguageSwitcher />
            </div>

            {!roastResult ? (
              <>
                <div className="text-center space-y-2 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {t.welcome}
                  </h1>
                  <p className="text-muted-foreground">
                    {t.welcomeDescription}
                  </p>
                </div>
                <CVUploadForm onRoastComplete={handleRoastComplete} />
              </>
            ) : (
              <RoastResult roast={roastResult} onReset={handleReset} />
            )}
          </div>
        </main>

        <footer className="py-6 mt-10 w-full">
          <div className="container">
            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary" size="sm" className="gap-2" asChild>
                <a
                  href="https://github.com/TheRedCandyy/cv-roaster"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {t.githubButton}
                </a>
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black"
                asChild
              >
                <a
                  href="https://buymeacoffee.com/alextavares"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="h-4 w-4" />
                  {t.coffeeButton}
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </div>

      <Toaster />
    </div>
  );
}
