import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
Route.post("/seats","SeatsController.store");
Route.get("/seats","SeatsController.find");
Route.get("/seats/:id","SeatsController.find");
Route.put("/seats/:id","SeatsController.update");
Route.delete("/seats/:id","SeatsController.delete");
})