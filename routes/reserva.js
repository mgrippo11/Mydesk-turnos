const express = require("express");
const router = express.Router();
const { viewReserva, addReserva, 
      getAllReservas,
      getReserva,
      updateReserva,
      deleteReserva,
      getReservasFecha,}= require("../controllers/reserva_controller");

router.get("/ver/:tipo", viewReserva);
router.get("", getAllReservas);
router.get("/reservas", getAllReservas);
router.get("/date", getReservasFecha);
router.get("/:id", getReserva);
router.post("/nueva", addReserva);
router.put("/editar/:id", updateReserva);
router.delete("/borrar/:id", deleteReserva);

module.exports = {
  routes: router,
};
