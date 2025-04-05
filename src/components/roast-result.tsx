import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share2, Copy, RotateCcw, Coffee, Heart } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/language-context";
import { useTranslations } from "@/lib/translations";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RoastResultProps {
  roast: string;
  onReset: () => void;
}

export function RoastResult({ roast, onReset }: RoastResultProps) {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      toast.success(t.copySuccess);
    } catch (error) {
      toast.error(t.copyError);
    }
  };

  const shareRoast = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CV Roaster",
          text: roast,
        });
        toast.success(t.shareSuccess);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyToClipboard();
      toast.info(t.shareNotAvailable);
    }
  };

  return (
    <Card className="w-full pt-4 border-zinc-800 bg-zinc-950/50">
      <CardHeader className="pt-2">
        <CardTitle>{t.resultTitle}</CardTitle>
        <CardDescription>{t.resultDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 max-h-[60vh] overflow-y-auto">
          {roast.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ) : null
          )}
        </div>

        <Alert className="mt-6 bg-yellow-500/10 border-yellow-500/50">
          <div className="flex items-start">
            <Coffee className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
            <AlertDescription className="text-sm">
              <span className="font-medium">{t.enjoyedTitle}</span>{" "}
              {t.enjoyedDescription}
            </AlertDescription>
          </div>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            {t.copyButton}
          </Button>
          <Button variant="outline" size="sm" onClick={shareRoast}>
            <Share2 className="h-4 w-4 mr-2" />
            {t.shareButton}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
            asChild
          >
            <a
              href="https://www.buymeacoffee.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="h-4 w-4 mr-2" />
              {t.supportButton}
            </a>
          </Button>
          <Button variant="default" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {t.resetButton}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
