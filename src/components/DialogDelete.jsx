import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { api } from "@/lib/api";
import { Trash2Icon } from "lucide-react";
import { Spinner } from "./ui/spinner";

function DialogDelete({ student, refreshData, open, onOpenChange }) {
const [Loading, setLoading] = useState(null);

  const handleDelete = async (id) => {
    setLoading(id);
    try {
      await api.delete(`/student/${id}`);
      refreshData();
      onOpenChange(false);
      toast.success(`Berhasil menghapus data`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Anda yakin ingin menghapus data {student?.nama_lengkap}?
          </DialogTitle>
          <DialogDescription>
            Dengan menekan tombol delete data akan dihapus dari database dan
            tidak bisa di restore.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2"></div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDelete(student.id)}
          >
            Delete {Loading ? <Spinner /> : <Trash2Icon />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDelete;
