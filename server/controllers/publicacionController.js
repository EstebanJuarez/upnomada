// Importa los modelos necesarios
import Publicacion from '../models/publicacionModel.js';
import Vuelo from '../models/vueloModel.js';
import Segmento from '../models/segmentoModel.js';

export const crearPublicacion = async (req, res) => {
    try {
        const carrito = req.body.carrito;
        const total = req.body.total
        const descripcion = req.body.titulo
        const imagen = req.body.imagen
        const primeraFecha = req.body.primeraFecha
        const ultimaFecha = req.body.ultimaFecha
        if (!carrito || carrito.length <= 0) {
            return res.status(400).json({ message: "Carrito vacío o cantidad inválida" });
        }

        // Crea la nueva publicación
        const nuevaPublicacion = await Publicacion.create({
            descripcion,
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
                    descripcion: id,
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


export const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [
                {
                    model: Vuelo,
                    as: 'vuelos',
                    attributes: { exclude: ['url'] }, // Excluimos el atributo 'url' de la tabla Vuelo
                    // Nombre de la asociación definida en el modelo Vuelo
                    include: [
                        {
                            model: Segmento,
                            as: 'segmentos', // Nombre de la asociación definida en el modelo Segmento
                        },
                    ],
                },
            ],
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
                    attributes: { exclude: ['url'] },
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
