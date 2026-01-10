const jobs = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res, next) => {
  try {
    const job = await jobs.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ job, len: job.length });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  try {
    const resu = await jobs.findOne({ createdBy: userId, _id: jobId });
    if (!resu) {
      throw new NotFoundError("No job exist with given id");
    }
    res.status(StatusCodes.OK).json({ resu });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  const { company, position, required } = req.body;
  if (!company || !position) {
    throw new BadRequestError(
      "Company name and Position name are required fields"
    );
  }
  const createdBy = req.user.userId;
  try {
    const job = await jobs.create({ company, position, required, createdBy });
    res.status(StatusCodes.CREATED).json(job);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Company and position details were required");
  }
  try {
    const resu = await jobs.findByIdAndUpdate(
      { createdBy: userId, _id: jobId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!resu) {
      throw new NotFoundError("No job exist with given id");
    }
    res.status(StatusCodes.OK).json({ resu });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  try {
    const resu = await jobs.findByIdAndDelete({
      createdBy: userId,
      _id: jobId,
    });
    if (!resu) {
      throw new NotFoundError("No job exist with given id");
    }
    res.status(StatusCodes.OK).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
