import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface Modal {
    propModal: (dato: boolean) => void,
    idTask?: number
}
export interface Task {
    id?: number
    title: string;
    description: string;
    status_id: number;
}

const TaskForm: React.FC<Modal> = ({ propModal, idTask }) => {
    const [selectStatus, setSelectStatus] = useState<number>(0);
    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        status_id: 0
    });

    // Manejador para cambiar el color y establecer 'status_id'
    const handleOption = (value: number) => {
        setSelectStatus(value);
        setTask(prev => ({ ...prev, status_id: value }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    //Verificar si idTask esta presente
    const isUpdating = !!idTask;

    useEffect(() => {
        // verifica si se le pasa 'idTask' para actualizar
        if (isUpdating) {
            const getTask = async () => {
                try {
                    await fetch(`/tasks/${idTask}`)
                    .then(res => res.json())
                    .then(data => {
                        setTask(data);
                        setSelectStatus(data.status_id);
                    })
                } catch (e) {
                    console.error('Imposible solicitar la tarea', e);
                }
            };
            getTask();
        }
    }, [idTask, isUpdating]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        propModal(false)
        const url = isUpdating ? `/tasks/${idTask}` : '/tasks';
        const method = isUpdating ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(() => {
                    console.log(`Task ${isUpdating ? 'actualizada' : 'agregada'} con éxito`);
                    propModal(false)
                })
                .catch((e) => console.error(`No se ha podido ${isUpdating ? 'actualizar' : 'agregar'} la tarea: `, e));
        } catch (e) {
            console.error('No se ha podido enviar la solicitud', e);
        }
    };

    return (
        <section className="left-0 justify-center items-center flex fixed h-screen w-screen bg-black/50">
            <div className="relative rounded-lg w-96 h-96 bg-white">
                <button
                    className="absolute right-3 top-3"
                    onClick={() => propModal(false)}
                >
                    <IoCloseSharp className='rounded-md hover:bg-slate-800/25 outline outline-1 outline-gray-800/25 p-1 text-4xl text-slate-900' />
                </button>
                <h1 className='m-0 pb-2 pl-5 pt-4 text-3xl font-bold text-slate-900'>{isUpdating ? 'Update Task' : 'Add Task'}</h1>
                <form onSubmit={handleSubmit} className="px-4 flex flex-col p-2 gap-4">
                    <input
                        className="pb-1 font-bold text-slate-800 placeholder:text-slate-800/50 pl-1 border-slate-600 border-b text-lg bg-transparent outline-none"
                        type="text"
                        name="title"
                        id="title"
                        value={task.title}
                        placeholder="Title of the task.."
                        onChange={handleChange}
                    />
                    <textarea
                        className="text-slate-800 outline-none scrollbar-custom placeholder:text-slate-800/50 pl-1 resize-none h-24 bg-transparent"
                        name="description"
                        id="description"
                        value={task.description}
                        placeholder="Description of the task.."
                        onChange={handleChange}
                    >
                    </textarea>
                    <p className='font-bold text-slate-900'>Status:</p>
                    <div className='mb-4 flex items-center gap-3'>
                        {[1, 2, 3].map((id) => (
                            <div key={id}>
                                <input
                                    type="radio"
                                    name="status_id"
                                    id={`status-${id}`}
                                    value={id}
                                    checked={selectStatus === id}
                                    onChange={() => handleOption(id)}
                                    hidden
                                />
                                <label
                                    htmlFor={`status-${id}`}
                                    className={`outline outline-1 outline-gray-800/25 cursor-pointer rounded-md px-4 py-1 text-slate-800 p-1 ${selectStatus === id ? `bg-${id === 1 ? 'amber' : id === 2 ? 'indigo' : 'lime'}-400 text-white outline-none` : ''}`}
                                    onClick={() => handleOption(id)}>
                                    {id === 1 ? 'Pending' : id === 2 ? 'Working' : 'Done'}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        className="hover:bg-slate-700 text-lg bg-slate-800 py-2 rounded-md"
                        type="submit">
                        {isUpdating ? 'Update Task' : 'Add Task'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default TaskForm;