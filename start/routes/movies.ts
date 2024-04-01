import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.post("/movies","MoviesController.store");
    Route.get("/movies","MoviesController.find");
    Route.get("/movies/:id","MoviesController.show");
    Route.put("/movies/:id","MoviesController.update");
    Route.delete("/movies/:id","MoviesController.delete");

})