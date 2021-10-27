import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC, setTasksAC, tasksReducer} from './tasks-reducer';

import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../API/todolists-api";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: 'action.title', status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "milk", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "tea", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ]
    };

    const action = removeTaskAC("todolistId2","2" );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"].length).toBe(2)

});

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "JS", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            { id: "3", title: "React", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "milk", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            { id: "3", title: "tea",status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ]
    };

    const action = addTaskAC({todoListId: "todolistId2", title: "juce",status:TaskStatuses.New, description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        id:'3121f',
        order: 0,
        addedDate: ''  });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "JS", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "milk", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "tea", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ]
    };

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].id).toBe('2');
    expect(endState["todolistId2"][0].id).toBe('1');
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});
test('name of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "JS", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "milk", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "tea", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ]
    };

    const action = changeTaskNameAC("2", 'kyky', "todolistId2");

    const endNameState = tasksReducer(startState, action)

    expect(endNameState["todolistId2"][1].title).toBe('kyky');
    expect(endNameState["todolistId2"][1].id).toBe('2');
    expect(endNameState["todolistId2"][0].id).toBe('1');
    expect(endNameState["todolistId1"][1].title).toBe('JS');

});
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            {id: "2", title: "JS", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            {id: "3", title: "React", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            {id: "1", title: "bread", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            {id: "2", title: "milk", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' },
            {id: "3", title: "tea", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: '' }
        ]
    };

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "JS", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "2", title: "milk", status:TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  },
            { id: "3", title: "tea", status:TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''  }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action =  setTodolistAC([
        {id: '1', title: "What to learn", addedDate:'',order:0},
        {id: '2', title: "What to buy",  addedDate:'',order:0}
    ])

    const endState = tasksReducer({},action)

    const keys = Object.keys(endState);



    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolists', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "action.todolistId",
                order: 0,
                addedDate: ''
            }
        ]
    }
    const action =  setTasksAC(startState['todolistId1'],'todolistId1')

    const endState = tasksReducer({
        'todolistId2':[],
        'todolistId1':[]
    },action)



    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);

});



