import reportBugController from "../controllers/reportBug.controller.js";

const reportBug = async (fastify) => {
  fastify.post("/report-bug", reportBugController.postReportBug);
};

export default reportBug;
