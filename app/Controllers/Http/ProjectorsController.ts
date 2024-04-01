import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Projector from "App/Models/Projector";

export default class ProjectorsController {
     //Get
     public async find({request,params}:HttpContextContract){
        if(params.id){
            return Projector.findOrFail(params.id);
        }else{
            const data = request.all()
            if("page" in data && "per_page" in data){
                const page = request.input('page', 1);
                const perPage = request.input("per_page",20);
                return await Projector.query().paginate(page, perPage)
            }else{
                return await Projector.query()
            }
        }
    }
    //Get por un id
    public async show({params}:HttpContextContract){
        return Projector.findOrFail(params.id);
    }
    //create
    public async store({request}:HttpContextContract){
        const body=request.body();
        const theProjector=await Projector.create(body);
        return theProjector;
    }
    public async update({params,request}:HttpContextContract) {
        const theProjector:Projector=await Projector.findOrFail(params.id);
        const body=request.body();
        theProjector.brand=body.brand;
        theProjector.high=body.high;
        theProjector.width=body.width;
        theProjector.theater_id=body.theater_id;
        return theProjector.save();
    }
    public async delete({params,response}:HttpContextContract) {
        const theProjector:Projector=await Projector.findOrFail(params.id);
            response.status(204);
            return theProjector.delete();
    }

}
