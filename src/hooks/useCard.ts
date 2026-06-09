import { useRouter } from "next/navigation";
interface totoListProps {
  title: string;
  starDate?: number | undefined;
  endDate?: number | undefined;
  status: "pending" | "inProgress" | "done";
  _id: string;
  duration?: number;
  comments: string[];
  onStart: (_id: string) => void;
  onFinish: (_id: string) => void;
  onDelete: (_id: string) => void;
  onEdit: (_id: string, newTitle: string) => void;
}
export const useCards = ({ starDate, endDate, _id }: totoListProps) => {
  const router = useRouter();

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const format = (n: number) => String(n).padStart(2, "0");
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  };

  const totalTimeFormated =
    starDate && endDate
      ? formatTime(new Date(endDate).getTime() - new Date(starDate).getTime())
      : "00:00:00";
  console.log("starDate:", starDate, "endDate:", endDate);

  const ver = () => {
    router.push(`/todolist/${_id}`);
  };

  return {
    formatTime,
    totalTimeFormated,
    ver,
  };
};
