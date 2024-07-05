
import Database from "../Database/index.js";

function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter((c) => c.course === cid);
    if (assignments) {
      res.json(assignments);
    } else {
      res.status(404).send("Course not found");
    }
  });

  app.delete("/api/courses/:cid/assignments", (req, res) => {
    try {
      const { cid } = req.params;
      Database.assignments = Database.assignments.filter((a) => a._id !== cid);
      res.sendStatus(200);
    } catch (error) {
      res.status(404).send("Assignment delete failed");
    }
  });
  app.put("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = { ...req.body };
    const index = Database.assignments.findIndex((a) => a._id === cid);
    Database.assignments[index] = newAssignment;
    res.sendStatus(200);
  });
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.push(newAssignment);
    res.send(newMonewAssignmentdule);
  });
}

export default AssignmentRoutes;
