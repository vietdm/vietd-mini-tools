import { toast } from 'react-toastify';

export const useToast = () => {
  const success = (mgs, timeShow = 2000, position = "top-center") => {
    return toast.success(mgs, {
      autoClose: timeShow,
      position: position,
      theme: 'light',
      pauseOnFocusLoss: false
    });
  }

  return { success }
}
