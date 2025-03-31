import { projects } from "../data/projectData.js";
import { authorize } from "../middlewares/authorize.js";
import { canViewProject } from "../policies/projectPolicy.js";

const handleResponse = (res, statusCode, message, project = null) => {
  res.status(statusCode).json({
    statusCode,
    message,
    project,
  });
};

const getProjectById = (projectId, res) => {
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    handleResponse(res, 404, "Project not found");
    return null;
  }
  return project;
};

export const viewProject = async (req, res) => {
  console.log("AUTHORIZED USER:", req.user);
  const projectId = parseInt(req.params.id);
  const userId = req.user.id;

  const project = getProjectById(projectId, res);
  authorize(canViewProject, project)(req, res, () => {
    handleResponse(res, 200, "Project found", project);
  });
};
export const updateProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user.id;
  const { name, description } = req.body;

  try {
    const projectQuery = `
      UPDATE projects
      SET name = $1, description = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *
    `;
    const projectResult = await pool.query(projectQuery, [
      name,
      description,
      projectId,
      userId,
    ]);

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(projectResult.rows[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
