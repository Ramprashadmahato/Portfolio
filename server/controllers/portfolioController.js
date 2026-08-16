const Service = require('../models/Service');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Hero = require('../models/Hero');

// Hero
exports.getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      // Return default if no data yet (don't create here, wait for admin to post)
      hero = {
        name: 'Ram Prashad Mahato',
        titles: 'Web Developer, Software Developer, Freelancer',
        description: "I'm an aspiring Web & Software Developer with a strong foundation in modern technologies.",
        linkedin: "https://www.linkedin.com/in/ram-parsad-mahato-63b4412b1/",
        github: "https://github.com/Ramprashadmahato",
        facebook: "https://www.facebook.com/share/1F3TaC8N3C/",
        instagram: "https://www.instagram.com/ramparsad3011?igsh=am5wa2Q1b3E0YXNq"
      };
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (hero) {
      await hero.update(req.body);
    } else {
      hero = await Hero.create(req.body);
    }
    res.json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.update(req.body);
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.update(req.body);
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.update(req.body);
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.destroy();
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
