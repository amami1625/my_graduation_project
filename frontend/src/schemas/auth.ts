import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "ユーザー名を入力してください" })
      .max(50, { message: "ユーザー名は50文字以内で入力してください" }),
    email: z.email({ message: "有効なメールアドレスを入力してください" }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください" }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "パスワード確認を入力してください" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"], // エラーを表示するフィールドを指定
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
