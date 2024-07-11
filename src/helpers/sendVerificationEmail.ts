import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log(username,email,verifyCode)
    await resend.emails.send({
      from: 'Acme <noreply@volunlink.in.net>',
      to: email,
      subject: 'VolunLink Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}