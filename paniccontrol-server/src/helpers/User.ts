export async function loginMdw(ctx: any, next: any) {
    if (!ctx.isAuthenticated()) {
        console.log(ctx)
        return ctx.redirect('/auth/login');
    }
    await next;
}


export async function userMdw(ctx: any, next: any) {
    if (ctx.isAuthenticated() && ctx.state.user.role === 'user') {
        await next();
    } else {
        ctx.flash.set({
            error: 'you are not allowed, please login'
        });
        return ctx.redirect('/');
    }
}
