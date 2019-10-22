import { Controller, HttpMethod, route } from '../core/DecoratorKoa';

@Controller('/')
export default class DashboardController {
  @route('', HttpMethod.GET)
  async index(ctx: any) {
    await ctx.render('homePage');
  }

}
