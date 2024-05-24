import { v4 } from "uuid";
import { getConnection } from "../database.js"

export const getTasks = (req, res) => {
    const db = getConnection();
    try{
        res.json(db.data.tasks);
    } catch(error) {
        return res.status(500).send(error)
    }
}

export const createTask = async (req, res) => {
    const newTask = {
        id: v4(),
        autor: req.body.name,
        categoria: req.body.miSelect,
        titulo: req.body.titulo,
        intro: req.body.textIntro,
        contenido: req.body.textContent
    }

    try {
        const db = getConnection();
        db.data.posts.push(newTask);
        await db.write()

        res.redirect('/posts');
    } catch(error) {
        return res.status(500).send(error);
    }
}


export const getPost = (req, res) => {
        const db = getConnection();
        const post = db.data.posts.find(post => post.id === req.params.id);
        if(!post) return res.sendStatus(404)

        let html = '<html><head><title>Posts</title><link href="../output.css" rel="stylesheet"></head><body>';

        html += `<nav class="py-2">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <span class="text-primary text-2xl font-bold">Explicalo.</span>
                </div>
                <!-- NavLink -->
                <div class="hidden sm:block ml-auto">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="text-primary font-bold hover:underline px-3 py-2 text-sm">Inicio</a>
                        <a href="/posts" class="text-primary font-bold hover:underline px-3 py-2 text-sm">Descubre</a>
                        <a href="/postea" class="text-primary border border-primary px-6 py-[10px] rounded-full hover:bg-primary hover:text-white text-sm font-bold">Postea</a>
                    </div>
                </div>

                <div class="sm:hidden flex items-center">
                    <button id="mobile-menu-btn" type="button" class="text-black hover:text-primary focus:outline-none focus:text-primary" aria-label="Toggle menu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                          
                    </button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class=" sm:hidden">
            <div class="px-2 pt-2 pb-2 space-y-1">
                <a href="/" class="text-primary font-bold hover:underline block px-3 py-2 text-sm">Inicio</a>
                <a href="/posts" class="text-primary font-bold hover:underline block px-3 py-2 text-sm">Descubre</a>
                <div class="px-2 py-2">
                    <a href="/postea" class="text-primary border border-primary px-6 py-[8px] rounded-full hover:bg-primary hover:text-white text-sm font-bold">Postea</a>
                </div>
            </div>
        </div>
    </nav>
    `

    html += `<section class="mt-20">
    <div class="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
        <h1 class="text-5xl sm:text-7xl font-bold text-primary py-2 ">${post.titulo}</h1>
        <div class="flex justify-between text-xl sm:text-2xl font-medium text-primary bg-custom-blue-base p-1 px-4 round rounded-md">
            <h3>${post.autor}</h3>
            <h3>${post.categoria}</h3>
        </div>
        <h2 class="text-3xl sm:text-4xl font-semibold text-primary py-10">${post.intro}</h2>
        <h2 class="text-2xl sm:text-3xl font-semibold text-gray py-2">${post.contenido}</h2>
    </div>
    </section>
    `

    html += '<script src="js/index.js"></script> </body> </html>'
        
    res.send(html);
}

export const updateTask = async (req, res) => {
    const db = getConnection();
    const taskFound = db.data.tasks.find(task => task.id === req.params.id);
    if (!taskFound) return res.sendStatus(500);

    taskFound.name = req.body.name;
    taskFound.description = req.body.description;

    db.data.tasks.map(task => task.id === req.params.id ? taskFound : task);

    await db.write()

    res.json(`Task: ${taskFound.id} has been replaced`)
}   

export const deleteTask = async (req, res) => {
    const db = getConnection();
    const task = db.data.tasks.find(task => task.id === req.params.id);
    if(!task) return res.sendStatus(404);

    const newTask = db.data.tasks.filter(task => task.id !== req.params.id);
    db.data.tasks = newTask;
    
    await db.write();

    res.json(`Task ${task.id} ha sido eliminado`)

}

export const count = (req, res) => {
    const db = getConnection();
    const array = db.data.tasks.length;
    res.json(array)
}

export const showPosts = async (req, res) => {
  try{
    const db = getConnection();
    const posts = db.data.posts;
    
    let html = '<html><head><title>Posts</title><link href="./output.css" rel="stylesheet"></head><body>';

    html += `<nav class="py-2">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <span class="text-primary text-2xl font-bold">Explicalo.</span>
            </div>
            <!-- NavLink -->
            <div class="hidden sm:block ml-auto">
                <div class="ml-10 flex items-baseline space-x-4">
                    <a href="/" class="text-primary font-bold hover:underline px-3 py-2 text-sm">Inicio</a>
                    <a href="/postea" class="text-primary border border-primary px-6 py-[10px] rounded-full hover:bg-primary hover:text-white text-sm font-bold">Postea</a>
                </div>
            </div>

            <div class="sm:hidden flex items-center">
                <button id="mobile-menu-btn" type="button" class="text-black hover:text-primary focus:outline-none focus:text-primary" aria-label="Toggle menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                      
                </button>
            </div>
        </div>
    </div>
    <div id="mobile-menu" class=" sm:hidden">
        <div class="px-2 pt-2 pb-2 space-y-1">
            <a href="/" class="text-primary font-bold hover:underline block px-3 py-2 text-sm">Inicio</a>
            <div class="px-2 py-2">
                    <a href="/postea" class="text-primary border border-primary px-6 py-[8px] rounded-full hover:bg-primary hover:text-white text-sm font-bold">Postea</a>
            </div>
        </div>
    </div>
    </nav>`

    posts.forEach(post => {
        html += `
        <section class="mt-10">
        <div class="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div class="bg-white text-black shadow-md h-auto hover:shadow-lg">
                <div class="flex justify-between p-4">
                    <div>
                        <h1 class="text-2xl font-medium text-primary">${post.titulo}</h1>
                        <h1 class="text-lg ">${post.autor}</h1>
                    </div>

                    <a href="/post/${post.id}" class="p-2 mb-4 hover:bg-primary hover:round hover:rounded-lg hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                        </svg> 
                    </a>

                </div>
            </div>
        </div>
        </section>
    `;
    })

    html += '<script src="js/index.js"></script> </ul> </body> </html>'
    res.send(html)

  } catch (err) {
    console.log(err);
    res.sendStatus(500).send('Error al obtener los posts')
  }
}
