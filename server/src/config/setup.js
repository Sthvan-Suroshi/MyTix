import dotenv from "dotenv";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { User } from "../models/user.js";
import { Bus } from "../models/bus.js";
import { Ticket } from "../models/ticket.js";
import { COOKIE_PASSWORD } from "./config.js";
dotenv.config();

AdminJS.registerAdapter(AdminJSMongoose);

const DefaultAdmin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const authenticate = async (email, password) => {
  if (email === DefaultAdmin.email && password === DefaultAdmin.password) {
    return Promise.resolve(DefaultAdmin);
  }
  return null;
};

export const buildAdminJS = (app) => {
  const admin = new AdminJS({
    resources: [User, Bus, Ticket],
    // resources: [{ resource: User }, { resource: Bus }, { resource: Ticket }],
    rootPath: "/admin",
    branding: {
      companyName: "MyTix",
      withMadeWithLove: false,
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: process.env.COOKIE_PASSWORD,
      store: sessionStore,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
