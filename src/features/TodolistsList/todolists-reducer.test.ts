import {
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer, TodolistDomainType, setTodolistAC, changeTodolistEntityStatusAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, } from '../../app/App';
import {RequestStatusType} from "../../app/app-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", addedDate:'',order:0,filter:'all', entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",  addedDate:'',order:0,filter:'all',entityStatus:'idle'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = {id: 'todolistId3',
        title: 'New todolist',
        addedDate: '',
        order: 0};

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",  addedDate:'',order:0,filter:'all',entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",  addedDate:'',order:0,filter:'all',entityStatus:'idle'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New todolist');
    expect(endState[2].title).toBe("What to buy");
});
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",  addedDate:'',order:0,filter:'all',entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",  addedDate:'',order:0,filter:'all',entityStatus:'idle'}
    ]


    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle,todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("What to buy");
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",  addedDate:'',order:0,filter:'all',entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",  addedDate:'',order:0,filter:'all',entityStatus:'idle'}
    ]


    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolist should be set in state', () => {
    const startState: Array<TodolistDomainType> = [
        {id: '121', title: "What to learn", addedDate:'',order:0,filter:'all',entityStatus:'idle'},
        {id: '12312', title: "What to buy",  addedDate:'',order:0,filter:'all',entityStatus:'idle'}
    ]

const action = setTodolistAC(startState)


    const endState = todolistsReducer([],action );

    expect(endState.length).toBe(2);

});

test('correct status of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newStatus: RequestStatusType = 'loading';

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn",  addedDate:'',order:0,filter:'all',entityStatus:'idle'},
        {id: todolistId2, title: "What to buy",  addedDate:'',order:0,filter:'all',entityStatus:'idle'}
    ]


    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2,newStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe('loading');
});
