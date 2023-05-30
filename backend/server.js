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
});

const componenteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  componentes: [this]
});

const productoSchema = new mongoose.Schema({
  nombre: String,
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
    nombre: req.body.nombre
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


app.post('/productos/:id/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    return res.status(404).send();
  }

  producto.componentes.push(req.body);
  const productoActualizado = await producto.save();
  res.send(productoActualizado);
});



app.delete('/productos/:productoId/componentes/:componenteId', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }
  
  producto.componentes.pull({ _id: req.params.componenteId });

  const productoActualizado = await producto.save();
  res.send(productoActualizado);
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


app.post('/productos/:productoId/componentes/:componenteId/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }

  const componente = producto.componentes.id(req.params.componenteId);
  if (!componente) {
    return res.status(404).send();
  }

  componente.componentes.push(req.body);
  const productoActualizado = await producto.save();
  res.send(productoActualizado);
});
