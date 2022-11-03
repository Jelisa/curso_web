// Jelisa Iglesias

import {pool} from '../db_config.js';

// 1) Ver todos los pacientes mediante la ruta
export const selectPatients =  async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM pacientes");
        // console.log(rows)
        res.send(rows);
    }
    catch (err){
        res.status(500).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

// 2) Filtrar los pacientes por su NIF
export const selectPatientsByNIF =  async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM pacientes where nif = ?", req.params.nif);
        // console.log(rows)
        res.send(rows);
    }
    catch (err){
        res.status(500).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

// 3) Añadir pacientes por post en la url
export const insertPatients =  async (req, res) => {
    const {nif, nombre, apellido, ciudad, fecha_nacimiento, sexo} = req.body;
    try{
        const [result] = await pool.query("INSERT INTO pacientes (nif, nombre, apellido, ciudad, fecha_nacimiento, sexo) VALUES (?,?,?,?,?,?)", [nif, nombre, apellido, ciudad, fecha_nacimiento, sexo]);
        if (result.affectedRows === 0){
            return res.send("No ha sido posible hacer la inserción.")
        }
        return res.send(result);
    }
    catch (err){
        console.log(err)
        return res.status(404).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

// 4) Modificar pacientes por patch en la url
export const modifyPatientByNIF =  async (req, res) => {
    const {nif, nombre, apellido, ciudad, fecha_nacimiento, sexo} = req.body;
    try{
        const [result] = await pool.query("UPDATE pacientes SET nif = IFNULL(?, nif), nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), ciudad = IFNULL(?, ciudad), fecha_nacimiento = IFNULL(?, fecha_nacimiento), sexo = IFNULL(?, sexo) WHERE nif = ?", [nif, nombre, apellido, ciudad, fecha_nacimiento, sexo, req.params.nif]);
        if (result.affectedRows === 0){
            return res.send("No ha sido posible hacer la inserción.")
        }
        return res.send(result);
    }
    catch (err){
        console.log(err)
        return res.status(404).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

// 4) Borrar pacientes por delete en la url
export const deletePatient =  async (req, res) => {
    const nif = req.params.nif;
    try{
        const [result] = await pool.query("DELETE FROM pacientes WHERE nif = ?", [nif]);
        if (result.affectedRows === 0){
            return res.send("Persona no encontrada.<br>No se ha podido borrar el registro")
        }
        return res.send("Registro borrado.");
    }
    catch (err){
        console.log(err)
        return res.status(404).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

// 5) Mostrar la cantidad de pacientes de cada género en la url
export const countPatientsByGenre =  async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT sexo, count(*) as num_pacientes FROM pacientes group by sexo");
        res.send(rows);
    }
    catch (err){
        res.status(500).send("Ha habido un error.<br>Inténtelo más tarde")
    }
}

// 6) Mostrar los pacientes ordenados por apellido en la url
export const sortBySurname =  async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM pacientes ORDER BY apellido");
        res.send(rows);
    }
    catch (err){
        res.status(500).send("Ha habido un error.<br>Inténtelo más tarde")
    }
}