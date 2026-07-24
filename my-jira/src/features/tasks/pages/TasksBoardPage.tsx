import { useParams } from "react-router-dom";


export function TasksBoardPage() {

  const params = useParams();
  return (
    <div>
      <h1>Tasks Board for {params.projectId}</h1>
      <p>This is the tasks board page.</p>
    </div>
  );
}