import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { CardDescription, CardTitle } from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon, Pencil } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Spinner } from "./ui/spinner";

function DialogUpdate({ open, onOpenChange, refreshData, id }) {
  const [Error, setError] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [Form, setForm] = useState({
    nama_lengkap: "",
    nisn: "",
    alamat: "",
    tanggal_lahir: "",
    tempat_lahir: "",
    kelas: "",
    jurusan: "",
    gender: "",
    nomor_telp: "",
    status: "",
  });

  const kelas = [
    { value: "X" },
    { value: "XI" },
    { value: "XII" },
    { value: "XIII" },
  ];

  const gender = [
    { name: "Laki-Laki", value: "L" },
    { name: "Perempuan", value: "P" },
  ];

  const status = [
    { name: "Aktif", value: "aktif" },
    { name: "Nonaktif", value: "nonaktif" },
  ];

  const getDetail = async () => {
    try {
      const response = await api.get(`/student/${id}`);
      const data = response.data.data;

      setForm({
        nama_lengkap: data?.nama_lengkap || "",
        nisn: data?.nisn || "",
        alamat: data?.alamat || "",
        tanggal_lahir: data?.tanggal_lahir || "",
        tempat_lahir: data?.tempat_lahir || "",
        kelas: data?.kelas || "",
        jurusan: data?.jurusan || "",
        gender: data?.gender || "",
        nomor_telp: data?.nomor_telp || "",
        status: data?.status || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/student/${id}`, Form);
      onOpenChange(false);
      refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message);
      setError(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getDetail();
    }
  }, [open, id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"min-w-3xl"}>
        <DialogHeader>
          <CardTitle>Form Update Data Siswa</CardTitle>
          <CardDescription>Perbarui data siswa.</CardDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <FieldGroup>
            <div className="grid grid-cols-3 gap-4">
              <Field data-invalid={!!Error.nama_lengkap}>
                <FieldLabel>Nama Lengkap</FieldLabel>
                <Input
                  name="nama_lengkap"
                  placeholder="John Doe"
                  value={Form.nama_lengkap}
                  aria-invalid={!!Error.nama_lengkap}
                  onChange={(e) =>
                    setForm({ ...Form, nama_lengkap: e.target.value })
                  }
                />
                <FieldError>{Error.nama_lengkap}</FieldError>
              </Field>
              <Field data-invalid={!!Error.nisn}>
                <FieldLabel>NISN</FieldLabel>
                <Input
                  name="nisn"
                  placeholder="23091740"
                  value={Form.nisn}
                  aria-invalid={!!Error.nisn}
                  onChange={(e) => setForm({ ...Form, nisn: e.target.value })}
                />
                <FieldError>{Error.nisn}</FieldError>
              </Field>
              <Field data-invalid={!!Error.kelas}>
                <FieldLabel htmlFor="kelas">Kelas</FieldLabel>
                <Select
                  name="kelas"
                  value={Form.kelas}
                  onValueChange={(value) => setForm({ ...Form, kelas: value })}
                >
                  <SelectTrigger id="kelas" aria-invalid={!!Error.kelas}>
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {kelas.map((Item, index) => (
                        <SelectItem key={index} value={Item.value}>
                          {Item.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError>{Error.kelas}</FieldError>
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field data-invalid={!!Error.jurusan}>
                <FieldLabel>Jurusan</FieldLabel>
                <Input
                  name="jurusan"
                  placeholder="SIJA"
                  aria-invalid={!!Error.jurusan}
                  value={Form.jurusan}
                  onChange={(e) =>
                    setForm({ ...Form, jurusan: e.target.value })
                  }
                />
                <FieldError>{Error.jurusan}</FieldError>
              </Field>
              <Field data-invalid={!!Error.tempat_lahir}>
                <FieldLabel>Tempat Lahir</FieldLabel>
                <Input
                  name="tempat_lahir"
                  placeholder="Yogyakarta"
                  aria-invalid={!!Error.tempat_lahir}
                  value={Form.tempat_lahir}
                  onChange={(e) =>
                    setForm({ ...Form, tempat_lahir: e.target.value })
                  }
                />
                <FieldError>{Error.tempat_lahir}</FieldError>
              </Field>
              <Field data-invalid={!!Error.tanggal_lahir}>
                <FieldLabel>Tanggal Lahir</FieldLabel>
                <Popover name="tanggal_lahir">
                  <PopoverTrigger
                    aria-invalid={!!Error.tanggal_lahir}
                    render={
                      <Button
                        variant={"outline"}
                        data-empty={!date}
                        className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(value) => {
                        setDate(value);
                        setForm({
                          ...Form,
                          tanggal_lahir: value
                            ? format(value, "yyyy-MM-dd")
                            : "",
                        });
                      }}
                      defaultMonth={date}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FieldError>{Error.tanggal_lahir}</FieldError>
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field data-invalid={!!Error.nomor_telp}>
                <FieldLabel>Nomor Telp</FieldLabel>
                <Input
                  placeholder="08123456789"
                  value={Form.nomor_telp}
                  aria-invalid={!!Error.nomor_telp}
                  onChange={(e) =>
                    setForm({ ...Form, nomor_telp: e.target.value })
                  }
                />
                <FieldError>{Error.nomor_telp}</FieldError>
              </Field>
              <Field data-invalid={!!Error.gender}>
                <FieldLabel>Gender</FieldLabel>
                <Select
                  name="gender"
                  value={Form.gender}
                  onValueChange={(value) => setForm({ ...Form, gender: value })}
                >
                  <SelectTrigger aria-invalid={!!Error.kelas}>
                    <SelectValue placeholder="Pilih Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {gender.map((Item, index) => (
                        <SelectItem key={index} value={Item.value}>
                          {Item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError>{Error.gender}</FieldError>
              </Field>
              <Field data-invalid={!!Error.status}>
                <FieldLabel>Status</FieldLabel>
                <Select
                  value={Form.status}
                  onValueChange={(value) => setForm({ ...Form, status: value })}
                >
                  <SelectTrigger id="kelas" aria-invalid={!!Error.kelas}>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {status.map((Item, index) => (
                        <SelectItem key={index} value={Item.value}>
                          {Item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError>{Error.kelas}</FieldError>
              </Field>
            </div>
            <Field data-invalid={!!Error.alamat}>
              <FieldLabel>Alamat</FieldLabel>
              <Textarea
                name="alamat"
                placeholder="Jl. Alamat Siswa"
                value={Form.alamat}
                aria-invalid={!!Error.alamat}
                onChange={(e) => setForm({ ...Form, alamat: e.target.value })}
              />
              <FieldError>{Error.alamat}</FieldError>
            </Field>
          </FieldGroup>
          <DialogFooter className={"mt-4"}>
            <DialogClose>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={Loading}>
              {Loading ? <Spinner /> : <Pencil />}Perbarui Data Siswa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogUpdate;
