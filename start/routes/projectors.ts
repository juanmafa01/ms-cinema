import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
Route.post("/projectors","ProjectorsController.store");
Route.get("/projectors","ProjectorsController.find");
Route.get("/projectors/:id","ProjectorsController.find");
Route.put("/projectors/:id","ProjectorsController.update");
Route.delete("/projectors/:id", "ProjectorsController.delete");
})