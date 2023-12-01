import express, { Application } from "express";
import SignInRoutes from "../routes/admin/signin.routes";
import HotelsRoutes from "../routes/admin/hotels.routes"
import userRoutes from "./user/user.routes";
import cartRoutes from "./user/cart.routes";
import orderRoutes from "./user/order.routes";
import userhotelsRoutes from "./user/userhotels.routes";
import AdminOrderRoutes from "../routes/admin/orderview.routes"
import contactRoutes from "./user/contact.routes";


export default class Routes {
  constructor(app: Application) {
    
    app.use("/api/adminsign", SignInRoutes);
    app.use("/api/viewadmin",SignInRoutes);
    app.use("/api/addhotel", HotelsRoutes);
    app.use("/api/viewhotel",HotelsRoutes);
    app.use("/api/updatehotel",HotelsRoutes);
    app.use("/api/deletehotel",HotelsRoutes);
    app.use("/api/addrooms", HotelsRoutes);
    app.use("/api/viewrooms",HotelsRoutes);
    app.use("/api/deleterooms",HotelsRoutes);
    app.use("/api/userreg",userRoutes);
    app.use("/api/userlogin",userRoutes);
    app.use("/api/search",userRoutes);
    app.use("/api/viewshotel",userRoutes);
    app.use("/api/userbook",userRoutes);
    app.use("/api/bookid",userRoutes);
    app.use("/api/addcart",cartRoutes);
    app.use("/api/viewcart",cartRoutes);
    app.use("/api/addorder",orderRoutes);
    app.use("/api/vieworder",orderRoutes);
    app.use("/api/delete",orderRoutes);
    app.use("/api/adminorder",AdminOrderRoutes);
    app.use("/api/user/viewhotels",userhotelsRoutes )
    app.use('/uploads', express.static('uploads'));
    app.use("/api/delete/all",orderRoutes);
    app.use("/api/contact",contactRoutes)
    app.use("/api/roomupdate",HotelsRoutes)
   

  }
}
