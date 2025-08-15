import { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
    

AddTasks.propTypes = {
  onAddTaskSubmit: PropTypes.func.isRequired,
};


function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
//   console.log({title, description});
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o titulo da tarefa "        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite o descrição da tarefa "        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button  
        onClick={() => { 
            //verificar se o titulo e descrição não estão vazios
            if(!title.trim() || !description.trim()) {
                return alert("Por favor, preencha o título e a descrição da tarefa");
            } 
            onAddTaskSubmit (title, description);
            setTitle("");
            setDescription(""); 
          }}

      className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">
        Adicionar
      </button>
    </div>
  );
}

export default AddTasks;
