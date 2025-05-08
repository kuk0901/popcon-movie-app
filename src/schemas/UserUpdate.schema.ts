import { z } from "zod";

export const UserUpdateSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .email()
    .min(5, "이메일은 5자 이상이어야 합니다.")
    .max(50, "이메일은 50자 이하이어야 합니다."),
  pwd: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "비밀번호는 영어와 숫자를 포함해야 합니다."
    )
    .optional(),
  userName: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .max(20, "이름은 20자 이하이어야 합니다.")
});
