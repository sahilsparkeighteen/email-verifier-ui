import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

export default function Callback() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        
        if (!code) throw new Error("No code provided");
        
        const res = await fetch("/api/handle-callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        
        if (!res.ok) throw new Error("Failed to authenticate");
        
        setLocation("/dashboard");
      } catch (error) {
        setLocation("/login");
      }
    };
    
    handleCallback();
  }, [setLocation]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card>
        <CardContent className="pt-6">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </CardContent>
      </Card>
    </div>
  );
}
