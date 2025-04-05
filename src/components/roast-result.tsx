import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Share2,
  Copy,
  RotateCcw,
  Coffee,
  Heart,
  FastForward,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/language-context";
import { useTranslations } from "@/lib/translations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";

interface RoastResultProps {
  roast: string;
  onReset: () => void;
}

export function RoastResult({ roast, onReset }: RoastResultProps) {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [typingComplete, setTypingComplete] = useState(false);
  const [fullRoast, setFullRoast] = useState("");
  const [typingSpeed, setTypingSpeed] = useState<number>(75); // Default typing speed (characters per min)

  useEffect(() => {
    setFullRoast(roast);
    setTypingComplete(false);
  }, [roast]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullRoast);
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
          text: fullRoast,
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

  const paragraphs = fullRoast.split("\n").filter((p) => p.trim());

  const increaseSpeed = () => {
    setTypingSpeed((prev) => Math.max(25, prev - 25));
  };

  const decreaseSpeed = () => {
    setTypingSpeed((prev) => Math.min(125, prev + 25));
  };

  return (
    <Card className="w-full pt-4 border-zinc-800 bg-zinc-950/50">
      <CardHeader className="pt-2">
        <CardTitle>{t.resultTitle}</CardTitle>
        <CardDescription>{t.resultDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 max-h-[60vh] overflow-y-auto relative">
          {!typingComplete ? (
            <>
              <TypeAnimation
                sequence={[fullRoast, () => setTypingComplete(true)]}
                wrapper="div"
                cursor={true}
                repeat={0}
                style={{ whiteSpace: "pre-line", display: "block" }}
                speed={{ type: "keyStrokeDelayInMs", value: typingSpeed }}
                className="typing-animation"
                omitDeletionAnimation={true}
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <div className="flex items-center bg-background/30 backdrop-blur-sm rounded-md px-2 py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={decreaseSpeed}
                    title={t.slowerTyping}
                  >
                    <Zap className="h-3 w-3 opacity-50" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={increaseSpeed}
                    title={t.fasterTyping}
                  >
                    <Zap className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background/30 backdrop-blur-sm"
                  onClick={() => setTypingComplete(true)}
                >
                  <FastForward className="h-3 w-3 mr-1" />
                  <span className="text-xs">{t.skipButton}</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="roast-content">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>

        <Alert className="mt-6 bg-yellow-500/10 border-yellow-500/50">
          <div className="flex items-start">
            <Coffee className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
            <AlertDescription className="text-sm support-message">
              <div className="inline-block w-full">
                <span className="font-medium">{t.enjoyedTitle}</span>{" "}
                <span className="inline-block">{t.enjoyedDescription}</span>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            disabled={!typingComplete}
          >
            <Copy className="h-4 w-4 mr-2" />
            {t.copyButton}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shareRoast}
            disabled={!typingComplete}
          >
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
              href="https://buymeacoffee.com/alextavares"
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
