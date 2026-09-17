import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

function DialogDetail({ data, open, onOpenChange }) {
  const [Detail, setDetail] = useState();

  const getDetail = async () => {
    try {
      const response = await api.get(`/student/${data}`);
      setDetail(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!open || !data) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getDetail();
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {Detail && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Siswa</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 w-full">
            <span>
              <h1>Nama Lengkap</h1>
              <p className="text-muted-foreground">{Detail?.nama_lengkap}</p>
            </span>
            <span>
              <h1>NISN</h1>
              <p className="text-muted-foreground relative">
                {Detail?.nisn}
                <Button
                  size="icon"
                  variant="ghost"
                  className={"ml-1.5 absolute -top-1.5"}
                  onClick={async () => {
                    await navigator.clipboard.writeText(Detail.nisn);
                    toast.success("NISN berhasil disalin");
                  }}
                >
                  <Copy />
                </Button>
              </p>
            </span>
            <span>
              <h1>Kelas & Jurusan</h1>
              <p className="text-muted-foreground">
                {Detail?.kelas} {Detail?.jurusan}
              </p>
            </span>
            <span>
              <h1>Nomor Telp</h1>
              <p className="text-muted-foreground">{Detail?.nomor_telp}</p>
            </span>
            <span>
              <h1>Tempat Lahir</h1>
              <p className="text-muted-foreground">{Detail?.tempat_lahir}</p>
            </span>
            <span>
              <h1>Tanggal Lahir</h1>
              <p className="text-muted-foreground">{Detail?.tanggal_lahir}</p>
            </span>
            <span className="col-span-2">
              <h1>Alamat</h1>
              <p className="text-muted-foreground">{Detail?.alamat}</p>
            </span>
          </div>
          <DialogFooter className={"justify-start!"}>
            <div
              className={`flex items-center gap-2 ${Detail?.status === "aktif" ? "text-green-500" : "bg-red-500"}`}
            >
              <p className="text-muted-foreground">Status Siswa:</p>{" "}
              {Detail?.status === "aktif" ? "Aktif" : "Nonaktif"}
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default DialogDetail;
