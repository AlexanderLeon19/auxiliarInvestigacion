const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/productos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const componenteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  tamanoLote: String,
  tiempoSuministro: Number,
  inventarioDisponible: Number,
  inventarioSeguridad: Number,
  recepcionesProgramadas: Number,
  componentes: [this],
});

const anidadoComponenteSchema = new mongoose.Schema({
  componentes: [componenteSchema],
});

componenteSchema.add(anidadoComponenteSchema);

const productoSchema = new mongoose.Schema({
  nombre: String,
  tamanoLote: String,
  tiempoSuministro: Number,
  inventarioDisponible: Number,
  inventarioSeguridad: Number,
  recepcionesProgramadas: Number,
  componentes: [componenteSchema]
});

const Producto = mongoose.model('Producto', productoSchema);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

app.delete('/productos/:id', async (req, res) => {
  const producto = await Producto.findByIdAndDelete(req.params.id);
  res.send(producto);
});

app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto({
    nombre: req.body.nombre,
    tamanoLote: req.body.tamanoLote,
    tiempoSuministro: req.body.tiempoSuministro,
    inventarioDisponible: req.body.inventarioDisponible,
    inventarioSeguridad: req.body.inventarioSeguridad,
    recepcionesProgramadas: req.body.recepcionesProgramadas
  });
  const productoGuardado = await nuevoProducto.save();
  res.send(productoGuardado);
});

app.put('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (e) {
    res.status(500).send();
  }
});

// Agregar un componente a un producto existente
app.post('/productos/:id/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    return res.status(404).send();
  }

  producto.componentes.push(req.body);
  const productoGuardado = await producto.save();
  res.send(productoGuardado);
});

// Agregar un componente a un componente existente
app.post('/productos/:idProducto/componentes/:idComponente/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.idProducto);
  if (!producto) {
    return res.status(404).send();
  }

  const componente = producto.componentes.id(req.params.idComponente);
  if (!componente) {
    return res.status(404).send();
  }

  componente.componentes.push(req.body);
  const productoGuardado = await producto.save();
  res.send(productoGuardado);
});

app.delete('/productos/:productoId/componentes/:componenteId', async (req, res) => {
  const { productoId, componenteId } = req.params;
  // Encuentra el producto correspondiente
  let producto = await Producto.findById(productoId);
  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }
  // Elimina el componente del array de componentes del producto
  producto.componentes = producto.componentes.filter((componente) => componente._id.toString() !== componenteId);
  // Guarda el producto modificado
  producto = await producto.save();
  // Responde con el producto modificado
  res.json(producto);
});

app.put('/productos/:productoId/componentes/:componenteId', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }
  const componente = producto.componentes.id(req.params.componenteId);
  if (!componente) {
    return res.status(404).send();
  }
  componente.set(req.body);
  const productoActualizado = await producto.save();
  res.send(productoActualizado);
});

app.get('/productos/:productoId/componentes/:componenteId', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }
  const componente = producto.componentes.id(req.params.componenteId);
  if (!componente) {
    return res.status(404).send();
  } 
  res.send(componente);
});

