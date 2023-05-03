import React, { ChangeEvent, useState } from 'react';
import {FilterValuesType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id:string, todoListId: string) => void
    fiterTasks: (value:FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist (props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: { code: string; }) => {
        setError(null);
        if (e.code === 'Enter') {
            props.addTask(newTaskTitle, props.id) 
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Field is required!')
            return
        }
        props.addTask(newTaskTitle, props.id)
        setNewTaskTitle('')
    }
  
    const onAllClickHandler = () => props.fiterTasks('all', props.id)
    const onActiveClickHandler = () => props.fiterTasks('active', props.id)
    const onCompletedClickHandler = () => props.fiterTasks('completed', props.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input type="text"
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = ()=>  props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            // console.log(t.id + e.currentTarget.checked)
                        };
                        

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                        checked={t.isDone}
                                        onChange={onChangeHandler}
                                    />
                                    <span className={t.isDone ? 'crossed' : ''}>{t.title}</span>
                                    <button onClick={removeTask}>x</button>
                                </li>
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
  
}