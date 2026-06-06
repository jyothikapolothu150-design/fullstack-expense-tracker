const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const {
      amount,
      type,
      category,
      note,
      userId,
    } = req.body;

    const transaction =
      await Transaction.create({
        amount,
        type,
        category,
        note,
        userId,
      });

    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const transactions =
      await Transaction.find({ userId });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;