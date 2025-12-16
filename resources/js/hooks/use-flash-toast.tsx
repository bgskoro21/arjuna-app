import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

interface FlashProps {
  success?: string;
  error?: string;
}

export function useFlashToast() {
  const { flash } = usePage<{ flash?: FlashProps }>().props;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }

    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);
}
