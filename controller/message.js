const Message = require('../schema/message');
const Conversation = require('../schema/conversation');
const Joi = require('joi');
const mongoose = require('mongoose');

const sendMessage = async (req, res) => {
  try {
    const result = validateMessage(req.body);
    if (result.error) {
      res.status(400).send({ message: result.error.details[0].message });
      return;
    }

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const validateMessage = (data) => {
  const schema = Joi.object({
    message: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { sendMessage };
