import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Veuillez entrer un email valide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginInput = z.infer<typeof loginSchema>;

interface RegisterData {
  password: string;
  confirmPassword: string;
  username: string;
  email: string;
}

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    email: z.string().email('Veuillez entrer un email valide'),
    password: z
      .string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string(),
  })
  .refine((data: RegisterData) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
