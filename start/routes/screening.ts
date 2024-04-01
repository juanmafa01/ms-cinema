import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
Route.post("/screening","ScreeningsController.store");
Route.get("/screening","ScreeningsController.find");
Route.get("/screening/:id","ScreeningsController.find");
Route.put("/screening/:id","ScreeningsController.update");
Route.delete("/screening/:id", "ScreeningsController.delete");
})