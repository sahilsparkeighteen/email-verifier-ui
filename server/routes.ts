import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export function registerRoutes(app: Express): Server {
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new SessionStore({ checkPeriod: 86400000 }),
      resave: false,
      saveUninitialized: false,
      secret: "email-verifier-secret",
    })
  );

  app.post("/api/generate-auth-uri", async (_req, res) => {
    const params = new URLSearchParams({
      client_id: "email-verifier.com",
      redirect_uri: `https://email-verifier.com/auth/callback`,
      response_type: "code",
      scope: "email profile",
    });

    res.json({ url: `https://email-verifier.com/oauth2/auth?${params}` });
  });

  app.post("/api/handle-callback", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) throw new Error("No code provided");

      // Simulate OAuth token exchange
      const user = await storage.createUser({
        email: "user@example.com",
        name: "Demo User",
        picture: "https://ui-avatars.com/api/?name=Demo+User",
      });

      req.session.userId = user.id;
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to authenticate" });
    }
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json(user);
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.post("/api/verify-single-email", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { email } = req.body;
    // Simulate email verification
    const isValid = email.includes("@") && email.includes(".");
    res.json({ isValid });
  });

  app.post("/api/find-valid-email", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { fullName, domain } = req.body;
    // Simulate email finding
    const nameParts = fullName.toLowerCase().split(" ");
    const email = `${nameParts[0]}.${nameParts[1]}@${domain}`;
    res.json({ email });
  });

  const httpServer = createServer(app);
  return httpServer;
}
