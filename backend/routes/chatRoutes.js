import { Router } from "express";
import { defualt} from "../controllers/chatControllers";

const {
  accessChat, fetchChats, createGroupChat, removeFromGroup, addToGroup, renameGroup,
} = {defualt};
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

export default router;