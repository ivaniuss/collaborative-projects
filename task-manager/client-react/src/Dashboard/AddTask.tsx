import './AddTask.css';
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';

export interface Modal {
    propModal: (dato: boolean) => void,
}
export interface Task {
    title: string;
    description: string;
    status_id: number;
}

const AddTask: React.FC<Modal> = ({ propModal }) => {
    const [selectStatus, setSelectStatus] = useState<number>(0);
    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        status_id: 0,
    })

    //Manejador para agregar status de la tarea seleccionado
    const handleOption = (value: number) => {
        setSelectStatus(value);
        setTask(prev => ({ ...prev, status_id: value }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(task);
        try {
            await fetch("/tasks", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(() => {
                    console.log('Task agregada con exito')
                })
                .catch((e) => console.error('No se ha podido agregar la tarea: ', e));
        }
        catch (e) {
            console.error('No se ha podido enviar la solicitud', e);
        }
    }

    return (
        <section className="left-0 justify-center items-center flex fixed h-screen w-screen bg-black/50">
            <div className="relative rounded-lg w-2/6 h-96 bg-white">
                <button
                    className="absolute right-3 top-3"
                    onClick={() => propModal(false)}
                >
                    <IoCloseSharp className='rounded-md hover:bg-slate-800/25 outline outline-1 outline-gray-800/25 p-1 text-4xl text-slate-900' />
                </button>
                <h1 className='m-0 pb-2 pl-5 pt-4 text-3xl font-bold text-slate-900'>Add Tasks</h1>
                <form onSubmit={handleSubmit} className="px-4 flex flex-col p-2 gap-4">
                    <input
                        className="pb-1 font-bold text-slate-800 placeholder:text-slate-800/50 pl-1 border-slate-600 border-b text-lg bg-transparent outline-none"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title of the task.."
                        onChange={handleChange}
                    />
                    <textarea
                        className="text-slate-800 outline-none scrollbar-custom placeholder:text-slate-800/50 pl-1 resize-none h-24 bg-transparent"
                        name="description"
                        id="description"
                        placeholder="Description of the task.."
                        onChange={handleChange}
                    >
                    </textarea>
                    <p className='font-bold text-slate-900'>Status:</p>
                    <div className='mb-4 flex items-center gap-3'>
                        {[
                            [1, 'bg-amber-400', 'done'],
                            [2, 'bg-lime-400', 'in-progress'],
                            [3, 'bg-indigo-400', 'working'],
                        ].map(([id, bgStatus, label], i) => (
                            <div key={i}>
                                <input 
                                    type="radio" 
                                    name="status_id" 
                                    id={String(id)} 
                                    value={id}
                                    onChange={handleChange}
                                    checked={selectStatus === id} 
                                    hidden 
                                />
                                <label 
                                    htmlFor={String(id)}
                                    className={`outline outline-1 outline-gray-800/25 cursor-pointer rounded-md px-4 py-1 text-slate-800 p-1 ${selectStatus === id ? `${bgStatus} text-white outline-none` : ''}`}
                                    onClick={() => handleOption(Number(id))}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        className="hover:bg-slate-700 text-lg bg-slate-800 py-2 rounded-md"
                        type="submit">
                        Add Task
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddTask;