import { useContext, useEffect, useState } from "react";
import { DarkMode } from "./DarkMode";
import { ContextGlobal } from "@/context/Context";
import { Button, Card, } from "@heroui/react";
import { useTranslation } from "@/context/i18nContext";
import { useCards } from "@/hooks/useCard";
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
export const Card1 = ({
  title,
  starDate,
  endDate,
  status,
  _id,
  comments,
  duration,
  onStart,
  onFinish,
  onDelete,
  onEdit,
}: totoListProps) => {
  const { t } = useTranslation();
  const [elapsed, setElapsed] = useState<string>("00:00:00");
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { isSelected, setIsSelected } = useContext(ContextGlobal);
  const { formatTime, totalTimeFormated, ver } = useCards({
    title,
    starDate,
    endDate,
    status,
    _id,
    duration,
    comments,
    onStart,
    onFinish,
    onDelete,
    onEdit,
  });

  useEffect(() => {
    if (!starDate || status === "done") return;
    const interval = setInterval(() => {
      const deltaTime = Date.now() - new Date(starDate).getTime();
      if (deltaTime < 0) return;
      setElapsed(formatTime(deltaTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [starDate, status]);

  return (
    <div>
      <Card
        className={`bg-[#1a1a31] w-full items-stretch md:flex-row  ${status == "pending" ? "card-pe" : ""} ${status == "inProgress" ? "card-ip" : ""} ${status == "done" ? "card-d" : ""} ${!isSelected ? "bg-violet-800" : ""}`}
      >
        <div className="flex flex-1 flex-col gap-3">
          <Card.Header className="gap-1">
            <DarkMode />
            {/*Título o input de edición */}
            {editing ? (
              <div>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  type="text"
                  className="border border-[#425] text-black mr-2"
                />
                <Button
                  onPress={() => {
                    onEdit(_id, newTitle);
                    setEditing(false);
                  }}
                >
                  {t.card.saveButton}
                </Button>
                <Button onPress={() => setEditing(false)}>
                  {t.card.cancelButton}{" "}
                </Button>
              </div>
            ) : (
              <Card.Title className="title text-white pr-8">{title}</Card.Title>
            )}

            <Card.Description className="flex flex-col">
              <span className="card-timer">
                {status == "pending" && `${t.card.notStarted}`}
                {status == "inProgress" && `${t.card.time} ${elapsed}`}
                {status == "done" && `${t.card.time} ${totalTimeFormated}`}
              </span>
              <span>{t.card[status]}</span>
              <span>
                {t.card.comment}: {comments.length}
              </span>
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Botones */}
            {status == "pending" && (
              <Button onPress={() => onStart(_id)}>{t.card.startButton}</Button>
            )}
            {status == "pending" && (
              <Button
                style={{ backgroundColor: "#a3e" }}
                onPress={() => setEditing(true)}
              >
                {t.card.editButton}
              </Button>
            )}
            {status == "inProgress" && (
              <Button onPress={() => onFinish(_id)}>{t.card.endButton}</Button>
            )}
            {status == "done" && (
              <Button onPress={() => onDelete(_id)}>
                {t.card.deleteButton}
              </Button>
            )}
            <Button onPress={ver} className="bg-[#542]">
              {t.card.see}
            </Button>
          </Card.Footer>
        </div>
      </Card>
    </div>
  );
};
