import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tasksService } from "../services/tasks.services";

export function TaskDetailsPage() {

  const { selectedTask } = useParams();

  useEffect(() => {
    const fetchTask = async => {
            const taskData = await tasksService.getById(selectedTask as string);
    }
  }, [selectedTask]);

  return (
    <div className="space-y-6">


    </div>
  );
}