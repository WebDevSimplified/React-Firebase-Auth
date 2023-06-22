import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function useBoard(boardId=null) {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    return db.tasks
      .where("user_id", "==", currentUser.uid)
      .orderBy("status")
      .onSnapshot((snapshot) => {
        setTasks(snapshot.docs.map(db.formatDoc));
      });
  }, [currentUser]);

  return { tasks };
}
