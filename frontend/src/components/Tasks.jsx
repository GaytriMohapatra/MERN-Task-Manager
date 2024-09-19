import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = {
      url: '/tasks',
      method: 'get',
      headers: { Authorization: authState.token }
    };
    fetchData(config, { showSuccessToast: false }).then((data) =>
      setTasks(data.tasks)
    );
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: 'delete',
      headers: { Authorization: authState.token }
    };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <>
      <div className='my-4 mx-auto max-w-[700px] py-6'>

        {tasks.length !== 0 && (
          <h2 className='my-4 ml-4 text-xl font-semibold'>
            Your tasks ({tasks.length})
          </h2>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className='w-full h-[300px] flex items-center justify-center flex-col gap-4'>
                <span className='text-lg font-medium'>No tasks found</span>
                <Link
                  to='/tasks/add'
                  className='bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-6 py-3'
                >
                  + Add new task
                </Link>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task._id}
                  className='bg-white my-4 p-6 text-gray-700 rounded-md shadow-md transition-transform transform hover:scale-[1.02]'
                >
                  <div className='flex items-center'>
                    <span className='font-medium text-lg'>Task #{index + 1}</span>

                    <Tooltip text='Edit this task' position='top'>
                      <Link
                        to={`/tasks/${task._id}`}
                        className='ml-auto mr-4 text-green-600 hover:text-green-700'
                      >
                        <i className='fa-solid fa-pen'></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text='Delete this task' position='top'>
                      <span
                        className='text-red-500 hover:text-red-600 cursor-pointer'
                        onClick={() => handleDelete(task._id)}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </span>
                    </Tooltip>
                  </div>

                  <div className='mt-4 whitespace-pre-line text-gray-600'>
                    {task.description}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
