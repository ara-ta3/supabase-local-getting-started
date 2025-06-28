import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import type { Database } from "./types/database.types";

type Task = Database["public"]["Tables"]["tasks"]["Row"];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("tasks").select("*");

      if (error) {
        setError(error.message);
      } else {
        setTasks(data || []);
      }
    } catch (err) {
      setError("予期しないエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <div>
      <h1>タスク一覧</h1>
      {tasks.length === 0 ? (
        <p>タスクがありません</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.done ? "完了" : "未完了"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
