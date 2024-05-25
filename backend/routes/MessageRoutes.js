import { Router } from "express";
import { defualt} from "../controllers/chatControllers";

const {
  allMessages, sendMessage,
} = {defualt};
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;