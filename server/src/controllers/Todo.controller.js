import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helpers.js';
import { StatusCode } from '../utils/constants.js';
import Todo from '../models/Todo.js';
import User from '../models/User.js';

export const createTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(
            jsonGenerate(StatusCode.VALIDATION_ERROR,
            "Todo is required",
            errors.mapped() // Change 'error' to 'errors'
            )
        );
    }

    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
            timer:req.body.timer,
        });

        if(result) {
            const user = await User.findOneAndUpdate({_id: req.userId}, { $push: { todos: result._id } });
            return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", result));
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Something went wrong", error));
    }
};
