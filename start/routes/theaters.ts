import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/theaters", "TheatersController.find");
    Route.get("/theaters/:id", "TheatersController.show");
    Route.post("/theaters", "TheatersController.create");
    Route.put("/theaters/:id", "TheatersController.update");
    Route.delete("/theaters/:id", "TheatersController.delete");
})