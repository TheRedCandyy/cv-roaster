import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UploadCloud, FileText, Loader2, Coffee } from "lucide-react";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from "@/contexts/language-context";
import { useTranslations } from "@/lib/translations";
import { LanguageSwitcher } from "./language-switcher";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CVUploadFormProps {
  onRoastComplete: (roast: string) => void;
}

export function CVUploadForm({ onRoastComplete }: CVUploadFormProps) {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const [isUploading, setIsUploading] = useState(false);

  const formSchema = z.object({
    file: z.instanceof(File, { message: t.fileRequired }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "text/plain": [".txt"],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles?.[0]) {
          form.setValue("file", acceptedFiles[0], { shouldValidate: true });
        }
      },
    });

  const selectedFile = form.watch("file");

  async function onSubmit(data: FormValues) {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("cv", data.file);
      formData.append("language", language);

      const response = await fetch("/api/roast", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Check if this is a rate limit error (status 429)
        if (response.status === 429) {
          throw new Error(t.reachedRateLimit);
        }

        throw new Error(errorData.error || t.errorProcessing);
      }

      const result = await response.json();
      onRoastComplete(result.roast);
      toast.success(t.copySuccess);
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error(error instanceof Error ? error.message : t.errorProcessing);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full pt-4 border-zinc-800 bg-zinc-950/50">
          <CardHeader className="pt-2">
            <CardTitle>{t.uploadTitle}</CardTitle>
            <CardDescription>{t.uploadDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="absolute top-0 right-0 z-10">
              <LanguageSwitcher />
            </div>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-primary bg-primary/10"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {selectedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="h-10 w-10 text-primary" />
                          <p className="text-sm font-medium">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <UploadCloud className="h-10 w-10 text-muted-foreground" />
                          <p className="text-sm font-medium">{t.dragAndDrop}</p>
                          <p className="text-xs text-muted-foreground">
                            {t.supportedFormats}
                          </p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedFile && (
              <Alert className="mt-4 bg-yellow-500/10 border-yellow-500/50">
                <Coffee className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-sm support-message">
                  <div className="inline-block w-full">
                    <span className="font-medium">{t.supportTitle}</span>{" "}
                    <span className="inline-block">{t.supportDescription}</span>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.processingCV}
                </>
              ) : (
                <>{t.submitButton}</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
