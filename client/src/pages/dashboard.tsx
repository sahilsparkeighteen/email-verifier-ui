import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerifyEmailForm from "@/components/verify-email-form";
import FindEmailForm from "@/components/find-email-form";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const userString = localStorage.getItem('demoUser');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('demoUser');
    setLocation("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Email Verifier Pro</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Email Verification Tools</CardTitle>
            <CardDescription>
              Verify single emails or find valid email addresses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="verify" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="verify">Verify Single Email</TabsTrigger>
                <TabsTrigger value="find">Find Valid Email</TabsTrigger>
              </TabsList>
              <TabsContent value="verify">
                <VerifyEmailForm />
              </TabsContent>
              <TabsContent value="find">
                <FindEmailForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}