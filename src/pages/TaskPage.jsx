import { ChevronLeftIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const [notes, setNotes] = useState("");

  // Carregar notas salvas
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${title}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [title]);

  // Salvar notas no localStorage
  const handleNotesChange = (value) => {
    setNotes(value);
    localStorage.setItem(`notes-${title}`, value);
  };

  // Limpar notas
  const handleClearNotes = () => {
    setNotes("");
    localStorage.removeItem(`notes-${title}`);
  };

  // Toolbar personalizada
  const modules = {
    toolbar: [
      [{ 'font': [] }],            // Fontes
      [{ 'size': ['small', false, 'large', 'huge'] }], // Tamanhos
      ['bold', 'italic', 'underline', 'strike'],       // Negrito, Itálico, Sublinhado, Tachado
      [{ 'color': [] }, { 'background': [] }],        // Cores do texto e fundo
      [{ 'align': [] }],           // Alinhamento
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],   // Listas
      ['link', 'image'],           // Link e imagem
      ['clean']                    // Limpar formatação
    ]
  };

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align', 'list',
    'link', 'image'
  ];

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="space-y-4 bg-slate-500 rounded-md shadow-lg p-6">
        <div className="flex justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 p-2 bg-slate-400 rounded-md text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        <div className="space-y-4 p-4 bg-slate-200 rounded-md shadow">
          <h2 className="text-xl font-bold text-slate-600 flex">{title}</h2>
          <p className="text-gray-600">{description}</p>

          {/* Editor de texto rico com toolbar personalizada */}
          <ReactQuill
            theme="snow"
            value={notes}
            onChange={handleNotesChange}
            modules={modules}
            formats={formats}
            className="bg-white rounded-md shadow-sm"
            placeholder="Escreva suas anotações..."
            style={{ height: "250px" }}
          />

          {/* Botão limpar */}
         <div className="mt-4 pt-7">
  <button
    onClick={handleClearNotes}
    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition"
  >
    <Trash2Icon className="w-5 h-5" />
    Limpar Anotações
  </button>
</div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;


