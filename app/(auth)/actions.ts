"use server";

import { z } from "zod";

import {
  createUser,
  getUser,
  updateUserProfile as updateUserProfileDb,
} from "@/lib/db/queries-prisma";

import { signIn } from "./auth";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const profileUpdateSchema = z.object({
  userId: z.string(),
  name: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    }
    await createUser(validatedData.email, validatedData.password);
    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export interface UpdateProfileActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const updateUserProfile = async (data: {
  userId: string;
  name?: string;
  country?: string;
  zipCode?: string;
}): Promise<UpdateProfileActionState> => {
  try {
    const validatedData = profileUpdateSchema.parse(data);

    await updateUserProfileDb({
      userId: validatedData.userId,
      name: validatedData.name,
      country: validatedData.country,
      zipCode: validatedData.zipCode,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
