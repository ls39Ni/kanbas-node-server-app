import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter((a) => a.course === cid);
    if (assignments.length > 0) {
      res.json(assignments);
    } else {
      res.status(404).send("No assignments found for this course");
    }
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const index = Database.assignments.findIndex((a) => a._id === aid);
    if (index !== -1) {
      Database.assignments.splice(index, 1);
      res.sendStatus(200);
    } else {
      res.status(404).send("Assignment not found");
    }
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const index = Database.assignments.findIndex((a) => a._id === aid);
    if (index !== -1) {
      Database.assignments[index] = { ...req.body, _id: aid };
      res.sendStatus(200);
    } else {
      res.status(404).send("Assignment not found");
    }
  });

  app.post("/api/courses/:cid/assignments/new", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.push(newAssignment);
    res.status(201).json(newAssignment);
  });
}