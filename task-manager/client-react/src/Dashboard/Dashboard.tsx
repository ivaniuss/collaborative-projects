import { IoNotificationsOutline } from "react-icons/io5";
import { FaDeleteLeft, FaRegCircleUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { Task } from "./TaskForm";

function Dashboard() {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [currentIdTask, setCurrentIdTask] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([])


  const cerrarAddModal = (bool: boolean) => {
    setAddModal(bool);
  }
  const cerrarUpdateModal = (bool: boolean) => {
    setUpdateModal(bool);
  }
  const editUpdate = (id: number) => {
    setCurrentIdTask(id);
    setUpdateModal(true)
  }

  const deleteTask = async (id: number) => {
    try {
      await fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(()=> console.log('Task eliminada'))
        .catch(e => console.error('Error al solicitar la eliminacion: ', e))
    } catch (e) {
        console.error(e)
  }
}

useEffect(() => {
  console.log('Hola mundo');
  const getTasks = async () => {
    try {
      await fetch('/tasks')
        .then(res => res.json())
        .then(data => {
          setTasks(data)
        })
    } catch (e) {
      console.error('Imposible solicitar la tarea', e);
    }
  };
  getTasks();
}, [addModal, updateModal])


return (
  <div className="relative flex outline h-screen">
    <aside className="flex-col justify-between flex bg-white h-screen w-72">
      <div>
        <section className="py-3 justify-between items-center flex border-b">
          <div className="items-center h-full flex">
            <div className="p-2 justify-center items-center flex h-full w-10">
              <img src="https://img.icons8.com/?size=100&id=61191&format=png&color=0f172a" />
            </div>
            <h1 className="text-slate-800 font-bold m-0 text-md">TaskMaster</h1>
          </div>
          <div className="mr-1 cursor-pointer justify-center items-center flex h-full w-14">
            <IoNotificationsOutline className="rounded-full transition hover:bg-slate-800 hover:text-white text-slate-800 p-2 text-4xl" />
          </div>
        </section>
        <section className="">
          <a href='/' className="hover:font-semibold hover:bg-slate-200 pl-4 py-4 items-center flex hover:text-slate-600 text-slate-500">
            <TbNotes className="text-lg" />
            <p className="pl-1 text-md">Notes</p>
          </a>
        </section>
      </div>
      <div className="px-3 place-items-center grid h-12 mb-4 w-full">
        <button
          className="transition hover:bg-slate-900 rounded-md py-1 w-full  bg-slate-800"
          onClick={() => setAddModal(true)}
        >
          + Add Note
        </button>
      </div>
    </aside>
    <main className="w-screen bg-white border-l">
      <header className="mt-5 justify-between flex border-b pt-1 p-5 text-slate-800">
        <div className="">
          <h1 className="font-bold text-4xl">Tasks</h1>
          <p className="text-sm pl-1 text-slate-500">Manage your tasks and stay organized.</p>
        </div>
        <div className="justify-end items-center flex text-right h-10">
          <p className="font-semibold pr-1 text-sm text-slate-800">Juan Gonzales</p>
          <FaRegCircleUser className="hover:text-slate-800 cursor-pointer p-1 h-full w-10 text-slate-500" />
        </div>
      </header>
      <article className="mt-5 p-5 pt-0">


        {/* ITERANDO DATOS DE EJEMPLO */}
        {/* {[
            [1, 'Title of the note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 'pending', 1],
            [2, 'Title of the note', ' vitae quidem, ipsa tenetur expedita! Consequuntur!', 'done', 2],
            [3, 'Title of the note', 'lit. Repellendus rem quaerat soluta impedit alitur!', 'working', 3],
          ].map(([id, title, description, status, id_status]) => (
            <section key={id} className={`${
                id_status == 1 ? 'bg-amber-300 hover:bg-amber-400/90' :
                id_status == 2 ? 'bg-lime-300 hover:bg-lime-400/90' :
                id_status == 3 ? 'bg-indigo-300 hover:bg-indigo-400/90' : ''
              } 
              p-4  justify-between flex  mt-3 rounded-md cursor-pointer`}>
              <div className="justify-center flex-col flex text-slate-800">
                <h1 className="font-bold text-xl">{title}</h1>
                <p className="text-sm w-full">{description}</p>
              </div>
              <div className="flex">
                <div className="justify-center items-center flex w-32 pr-3">
                  <p className={`${
                      id_status == 1 ? 'text-amber-50 bg-amber-500' :
                      id_status == 2 ? 'text-lime-50 bg-lime-500' :
                      id_status == 3 ? 'text-indigo-50 bg-indigo-500' : ''}
                rounded py-2 text-sm w-full text-center`}
                  >{status}</p>
                </div>
                <div className="gap-3 justify-center items-center flex flex-col px-3">
                  <FaEdit 
                    className="cursor-pointer text-2xl text-slate-800"
                    onClick={()=>editUpdate(Number(id))}
                  />
                  <FaDeleteLeft className="cursor-pointer text-2xl text-slate-800" />
                </div>
              </div>
            </section>
          ))} */}

        {/* ITERANDO DATOS DEL BACKEND */}
        {tasks.map((task, i) => (
          <section key={i} className={`${task.status_id == 1 ? 'bg-amber-300 hover:bg-amber-400/90' :
              task.status_id == 2 ? 'bg-lime-300 hover:bg-lime-400/90' :
                task.status_id == 3 ? 'bg-indigo-300 hover:bg-indigo-400/90' : ''
            } 
              p-4  justify-between flex  mt-3 rounded-md cursor-pointer`}>
            <div className="justify-center flex-col flex text-slate-800">
              <h1 className="font-bold text-xl">{task.title}</h1>
              <p className="text-sm w-full">{task.description}</p>
            </div>
            <div className="flex">
              <div className="justify-center items-center flex w-32 pr-3">
                <p className={`${task.status_id == 1 ? 'text-amber-50 bg-amber-500' :
                    task.status_id == 2 ? 'text-lime-50 bg-lime-500' :
                      task.status_id == 3 ? 'text-indigo-50 bg-indigo-500' : ''}
                  rounded py-2 text-sm w-full text-center`}
                >
                  {
                    task.status_id == 1 ? 'pending' : (
                      task.status_id == 2 ? 'done' : (
                        task.status_id == 3 ? 'working' : ''))}
                </p>
              </div>
              <div className="gap-3 justify-center items-center flex flex-col px-3">
                <FaEdit
                  className="cursor-pointer text-2xl text-slate-800"
                  onClick={() => editUpdate(task.id || 0)}
                />
                <FaDeleteLeft
                  className="cursor-pointer text-2xl text-slate-800"
                  onClick={() => deleteTask(task.id || 0)}
                />
              </div>
            </div>
          </section>
        ))}

      </article>
    </main>
    {addModal && <TaskForm propModal={cerrarAddModal} />}
    {updateModal && <TaskForm propModal={cerrarUpdateModal} idTask={currentIdTask} />}
  </div>
)
}

export default Dashboard;