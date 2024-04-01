import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seat from 'App/Models/Seat';

export default class SeatsController {
    //create
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSeat:Seat=await Seat.findOrFail(params.id);
            //Cargar la relación
            await theSeat.load("theater")
            return theSeat;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Seat.query().paginate(page, perPage)
            } else {
                return await Seat.query()
            }

        }

    }
    //Get por un id
    public async show({params}:HttpContextContract){
        return Seat.findOrFail(params.id);
    }
    //create
    public async store({request}:HttpContextContract){
        const body=request.body();
        const theProjector=await Seat.create(body);
        return theProjector;
    }
    public async update({params,request}:HttpContextContract) {
        const theSeat:Seat=await Seat.findOrFail(params.id);
        const body=request.body();
        theSeat.location=body.location;
        theSeat.reclining=body.reclining;
        theSeat.theater_id=body.theater_id;
        return theSeat.save();
    }
    public async delete({params,response}:HttpContextContract) {
        const theSeat:Seat=await Seat.findOrFail(params.id);
            response.status(204);
            return theSeat.delete();
    } 
}
