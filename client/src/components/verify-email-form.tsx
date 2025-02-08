import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { verifyEmailSchema, type VerifyEmailInput } from "@shared/schema";

export default function VerifyEmailForm() {
  const { toast } = useToast();
  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: VerifyEmailInput) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dummy validation logic
      const isValid = data.email.includes("@") && 
                     data.email.includes(".") && 
                     data.email.length > 5;

      return { isValid };
    },
    onSuccess: (data) => {
      toast({
        title: "Verification Result",
        description: data.isValid ? "Email is valid!" : "Email is invalid",
        variant: data.isValid ? "default" : "destructive",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to verify email",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="example@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            "Verify Email"
          )}
        </Button>
      </form>
    </Form>
  );
}