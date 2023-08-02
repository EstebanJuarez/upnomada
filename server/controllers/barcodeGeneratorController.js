import fs from 'fs';
import { promises as fsPromises } from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';


import Talle from '../models/talleModel.js'
import DetalleProducto from '../models/detalleProductoModel.js';
import bwipjs from 'bwip-js';



export const generateBarcode = async (req, res) => {

  const __filename = fileURLToPath(import.meta.url)


  try {

    const detallesProducto = await DetalleProducto.findAll()
    const barcodes = [];
    for (const detalleProducto of detallesProducto) {
      console.log(detalleProducto.barras);
      if (detalleProducto.barras) {
        console.log(`El campo barras ya tiene un valor para detalleProducto ${detalleProducto.barras}. Se omite la generación del código de barras.`);
        continue;
      }
      const { talle_id, producto_id } = detalleProducto;
      const talle = await Talle.findByPk(talle_id);
      const text = `${producto_id}-${talle.talle}`;
      const pngBuffer = await bwipjs.toBuffer({
        bcid: 'code128',
        text: text,
        scale: 3,
        height: 10,
        includetext: true,
      });


      const filename = `barcode_${producto_id}_${talle.talle}.png`;
      const folderPath = path.resolve(path.dirname(__filename), '..', 'barcodes')
      const filePath = path.resolve(folderPath, filename)

      fs.writeFile(filePath, pngBuffer, (err) => {
        if (err) {
          console.error('Error al escribir el archivo:', err);
          throw err;
        }
        console.log('Archivo guardado:', filename);
      });

      try {
        await fsPromises.access(filePath)
        console.log("ya existe el archivo, ingorando ", filename);
        detalleProducto.barras = text
        await detalleProducto.save()
        barcodes.push({
          producto_id: producto_id,
          barcode: filename,
        });
      } catch (error) {
        await fsPromises.writeFile(filePath, pngBuffer);
        console.log("archivo guardado ", filename);
        detalleProducto.barras = text
        await detalleProducto.save()
        barcodes.push({
          producto_id: producto_id,
          barcode: filename,
        });
      }
    }

    res.status(200).json(barcodes);
  } catch (error) {
    console.error('Error al generar los códigos de barras:', error);
    res.status(500).json({ message: "Internal server error" });
    throw error;
  }
};

// Ejemplo de uso
