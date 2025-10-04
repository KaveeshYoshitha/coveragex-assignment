import axios from 'axios';

//Base URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api/tasks',
});


const apiService = {


    //get the last 5 tasks
    getTasks: async () => {
        const response = await API.get("/gettasks");
        return response.data;
    },

    //get all tasks
    getAllTasks: async () => {
        const response = await API.get("/getalltasks");
        return response.data;
    },

    //add a task
    addTask: async (task) => {
        const response = await API.post("/addtask", task );
        return response.data;
    },

    //update a task
    updateTask: async (id) => {
        const response = await API.put(`/${id}/updatetask`);
        return response.data;
    }

};

export default apiService;