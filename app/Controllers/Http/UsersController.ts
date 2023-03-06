import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * list all users
   */
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  /**
   * get a single user detail
   */
  public async show({ request }: HttpContextContract) {
    const userId = request.params().id

    const user = await User.findOrFail(userId)

    return user
  }

  /**
   * update user details
   */
  public async update({ request }: HttpContextContract) {
    const userId = request.params().id
    const body = request.body()

    const user = await User.findOrFail(userId)
    await user.merge(body).save()
  }

  /**
   * delete a single user
   */
  public async destroy({ request }: HttpContextContract) {
    const userId = request.params().id

    const user = await User.findOrFail(userId)
    await user.delete()
  }
}
