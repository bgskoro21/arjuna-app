import Swal from "sweetalert2";

export const swal = {
  success(message: string) {
    return Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: message,
      timer: 1800,
      showConfirmButton: false,
    });
  },

  error(message: string) {
    return Swal.fire({
      icon: "error",
      title: "Gagal",
      text: message,
      timer: 2000,
      showConfirmButton: false,
    });
  },

  confirm(message: string = "Yakin ingin melanjutkan?") {
    return Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: message,
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    });
  },

  toast(message: string, type: "success" | "error" | "info" = "success") {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      timer: 2500,
      showConfirmButton: false,
    });
  },
};
