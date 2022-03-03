import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import Contest from 'App/Models/Contest'
import Drive from '@ioc:Adonis/Core/Drive'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class ContestsController {

  
  public async create({request, response}:HttpContextContract) {
    
  const {title, description} = request.only(['title', 'description'])

  const image = request.file('image', {extnames:['jpg', 'png']})

  const postData = await request.validate({
    schema:schema.create({
      image:schema.file({
        extnames:['png', 'jpg']
      })
    })
  })

  const imageName = image ?  `${uuidv4()}.${image!.extname} `: '' 

  //const url = await postData.banner.moveToDisk('test',{}, 's3')


  const contest = await Contest.create({title, description, image_url:imageName})
  return {contest}
}
 public async store({request,response}:HttpContextContract){
  
 }
}
