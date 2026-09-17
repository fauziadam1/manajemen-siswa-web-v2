// import { UserRound } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function Statistitcs({ Students }) {
  const StatisticsData = [
    {
      title: "Total Siswa",
      data: Students.filter((Item) => Item).length,
    //   icon: <UserRound />
    },
    {
      title: "Total Laki-Laki",
      data: Students.filter((Item) => Item.gender === "L").length,
    //   icon: <UserRound />
    },
    {
      title: "Total Perempuan",
      data: Students.filter((Item) => Item.gender === "P").length,
    //   icon: <UserRound />
    },
    {
      title: "Total Aktif",
      data: Students.filter((Item) => Item.status === "aktif").length,
    //   icon: <UserRound />
    },
  ];

  return (
    <div className="mt-5">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-5">
        {StatisticsData.map((Item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className={"text-muted-foreground font-normal"}>{Item.title}</CardTitle>
              <CardDescription className={"text-2xl text-black font-bold"}>{Item.data}</CardDescription>
              {/* <CardAction>{Item.icon}</CardAction> */}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Statistitcs;
