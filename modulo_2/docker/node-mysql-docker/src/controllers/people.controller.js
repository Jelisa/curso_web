// This file contains the logic of our application.
import {pool} from '../db_config.js';

export const selectPeople =  async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM people");
        // console.log(rows)
        res.send(rows);
    }
    catch (err){
        res.status(500).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

export const getPerson =  async (req, res) => {
    console.log(req.params.id)
    try{
        const [result] = await pool.query("SELECT * FROM people WHERE id_people=?",[req.params.id]);
        if (result.length === 0){
            return res.send("Persona no encontrada.")
        }
        // console.log(rows)
        res.json(result);
    }
    catch (err){
        res.status(500).send("ha habido un error.<br>Inténtelo más tarde")
    }
}

export const updatePerson =  async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const {nombre, apellido, profesion, genero, oscars, fecha_nacimiento} = req.body;

    try{
        const [result] = await pool.query("UPDATE people SET nombre = ?, apellido = ?, profesion = ?, genero = ?, oscars = ?, fecha_nacimiento = ? WHERE id_people=?",[nombre, apellido, profesion, genero, oscars, fecha_nacimiento, req.params.id]);
        if (result.affectedRows === 0){
            return res.send("Persona no encontrada.")
        }
        console.log(result);
        res.send("Actualización realizada.")
    }
    catch (err){
        res.status(500).send("Ha habido un error.<br>Inténtelo más tarde")
    }
}

export const patchPeople =  async (req, res) => {
    const {nombre, apellido, profesion, genero, oscars, fecha_nacimiento} = req.body;
    try{
        const [result] = await pool.query("UPDATE people SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), profesion = IFNULL(?, profesion), genero = IFNULL(?, genero), oscars = IFNULL(?, oscars), fecha_nacimiento = IFNULL(?, fecha_nacimiento) WHERE id_people=?",[nombre, apellido, profesion, genero, oscars, fecha_nacimiento, req.params.id]);
        if (result.affectedRows === 0){
            return res.send("Persona no encontrada.")
        }
        console.log(result);
        res.send("Actualización realizada.")
    }
    catch (err){
        res.status(500).send("Ha habido un error.<br>Inténtelo más tarde")
    }
}

export const insertPeople =  async (req, res) => {
    const {nombre, apellido, profesion, genero, oscars, fecha_nacimiento} = req.body;
    try{
        const [result] = await pool.query("INSERT INTO people (nombre, apellido, profesion, genero, oscars, fecha_nacimiento) VALUES (?,?,?,?,?,?)", [nombre, apellido, profesion, genero, oscars, fecha_nacimiento]);
        if (result.affectedRows === 0){
            return res.send("No ha sido posible hacer la inserción.")
        }
        return res.send(result);
    }
    catch (err){
        console.log(err)
        return res.status(404).send("ha habido un error.<br>Inténtelo más tarde")
    }
    // res.send('pato')
}

export const deletePeople =  async (req, res) => {
    // console.log(req.params);
    const id = req.params.id;;
    try{
        const [result] = await pool.query("DELETE FROM people WHERE id_people = ?", [id]);
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

