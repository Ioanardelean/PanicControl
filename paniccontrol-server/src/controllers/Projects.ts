import { Controller, HttpMethod, route } from '../core/DecoratorKoa';
import {
  addItem,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../helpers/ProjectServices';
import { userMdw } from '../helpers/User';
import CheckHealth from '../modules/health/MainCheckHealth';
@Controller('/projects')
export default class ProjectsController {
  @route('/', HttpMethod.GET, userMdw)
  async index(ctx: any) {
    const project: any[] = await getProjects(ctx);
    try {
      await ctx.render('projects', { project });
    } catch (error) {
      console.log(error);
      ctx.flash.set({
        error,
      });
      ctx.redirect('/');
    }
  }

  @route('/new', HttpMethod.GET, userMdw)
  async newProject(ctx: any) {
    try {
      await ctx.render('projects/new');
    } catch (error) {
      console.log(error);
      ctx.flash.set({
        error,
      });
      ctx.redirect('/');
    }
  }

  @route('/', HttpMethod.POST, userMdw)
  async createProject(ctx: any) {
    const { name, url } = ctx.request.body;
    try {
      const validUrl = require('valid-url');
      if (validUrl.isUri(url)) {
        await addItem(ctx);
        ctx.flash.set({
          message: `${name} has been created`,
        });
      } else {
        ctx.flash.set({
          error: `${url} is wrong`,
        });
      }
    } catch (error) {
      console.log(error);
      ctx.flash.set({
        error: error.detail,
      });
    }
    ctx.redirect('/projects');
  }
  @route('/:id/edit', HttpMethod.GET)
  async renderEdit(ctx: any) {
    try {
      const project = await getProjectById(ctx);
      await ctx.render('projects/edit', { project });
    } catch (error) {
      ctx.flash.set({
        error,
      });
      ctx.redirect('/projects');
    }
  }

  @route('/:id/update', HttpMethod.PUT)
  async update(ctx: any) {
    const id = ctx.params.id;
    try {
      await updateProject(ctx);
      ctx.flash.set({
        message: 'Project has been successfully updated',
      });
      ctx.redirect('/projects');
    } catch (error) {
      ctx.flash.set({
        error: error && error.message,
      });
      ctx.redirect(`/projects/${id}/edit`);
    }
  }

  @route('/:id/delete', HttpMethod.DELETE)
  async delete(ctx: any) {
    try {
      await deleteProject(ctx);
      ctx.flash.set({
        message: 'Project has been deleted',
      });
    } catch (error) {
      ctx.flash.set({
        error,
      });
    }
    ctx.redirect('/projects');
  }
  @route('/:id/start', HttpMethod.POST)
  async start(ctx: any) {
    try {
      CheckHealth.startTestByProjectId(ctx.params.id);
      ctx.flash.set({
        message: 'Project has been started',
      });
    } catch (error) {
      ctx.flash.set({
        error,
      });
    }
    ctx.redirect('/projects');
  }
  @route('/:id/stop', HttpMethod.POST)
  async stop(ctx: any) {
    try {
      CheckHealth.stopTestByProjectId(ctx.params.id);
      ctx.flash.set({
        message: 'Project has been stopped',
      });
    } catch (error) {
      ctx.flash.set({
        error,
      });
    }
    ctx.redirect('/projects');
  }
}
