import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import dataValidator from '../../../utils/validator/user'
import render from '../../../utils/render/user'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const { password } = request.body()
    const data = await request.validate({ schema: dataValidator.userSchema })
    const user = await User.create(data)

    const token = await auth.attempt(user.email, password)

    return response.status(201).send({
      message: 'Usuario criado com sucesso',
      data: render.user(user),
      token,
    })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const query = await Database.from('users').select('*').where('email', email)
    const user = query[0]

    if (!user) {
      return response.status(404).send({ Message: 'User not found' })
    }

    if (!(await Hash.verify(user.password, password))) {
      return response.status(404).send({
        message: 'Unauthorized',
      })
    }
    const token = await auth.attempt(email, password)

    return response.status(200).send({
      Message: 'Authorized',
      email: email,
      data: render.user(user),
      token,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.status(240).send({
      messsage: 'user deleted',
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate({ schema: dataValidator.userSchema })
    const user = await User.findOrFail(params.id)

    user.username = data.username
    user.email = data.email

    await user.save()

    return response.status(200).send({
      message: 'user updated',
      user: render.user(user),
    })
  }

  public async session( {request, response, auth}:HttpContextContract) {

    if(!request.headers().authorization){
      response.status(404).send({
        message:'unauthorized'
      })
    }

    if(await auth.check() === false){
     return response.status(404).send({
        message:'token not valid or expired'
      })
    }

    const token = await auth.use('api').authenticate()
    const newToken = await auth.use('api').generate(token)

    if(token.id){

    }

    response.send({
      message:render.user(token),
      token:newToken
    })
  }
}
