import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Theater from 'App/Models/Theater';

export default class TheatersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTheater=await Theater.findOrFail(params.id);
            //Cargar la relación
            await theTheater.load("projector")
            await theTheater.load("seats")
            return theTheater;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Theater.query().paginate(page, perPage)
            } else {
                return await Theater.query()
            }

        }

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
        await theTheater.load("projector")
        if(theTheater.projector){
            response.status(400);
            return{
                "message":"No se puede eliminar porque tiene un proyector"
            }
        }else{
            response.status(204);
            return theTheater.delete();
        }
            
    }
}
