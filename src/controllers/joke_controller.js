const axios = require("axios");
const localJokeService = require("../api/axiosInstances");

const submitJokeForModeration = async (req, res) => {
  try {
    const { content, type } = req.body;
    const joke = new Joke({ content, type });
    await joke.save();
    res.status(201).json({ message: "Joke submitted for moderation", joke });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit joke", error });
  }
};

const getJokeById = async (req, res) => {
  try {
    const { id } = req.params;
    const jokeData = await localJokeService.get(`/joke/${id}`);
    const joke = jokeData?.data;
    if (!joke) {
      return res.status(404).json({ message: "Joke not found" });
    }

    res.status(200).json(joke);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve joke", error });
  }
};

const getAllJokes = async (req, res) => {
  try {
    const allJokesData = await localJokeService.get("/jokes/");
    res.status(200).json(allJokesData?.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve jokes", error });
  }
};

const updateJokeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await localJokeService.put(`/joke/${id}`, req.body);
    const updatedJokeType = response?.data;

    if (!updatedJokeType) {
      return res.status(404).json({ message: "Joke Type not found" });
    }

    res.status(200).json({ message: "Joke Type updated successfully", jokeType: updatedJokeType });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Joke Type", error });
  }
};

const deleteJokeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await localJokeService.delete(`/joke/${id}`);

    const jokeData = response?.data;

    if (!jokeData) {
      return res.status(404).json({ message: "Joke Type not found" });
    }

    res.status(200).json({ message: "Joke Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Joke Type", error });
  }
};

const approveJoke = async (req, res) => {
  try {
    const jokeId = req.params.id;
    const jokeData = await localJokeService.get(`/joke/${jokeId}`);
    const joke = jokeData?.data;

    if (!joke) return res.status(404).json({ message: "Joke not found" });

    if (!joke?.approved) {
      joke.approved = true;

      const finalJson = {
        content: joke?.content,
        typeId: joke?.type,
        approved: joke?.approved,
      };

      await localJokeService.put(`/joke/${joke._id}`, finalJson);

      res.status(200).json({ message: "Joke approved and submitted", joke });
    } else {
      res.status(400).json({ message: "Joke has already been processed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to approve joke", error });
  }
};

const rejectJoke = async (req, res) => {
  try {
    const jokeId = req.params.id;

    const jokeData = await localJokeService.get(`/joke/${jokeId}`);
    const joke = jokeData?.data;

    if (!joke) return res.status(404).json({ message: "Joke not found" });

    if (joke?.approved) {
      joke.approved = false;

      const finalJson = {
        content: joke?.content,
        typeId: joke?.type,
        approved: joke?.approved,
      };

      await localJokeService.put(`/joke/${jokeId}`, finalJson);

      res.status(200).json({ message: "Joke rejected and updated", joke });
    } else {
      res.status(400).json({ message: "Joke has already been processed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to reject joke", error });
  }
};

const submitJokeType = async (req, res) => {
  const { type } = req.body;

  try {
    const response = await localJokeService.post("/joke-type/", { type });

    res.status(200).json(response?.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit joke type" });
  }
};

module.exports = {
  submitJokeForModeration,
  getJokeById,
  getAllJokes,
  updateJokeById,
  deleteJokeById,
  approveJoke,
  rejectJoke,
  submitJokeType,
};
