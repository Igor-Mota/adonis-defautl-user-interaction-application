import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class QuestionsController {
  public async create({ request, response }: HttpContextContract) {
    const {
      title,
      description,
      response_answer,
      response_type,
      responses,
      answer_type,
      contest_id,
    } = request.only([
      'title',
      'description',
      'response_type',
      'responses',
      'response_answer',
      'answer_type',
      'contest_id',
    ])

    const my_question = await  Question.create({
      title,
      response_answer,
      response_type,
      answer_type,
      contest_id,
      description,
      responses:JSON.stringify(responses).toString(),
    })


    response.status(200).send({
      messsage:my_question
    })
  }
}
