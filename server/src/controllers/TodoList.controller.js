import { jsonGenerate } from '../utils/helpers.js';
import { StatusCode } from '../utils/constants.js';
import User from '../models/User.js';

export const GetTodos = async (req, res) => {
    try {
        const list = await User.findById(req.userId)
            .select("-password")
            .populate("todos")
            .exec();

        return res.json(jsonGenerate(StatusCode.SUCCESS, "All Todo list", list));
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Something went wrong", error));
    }
}