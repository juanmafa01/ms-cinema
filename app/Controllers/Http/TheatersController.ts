import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Theater from 'App/Models/Theater';

export default class TheatersController {
    public async find({ request }:HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        let theaters:Theater[]=await Theater.query().preload('projector').paginate(page, perPage)
        return theaters;
    }

    public async show({ params }: HttpContextContract){
        let theTheater: Theater = await Theater.query().where("id",params.id).preload('projector').preload('seats').preload('movies').firstOrFail();
        return theTheater;
    }
    public async create({request}:HttpContextContract){
        const body=request.body();
        const theTheater:Theater=await Theater.create(body);
        return theTheater;
    }

    public async update({params,request}:HttpContextContract) {
        const theTheater:Theater=await Theater.findOrFail(params.id);
        const body=request.body();
        theTheater.location=body.location;
        theTheater.capacity=body.capacity;
        return theTheater.save();
    }

    public async delete({params,response}:HttpContextContract) {
        const theTheater:Theater=await Theater.findOrFail(params.id);
            response.status(204);
            return theTheater.delete();
    }
}
