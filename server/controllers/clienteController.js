import Cliente from '../models/clienteModel.js'


export const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getClienteByID = async (req, res) => {
    console.log("se ejectua");
    const { id } = req.params;
    try {
        const rubro = await Cliente.findByPk(id);
        res.status(200).json(rubro);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const addCliente = async (req, res) => {
    try {
      const { nombre, apellido, email, telefono } = req.body;
  
      const nuevoCliente = await Cliente.create({ nombre, apellido, email, telefono });
  
      res.status(200).json({ message: 'Cliente agregado correctamente', cliente: nuevoCliente });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };


export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono } = req.body;

    try {
        const updatedCliente = await Cliente.update(
            { nombre, apellido, email, telefono },
            { where: { id } }
        );

        if (updatedCliente[0] === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.status(200).json({ message: 'Cliente actualizado correctamente' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteCliente = async (req, res) => {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) {
        return res.status(404).json({ msg: 'Cliente no encontrado' });
      }
  
      await cliente.destroy();
  
      res.json({ msg: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
  };
  

  