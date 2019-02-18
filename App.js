
document.getElementById('Form').addEventListener('submit', saveTask);//Obtener el valor del formulario con el addEventListener

function saveTask(e)//Funcion para usar
{
    let Title = document.getElementById('Title').value;//Valores de los Inputs
    let Select = document.getElementById('Selector').value;
    let Description = document.getElementById('Description').value;

   const Task = //Objeto
   { 
       Title,
       Select,
       Description
   };

   if(localStorage.getItem('Tareas') === null)// si el localstorage esta vacio, Crear uno nuevo
   {
     let tasks = [];// array vacio
     tasks.push(Task);//Entrar el objeto en el array vacio
     localStorage.setItem('Tareas', JSON.stringify(tasks));
   }
   else
   {
     let tasks = JSON.parse(localStorage.getItem('Tareas'));
     tasks.push(Task);
     localStorage.setItem('Tareas', JSON.stringify(tasks));
   }

   getTask();
   document.getElementById('Form').reset();
   e.preventDefault();
}

function getTask()
{
    let tasks = JSON.parse(localStorage.getItem('Tareas'));
    let div = document.getElementById('Tasks');//Id del DIV, Para mostrar datos

    div.innerHTML = '';

    for(let i = 0; i < tasks.length; i++)
    {
        let Title = tasks[i].Title;
        let Description = tasks[i].Description;
        let Select = tasks[i].Select;

        div.innerHTML += `<div class="card mb-3">
           <div class="card-body">
             <p>${Title} - ${Select} - ${Description}</p>
             <a class="btn btn-danger" onClick="deleteTask('${Title}')">Delete</a>
           </div> 
         </div>`
    }

}

function deleteTask(Title)
{
    let tasks = JSON.parse(localStorage.getItem('Tareas'));
    for(let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].Title == Title)
        {
          tasks.splice(i, 1);
        }
        localStorage.setItem('Tareas', JSON.stringify(tasks));
        getTask();
    }
}

getTask();//Cargar las tareas ya registradas.

   //localStorage.setItem('Tareas', JSON.stringify(Task));//Almacenar los datos, y convertir el objeto a string con el metodo JSON.stringify.
   //localStorage.getItem('Tareas');//Obtener los datos.