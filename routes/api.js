const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const { requireRoles } = require("../handlers/authorization");
const { isValidToken } = require("../controllers/authController");

const router = express.Router();
const adminOnly = requireRoles("admin");
const managerOrAdmin = requireRoles("admin", "manager");

const adminController = require("../controllers/adminController");
const clientController = require("../controllers/clientController");

const leadController = require("../controllers/leadController");
const productController = require("../controllers/productController");

router.use(isValidToken);

//_______________________________ Admin management_______________________________

router
  .route("/admin/create")
  .post(adminOnly, catchErrors(adminController.create));
router
  .route("/admin/read/:id")
  .get(adminOnly, catchErrors(adminController.read));
router
  .route("/admin/update/:id")
  .patch(adminOnly, catchErrors(adminController.update));
router
  .route("/admin/delete/:id")
  .delete(adminOnly, catchErrors(adminController.delete));
router
  .route("/admin/search")
  .get(adminOnly, catchErrors(adminController.search));
router
  .route("/admin/list")
  .get(adminOnly, catchErrors(adminController.list));

router
  .route("/admin/password-update/:id")
  .patch(adminOnly, catchErrors(adminController.updatePassword));
//list of admins ends here

//_____________________________________ API for clients __________________________
router
  .route("/client/create")
  .post(managerOrAdmin, catchErrors(clientController.create));
router
  .route("/client/read/:id")
  .get(catchErrors(clientController.read));
router
  .route("/client/update/:id")
  .patch(managerOrAdmin, catchErrors(clientController.update));
router
  .route("/client/delete/:id")
  .delete(managerOrAdmin, catchErrors(clientController.delete));
router.route("/client/search").get(catchErrors(clientController.search));
router.route("/client/list").get(catchErrors(clientController.list));

//_____________________________________ API for leads ___________________________
router
  .route("/lead/create")
  .post(managerOrAdmin, catchErrors(leadController.create));
router.route("/lead/read/:id").get(catchErrors(leadController.read));
router
  .route("/lead/update/:id")
  .patch(managerOrAdmin, catchErrors(leadController.update));
router
  .route("/lead/delete/:id")
  .delete(managerOrAdmin, catchErrors(leadController.delete));
router.route("/lead/search").get(catchErrors(leadController.search));
router.route("/lead/list").get(catchErrors(leadController.list));

//_____________________________________ API for products ___________________________
router
  .route("/product/create")
  .post(managerOrAdmin, catchErrors(productController.create));
router.route("/product/read/:id").get(catchErrors(productController.read));
router
  .route("/product/update/:id")
  .patch(managerOrAdmin, catchErrors(productController.update));
router
  .route("/product/delete/:id")
  .delete(managerOrAdmin, catchErrors(productController.delete));
router.route("/product/search").get(catchErrors(productController.search));
router.route("/product/list").get(catchErrors(productController.list));

module.exports = router;
