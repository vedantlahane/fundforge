
import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface UseToastReturn {
  toast: (options: ToastOptions) => string | number;
  success: (message: string, options?: Omit<ToastOptions, 'title'>) => string | number;
  error: (message: string, options?: Omit<ToastOptions, 'title'>) => string | number;
  info: (message: string, options?: Omit<ToastOptions, 'title'>) => string | number;
  warning: (message: string, options?: Omit<ToastOptions, 'title'>) => string | number;
  dismiss: (id?: string | number) => void;
  loading: (message: string, options?: Omit<ToastOptions, 'title'>) => string | number;
}

export function useToast(): UseToastReturn {
  const toast = ({ title, description, action, duration }: ToastOptions) => {
    const message = title || description || "";
    const options: any = {
      description: title && description ? description : undefined,
      duration,
    };

    if (action) {
      options.action = {
        label: action.label,
        onClick: action.onClick,
      };
    }

    return sonnerToast(message, options);
  };

  const success = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  };

  const error = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  };

  const info = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  };

  const warning = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  };

  const loading = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return sonnerToast.loading(message, {
      description: options?.description,
      duration: options?.duration,
    });
  };

  const dismiss = (id?: string | number) => {
    if (id) {
      sonnerToast.dismiss(id);
    } else {
      sonnerToast.dismiss();
    }
  };

  return {
    toast,
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
  };
}

export default useToast;
