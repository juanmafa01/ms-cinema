import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie';

export default class MoviesController {
    //Get
    public async find({request,params}:HttpContextContract){
        if(params.id){
            return Movie.findOrFail(params.id);
        }else{
            const data = request.all()
            if("page" in data && "per_page" in data){
                const page = request.input('page', 1);
                const perPage = request.input("per_page",20);
                return await Movie.query().paginate(page, perPage)
            }else{
                return await Movie.query()
            }
        }
    }
    //Get por un id
    public async show({params}:HttpContextContract){
        return Movie.findOrFail(params.id);
    }
    //create
    public async store({request}:HttpContextContract){
        const body=request.body();
        const theMovie=await Movie.create(body);
        return theMovie;
    }

    public async update({params,request}:HttpContextContract) {
        const theMovie:Movie=await Movie.findOrFail(params.id);
        const body=request.body();
        theMovie.name=body.name;
        theMovie.duration=body.duration;
        theMovie.year=body.year;
        return theMovie.save();
    }

    public async delete({params,response}:HttpContextContract) {
        const theMovie:Movie=await Movie.findOrFail(params.id);
            response.status(204);
            return theMovie.delete();
    }

    

}
