import { IoNotificationsOutline } from "react-icons/io5";
import { FaDeleteLeft, FaRegCircleUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { useState } from "react";
import AddTask from "./AddTask";


function Dashboard() {
  const [modal, setModal] = useState(false)


  const openModal = () => {
    setModal(true);
  }
  const cerrarModal = (bool: boolean) => {
    setModal(bool);
  }

  return (
    <div className="flex outline h-screen">
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
            <a href='/referencia' className="hover:font-semibold hover:bg-slate-200 pl-4 py-4 items-center flex hover:text-slate-600 text-slate-500">
              <TbNotes className="text-lg" />
              <p className="pl-1 text-md">Notes</p>
            </a>
          </section>
        </div>
        <div className="px-3 place-items-center grid h-12 mb-4 w-full">
          <button 
            className="transition hover:bg-slate-900 rounded-md py-1 w-full  bg-slate-800"
            onClick={() => openModal()}
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
          {[
            ['Title of the note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus rem quaerat soluta impedit aliquid sequi doloremque quo iure, reprehenderit, veritatis eos nostrum odio omnis vitae quidem, ipsa tenetur expedita! Consequuntur!', 'in-progress'],
            ['Title of the note', ' vitae quidem, ipsa tenetur expedita! Consequuntur!', 'done'],
            ['Title of the note', 'lit. Repellendus rem quaerat soluta impedit aliquid sequi doloremque quo iure, reprehenderit, veritatis eos nostrum odio omnis vitae quidem, ipsa tenetur expedita! Consequuntur!', 'working'],
          ].map(([title, description, status, i]) => (
            <section key={i} className={`${status == 'in-progress' ? 'bg-amber-300' :
              status == 'done' ? 'bg-lime-300' :
                status == 'working' ? 'bg-indigo-300' : ''
              } 
              
              p-4  justify-between flex  mt-3 rounded-md`}>
              <div className="justify-center flex-col flex text-slate-800">
                <h1 className="font-bold text-xl">{title}</h1>
                <p className="text-sm w-full">{description}</p>
              </div>
              <div className="flex">
                <div className="justify-center items-center flex w-32 pr-3">
                  <p className={`${status == 'in-progress' ? 'text-amber-50 bg-amber-400' :
                    status == 'done' ? 'text-lime-50 bg-lime-400' :
                      status == 'working' ? 'text-indigo-50 bg-indigo-400' : ''}
                rounded py-2 text-sm w-full text-center`}
                  >{status}</p>
                </div>
                <div className="gap-3 justify-center items-center flex flex-col px-3">
                  <FaEdit className="cursor-pointer text-2xl text-slate-800" />
                  <FaDeleteLeft className="cursor-pointer text-2xl text-slate-800" />
                </div>
              </div>
            </section>
          ))}
        </article>
      </main>
      {modal && <AddTask propModal={cerrarModal}/>}
    </div>
  )
}

export default Dashboard;