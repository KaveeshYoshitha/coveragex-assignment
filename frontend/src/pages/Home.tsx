import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import apiService from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {

  type Task = {
    id: string;
    title: string;
    description: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ id: "", title: "", description: "" })

 const fetchData = async ()=> {
      try{
        const data = await apiService.getTasks();
        setTasks(data);
      }catch{
        toast.error("Error loading tasks");
      }
  };

  //get the last tasks from the backend
  useEffect(()=>{
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({...task, [name]: value });
  }

  const resetFormValues = () => (
    setTask({ id: "", title: "", description: "" })
  );
  


  //handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!task.title.trim() || !task.description.trim()) {
      toast.warning("Please fill in all fields");
      resetFormValues();
      return;
    }

    try{
      const newTask = await apiService.addTask(task);
      fetchData();
      resetFormValues();
      toast.success("Task added successfully");
    }catch{
      toast.error("Error adding task");
    }


  }

  return (
    <>
    <ToastContainer position="top-right" autoClose={1000} />
      <section className="flex flex-col md:flex-row w-full h-screen" >
        {/* Left side - Add Task Form */}
        <div className= "bg-white w-full md:w-1/2 h-auto md:h-screen flex items-start justify-center m-0 pt-10 px-6 md:px-16 border-b-2 md:border-b-0 md:border-r-2 border-[#c4c4c4]" >
            <div className="bg-white w-full h-full p-6   ">
              <h3 className="text-2xl font-bold">Add a Task</h3>
                <form onSubmit={handleSubmit} className=" mt-8 flex flex-col gap-4" >
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleInputChange}
                  placeholder=" Title"
                  className="border-4 border-[#f3f3f3] text-black rounded-md p-2 text-base font-normal placeholder-black"
                />
                <textarea
                  name="description"
                  id="description"
                  cols={15}
                  rows={5}
                  value={task.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="border-4 border-[#f3f3f3] rounded-md p-2 text-base font-normal placeholder-black"
                ></textarea>

                <div className="flex justify-end">
                  <button type="submit" className="bg-[#0102f4] mt-8 text-white text-lg p-2 rounded-xl w-1/4 cursor-pointer transition-transform duration-200 hover:scale-105  ">Add</button>
                </div>

                </form>
            </div>
        </div>

        {/* Right side - Task Cards */}
        <div className="bg-white w-full md:w-1/2 h-auto md:h-screen flex items-start justify-center m-0 pt-10 px-6 md:px-24" >

            <div className="bg-white w-full h-full p-0 text-2xl font-bold flex flex-col gap-4 items-center justify-start overflow-y-scroll ">
              
              {tasks.length === 0 ? 
                (<p>No Tasks Available.</p>) : 
                tasks.map((t)=>{
                  return (
                    <Cards 
                      key={t.id} 
                      task={t} 
                      onDelete={()=>(fetchData())} 
                    />
                  )
                })
              }
            
            </div>

        </div>
      </section>
    </>
  )
}
export default Home