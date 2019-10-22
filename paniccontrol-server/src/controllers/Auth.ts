import bcrypt from 'bcryptjs';
import * as EmailValidator from 'email-validator';
import passport from 'passport';
import { getConnection } from 'typeorm';
import { Controller, HttpMethod, route } from '../core/DecoratorKoa';
import { User } from '../models/UserModel';

@Controller('/auth')
export class AuthController {
  @route('/register', HttpMethod.GET)
  async index(ctx: any) {
    try {
      await ctx.render('login/register');
    } catch (error) {
      ctx.flash.set({
        error: 'sss',
      });
      ctx.redirect('/');
    }
  }

  @route('/register', HttpMethod.POST)
  async registerUser(ctx: any) {
    // tslint:disable-next-line: prefer-const
    let { username, password, role, email } = ctx.request.body;
    password = await this.hashPassword(password);
    try {
      if (EmailValidator.validate(email)) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({ username, password, email, role })
          .execute();
        ctx.flash.set({
          message: `${username} has been created`,
        });
        ctx.redirect('/auth/login');
      } else {
        ctx.flash.set({
          error: `${email} is invalid`,
        });
        ctx.redirect('/auth/register');
      }
    } catch (error) {
      console.log(error);
      ctx.flash.set({
        error: error.detail,
      });
      ctx.redirect('/auth/register');
    }
  }

  async hashPassword(password: string, saltRound = 10) {
    return bcrypt.hash(password, saltRound);
  }

  @route('/login', HttpMethod.GET)
  async login(ctx: any) {
    try {
      await ctx.render('login/login');
    } catch (error) {
      ctx.flash.set({
        error,
      });
      ctx.redirect('/');
    }
  }

  @route('/login', HttpMethod.POST)
  async loginUser(ctx: any, next: any) {
    try {
      // tslint:disable-next-line: variable-name
      await passport.authenticate('local', (_err, user, _info, _status) => {
        if (user) {
          ctx.login(user);
          ctx.flash.set({
            message: `Welcome ${user.username}`,
          });
          ctx.redirect('/');
        } else {
          ctx.flash.set({
            error: 'Wrong username or password',
          });
          ctx.redirect('auth/login');
        }
        if (user) {
          ctx.state.user = user;
        }
      })(ctx, next);
    } catch (error) {
      console.log(error);
    }
  }

  @route('/logout', HttpMethod.GET)
  async logoutUser(ctx: any) {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.redirect('/auth/login');
    } else {
      ctx.redirect('/');
    }
  }
}
