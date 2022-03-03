import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestsController {
  public async index({request,response}:HttpContextContract){
    response.status(200).send({
      message:'Quale'
    })
  }



  public async create({request,response}:HttpContextContract){
    const {title, description, image} = request.only(['title', 'description', 'image'])
    
    
    return{
    
    }
  }
}
