import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { findEmailSchema, type FindEmailInput } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function FindEmailForm() {
  const { toast } = useToast();
  const form = useForm<FindEmailInput>({
    resolver: zodResolver(findEmailSchema),
    defaultValues: { fullName: "", domain: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: FindEmailInput) => {
      const res = await apiRequest("POST", "/api/find-valid-email", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.email) {
        toast({
          title: "Email Found",
          description: data.email,
        });
      } else {
        toast({
          title: "No Email Found",
          description: "Could not find a valid email address",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to find email",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Domain</FormLabel>
              <FormControl>
                <Input placeholder="company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            "Find Email"
          )}
        </Button>
      </form>
    </Form>
  );
}
