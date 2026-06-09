"use client";
import { useState, useEffect } from "react";
import { Card1 } from "@/components/Card";
import { useTranslation } from "@/context/i18nContext";
import { LanguageSelector } from "@/components/LanguagesSelector";
import { useHome } from "@/hooks/useHome";

export default function Home() {
  const [title, setTitle] = useState("");
  const { t } = useTranslation();
  const {
    handleChange,
    addList,
    startTask,
    doneTask,
    editTask,
    deleteTask,
    todoList,
  } = useHome();

  console.log(todoList);

  return (
    <div className="task">
      <h1 className="title-1">{t.title}</h1>
      <div className="addTask">
        <input
          className="bg-[#2d2e44] p-2 rounded-xl w-80 border "
          onChange={handleChange}
          type="text"
          value={title}
          placeholder={t.placeholder}
        />
        <button className="rounded-xl bg-[#29a1d1] w-20" onClick={addList}>
          {t.addButton}
        </button>
      </div>
      <LanguageSelector />
      <div className="container">
        {todoList.map((task) => {
          return (
            <Card1
              key={task._id}
              _id={task._id}
              title={task.title}
              starDate={task.starDate}
              endDate={task.endDate}
              status={task.status}
              comments={task.comments}
              onStart={startTask}
              onEdit={editTask}
              onFinish={doneTask}
              onDelete={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}
