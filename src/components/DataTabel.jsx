import { api } from "@/lib/api";
import { Spinner } from "./ui/spinner";
import { useEffect, useState } from "react";
import Statistitcs from "./Statistitcs";
import { Button } from "./ui/button";
import { Eye, Pencil, Plus, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import DialogDetail from "./DialogDetail";
import DialogForm from "./DialogForm";
import { Input } from "./ui/input";
import { Field } from "./ui/field";
import DialogDelete from "./DialogDelete";
import DialogUpdate from "./DialogUpdate";

function DataTabel() {
  const [Loading, setLoading] = useState(false);
  const [Students, setStudents] = useState([]);
  const [IsFormOpen, setIsFormOpen] = useState(false);
  const [IsUpdateOpen, setIsUpdateOpen] = useState(false);
  const [IsDetailOpen, setIsDetailOpen] = useState(false);
  const [IsDeleteOpen, setIsDeleteOpen] = useState(false);
  const [SelectUpdate, setSelectUpdate] = useState(null);
  const [SelectDelete, setSelectDelete] = useState(null);
  const [SelectStudent, setSelectStudent] = useState(null);

  const header = ["No", "NISN", "Nama", "Kelas", "Jurusan", "Gender", "Action"];

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/students");
      setStudents(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getStudents();
  }, []);

  if (Loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-5">
      <Statistitcs Students={Students} />
      <div className="max-w-6xl mx-auto mt-5">
        <Field orientation="horizontal">
          <Input type="search" placeholder="Search..." />
          <Button
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            Tambah Data Siswa <Plus />
          </Button>
        </Field>
      </div>
      <table className="mt-5 flex flex-col max-w-6xl mx-auto border border-b-0 rounded-xl overflow-auto">
        <thead className="flex text-left w-full bg-accent">
          {header.map((Item, index) => (
            <th className={`px-4 py-3 ${index === 0 ? "w-20" : "w-full"}`}>
              {Item}
            </th>
          ))}
        </thead>
        <tbody className="w-full border-t">
          {Students.map((Student, index) => (
            <tr
              key={index}
              className="w-full flex text-left odd:bg-white even:bg-gray-50"
            >
              <td className="w-45 border-r py-3 px-4 border-b bg-accent text-sm flex items-center justify-start">
                {index + 1}
              </td>
              <td className="w-full py-3 px-4 border-b text-sm flex items-center justify-start">
                {Student.nisn}
              </td>
              <td className="w-full py-3 px-4 border-b text-sm flex items-center justify-start">
                {Student.nama_lengkap}
              </td>
              <td className="w-full py-3 px-4 border-b text-sm flex items-center justify-start">
                {Student.kelas}
              </td>
              <td className="w-full py-3 px-4 border-b text-sm flex items-center justify-start">
                {Student.jurusan}
              </td>
              <td className="w-full py-3 px-4 border-b text-sm flex items-center justify-start">
                {Student.gender}
              </td>
              <td className="w-full py-3 px-4 border-b text-sm flex items-center justify-start">
                <span className="grid grid-cols-3 gap-2">
                  <Button size="icon" variant="default">
                    <Link
                      onClick={() => {
                        setIsUpdateOpen(true);
                        setSelectUpdate(Student.id);
                      }}
                    >
                      <Pencil />
                    </Link>
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Link
                      onClick={() => {
                        setIsDetailOpen(true);
                        setSelectStudent(Student.id);
                      }}
                    >
                      <Eye />
                    </Link>
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Link
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setSelectDelete(Student);
                      }}
                    >
                      <Trash2Icon />
                    </Link>
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DialogForm
        open={IsFormOpen}
        onOpenChange={setIsFormOpen}
        data={getStudents}
      />
      <DialogDelete
        student={SelectDelete}
        open={IsDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        refreshData={getStudents}
      />
      <DialogDetail
        data={SelectStudent}
        open={IsDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
      <DialogUpdate
        open={IsUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        id={SelectUpdate}
        refreshData={getStudents}
      />
    </div>
  );
}

export default DataTabel;
