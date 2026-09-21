import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DATABASE } from '../database/database.provider.js'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq, gt, and ,or } from 'drizzle-orm'
import { users } from '../database/schema/users.schema.js'
import bcrypt, { compare } from 'bcrypt';



const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE)
    private readonly db: ReturnType<typeof drizzle>,
  ) {}
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  private async comparePassword(hashed_password: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed_password);
  }
    

  
  //import database

  //LOGIN
  async login(body: any){
    const { email, password } = body;
    if(!email){
      return "Invalid Credentials";
    }



    try{
      // fetch db if user exists
      // if yes return user with status code
      const res = await this.db
        .select({
        userId: users.id,
        userEmail: users.email,
        userPassword: users.hash_password
        })
        .from(users)
        .where(eq(users.email, email));
      if(!res[0]){
        throw new NotFoundException(`User not found.`)
      }

      const valid_password = await this.comparePassword(res[0].userPassword, password)
      if(!valid_password){
        return `Invalid Credentials`
      }

      const user = res[0];
      console.log(user);

      return user;
    }
    catch{
      // if user doesn't exist in the db throw error
        throw new NotFoundException(`User not found.`)
    }
  }

  //SIGNUP
  async signup(body: any){
    const { username, email, password } = body
    if(!email || !password){
      return "Invalid input."
    }
    const hashed_password= await this.hashPassword(password) 

    try{
      await this.db.insert(users).values({
        username: username,
        email: email,
        hash_password: hashed_password
      })
    }
    catch(e){
      return `Server Failed ${e}`

    }
    return "Success"
  }

  //CHECK TOKEN
  //UPDATE USER
  //LOGOUT

}
