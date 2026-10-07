import { Router } from "express";
import { bombaPatchController } from "../controllers/bombaPatchController";

const router = Router();

// GET /api/bomba-patch
router.get("/", bombaPatchController.info);

// GET /api/bomba-patch/jogadores
// filtros opcionais: ?nome= | ?time= | ?pais=
router.get("/jogadores", bombaPatchController.listarJogadores);

// GET /api/bomba-patch/jogadores/:id
router.get("/jogadores/:id", bombaPatchController.obterJogadorPorId);

export default router;