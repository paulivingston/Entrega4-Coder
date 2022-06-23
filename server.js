
const express =  require('express');
const app = express(); 

const routerProductos = express.Router();

app.use('/api/productos', routerProductos);
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static('public'))


const productos = [
  {title: 'Nombre 1', price: 100,  thumbnail: 'url 1'},
  {title: 'Nombre 2', price: 200,  thumbnail: 'url 2'},
  {title: 'Nombre 3', price: 300,  thumbnail: 'url 3'},
  {title: 'Nombre 4', price: 400,  thumbnail: 'url 4'}

];

let checkID = (id) => {
  if (!isNaN(id) && id>=1 && id <= productos.length) return true; 
  else return false;
} 

routerProductos.get('/', (req, res)=>{
  res.json(productos)
})

routerProductos.get('/:id', (req, res)=>{
  let id = parseInt(req.params.id);
  if (checkID(id)) res.json({producto: productos[id-1]});
  else res.send({error: 'producto no encontrado'});
}
)

routerProductos.post('/guardar', (req, res)=>{
  productos.push(req.body);
  res.json(productos);
})

routerProductos.put('/:id', (req, res)=>{
  let id = parseInt(req.params.id);
  if (checkID(id)) res.json({producto: productos[id-1]});
  else res.send({error: 'producto no encontrado'});
})

routerProductos.delete('/:id', (req, res)=>{
  let id = parseInt(req.params.id);
  if (checkID(id)) res.json({producto: productos[id-1]});
  else res.send({error: 'producto no encontrado'});
})

const PORT  = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`))