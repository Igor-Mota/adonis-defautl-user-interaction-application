import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle(
    { request, response, auth }: HttpContextContract,
    next: () => Promise<void | Object>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const { authorization } = request.headers()

    if (!authorization) {
      return response.status(404).send({
        message: 'not token',
      })
    }
    if (!authorization.includes('Bearer ')) {
      return response.status(404).send({
        messahe: 'token mal formated',
      })
    }
    if (!(await auth.check())) {
      return response.status(401).send({
        message: 'token not valid',
      })
    }
    await next()
  }
}
