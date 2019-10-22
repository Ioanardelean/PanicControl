import { getConnection, getManager } from 'typeorm';
import { Controller, HttpMethod, route } from '../core/DecoratorKoa';
import { User } from '../models/UserModel';

@Controller('/users')
export default class UsersController {
  @route('/all', HttpMethod.GET)
  async allUsers() {
    const entityManager = getManager();
    const users = await entityManager.find(User);
    try {
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }

  @route('/:id/edit', HttpMethod.GET)
  async renderEdit(ctx: any) {
    const id = ctx.params.id;
    try {
      const project = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.id= :id', { id })
        .getOne();
      await ctx.render('user/edit', { project });
    } catch (error) {
      ctx.flash.set({
        error,
      });
      ctx.redirect('/users');
    }
  }
  @route('/:id/update', HttpMethod.PUT)
  async update(ctx: any) {
    const id = ctx.params.id;
    const { username, password, email } = ctx.request.body;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ username, password, email })
        .where('user.id =:id', { id })
        .execute();
      ctx.flash.set({
        message: 'User has been successfully updated',
      });
      ctx.redirect('/users');
    } catch (error) {
      ctx.flash.set({
        error: error && error.message,
      });
      ctx.redirect(`/users/${id}/edit`);
    }
  }
  @route('/:id/delete', HttpMethod.DELETE)
  async delete(ctx: any) {
    const id = ctx.params.id;
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('user.id =:id', { id })
        .execute();
      ctx.flash.set({
        message: 'User has been deleted',
      });
    } catch (error) {
      ctx.flash.set({
        error,
      });
    }
    ctx.redirect('/users');
  }
}
