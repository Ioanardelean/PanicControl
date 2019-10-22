import { getRepository } from 'typeorm';
import { Project } from '../models/ProjectModel';

export async function getProjects(ctx: any) {
    const userId = ctx.state.user.id;
    const projectRepository = getRepository(Project);
    return projectRepository.find({relations: ['user'],
    where: {user: userId}});

}
 export async function getAll() {
    const projectRepository = getRepository(Project);
    // tslint:disable-next-line: prefer-immediate-return
    const project = await projectRepository.find();
    return project;
 }

export async function addItem(ctx: any) {
    const {name, description, url, emailTemplate, receiver, ping} = ctx.request.body;
    const testRunning = ctx.request.body.testRunning === 'true';
    const userId = ctx.state.user.id;
    const projectRepository = getRepository(Project);
    const projects = projectRepository.create({
        name,
        description,
        url,
        emailTemplate,
        receiver,
        ping,
        testRunning,
        user: userId
    });
    await projectRepository.save(projects);
}

export async function getProjectById(ctx: any) {
    const projectRepository = getRepository(Project);
    return  projectRepository.findOne(ctx.params.id);
}

export async function updateProject(ctx: any) {
    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(ctx.params.id);
    const projectToUpdate =  projectRepository.merge(project, ctx.request.body);
    projectRepository.save(projectToUpdate);
}

export async function deleteProject(ctx: any) {
    const projectRepository = getRepository(Project);
    const projectToRemove = await projectRepository.findOne(ctx.params.id);
    projectRepository.remove(projectToRemove);
}
