import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import Contest from 'App/Models/Contest'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Question from 'App/Models/Question'


export default class ContestsController {

  
  public async create({request, response}:HttpContextContract) {
    
  const {title, description, user_id} = request.only(['title', 'description', 'user_id'])

/*
  const postData = await request.validate({
    schema:schema.create({
      image:schema.file({
        extnames:['png', 'jpg']
      })
    })
  })
*/

  //const url = await postData.banner.moveToDisk('test',{}, 's3')


  const contest = await Contest.create({title, description, image_url:'void', user_id})
  return response.status(201).send({
    data:contest
  })
}

 public async store({request,response, params}:HttpContextContract){

  const my_contests = await Database.from('contests').select('*').where('user_id', params.id )

  response.status(200).send({
    data:my_contests
  })
 }

 public async show({params, response}:HttpContextContract){
    
    const contest = await Contest.findOrFail(params.id)
    const questions = await  Database.from('questions').select('*').where('contest_id', params.id )
    
  response.status(200).send({
    data:{
      contest,
      questions
    }
  })
    
 }
}
