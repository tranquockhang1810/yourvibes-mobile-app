import { ForgotPasswordRepo } from "@/src/api/features/forgotPassword/ForgotPasswordRepo";
import { ForgotPasswordResponseModel } from "@/src/api/features/forgotPassword/models/ForgotPassword";
import Toast from "react-native-toast-message";

export class ForgotPasswordViewModel {
  private repo: ForgotPasswordRepo;

  constructor() {
    this.repo = new ForgotPasswordRepo();
  }

  // Yêu cầu OTP
  public async requestOTP(email: string, otp: string): Promise<void> {
    try {
      if (!email) {
        Toast.show({
          text1: "Vui lòng nhập email hợp lệ.",
          type: "error",
        });
        return;
      }
      await this.repo.verifyOTP({ email });
      Toast.show({
        text1: "OTP đã được gửi thành công đến email của bạn.",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text1: "Không thể gửi OTP. Vui lòng thử lại sau.",
        type: "error",
      });
    }
  }
  // Đặt lại mật khẩu
  public async resetPassword(
    request: ForgotPasswordResponseModel
  ): Promise<void> {
    try {
      const { email, new_password, otp } = request;
      if (!email || !new_password || !otp) {
        Toast.show({
          text1: "Vui lòng nhập đầy đủ thông tin.",
          type: "error",
        });
        return;
      }
      await this.repo.resetPassword({ email, new_password, otp });
      Toast.show({
        text1: "Mật khẩu đã được đặt lại thành công.",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text1: "Đặt lại mật khẩu thất bại. Vui lòng thử lại.",
        type: "error",
      });
    }
  }
}