import { ElMessage } from 'element-plus';

export default class NotificationService {
  public static notifySuccess() {
    ElMessage({
      message: 'Success',
      type: 'success',
    });
  }

  public static notifyFailure() {
    ElMessage({
      message: 'Something very unexpected happened. Our team is working on a solution already.',
      type: 'error',
      customClass: 'test-message',
    });
  }

  public static announce(message: string) {
    ElMessage({
      message,
    });
  }
}
