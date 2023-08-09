// Importa los modelos necesarios
import Publicacion from '../models/publicacionModel.js';
import Vuelo from '../models/vueloModel.js';
import Segmento from '../models/segmentoModel.js';

export const crearPublicacion = async (req, res) => {
    try {

        console.log(req.body);
        const carrito = req.body.carrito;
        const total = req.body.total
        const descripcion = req.body.descripcion
        const titulo = req.body.titulo
        const imagen = req.body.imagen
        const primeraFecha = req.body.primeraFecha
        const ultimaFecha = req.body.ultimaFecha
        if (!carrito || carrito.length <= 0) {
            return res.status(400).json({ message: "Carrito vacío o cantidad inválida" });
        }

        // Crea la nueva publicación
        const nuevaPublicacion = await Publicacion.create({
            descripcion,
            titulo,
            imagen,
            precio: total,
            primeraFecha,
            ultimaFecha
            // Otros campos de información general de la publicación, si los hay
        });

        // Iteramos sobre cada vuelo en el carrito para crear los vuelos y segmentos asociados a la publicación
        await Promise.all(
            carrito.map(async (vueloCarrito) => {
                console.log(vueloCarrito);
                const { url, descripcion, imagen, segments, precio, id, vueloDescripcion } = vueloCarrito;

                // Crea el nuevo vuelo asociado a la publicación
                const nuevoVuelo = await Vuelo.create({
                    precio,
                    url,
                    descripcion: vueloDescripcion,
                    imagen,
                    publicacion_id: nuevaPublicacion.id, // Asociamos el vuelo a la nueva publicación
                    // Otros campos de información específica del vuelo, si los hay
                });

                // Iteramos sobre cada segmento del vuelo para crear los segmentos asociados al vuelo
                await Promise.all(
                    segments.map(async (segment) => {
                        // Crea el nuevo segmento asociado al vuelo
                        await Segmento.create({
                            origen: segment.origen,
                            destino: segment.destino,
                            arrival: segment.arrival,
                            departure: segment.departure,
                            vuelo_id: nuevoVuelo.id, // Asociamos el segmento al nuevo vuelo
                            // Otros campos de información específica del segmento, si los hay
                        });
                    })
                );
            })
        );

        return res.status(201).json({ message: "Publicación creada con éxito" });
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};




export const crearCustomPublicacion = async (req, res) => {
    try {
        console.log(req.body);
        const carrito = req.body.carrito;
        const total = req.body.total
        const titulo = req.body.titulo
        const imagen = req.body.imagen
        const primeraFecha = req.body.primeraFecha
        const ultimaFecha = req.body.ultimaFecha
        const descripcion = req.body.descripcion
        if (!carrito || carrito.length <= 0) {
            return res.status(400).json({ message: "Carrito vacío o cantidad inválida" });
        }

        // Crea la nueva publicación
        const nuevaPublicacion = await Publicacion.create({
            descripcion,
            titulo,
            imagen,
            precio: total,
            primeraFecha,
            ultimaFecha
            // Otros campos de información general de la publicación, si los hay
        });

        // Iteramos sobre cada vuelo en el carrito para crear los vuelos y segmentos asociados a la publicación
        await Promise.all(
            carrito.map(async (vueloCarrito) => {
                console.log(vueloCarrito);
                const { url, descripcion, imagen, segments, precio, id } = vueloCarrito;

                // Crea el nuevo vuelo asociado a la publicación
                const nuevoVuelo = await Vuelo.create({
                    precio,
                    url,
                    descripcion,
                    imagen,
                    publicacion_id: nuevaPublicacion.id, // Asociamos el vuelo a la nueva publicación
                    // Otros campos de información específica del vuelo, si los hay
                });


            })
        );

        return res.status(201).json({ message: "Publicación creada con éxito" });
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



export const deletePublicacion = async (req, res) => {
    const id = req.params.id; // Obtiene el id de la publicación desde los parámetros de la solicitud
    try {
        const publicacion = await Publicacion.findByPk(id);
        if (!publicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        await publicacion.destroy();

        return res.status(200).json({ message: 'Publicación eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};




export const adminGetPublicacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const publicacion = await Publicacion.findByPk(id, {
            include: [
                {
                    model: Vuelo,
                    as: 'vuelos',
                    include: [
                        {
                            model: Segmento,
                            as: 'segmentos',
                        },
                    ],
                },
            ],
        });

        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        return res.status(200).json({ publicacion });
    } catch (error) {
        console.error("Error al obtener la publicación:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Suponiendo que ya has definido los modelos Publicacion y Vuelo

export const adminUpdatePublicacionById = async (req, res) => {
    const { id } = req.params;
    const { publicacion, vuelos } = req.body;

    try {
        // Primero, actualizamos la publicación
        const updatedPublicacion = await Publicacion.update(publicacion, {
            where: { id: id }
        });

        // Luego, eliminamos todos los vuelos asociados a esta publicación
        await Vuelo.destroy({
            where: { publicacion_id: id }
        });

        // Finalmente, creamos los nuevos vuelos con los datos recibidos
        await Vuelo.bulkCreate(vuelos.map(vuelo => ({ ...vuelo, publicacion_id: id })));

        // Si todo ha ido bien, respondemos con una confirmación de éxito
        return res.status(200).json({ message: "Publicación actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la publicación:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};





export const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({

        });

        return res.status(200).json({ publicaciones });
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getLastPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({

            limit: 6,
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ publicaciones });
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const getPublicacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const publicacion = await Publicacion.findByPk(id, {
            include: [
                {
                    model: Vuelo,
                    as: 'vuelos',
                    include: [
                        {
                            model: Segmento,
                            as: 'segmentos',
                        },
                    ],
                },
            ],
        });

        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        return res.status(200).json({ publicacion });
    } catch (error) {
        console.error("Error al obtener la publicación:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
