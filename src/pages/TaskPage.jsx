import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();   

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="space-y-4 w-[500px] mx-auto bg-slate-100 rounded-md shadow-lg p-6 ">
        <div className="flex justify-center relative">
            <button onClick={() => navigate (-1)} className="absolute left-0 top-0 p-2 bg-slate-400 rounded-md text-slate-100" >
               <ChevronLeftIcon className="text-white" />
            </button>
       <Title>Detalhes da Tarefa</Title>
        </div>

        <div className="space-y-4 p-4 bg-slate-200 rounded-md shadow ">
          <h2 className="text-xl font-bold text-slate-600"> {title}</h2>
          <p className="text-gray-600"> {description}</p> 
      </div>
    </div>
     </div>
  );
}

export default TaskPage;
