import apiService from "../services/api";
import { toast } from "react-toastify";

type Task = {
  id: string;
  title: string;
  description: string;
};

type CardsProps = {
  task: Task;
  onDelete: () => void;
};


const Cards = ({ task, onDelete }: CardsProps) => {

  const handleUpdate = async(id: string) => {

  try{
    await apiService.updateTask(id);
    onDelete();
    toast.success("Task Removed Successfully");
  }catch{
    toast.error("Error Removing The Task");
  }
}

  return (
    <>
    
    <div className="w-full bg-[#d5d5d5] rounded-lg shadow-md p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-black mb-2 max-w-[150px] overflow-hidden break-words ">{task.title}</h3>
        <p className="text-gray-600 text-sm max-w-[200px] overflow-hidden break-words ">{task.description}</p>
      </div>

      <div className="flex flex-col justify-end items-end h-full">
        <button
          className="bg-transparent mt-4 md:mt-0 text-black text-sm px-5 py-1 rounded-lg border-2 border-black transition-transform duration-200 hover:scale-105 "
          onClick={()=>handleUpdate(task.id)}
        >
          Done
        </button>
      </div>
    </div>
    </>
  )
}
export default Cards