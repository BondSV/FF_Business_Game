import {
  users,
  gameSessions,
  weeklyStates,
  type User,
  type UpsertUser,
  type GameSession,
  type WeeklyState,
  type InsertGameSession,
  type InsertWeeklyState,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Game session operations
  createGameSession(gameSession: InsertGameSession): Promise<GameSession>;
  getGameSession(id: string): Promise<GameSession | undefined>;
  getUserActiveGameSession(userId: string): Promise<GameSession | undefined>;
  updateGameSession(id: string, updates: Partial<GameSession>): Promise<GameSession>;
  
  // Weekly state operations
  createWeeklyState(weeklyState: InsertWeeklyState): Promise<WeeklyState>;
  getWeeklyState(gameSessionId: string, weekNumber: number): Promise<WeeklyState | undefined>;
  getLatestWeeklyState(gameSessionId: string): Promise<WeeklyState | undefined>;
  updateWeeklyState(id: string, updates: Partial<WeeklyState>): Promise<WeeklyState>;
  getAllWeeklyStates(gameSessionId: string): Promise<WeeklyState[]>;
  commitWeeklyState(id: string): Promise<WeeklyState>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Game session operations
  async createGameSession(gameSession: InsertGameSession): Promise<GameSession> {
    const [session] = await db
      .insert(gameSessions)
      .values(gameSession)
      .returning();
    return session;
  }

  async getGameSession(id: string): Promise<GameSession | undefined> {
    const [session] = await db
      .select()
      .from(gameSessions)
      .where(eq(gameSessions.id, id));
    return session;
  }

  async getUserActiveGameSession(userId: string): Promise<GameSession | undefined> {
    const [session] = await db
      .select()
      .from(gameSessions)
      .where(and(
        eq(gameSessions.userId, userId),
        eq(gameSessions.isCompleted, false)
      ))
      .orderBy(desc(gameSessions.createdAt))
      .limit(1);
    return session;
  }

  async updateGameSession(id: string, updates: Partial<GameSession>): Promise<GameSession> {
    const [session] = await db
      .update(gameSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(gameSessions.id, id))
      .returning();
    return session;
  }

  // Weekly state operations
  async createWeeklyState(weeklyState: InsertWeeklyState): Promise<WeeklyState> {
    const [state] = await db
      .insert(weeklyStates)
      .values(weeklyState)
      .returning();
    return state;
  }

  async getWeeklyState(gameSessionId: string, weekNumber: number): Promise<WeeklyState | undefined> {
    const [state] = await db
      .select()
      .from(weeklyStates)
      .where(and(
        eq(weeklyStates.gameSessionId, gameSessionId),
        eq(weeklyStates.weekNumber, weekNumber)
      ));
    return state;
  }

  async getLatestWeeklyState(gameSessionId: string): Promise<WeeklyState | undefined> {
    const [state] = await db
      .select()
      .from(weeklyStates)
      .where(eq(weeklyStates.gameSessionId, gameSessionId))
      .orderBy(desc(weeklyStates.weekNumber))
      .limit(1);
    return state;
  }

  async updateWeeklyState(id: string, updates: Partial<WeeklyState>): Promise<WeeklyState> {
    const [state] = await db
      .update(weeklyStates)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(weeklyStates.id, id))
      .returning();
    return state;
  }

  async getAllWeeklyStates(gameSessionId: string): Promise<WeeklyState[]> {
    return await db
      .select()
      .from(weeklyStates)
      .where(eq(weeklyStates.gameSessionId, gameSessionId))
      .orderBy(weeklyStates.weekNumber);
  }

  async commitWeeklyState(id: string): Promise<WeeklyState> {
    const [state] = await db
      .update(weeklyStates)
      .set({ isCommitted: true, updatedAt: new Date() })
      .where(eq(weeklyStates.id, id))
      .returning();
    return state;
  }
}

export const storage = new DatabaseStorage();
