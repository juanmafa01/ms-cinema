import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Screening from "App/Models/Screening";

export default class ScreeningsController {
    //Get
    public async find({request,params}:HttpContextContract){
        if(params.id){
            return Screening.findOrFail(params.id);
        }else{
            const data = request.all()
            if("page" in data && "per_page" in data){
                const page = request.input('page', 1);
                const perPage = request.input("per_page",20);
                return await Screening.query().paginate(page, perPage)
            }else{
                return await Screening.query()
            }
        }
    }
    //Get por un id
    public async show({params}:HttpContextContract){
        return Screening.findOrFail(params.id);
    }
    //create
    public async store({request}:HttpContextContract){
        const body=request.body();
        const theScreening=await Screening.create(body);
        return theScreening;
    }
    public async update({params,request}:HttpContextContract) {
        const theScreening:Screening=await Screening.findOrFail(params.id);
        const body=request.body();
        theScreening.date=body.date;
        theScreening.movie_id=body.movie_id;
        theScreening.theater_id=body.theater_id;
        return theScreening.save();
    }
    public async delete({params,response}:HttpContextContract) {
        const theScreening:Screening=await Screening.findOrFail(params.id);
            response.status(204);
            return theScreening.delete();
    }
}
