import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  /**
   * login
   */
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('rememberMe') || false

    await auth.use('web').attempt(email, password, rememberMe)

    response.redirect('/')
  }

  /**
   * logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    response.redirect('/login')
  }

  /**
   * register new user
   */
  public async register({ request }: HttpContextContract) {
    const user = request.body()

    await User.create(user)

    console.log('user persisted:', user.$isPersisted) // true
  }
}
