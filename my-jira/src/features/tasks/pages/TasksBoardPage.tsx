import { useParams } from "react-router-dom";


export function TasksBoardPage() {

  const params = useParams();

  if (!params.projectId) {
    return <div>Project ID is missing in the URL.</div>;
  }
  return (
    <div>
      <h1>Tasks Board for {params.projectId}</h1>
      <p>This is the tasks board page.</p>
    </div>
  );
}