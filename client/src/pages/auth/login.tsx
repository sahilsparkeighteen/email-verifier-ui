import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";
import { Mail } from "lucide-react";

export default function Login() {
  const handleLogin = async () => {
    // Simulate OAuth flow with dummy response
    // In production, this would redirect to real Google OAuth
    const user = {
      email: "demo@example.com",
      name: "Demo User",
      picture: "https://ui-avatars.com/api/?name=Demo+User"
    };

    // Store user data in localStorage for demo purposes
    localStorage.setItem('demoUser', JSON.stringify(user));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="text-center mb-8">
        <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
          <Mail className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Email Verifier Pro</h1>
        <p className="text-muted-foreground mt-2">Verify email addresses with confidence</p>
      </div>

      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to access powerful email verification tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                continue with
              </span>
            </div>
          </div>

          <Button 
            className="w-full h-12 text-base" 
            onClick={handleLogin}
          >
            <SiGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}