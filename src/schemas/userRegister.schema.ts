import { z } from "zod";

export const UserRegisterSchema = z.object({
  email: z.string().email(),
  pwd: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "비밀번호는 영어와 숫자를 포함해야 합니다."
    ),
  userName: z.string().min(2, "이름은 2자 이상이어야 합니다.")
});
