(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{106:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),i=n(9),o=n.n(i);n(81),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(82);var r,s,l=n(143),d=n(138),u=n(145),j=n(144),O=n(146),b=n(141),f=n(147),h=n(42),p=n(10),v=n(62),T=n.n(v).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"fae6bcdf-1b7b-4b5f-8f9c-eecd7cb26aa8"}}),m=function(){return T.get("todo-lists")},k=function(t){return T.post("todo-lists",{title:t})},x=function(t){return T.delete("todo-lists/".concat(t))},g=function(t,e){return T.put("todo-lists/".concat(t),{title:e})},I=function(t){return T.get("todo-lists/".concat(t,"/tasks"))},C=function(t,e){return T.delete("todo-lists/".concat(t,"/tasks/").concat(e))},S=function(t,e){return T.post("todo-lists/".concat(e,"/tasks"),{title:t})},D=function(t,e,n){return T.put("todo-lists/".concat(t,"/tasks/").concat(e),n)};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(r||(r={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(s||(s={}));var E=[],y=n(18),L=n(142),w=n(107),A=n(29),N=n(148),F=n(139),K=n(5),R=a.a.memo((function(t){console.log("addItem is called");var e=Object(c.useState)(""),n=Object(A.a)(e,2),a=n[0],i=n[1],o=Object(c.useState)(null),r=Object(A.a)(o,2),s=r[0],l=r[1],u=function(){var e=a.trim();""!==e?(t.addItem(e),i("")):l("Title is required")};return Object(K.jsxs)("div",{children:[Object(K.jsx)(N.a,{value:a,variant:"outlined",label:"Type value",onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(t){null!==s&&l(null),13===t.charCode&&u()},error:!!s,helperText:s}),Object(K.jsx)(d.a,{onClick:u,color:"primary",children:Object(K.jsx)(F.a,{})})]})})),M=n(140),P=a.a.memo((function(t){console.log("input changed");var e=Object(c.useState)(!1),n=Object(A.a)(e,2),a=n[0],i=n[1],o=Object(c.useState)(t.title),r=Object(A.a)(o,2),s=r[0],l=r[1];return a?Object(K.jsx)(N.a,{value:s,onBlur:function(){i(!1),t.onChange(s)},onChange:function(t){l(t.currentTarget.value)},onKeyPress:function(e){console.log(e.charCode),13===e.charCode&&(i(!1),t.onChange(s))},autoFocus:!0}):Object(K.jsx)("span",{onDoubleClick:function(){i(!0)},children:t.title})})),H=n(23),U={},V=function(t,e,n){return function(c,a){var i=a().tasks[n].find((function(e){return e.id===t}));if(i){var o=Object(p.a)({title:i.title,description:i.description,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},e);return D(n,t,o).then((function(a){var i=function(t,e,n){return{type:"UPDATE-TASK",id:t,model:e,todolistId:n}}(t,e,n);c(i)}))}console.warn("task not found in the state")}},G=n(149),B=a.a.memo((function(t){var e=Object(y.b)(),n=Object(c.useCallback)((function(){return e((n=t.todolistId,c=t.task.id,function(t){C(n,c).then((function(e){var a=function(t,e){return{type:"REMOVE-TASK",id:e,todolistId:t}}(n,c);t(a)}))}));var n,c}),[]),a=Object(c.useCallback)((function(n){var c=n.currentTarget.checked;e(V(t.task.id,{status:c?r.Completed:r.New},t.todolistId))}),[]),i=Object(c.useCallback)((function(n){e(V(t.task.id,{title:n},t.todolistId))}),[]);return Object(K.jsxs)("div",{className:t.task.status===r.Completed?"is-done":"",children:[Object(K.jsx)(G.a,{onChange:a,checked:t.task.status===r.Completed}),Object(K.jsx)(P,{title:t.task.title,onChange:i}),Object(K.jsx)(d.a,{onClick:n,children:Object(K.jsx)(M.a,{})})]},t.task.id)})),J=a.a.memo((function(t){console.log("todolist is called");var e=Object(y.c)((function(e){return e.tasks[t.id]})),n=Object(y.b)();Object(c.useEffect)((function(){var e;n((e=t.id,function(t){I(e).then((function(n){var c=n.data.items;t(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(c,e))}))}))}),[]);var a=Object(c.useCallback)((function(){return t.changeFilter(t.id,"all")}),[t.changeFilter,t.id]),i=Object(c.useCallback)((function(){return t.changeFilter(t.id,"active")}),[t.changeFilter,t.id]),o=Object(c.useCallback)((function(){return t.changeFilter(t.id,"completed")}),[t.changeFilter,t.id]),s=Object(c.useCallback)((function(e){t.changeNameTodo(t.id,e)}),[t.id,t.changeNameTodo]),l=e,u=l;"active"===t.filter&&(u=l.filter((function(t){return t.status===r.New}))),"completed"===t.filter&&(u=l.filter((function(t){return t.status===r.Completed})));var j=Object(c.useCallback)((function(e){n(function(t,e){return function(n){S(t,e).then((function(t){var e={type:"ADD-TASK",task:t.data.data.item};n(e)}))}}(e,t.id))}),[n]);return Object(K.jsxs)("div",{children:[Object(K.jsxs)("h3",{children:[Object(K.jsx)(P,{title:t.title,onChange:s}),Object(K.jsx)(d.a,{onClick:function(){return t.removeTodolist(t.id)},children:Object(K.jsx)(M.a,{})})]}),Object(K.jsx)(R,{addItem:j}),Object(K.jsx)("ul",{children:u.map((function(e){return Object(K.jsx)(B,{task:e,todolistId:t.id},e.id)}))}),Object(K.jsxs)("div",{children:[Object(K.jsx)(b.a,{variant:"all"===t.filter?"contained":"text",onClick:a,children:"All"}),Object(K.jsx)(b.a,{color:"primary",variant:"active"===t.filter?"contained":"text",onClick:i,children:"Active"}),Object(K.jsx)(b.a,{color:"secondary",variant:"completed"===t.filter?"contained":"text",onClick:o,children:"Completed"})]})]})})),W=function(t){Object(c.useEffect)((function(){e((function(t){m().then((function(e){var n=e.data;t(function(t){return{type:"SET-TODOLISTS",todolist:t}}(n))}))}))}),[]),console.log("app is called");var e=Object(y.b)(),n=Object(y.c)((function(t){return t.todolists})),a=Object(c.useCallback)((function(t,n){var c={type:"CHANGE-TODOLIST-FILTER",todolistId:t,value:n};e(c)}),[e]),i=Object(c.useCallback)((function(t){var n;e((n=t,function(t){x(n).then((function(){t(function(t){return{type:"REMOVE-TODOLIST",todolistId:t}}(n))}))}))}),[e]),o=Object(c.useCallback)((function(t){var n;e((n=t,function(t){k(n).then((function(e){var n=e.data.data.item;t(function(t){return{type:"ADD-TODOLIST",todolist:t}}(n))}))}))}),[e]),r=Object(c.useCallback)((function(t,n){var c=function(t,e){return function(n){g(t,e).then((function(c){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",newTitle:e,id:t}}(t,e))}))}}(t,n);e(c)}),[]);return Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)(L.a,{container:!0,style:{padding:"20px"},children:Object(K.jsx)(R,{addItem:o})}),Object(K.jsx)(L.a,{container:!0,spacing:3,children:n.map((function(t){return Object(K.jsx)(L.a,{item:!0,children:Object(K.jsx)(w.a,{style:{padding:"20px"},children:Object(K.jsx)(J,{changeNameTodo:r,id:t.id,title:t.title,changeFilter:a,filter:t.filter,removeTodolist:i},t.id)})})}))})]})};var q=function(){return Object(K.jsxs)("div",{className:"App",children:[Object(K.jsx)(l.a,{position:"static",children:Object(K.jsxs)(j.a,{children:[Object(K.jsx)(d.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(K.jsx)(u.a,{})}),Object(K.jsx)(O.a,{variant:"h6",children:"News"}),Object(K.jsx)(b.a,{color:"inherit",children:"Login"})]})}),Object(K.jsx)(f.a,{fixed:!0,children:Object(K.jsx)(W,{})})]})},Y=n(44),$=n(67),z=Object(Y.b)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":return e.todolist.map((function(t){return Object(p.a)(Object(p.a)({},t),{},{filter:"all"})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todolistId}));case"ADD-TODOLIST":return[Object(p.a)(Object(p.a)({},e.todolist),{},{filter:"all"})].concat(Object(h.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(p.a)(Object(p.a)({},t),{},{title:e.newTitle}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todolistId?Object(p.a)(Object(p.a)({},t),{},{filter:e.value}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(p.a)(Object(p.a)({},t),{},Object(H.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!=e.id}))));case"ADD-TASK":return Object(p.a)(Object(p.a)({},t),{},Object(H.a)({},e.task.todoListId,[e.task].concat(Object(h.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(p.a)(Object(p.a)({},t),{},Object(H.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.id?Object(p.a)(Object(p.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(p.a)(Object(p.a)({},t),{},Object(H.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(p.a)({},t);return delete n[e.todolistId],n;case"SET-TODOLISTS":var c=Object(p.a)({},t);return e.todolist.forEach((function(t){c[t.id]=[]})),c;case"SET-TASKS":return Object(p.a)(Object(p.a)({},t),{},Object(H.a)({},e.todolistId,e.tasks));default:return t}}}),Q=Object(Y.c)(z,Object(Y.a)($.a));window.store=Q,o.a.render(Object(K.jsx)(y.a,{store:Q,children:Object(K.jsx)(q,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},81:function(t,e,n){},82:function(t,e,n){}},[[106,1,2]]]);
//# sourceMappingURL=main.286649e6.chunk.js.map