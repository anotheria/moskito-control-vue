import { ElMessage } from 'element-plus';

export default class NotificationService {
  public static notifySuccess() {
    ElMessage({
      message: 'Success',
      type: 'success',
    });
  }

  public static notifyFailure(text?: string) {
    ElMessage({
      message: text || 'Something very unexpected happened. Our team is working on a solution already.',
      type: 'error',
      customClass: 'test-message',
      showClose: true,
    });
  }

  public static announce(message: string) {
    ElMessage({
      message,
    });
  }
}
