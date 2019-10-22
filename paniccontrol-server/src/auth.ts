import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { getConnection } from 'typeorm';
import { User } from './models/UserModel';


async function validatePassword(userPassword: any, databasePassword: any) {
    return bcrypt.compare(userPassword, databasePassword );
}

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.id = :id', {id})
        .getOne();
    done(null, user);
    } catch (error) {
    done(error);
    }
});

passport.use(
    new LocalStrategy.Strategy(async (username, password, done) => {
        try {
            const searchUser = new User();
            const user = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.username =:username', {username})
            .getOne();

            if (!user) {
                done(null, false);
                return;
            }

            searchUser.username = username;

            const isValidPassword = await validatePassword(password, user.password);

            if (username === user.username && isValidPassword) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            console.log(error);
        }
    })
);
