import { useState } from "react";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language, useLanguage } from "@/contexts/language-context";

const languages = [
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-zinc-900 border-zinc-800"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => {
              setLanguage(lang.value as Language);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between",
              language === lang.value && "font-medium bg-zinc-800"
            )}
          >
            <span className="flex items-center gap-2">
              <span>{lang.label}</span>
            </span>
            {language === lang.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
