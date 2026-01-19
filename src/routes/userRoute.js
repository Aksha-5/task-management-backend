const express = require("express");
const router = express.Router();
const empController = require('../controllers/empController');

router.get('/list', empController.listEmp)
router.post('/add', empController.addEmp)
router.put('/update/:empId', empController.updateEmp)
router.delete('/delete/:empId', empController.deleteEmp)

module.exports = router;