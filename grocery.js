require("dotenv").config();
var express             =require("express"),
    app                 =express(),
passport                =require("passport"),
passportlocal           =require("passport-local"),
passportlocalmongoose   =require("passport-local-mongoose"),
method                  =require("method-override"),
mongoose                =require("mongoose"),
body                    =require("body-parser"),
session                 =require("express-session"),
method                  =require("method-override"),
https = require("https"),
qs = require("querystring"),



flash                   =require("connect-flash"),
// flashs                  =require("express-flash"),
nodemailer              =require("nodemailer"),
 upload                 =require("express-fileupload"),
path                    =require("path"),
fs                      =require("fs"),

// fetch                    =require("node-fetch"),         
request                 =require("request"),
cheerio                 =require("cheerio"),
checksum_lib            =require("./Paytm/checksum"),
Razorpay                =require("razorpay"),
crypto                  = require("crypto"),
cron                    =require("node-cron"),
config                  =require("./Paytm/config"),
secret_key="sk_test_51HYDa6DEQHowOc9K5x2DAfrJ2a2hDQn4NbzTg0TdIfw4put9bnK8D4Lz3MESPLuKzMBbWmwOI76qm3up59H9t9Y500VIrk1GAI",
public_key="pk_test_51HYDa6DEQHowOc9KWUatQJTsMzgOTdRLgxsglppcuXrLpaXH6ZAeewv2MCn0ZpdD08e3YH2mUZMFrJs6BQTnc6AX00FsXjmk2E",
stripe=require("stripe")(secret_key),

port=process.env.PORT || 3006;

path.parse("D:/Backup/web-server/shop/public");
mongoose.connect("mongodb+srv://admin:29JUdssYvwFmOpKA@mongodb-tutorial.wvkvs.mongodb.net/alladmin?retryWrites=true&w=majority");
var marker="cant"
app.use(method("_method"));
app.use(body.urlencoded({extended:true}));
// app.use(body.json()); 

app.use(express.json());

app.use(upload());
app.use(flash());
// app.use(flashs());

app.use(express.static("./public"));
var MongoStore=require("connect-mongo"); 



// var mongostore = MongoStore.create({
//     mongooseConnection:mongoose.connection,
//     collection:"sessions"
// });
app.use(session({
    secret:"Grocery",
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
    mongoUrl: 'mongodb+srv://admin:29JUdssYvwFmOpKA@mongodb-tutorial.wvkvs.mongodb.net/alladmin?retryWrites=true&w=majority',
     // time period in seconds
    collection:"session"
  }),
    //new mongoDbStore({ mongooseConnection:mongoose.connection,collection:"sessions"}),
    cookie:{maxAge:1800*600*1000}
}));
app.use(passport.initialize());
app.use(passport.session());
let instance = new Razorpay({
  key_id: 'rzp_test_fEiizHFA6gj75D', // your `KEY_ID`
  key_secret: 'S7HnMrnoaUOMcqqgQTTSt4mf' // your `KEY_SECRET`
});
 var cartSchema=new mongoose.Schema({
    Name:String,
    image:String,
    Price:Number,
    offer:Number,
    key:String,
    pid:String,
    ratings:String,
    off:String,
    qty:Number,
    urls:String,
    leters:String,
    author:String,
    mainuser:String,
    size:String

})
 var carts=mongoose.model("carts",cartSchema)
var stockCSchema=new mongoose.Schema({
    Name:String,
    image:String,
    Price:Number,
    offer:Number,
    key:String,
    pid:String,
    ratings:String,
    off:String,
    qty:Number,
    urls:String,
    leters:String,
    author:String,
    mainuser:String

})
 var stockC=mongoose.model("stockC",stockCSchema)
var wishSchema=new mongoose.Schema({
    Name:String,
    image:String,
    Price:Number,
    offer:Number,
    key:String,
    pid:String,
    ratings:String,
    off:String,
    qty:Number,
    username:String,
    urls:String,  
    leters:String

})
 var wishlist=mongoose.model("wish",wishSchema)



var popSchema=new mongoose.Schema({

    id:String,
    text:String,
    image:String,
    urls:String,
    api:String,
    view:String
})



var pop=mongoose.model("pop",popSchema)


var selectSchema=new mongoose.Schema({

    id:String,
    date:{type:Date,default:Date.now()}    
})



var selects=mongoose.model("selects",selectSchema)

var suggSchema=new mongoose.Schema({

    Name:String,
    image:String,
    urls:String,
    Price:Number,
    offer:Number,
    pid:String,
    uid:String,

    date:{type:Date,default:Date.now()}    
})



var sugg=mongoose.model("sugg",suggSchema)

var tokenSchema=new mongoose.Schema({

   code:String

    
})

var token=mongoose.model("token",tokenSchema)

var userSchema=new mongoose.Schema({
    first:String,
    last:String,
    username:String,
    email:String,
    passsword:String,
    name:String,
    notinum:Number,
    sum:Number,
    month:String,
    offerHold:Boolean,
    phone:Number,
    image:String,
    token:String,
    approval:Boolean,
    locality:String,
    city:String,
    road:Number,
    age:Number,
    date:{type:Date,default:Date.now}
     
     
    
    
});





var stockSchema=new mongoose.Schema({
    id:String,
    

})
 


 var stocks=mongoose.model("stocks",stockSchema)

var notiSchema=new mongoose.Schema({
    username:String,
    

})
 


 var noti=mongoose.model("noti",notiSchema)
var categorySchema=new mongoose.Schema({
 
  Name:String,
  id:String,
  quan:Number,
  image:String,


})  


var categ=mongoose.model("categ",categorySchema)

var oneSchema=new mongoose.Schema({
 
  id:String


})  


var one=mongoose.model("one",oneSchema)

var twoSchema=new mongoose.Schema({
 
  id:String


})  


var two=mongoose.model("two",twoSchema)

var productSchema=new mongoose.Schema({
    Name:String,
    image:String,
    imagesec:String,
    urls:String,
    Price:Number,
    offer:Number,
    key:String,
    off:String,
    ratings:String,
    leters:String,
    empty:Boolean,
    emptyOne:Boolean,
    emptyTwo:Boolean,

    stocking:Number,
    totalOne:Number,
    totalTwo:Number,

     


    date:{type:Date,default:Date.now},
    ones:[{
           

           type: mongoose.Schema.Types.ObjectId,
            ref:"one"

    }],
    
twos:[{
           

           type: mongoose.Schema.Types.ObjectId,
            ref:"two"

    }],
    stock:[
          {

            type: mongoose.Schema.Types.ObjectId,
            ref:"stocks"
          }
    ],

    
   notify:[
       {
            type: mongoose.Schema.Types.ObjectId,
            ref:"noti"      
       }
   ]
})
 


 var product=mongoose.model("product",productSchema)
 var orderSchema=new mongoose.Schema({
     
   first:String,
   image:String,
   locality:String,
   last:String,
   name:String,
   city:String,
   phone:Number,
   roadNumber:String,
   landmark:String,
   productD:String,
   Price:Number,
   qty:Number,
   pid:String,
   returnId:String,
   returnQ:Number,
   pay:String,
   ifsc:String,
   account:String,
   mainuser:String,
   cartId:String,
   date:{type:Date,default:Date.now},
   cDate:{type:Date,default:Date.now},
   ordered:String,
   dateone:{type:Date,default:Date.now},
   shipped:String,
   datetwo:{type:Date,default:Date.now},
   outfor:String,
   datethree:{type:Date,default:Date.now},
   update:String,
   datefour:{type:Date,default:Date.now},
   autoCancel:Boolean,
   lid:String,  
   urls:String,
   leters:String,
   author:{
    username:String,
    id:String
   },
   month:String,
   size:String




})
 


 var order=mongoose.model("order",orderSchema)
 var locationSchema=new mongoose.Schema({
     
   first:String,
   image:String,
   locality:String,
   last:String,
   name:String,
   city:String,
   phone:Number,
   roadNumber:String,
   landmark:String,
   productD:String,
   Price:Number,
   qty:Number,
   pid:String,
   returnId:String,
   returnQ:Number,
   pay:String,
   ifsc:String,
   account:String,
   mainuser:String,
   cartId:String,
   date:{type:Date,default:Date.now},
   cDate:{type:Date,default:Date.now},
   ordered:String,
   dateone:{type:Date,default:Date.now},
   shipped:String,
   datetwo:{type:Date,default:Date.now},
   outfor:String,
   datethree:{type:Date,default:Date.now},
   update:String,
   datefour:{type:Date,default:Date.now},
   autoCancel:Boolean,  
   oid:String,


   author:{
    username:String,
    id:String
   }




})
 


 var location=mongoose.model("location",locationSchema)
 var coproductSchema=new mongoose.Schema({
    image:String,
    Price:Number,
    offer:Number,
    key:String,
    pid:String,
    ratings:String


})
 var coproduct=mongoose.model("coproduct",coproductSchema)
 // var checksum_lib = require('./checksum.js'),
 userSchema.plugin(passportlocalmongoose)
 var user=mongoose.model("user",userSchema)
passport.use(new passportlocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
 if(req.user) {   
  user.findById(req.user._id).populate("cart").exec(function(err,users){
              var sums=0
              var i=0
              while (i<users.cart.length){
              

                  sums=sums+users.cart[i].Price
                  
               
                  i=i+1
              } 
 
               users.sum=sums 
               users.save()
  
 })
}
    if(req.user) {   


   user.findById(req.user._id).populate("pops").exec(function(err,users){
     var totalnoti=0
     for (var i=0;i<users.pops.length;i++){

         if(users.pops[i].view==""){

             totalnoti=totalnoti+1
         }
     }
    
     users.notinum=totalnoti
     users.save()
   })

} 
 


    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
  if(req.user){
    res.locals.currentUser=req.user
   }
    else {
       res.locals.currentUser=""
  }
    if (req.user){
     res.locals.sum=req.user.sum
    }
    next()
})
app.get("/time",function(req,res){

    res.send(new Date().toString())
})


cron.schedule("*/5 * * * *",function(){

    request("https://grocery-ji.herokuapp.com/autoremove",function(error,response,data){


    })
})

app.get("/autoremove",function(req,res){

     console.log("autoremove hitting")
     user.find({},function(err,users){

          for(var i=0;i<users.length;i++){


              user.findById(users[i]._id).populate("pops").exec(function(err,found){

                 if(found.offerHold && found.offerHold==true){

                   if(found.pops.length>0){
                      for(var i=0;i<found.pops.length;i++){

                         if(found.pops[i].api=="vip"){

                             pop.findByIdAndDelete(found.pops[i]._id,function(err,info){


                             })
                         }
                      }
                    }  
                       found.offerHold=false
                      found.save()
                      console.log("changed")
                 }
              })
          }
     })
})




app.get("/login",function(req,res){

    res.render("login.ejs")
})


app.get("/",function(req,res){
    var newtoken=Math.floor(Math.random()*123445)
  
  var flag=true
  token.find({},function(err,tokens){
    flag=false
    if(tokens.length>0){
     for(var i=0;i<tokens.length;i++){
         token.findByIdAndDelete(tokens[i]._id,function(err,infos){

         })
       break
     }
    }
  })  
  
   token.create({code:newtoken},function(err,info){
     
     
 
     res.render("tokens.ejs")
  var transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"grocery.ofc@gmail.com",
            pass:process.env.password
        }
    })
 
    var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`grocery.ofc@gmail.com`,
                to:`grocery.ofc@gmail.com`,
                subject:"Verification",
                html:`-----Hi,welcome to user verification panel<br>your token || recipient ID-----<br>
                        <b>${newtoken}</b>
                        <br>
                        <a href=https://userverify-groceryji.herokuapp.com/>verify token & sign up</a>
                        
                        
                        </form>
                        <br>
                        <b>Thank you from <a href=https://groceryji.herokuapp.com/>GroceryJi</a></b>
                        `
            } 

 
             transport.sendMail(mailoptions,function(err,info){
                  if(err){
                    console.log(err)
                }
                else{

                     console.log("successfully sent") 
                 }
  })
 
  })
      


})





app.get("/time",function(req,res){

     var data=new Date()
     res.send(data.toLocaleString("en-UN"))
})


app.get("/admins",function(req,res){

    
  token.find({},function(err,tokens){
     var flag=true
     for(var i=0;i<tokens.length;i++){

           if(tokens[i].code==req.query.token)
            {
               flag=false 
               console.log("here")
               if(!req.query.search){ 
                user.find({},function(err,admins){
                     if(admins.length>0){

                         res.render("adminuser.ejs",{admins:admins,token:req.query.token})
                      }
                      else{

                         res.render("newvery.ejs",{token:req.query.token})
                      }
                   })


                 
                }
                else{
                                  flag=false
   
                  user.find({},function(err,allusers){

                     
                      var search=req.query.search  
                      var searches=search.toLowerCase()
                      var finds=[]
                      for (var i=0;i<allusers.length;i++){

                                
                            for (var j=0;j<allusers[i].name.length;j++){

                                 var p=j
                                 var flags=true 
                                 for(var s=0;s<searches.length;s++){ 
                                  if(allusers[i].name[p].toLowerCase()!==searches[s]){

                                           flags=false
                                           break


                                  }
                                  
                                  p=p+1
                                      
                                }
                                    

                            if(flags==true){

                                   finds.push(0)   
                                   user.find({name:{$regex:allusers[i].name,$options:"$i"}},function(err,admins){

                                                                     res.render("adminuser.ejs",{admins:admins,token:req.query.token})



                                   })   

                                   var allusers=[]
                                   break
                            
                            }   
                       
                              }

                      }
                      
                      if(finds.length==0){

                          res.render("noadmin.ejs",{token:req.query.token})
                      }       
                  
                  })     
                
                }

              
               break
            
            }
     }
      if(flag==true){

         req.flash("error","token is not approved")
         res.redirect("back")
      }
    


  })


    
})


app.get("/deleteadmin/:id",function(req,res){

   user.findByIdAndDelete(req.params.id,function(err,info){
        
         req.flash("success","admin is deleted")
         res.redirect("/")

   })
})
app.get("/updateadmin/:id",function(req,res){

 token.find({},function(err,tokens){
   user.findById(req.params.id,function(err,info){
        if(info.approval==false){ 
         info.updateOne({approval:true},function(err,updated){
      
         req.flash("success","admin is approved")
         res.redirect("/")

     })
    }
    else{

        info.updateOne({approval:false},function(err,updated){
      
         req.flash("success","admin is approved")
         res.redirect("/")

     })
    }
   })
  })
})
app.post("/token",function(req,res){
   token.findOne({code:req.body.token},function(err,tokens){ 
    if(tokens){ 
     var token=Math.floor(Math.random()*123445)

    user.findOne({email:req.body.username},function(err,info){
    if(info){
     
   
   req.flash("error","already user verified")
   res.redirect("/")


   }
   else{
  
   

  user.create({token:token,date:Date.now(),email:req.body.username},function(err,info){
               



               var transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"grocery.ofc@gmail.com",
            pass:process.env.password
        }
    })
 
    var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`grocery.ofc@gmail.com`,
                to:`${req.body.username}`,
                subject:"Verification",
                html:`-----Hi,welcome to Admin Panel<br>your token || recipient ID-----<br>
                        <b>${token}</b>
                        <br>
                        <a href="https://admin-groceryji.herokuapp.com/>verify token & sign up</a>
                        
                        
                        </form>
                        <br>
                        <b>Thank you from <a href=https://groceryji.herokuapp.com>GroceryJi</a></b>
                        `
            } 

 
             transport.sendMail(mailoptions,function(err,info){
                  if(err){
                     req.flash("error","cant send the mail")
                     res.redirect("back")
                }
                else{

                     req.flash("success","mail sent")
                     res.redirect("/")
                 }
  })

     })




   }
  })
   }
   else{

    req.flash("error","Approved token is required!") 
    res.redirect("/")
   }
  })

})



app.get("/times",function(req,res){

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

     console.log(month[date.getMonth()])
})


app.get("/month/:id",function(req,res){
 

     var totalSum=0
 
if (!req.query.search){
     order.find({month:req.params.id},function(err,orders){
      if(orders.length>0){

       for (var i=0;i<orders.length;i++){

          if(orders[i].update!=="Canceled"){
            
             totalSum=totalSum+orders[i].Price

          }
       }
     
         res.render("monthOrder.ejs",{orders:orders,month:req.params.id,totalSum:totalSum,search:"",month:req.params.id})
      }
      else{

                         res.render("noOrders.ejs")


      }

     })
  }

  else{

     
          var key=req.query.search
          var find=[]
          order.find({month:req.params.id},function(err,orders){

              
              for(var i=0;i<orders.length;i++){
             
              
                 for (var j=0;j<orders[i].name.length;j++){

                     var k=j
                     var flag=true
                     for (var p=0;p<key.length;p++){
                      
                         if(orders[i].name[k].toLowerCase()!==key[p].toLowerCase()){

                                      flag=false
                                      break

                  
                        }
                        k=k+1 
                       
                     
                    }
                    if (flag==true){
                        console.log(orders[i].name)
                        find.push(0)
                      order.find({name:{$regex:orders[i].name,$options:"$i"}},function(err,orderf){
                         for (var i=0;i<orderf.length;i++){

                          if(orderf[i].update!=="Canceled" && orderf[i].month==req.params.id){
                            
                             totalSum=totalSum+orderf[i].Price

                          }
                       }

                            
                                res.render("monthOrder.ejs",{orders:orderf,month:req.params.id,totalSum:totalSum,search:key})

                       })

                       var orders=[]

                       break
                    }

                 
                 }       

                      

              }
           

            if (find.length==0){

                               res.render("nocustomer.ejs")



            }       


      })
        

  }


})

app.get("/vip",function(req,res){
    
 
  if(!req.query.search){
           user.find({offerHold:true},function(err,users){

       if(users.length>0){ 
         res.render("vip.ejs",{users:users,search:""})
       }
       else{

        res.render("novip.ejs")
       }
      
  })
 }
 else{
    var key=req.query.search
    var find=[]
    user.find({offerHold:true},function(err,users){
     

     for(var i=0;i<users.length;i++){
       


             for (var j=0;j<users[i].name.length;j++){

                 var flag=true
                 var p=j
                 for (k=0;k<key.length;k++){

                     if(users[i].name[p].toLowerCase()!==key[k].toLowerCase()){

                         flag=false
                         break

                     }
                     p=p+1
                 }
                 if(flag==true){
                     user.find({name:{$regex:users[i].name,$options:"$i"}},function(err,found){

                                  res.render("vip.ejs",{users:found,search:req.query.search})

                     })
                   find.push(0)

                   var users=[]
                   break
                 }
         
              }
           
         
        
        
     }
    
    if(find.length==0){

      res.render("novip.ejs")
              
    } 

})
 }

})



app.get("/moreMonth/:id/:mon",function(req,res){

     
     
     var total=0
     user.findOne({username:req.params.id},function(err,alluser){
      order.find({mainuser:req.params.id},function(err,orders){

       for (var i=0;i<orders.length;i++){

          if(orders[i].month==req.params.mon && orders[i].update!=="Canceled"){
            
             total=total+orders[i].Price

          }
       }
      
        if(alluser.offerHold==true){

             var vip=true
        }
        else{

            var vip=false
        }
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        
         var date=new Date()
         
         res.render("monthuser.ejs",{total:total,alluser:alluser,month:req.params.mon,vip:vip,secondmonth:months[date.getMonth()]})  
     
     })
 })
     
})

app.get("/updateCustomersStatus/:id/:mon",function(req,res){
 const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            var date=new Date()
 user.findById(req.params.id).populate("pops").exec(function(err,users){

     if(users.offerHold==false){
 pop.create({text:"You are a VIP customer Of " +" "+ req.params.mon,api:"vip",view:"viewed"},function(err,popup){
            
            users.pops.push(popup)
           users.offerHold=true
         users.month=months[date.getMonth()]

         users.save() 
           
              
 
 })         
        
      req.flash("success",users.name + " is now VIP Customer")
      res.redirect("back")  
   
 var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  

                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${users.username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,welcome to GroceryJi<br>
                                           Hi,${users.name},You Are A VIP Customer Of ${req.params.mon}... 
                                           <br>
                                           <b>Congratulations</b>
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/"><button style=color:green>GroceryJi</button></a>                       
                                                          
                                                        `
                                    } 
                              
                             
                                   
 
                                      
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                        res.redirect("/login");
                                    }
                                        else{
                                            console.log("here")

                                        }


                                })  

     }
   else{

    
    users.offerHold=false
         users.save()
      
   if(users.pops.length>0){ 
    for(var i=0;i<users.pops.length;i++){

         if(users.pops[i].api=="vip"){

             pop.findByIdAndDelete(users.pops[i]._id,function(err,info){


             })
         }
    }
   } 
    req.flash("error",users.name + " is removed from VIP Customer")
    res.redirect("back")  

   }
  

  })    




})

app.get("/buy/:pid",isLoggedin,function(req,res){

   var author={

    username:req.user.username,
    id:req.user._id
   }
  user.findById(req.user._id,function(err,users){ 

   product.findById(req.params.pid).populate("stock").populate("ones").populate("twos").exec(function(err,prod){
  if(req.query.size){
        
         if(req.query.size=="one"){ 
 
            if (users.offerHold==true){

     var amounts=(req.query.qty*prod.Price)
     for(var i=0;i<req.query.qty;i++){

         amounts=amounts-20
     }  
   }
   else if(users.offerHold==false){

          var amounts=req.query.qty*prod.Price

  

   }
 
 
 }

 else if(req.query.size=="two"){ 

     
         if (users.offerHold==true){

     var amounts=(req.query.qty*(prod.Price*2))
     for(var i=0;i<req.query.qty;i++){

         amounts=amounts-20
     }  
   }
   else if(users.offerHold==false){

          var amounts=req.query.qty*(prod.Price*2)

  

   }



 }

}
   

   if(req.query.size){
        
         if(req.query.size=="one"){

             if(req.query.qty<=prod.ones.length){
                

                if(!req.query.new){   
      location.find({mainuser:req.user.username},function(err,preord){
        console.log(preord)
        if (preord.length>0){
               
                         res.render("preorder.ejs",{prod:prod,qty:req.query.qty,key:public_key,preord:preord,amount:amounts,size:req.query.size})

            
         }
         else{
            

         res.render("order.ejs",{prod:prod,qty:req.query.qty,key:public_key,amount:amounts,size:req.query.size})
       }
     })
   }
   else{
              console.log(req.query.qty*prod.Price)
              res.render("order.ejs",{prod:prod,qty:req.query.qty,key:public_key,amount:amounts,size:req.query.size})

   }

             }

        else{  
          req.flash("error","Selected quantity is greater than the number of total stock of this product")
          res.redirect("back")
           }

         }
         else if(req.query.size=="two"){


               if(req.query.qty<=prod.twos.length){
                

                if(!req.query.new){   
      location.find({mainuser:req.user.username},function(err,preord){
        console.log(preord)
        if (preord.length>0){
               
                         res.render("preorder.ejs",{prod:prod,qty:req.query.qty,key:public_key,preord:preord,amount:amounts,size:req.query.size})

            
         }
         else{
            

         res.render("order.ejs",{prod:prod,qty:req.query.qty,key:public_key,amount:amounts,size:req.query.size})
       }
     })
   }
   else{
              console.log(req.query.qty*prod.Price)
              res.render("order.ejs",{prod:prod,qty:req.query.qty,key:public_key,amount:amounts,size:req.query.size})

   }

             }

        else{  
          req.flash("error","Selected quantity is greater than the number of total stock of this product")
          res.redirect("back")
           }

         }

   


   }
   else{
    if (users.offerHold==true){

        var amounts=(req.query.qty*prod.Price)
        for(var i=0;i<req.query.qty;i++){

             amounts=amounts-20
        }
   }
   else if(users.offerHold==false){

          var amounts=req.query.qty*prod.Price

  

   }
   if(prod.stock.length>=req.query.qty){ 
    if(!req.query.new){   
      location.find({mainuser:req.user.username},function(err,preord){
        console.log(preord)
        if (preord.length>0){
               
                         res.render("preorder.ejs",{prod:prod,qty:req.query.qty,key:public_key,preord:preord,amount:amounts,size:""})

            
         }
         else{
            

         res.render("order.ejs",{prod:prod,qty:req.query.qty,key:public_key,amount:amounts,size:""})
       }
     })
   }
   else{
              console.log(req.query.qty*prod.Price)
              res.render("order.ejs",{prod:prod,qty:req.query.qty,key:public_key,amount:amounts,size:""})

   }
   }
   else{

    req.flash("error","Selected quantity is greater than the number of total stock of this product")
    res.redirect("back")
   }
   }
   })


 })
})

app.get("/allbuy",function(req,res){

   location.find({mainuser:req.user.username},function(err,preord){
        console.log(preord)
        if(!req.query.new){


         if(preord.length>0){
               
                         res.render("preordercart.ejs",{prod:"3ert",qty:0,key:public_key,preord:preord})

            
         }
         else{
            

        res.render("allcartorder.ejs",{key:public_key,prod:"3ert"})
       }
     }
     else{

                     res.render("allcartorder.ejs",{key:public_key,prod:"3ert"})


     }
     })
   

   
})


app.post("/allbuy/:id",function(req,res){

  location.findById(req.params.id,function(err,loc){ 
   user.findById(req.user._id).populate("cart").exec(function(err,users){


   if (req.body.method=="Stripe"){


     stripe.customers.create({ 
                            email: req.body.stripeEmail, 
                            source: req.body.stripeToken, 
                            name: req.user.username, 
                            address: { 
                                line1: 'TC 9/4 Old MES colony', 
                                postal_code: '110092', 
                                city: 'Kolkata', 
                                state: 'India', 
                                country: 'India', 
                            } 
                        }) 
                        .then((customer) => { 

                                return stripe.charges.create({ 
                                amount:req.user.sum,    // Charing Rs 25 
                                description:"All Products Of Your Cart", 
                                currency: 'INR', 
                                customer: customer.id 
                            

                            })

                       })   
                            .then((charge) => {
                           
                                 

                           })
                            .catch((error)=>{

                           })


  } 
  
   
                        if(req.body.method=="Stripe"){

                              var pay="Paid"
                           }
                           
                           
                          else if(req.body.method=="razorpay"){

                            var pay="Paid"
                          }  


                           else if (req.body.method=="Cash-On-Delivery"){
 
                                 var pay="Cash-On-Delivery"


          

                           }
         var author={
            username:req.user.username,
            id:req.user._id
         }
         
                  
                            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            var d=new Date()

                                           order.find({mainuser:req.user.username},function(err,orders){
                                           var flag=true
                                   
                                           if(loc){ 
                                                for(var p=0;p<orders.length;p++){

                                                         if(orders[p].lid==loc._id){
                                                                 
                                                                  flag=false
                                                                    
                                                                     for (var i=0;i<users.cart.length;i++){
                                                                if(users.cart[i].size){ 
                                                                    if(users.cart[i].size=="1L"){
                                                                   
                                                                              

                                                                                  order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:users.cart[i].Price,returnId:"",author:author,productD:users.cart[i].Name,qty:users.cart[i].qty,locality:req.body.locality,pay:pay,image:users.cart[i].image,returnQ:0,pid:users.cart[i].pid,ifsc:"",account:"",cartId:users.cart[i]._id,ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,lid:loc._id,mainuser:req.user.username,urls:users.cart[i].urls,size:users.cart[i].size,month:months[d.getMonth()],},function(err,orders){
     
                                                                         product.findById(orders.pid).populate("stock").populate("ones").populate("twos").exec(function(err,pro){                                
                                                            pro.totalOne=pro.totalOne-orders.qty

                                                              pro.date=Date.now()
                                                              
                                                            for(var p=0;p<orders.qty;p++){
                                                               console.log("here inside") 
                                                               one.deleteOne({id:orders.pid},function(err,info){
                                
                                                          
                                                                          })
                                                     
                                                             }                 

                                                            carts.deleteOne({_id:orders.cartId},function(err,inf){

                                                                })
                               
                               
                                                if (pro.totalOne==0){
                                                      pro.emptyOne=true
                                                      pro.totalOne=0
                                                       pro.date=Date.now()
                                                       pop.find({},function(err,pup){

                                                            for (var i=0;i<pup.length;i++){

                                                               if (pup[i].id==pro._id){

                                                                    pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                                                 })
                                                               }
                                                            }
                                                         })      
                                                  
                                                  carts.find({pid:pro._id},function(err,allcart){

                                                         for (var i=0;i<allcart.length;i++){
                                                           
                                                           if(allcart[i].size=="1L"){
                                                             carts.findByIdAndDelete(allcart[i]._id,function(err,info){


                                                             })
                                                           }
                                                         }

                                                     })  

                                                     wishlist.find({pid:pro._id},function(err,allwish){


                                                         for(var i=0;i<allwish.length;i++){

                                                             wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })


                                                  }
                                                  pro.save()
                                                  carts.find({pid:pro._id},function(err,allcarts){
                                  
                                                     if(allcarts.length>0){ 
                                                      for(var i=0;i<allcarts.length;i++){
                                                           
                                                          carts.findById(allcarts[i]._id,function(err,cartinfo){
                                                             if(cartinfo && cartinfo.size=="1L"){ 
                                                              if(cartinfo.qty>pro.totalOne){

                                                                  carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                                                  })
                                                              }
                                                            }
                                                          })
                                                        
                                                      }
                                                     }
                                               }) 

                               })
                         })





                                                    }
                                                    
                                                    else if(users.cart[i].size=="2L"){

                                                                       

                                                                           


                                                                           order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:users.cart[i].Price,returnId:"",author:author,productD:users.cart[i].Name,qty:users.cart[i].qty,locality:req.body.locality,pay:pay,image:users.cart[i].image,returnQ:0,pid:users.cart[i].pid,ifsc:"",account:"",cartId:users.cart[i]._id,ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,lid:loc._id,mainuser:req.user.username,urls:users.cart[i].urls,size:users.cart[i].size,month:months[d.getMonth()],},function(err,orders){
     
                                                                         product.findById(orders.pid).populate("stock").populate("ones").populate("twos").exec(function(err,pro){                                
                                                            pro.totalTwo=pro.totalTwo-orders.qty

                                                              pro.date=Date.now()
                                                              
                                                            for(var p=0;p<orders.qty;p++){
                                                               console.log("here inside") 
                                                               two.deleteOne({id:orders.pid},function(err,info){
                                
                                                          
                                                                          })
                                                     
                                                             }                 

                                                            carts.deleteOne({_id:orders.cartId},function(err,inf){

                                                                })
                               
                               
                                                if (pro.totalTwo==0){
                                                      pro.emptyTwo=true
                                                      pro.totalTwo=0
                                                       pro.date=Date.now()
                                                       pop.find({},function(err,pup){

                                                            for (var i=0;i<pup.length;i++){

                                                               if (pup[i].id==pro._id){

                                                                    pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                                                 })
                                                               }
                                                            }
                                                         })      
                                                  
                                                  carts.find({pid:pro._id},function(err,allcart){

                                                         for (var i=0;i<allcart.length;i++){
                                                           
                                                           if(allcart[i].size=="2L"){
                                                             carts.findByIdAndDelete(allcart[i]._id,function(err,info){


                                                             })
                                                           }
                                                         }

                                                     })  

                                                     wishlist.find({pid:pro._id},function(err,allwish){


                                                         for(var i=0;i<allwish.length;i++){

                                                             wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })


                                                  }
                                                  pro.save()
                                                  carts.find({pid:pro._id},function(err,allcarts){
                                  
                                                     if(allcarts.length>0){ 
                                                      for(var i=0;i<allcarts.length;i++){
                                                           
                                                          carts.findById(allcarts[i]._id,function(err,cartinfo){
                                                             if(cartinfo && cartinfo.size=="2L"){ 
                                                              if(cartinfo.qty>pro.totalTwo){

                                                                  carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                                                  })
                                                              }
                                                            }
                                                          })
                                                        
                                                      }
                                                     }
                                               }) 

                               })
                         })


                                                            
 
                                                                    }
                                                                   } 
                                                                    else{  
                                                                           
                                                                           order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:users.cart[i].Price,returnId:"",author:author,productD:users.cart[i].Name,qty:users.cart[i].qty,locality:req.body.locality,pay:pay,image:users.cart[i].image,returnQ:0,pid:users.cart[i].pid,ifsc:"",account:"",cartId:users.cart[i]._id,ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,lid:loc._id,mainuser:req.user.username,urls:users.cart[i].urls,leters:users.cart[i].leters,month:months[d.getMonth()],offerHold:false},function(err,orders){
     
                                                                         product.findById(orders.pid).populate("stock").exec(function(err,pro){                                
                                                            pro.stocking=pro.stocking-orders.qty

                                                              pro.date=Date.now()
                                                              
                                                            for(var p=0;p<orders.qty;p++){
                                                               console.log("here inside") 
                                                               stocks.deleteOne({id:orders.pid},function(err,info){
                                
                                                          
                                                                          })
                                                     
                                                             }                 

                                                            carts.deleteOne({_id:orders.cartId},function(err,inf){

                                                                })
                               
                               
                                                if (pro.stocking==0){
                                                      pro.empty=true
                                                      pro.stocking=0
                                                       pro.date=Date.now()
                                                       pop.find({},function(err,pup){

                                                            for (var i=0;i<pup.length;i++){

                                                               if (pup[i].id==pro._id){

                                                                    pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                                                 })
                                                               }
                                                            }
                                                         })      
                                                  
                                                  carts.find({pid:pro._id},function(err,allcart){

                                                         for (var i=0;i<allcart.length;i++){

                                                             carts.findByIdAndDelete(allcart[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })  

                                                     wishlist.find({pid:pro._id},function(err,allwish){


                                                         for(var i=0;i<allwish.length;i++){

                                                             wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })


                                                  }
                                                  pro.save()
                                                  carts.find({pid:pro._id},function(err,allcarts){
                                  
                                                     if(allcarts.length>0){ 
                                                      for(var i=0;i<allcarts.length;i++){

                                                          carts.findById(allcarts[i]._id,function(err,cartinfo){
                                                             if(cartinfo){ 
                                                              if(cartinfo.qty>pro.stocking){

                                                                  carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                                                  })
                                                              }
                                                            }
                                                          })
                                                        
                                                      }
                                                     }
                                               }) 

                               })
                     })

                }
      
                                                               
                                                           }    
                                                               break
                                                               }  
                                                                
                                              // var ids=users.cart[i]._id
                                               }         
                                               }
                                               
                                              if(flag==true){
                                          location.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,returnId:"",author:author,locality:req.body.locality,pay:pay,returnQ:0,ifsc:"",account:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",mainuser:req.user.username},function(err,loca){
 
                                                for (var j=0;j<users.cart.length;j++){

                                                if(users.cart[j].size){
                                                 
                                                 if(users.cart[j].size=="1L"){
                                                      

                                                        order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:users.cart[j].Price,returnId:"",author:author,productD:users.cart[j].Name,qty:users.cart[j].qty,locality:req.body.locality,pay:pay,image:users.cart[j].image,returnQ:0,pid:users.cart[j].pid,ifsc:"",account:"",cartId:users.cart[j]._id,ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,lid:loca._id,mainuser:req.user.username,urls:users.cart[j].urls,size:users.cart[j].size,month:months[d.getMonth()]},function(err,orders){
     
                                                       product.findById(orders.pid).populate("stock").populate("ones").populate("twos").exec(function(err,pro){                                
                                                            pro.totalOne=pro.totalOne-orders.qty

                                                              pro.date=Date.now()
                                                            for(var p=0;p<orders.qty;p++){
                                                               console.log("here inside") 
                                                               one.deleteOne({id:orders.pid},function(err,info){
                                
                                                          
                                                                          })
                                                     
                                                             }                 

                                                            carts.deleteOne({_id:orders.cartId},function(err,inf){

                                                                })
                               
                               
                                                if (pro.totalOne==0){
                                                      pro.emptyOne=true
                                                      pro.totalOne=0
                                                       pro.date=Date.now()
                                                    
                                                      pop.find({},function(err,pup){

                                                            for (var i=0;i<pup.length;i++){

                                                               if (pup[i].id==pro._id){

                                                                    pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                                                 })
                                                               }
                                                            }
                                                         }) 

                                                    
                                                      carts.find({pid:pro._id},function(err,allcart){

                                                         for (var i=0;i<allcart.length;i++){
                                                             if(allcart[i].size=="1L"){    
                                                              carts.findByIdAndDelete(allcart[i]._id,function(err,info){

                                                                
                                                             })
                                                            
                                                            }
                                                         }
                                                     })  

                                                     wishlist.find({pid:pro._id},function(err,allwish){


                                                         for(var i=0;i<allwish.length;i++){

                                                             wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })
                                                      

                                                  



                                                  }
                                                  pro.save()
                                                  carts.find({pid:pro._id},function(err,allcarts){
                                  
                                                     if(allcarts.length>0){ 
                                                      for(var i=0;i<allcarts.length;i++){

                                                          carts.findById(allcarts[i]._id,function(err,cartinfo){
                                                             if(cartinfo && cartinfo.size=="1L"){ 
                                                              if(cartinfo.qty>pro.totalOne){

                                                                  carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                                                  })
                                                              }
                                                            }
                                                          })
                                                        
                                                      }
                                                     }
                                               }) 
                               })
                     })


                                                 }


                                                else if(users.cart[j].size=="2L"){


                                                     


                                                       order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:users.cart[j].Price,returnId:"",author:author,productD:users.cart[j].Name,qty:users.cart[j].qty,locality:req.body.locality,pay:pay,image:users.cart[j].image,returnQ:0,pid:users.cart[j].pid,ifsc:"",account:"",cartId:users.cart[j]._id,ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,lid:loca._id,mainuser:req.user.username,urls:users.cart[j].urls,size:users.cart[j].size,month:months[d.getMonth()]},function(err,orders){
     
                                                       product.findById(orders.pid).populate("stock").populate("ones").populate("twos").exec(function(err,pro){                                
                                                            pro.totalTwo=pro.totalTwo-orders.qty

                                                              pro.date=Date.now()
                                                            for(var p=0;p<orders.qty;p++){
                                                               console.log("here inside") 
                                                               two.deleteOne({id:orders.pid},function(err,info){
                                
                                                          
                                                                          })
                                                     
                                                             }                 

                                                            carts.deleteOne({_id:orders.cartId},function(err,inf){

                                                                })
                               
                               
                                                if (pro.totalTwo==0){
                                                      pro.emptyTwo=true
                                                      pro.totalTwo=0
                                                       pro.date=Date.now()
                                                    
                                                      pop.find({},function(err,pup){

                                                            for (var i=0;i<pup.length;i++){

                                                               if (pup[i].id==pro._id){

                                                                    pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                                                 })
                                                               }
                                                            }
                                                         }) 

                                                    
                                                      carts.find({pid:pro._id},function(err,allcart){

                                                         for (var i=0;i<allcart.length;i++){
                                                             if(allcart[i].size=="2L"){    
                                                              carts.findByIdAndDelete(allcart[i]._id,function(err,info){

                                                                
                                                             })
                                                            
                                                            }
                                                         }
                                                     })  

                                                     wishlist.find({pid:pro._id},function(err,allwish){


                                                         for(var i=0;i<allwish.length;i++){

                                                             wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })
                                                      

                                                  



                                                  }
                                                  pro.save()
                                                  carts.find({pid:pro._id},function(err,allcarts){
                                  
                                                     if(allcarts.length>0){ 
                                                      for(var i=0;i<allcarts.length;i++){

                                                          carts.findById(allcarts[i]._id,function(err,cartinfo){
                                                             if(cartinfo && cartinfo.size=="2L"){ 
                                                              if(cartinfo.qty>pro.totalTwo){

                                                                  carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                                                  })
                                                              }
                                                            }
                                                          })
                                                        
                                                      }
                                                     }
                                               }) 
                               })
                     })
        




                                                }  
                                             
                                               }


                                                  else{   
                                       
                                                   order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:users.cart[j].Price,returnId:"",author:author,productD:users.cart[j].Name,qty:users.cart[j].qty,locality:req.body.locality,pay:pay,image:users.cart[j].image,returnQ:0,pid:users.cart[j].pid,ifsc:"",account:"",cartId:users.cart[j]._id,ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,lid:loca._id,mainuser:req.user.username,urls:users.cart[j].urls,leters:users.cart[j].leters,month:months[d.getMonth()],offerHold:false},function(err,orders){
     
                                                       product.findById(orders.pid).populate("stock").exec(function(err,pro){                                
                                                            pro.stocking=pro.stocking-orders.qty

                                                              pro.date=Date.now()
                                                            for(var p=0;p<orders.qty;p++){
                                                               console.log("here inside") 
                                                               stocks.deleteOne({id:orders.pid},function(err,info){
                                
                                                          
                                                                          })
                                                     
                                                             }                 

                                                            carts.deleteOne({_id:orders.cartId},function(err,inf){

                                                                })
                               
                               
                                                if (pro.stocking==0){
                                                      pro.empty=true
                                                      pro.stocking=0
                                                       pro.date=Date.now()
                                                    
                                                      pop.find({},function(err,pup){

                                                            for (var i=0;i<pup.length;i++){

                                                               if (pup[i].id==pro._id){

                                                                    pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                                                 })
                                                               }
                                                            }
                                                         }) 

                                                    
                                                      carts.find({pid:pro._id},function(err,allcart){

                                                         for (var i=0;i<allcart.length;i++){

                                                             carts.findByIdAndDelete(allcart[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })  

                                                     wishlist.find({pid:pro._id},function(err,allwish){


                                                         for(var i=0;i<allwish.length;i++){

                                                             wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                                             })
                                                         }
                                                     })
                                                      

                                                  



                                                  }
                                                  pro.save()
                                                  carts.find({pid:pro._id},function(err,allcarts){
                                  
                                                     if(allcarts.length>0){ 
                                                      for(var i=0;i<allcarts.length;i++){

                                                          carts.findById(allcarts[i]._id,function(err,cartinfo){
                                                             if(cartinfo){ 
                                                              if(cartinfo.qty>pro.stocking){

                                                                  carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                                                  })
                                                              }
                                                            }
                                                          })
                                                        
                                                      }
                                                     }
                                               }) 
                               })
                     })
         }
         }
         })
         
                                
         }
           })                      


                                       
                               

                              var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  


                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${req.user.username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,${req.body.first},welcome to GroceryjI<br>
                                           All product of your cart is successfully
                                           perchased..
                                           <br>
                                           Amount ${pay}:${req.user.sum}
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/Orders"<button style=color:green>Check Your Order</button></a>                       
                                                          
                                                          </form>
                                                             `
                           } 
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        console.log("error")
                                    }
                                        else{
                                            console.log("here")

                                        }


                                })    
    
                  
                  users.sum=0
                  users.save()
                  req.flash("success","successfully perchased all product of your cart")
                  res.redirect("/orders") 


  })

   
})

})



app.post("/razor/:pid/:lid",function(req,res){
  location.findById(req.params.lid,function(err,loc){ 

        product.findById(req.params.pid).populate("stock").populate("ones").populate("twos").exec(function(err,prod){
    user.findById(req.user._id,function(err,users){
    

    if(req.body.size){

         
         if(req.body.size=="one"){
            
         if(users.offerHold==true){

                 var amounts=(req.body.qty*prod.Price)-20
                 
            }
            else if(users.offerHold==false){

                 var amounts=req.body.qty*prod.Price
            }

             
           if (loc){
 
        res.render("razor.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:loc._id,prod:prod,amount:amounts,size:req.body.size})

 
     }       
    else{

     res.render("razor.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:"tttt",prod:prod,amount:amounts,size:req.body.size})



    } 







         }
        else if(req.body.size=="two"){


                

                 if(users.offerHold==true){

                 var amounts=(req.body.qty*(prod.Price*2))-20
                 
            }
            else if(users.offerHold==false){

                 var amounts=req.body.qty*(prod.Price*2)
            }


        
                if (loc){
 
               res.render("razor.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:loc._id,prod:prod,amount:amounts,size:req.body.size})

 
           }       
        else{

           res.render("razor.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:"tttt",prod:prod,amount:amounts,size:req.body.size})



        }    



        }


    }
  else{
    if(users.offerHold==true){

         var amounts=(req.body.qty*prod.Price)-20
      }   
    else if(users.offerHold==false){

         var amounts=req.body.qty*prod.Price
    }
    if (loc){
 
        console.log("this template passed")
        res.render("razor.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:loc._id,prod:prod,amount:amounts,size:""})

 
 }      
 else{

    res.render("razor.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:"tttt",prod:prod,amount:amounts,size:""})



 } 
     
}    
 

})

})
})

})


app.post("/razorcart/:lid",function(req,res){
  location.findById(req.params.lid,function(err,loc){ 

    if (loc){
 
        res.render("razorcart.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:loc._id,amount:req.user.sum})

 
 }      
 else{

    res.render("razorcart.ejs",{quantity:req.body.qty,first:req.body.first,last:req.body.last,landmark:req.body.landmark,locality:req.body.locality,road:req.body.road,phone:req.body.phone,city:req.body.city,method:req.body.method,loc:"tttt",amount:req.user.sum})



 } 
     
    
 




})

})


app.post("/api/payment/order",(req,res)=>{
params=req.body;
instance.orders.create(params).then((data) => {
       res.send({"sub":data,"status":"success"});
}).catch((error) => {
       res.send({"sub":error,"status":"failed"});
})
});

app.get("/deleteselection/:id",function(req,res){

     user.findById(req.user._id).populate("selection").exec(function(err,users){
    
       
         for (var i=0;i<users.selection.length;i++){

             if(users.selection[i].id==req.params.id){
                  
                   selects.deleteOne({_id:users.selection[i]._id},function(err,sele){
                      
                       req.flash("success","removed from future selects")
                       res.redirect("/moreinfo/"+req.params.id)

                   })
 
            
               break
             }
              
         
         }
     })
})

app.get("/selection/:id",function(req,res){
 user.findById(req.user._id).populate("selection").exec(function(err,users){
    

    product.findById(req.params.id,function(err,prods){
           
               var flag=true
               for (var i=0;i<users.selection.length;i++){

                   if(users.selection[i].id==prods._id){
                       
                        req.flash("error","already added")
                     res.redirect("back") 
                        flag=false
                        break
                   }
               }
              
               if (flag==true){

                  selects.create({id:prods._id},function(err,selec){

                     users.selection.push(selec)
                     users.save()
                     req.flash("success","you will be notified,when the product will be added")
                     res.redirect("back")

                  })
               }


    })
})

})

app.post("/buy/:pid/:lid",function(req,res){
 const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 var d=new Date() 


 location.findById(req.params.lid,function(err,loc){ 
   user.findById(req.user._id).populate("cart").populate("pops").exec(function(err,users){
        
        product.findById(req.params.pid).populate("stock").exec(function(err,prod){
        
                      

        if(!users.offerHold){

             users.offerHold=false
             users.save()
        } 

            
            
        
      if(req.body.size){

        if(req.body.size=="one" && req.body.qty>prod.ones.length){
                    
                    req.flash("error","quantity is out of stock")
                    res.redirect("back")

        }  
        else if(req.body.size=="two" && req.body.qty>prod.twos.length)
        {

             req.flash("error","quantity is out of stock")
                    res.redirect("back")
        }
        
        else{

            

            if (req.body.method=="Stripe"){ 
             
           
           if(users.offerHold==true){

                 if(req.body.size=="one"){     
                 var amounts=(req.body.qty*prod.Price)-20
                }
                else if(req.body.size=="two"){

                     var amounts=(req.body.qty*(prod.Price*2))-20
                }
                


            }

            else if(users.offerHold==false){
                  
                  if(req.body.size=="one"){     
                    
                     var amounts=(req.body.qty*prod.Price)
                }
                else if(req.body.size=="two"){

                     var amounts=(req.body.qty*(prod.Price*2))
                }
 
                
            
            }


            stripe.customers.create({ 
                            email: req.body.stripeEmail, 
                            source: req.body.stripeToken, 
                            name: req.user.username, 
                            address: { 
                                line1: 'TC 9/4 Old MES colony', 
                                postal_code: '110092', 
                                city: 'Kolkata', 
                                state: 'India', 
                                country: 'India', 
                            } 
                        }) 
                        .then((customer) => { 

                                return stripe.charges.create({ 
                                amount:amounts,    // Charing Rs 25 
                                description:prod.Name, 
                                currency: 'INR', 
                                customer: customer.id 
                            

                            })

                       })   
                            .then((charge) => {
                           })
                            .catch((err) => { 
                              res.send(err)    
                            })


}
                           
      


                            if(users.offerHold==true){

                 if(req.body.size=="one"){     
                 var amounts=(req.body.qty*prod.Price)-20
                }
                else if(req.body.size=="two"){

                     var amounts=(req.body.qty*(prod.Price*2))-20
                }
              

            }

            else if(users.offerHold==false){
                  
                  if(req.body.size=="one"){     
                    
                     var amounts=(req.body.qty*prod.Price)
                }
                else if(req.body.size=="two"){

                     var amounts=(req.body.qty*(prod.Price*2))
                }
 
               
            
            }

                           

                            
                            
                           var flag=true 
                           for(var i=0;i<users.cart.length;i++){
                                  if(req.body.size=="one"){
                                     var sizes="1L"

                                  }else if(req.body.size=="two"){

                                     var sizes="2L"
                                  }
                                  if (users.cart[i].pid==prod._id && users.cart[i].size==sizes){
                                      
                                      carts.findById(users.cart[i]._id,function(err,car){
                                           
                                            if (car.qty==req.body.qty){
                                                
                                                car.deleteOne({_id:car._id},function(err,info){

                                                })
                                            }
                                           else if(car.qty<req.body.qty){
                                               
                                                car.deleteOne({_id:car._id},function(err,info){

                                                })

                                           }
                                           else{
                                                  
                                                  car.updateOne({qty:car.qty-req.body.qty,Price:car.Price-amounts},function(err,info){

                                                  })

                                           }
                                           
                                      })
                                       break
                                      }
                                  }
                                  
                             
                           var author={
                            username:req.user.username,
                            id:req.user._id
                           }
                           var p=0
                            if(req.body.size=="one"){ 
                             prod.totalOne=prod.totalOne-req.body.qty
                             prod.date=Date.now()
                            }
                            else if(req.body.size=="two"){

                                 prod.totalTwo=prod.totalTwo-req.body.qty
                                 prod.date=Date.now()
                            }
                           for (var i=0;i<req.body.qty;i++){
                                      if(req.body.size=="one") { 
                                        
                                        one.deleteOne({id:prod._id},function(err,info){
                                               
                                                   
                                         
                                        })
                                  }
                                  else if(req.body.size=="two"){
                                   
                                    
                                        
                                        two.deleteOne({id:prod._id},function(err,info){
                                               
                                                   
                                         
                                        })
                                    }    
                                   
                                 
                                  }
                           
                         if(req.body.size=="one"){ 
                           if(prod.totalOne==0){
                             prod.emptyOne=true
                             prod.totalOne=0
                             prod.date=Date.now()
                           
                             pop.find({pid:prod._id},function(err,pup){

                                for (var i=0;i<pup.length;i++){

                                   if (pup[i].id==prod._id){


                                            pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                     })
                                   }
                                }
                             })                             
 
                             carts.find({pid:prod._id},function(err,allcart){
                                

                                 for (var i=0;i<allcart.length;i++){
                                    if(allcart[i].size=="1L"){
                                             
                                     carts.findByIdAndDelete(allcart[i]._id,function(err,info){
                                      

                                     })
                                   }
                                 }

                             })  

                             wishlist.find({pid:prod._id},function(err,allwish){


                                 for(var i=0;i<allwish.length;i++){

                                

                                     wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                     })
                                   
                                 }
                             })
                             }
                           }
                           else if(req.body.size=="two"){
                               
                               if(prod.totalTwo==0){
                             prod.emptyTwo=true
                             prod.totalTwo=0
                             prod.date=Date.now()
                           
                             pop.find({pid:prod._id},function(err,pup){

                                for (var i=0;i<pup.length;i++){

                                   if (pup[i].id==prod._id){


                                            pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                     })
                                   }
                                }
                             })                             
 
                             carts.find({pid:prod._id},function(err,allcart){
                                

                                 for (var i=0;i<allcart.length;i++){
                                    if(allcart[i].size=="2L"){
                                             
                                     carts.findByIdAndDelete(allcart[i]._id,function(err,info){
                                      

                                     })
                                   }
                                 }

                             })  

                             wishlist.find({pid:prod._id},function(err,allwish){


                                 for(var i=0;i<allwish.length;i++){


                                     wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                     })
                                   
                                 }
                             })
                             }
 

                           }
                           prod.save()
                           if(req.body.size=="one"){
                            carts.find({pid:prod._id},function(err,allcarts){
                                  
                                 if(allcarts.length>0){ 
                                  for(var i=0;i<allcarts.length;i++){
                                     if(allcarts[i].size=="1L"){
                                      carts.findById(allcarts[i]._id,function(err,cartinfo){
                                         if(cartinfo){ 
                                          if(cartinfo.qty>prod.totalOne){

                                              carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                              })
                                          }
                                        }
                                      })
                                    }
                                  }
                                 }
                                })
                              }        
                                else if(req.body.size=="two"){

                                      carts.find({pid:prod._id},function(err,allcarts){
                                  
                                 if(allcarts.length>0){ 
                                  for(var i=0;i<allcarts.length;i++){
                                     if(allcarts[i].size=="2L"){
                                      carts.findById(allcarts[i]._id,function(err,cartinfo){
                                         if(cartinfo){ 
                                          if(cartinfo.qty>prod.totalTwo){

                                              carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                              })
                                          }
                                        }
                                      })
                                    }
                                  }
                                 }
                                })
                                }
                                    
                                   

                           if(req.body.method=="Stripe"){

                              var pay="Paid"
                           }
                           
                           
                          else if(req.body.method=="razorpay"){

                            var pay="Paid"
                          }  


                           else if (req.body.method=="Cash-On-Delivery"){
 
                                 var pay="Cash-On-Delivery"


          

                           }
                           
                            var id=""
     
                               if(users.offerHold==true){

                                 if(req.body.size=="one"){     
                                 var amounts=(req.body.qty*prod.Price)-20
                                }
                                else if(req.body.size=="two"){

                                     var amounts=(req.body.qty*(prod.Price*2))-20
                                }
                              

                        }

                        else if(users.offerHold==false){
                              
                              if(req.body.size=="one"){     
                                
                                 var amounts=(req.body.qty*prod.Price)
                            }
                            else if(req.body.size=="two"){

                                 var amounts=(req.body.qty*(prod.Price*2))
                            }
             
                           
                        
                        }
 
   
                            order.find({mainuser:req.user.username},function(err,orders){
                                  var flag=true
                                   
                                if(loc){ 
                                  for(var i=0;i<orders.length;i++){

                                           if(orders[i].lid==loc._id){

                                                 if(req.body.size=="one"){
                                                     var sizes="1L"
                                                 }
                                                 else if(req.body.size=="two"){

                                                     var sizes="2L"
                                                 }
                                                 order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:amounts,returnId:"",author:author,productD:prod.Name,qty:Number(req.body.qty),locality:req.body.locality,pay:pay,image:prod.image,returnQ:0,pid:prod._id,ifsc:"",account:"",cartId:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,mainuser:req.user.username,lid:loc._id,urls:prod.urls,leters:prod.leters,month:months[d.getMonth()],size:sizes},function(err,order){
                            
                           
                                                      
                           
 
                                                     
                                         var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  


                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${req.user.username}`,
                                           subject:"GroceryjI",
                                           html:`Hi,${req.user.first},welcome to GroceryjI<br>
                                           Your Order ${prod.Name}, Price: ${prod.Price},Qty:${req.body.qty} is successfully
                                           perchased..
                                           <br>
                                           size:${sizes}
                                           <br>
                                           Amount ${pay}:<b>${req.body.qty*prod.Price}</b>
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/Orders/${order._id}"<button style=color:green>Check Your Order</button></a>                       
                                                          
                                                          </form>
                                                             `
                           } 
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                    }
                                        else{
                                            console.log("here")

                                        }


                                                         


                                  })
                                 

                    })





                                                 console.log("here")
                                                 console.log(id)
                                                 flag=false
                                                 break        

                                           }

                               
                                 }                      
                                } 
                                 if(flag==true){
                                              if(req.body.size=="one"){
                                                     var sizes="1L"
                                                 }
                                                 else if(req.body.size=="two"){

                                                     var sizes="2L"
                                                 }

                                                        location.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:req.body.qty*prod.Price,returnId:"",author:author,productD:prod.Name,qty:Number(req.body.qty),locality:req.body.locality,pay:pay,image:prod.image,returnQ:0,pid:prod._id,ifsc:"",account:"",cartId:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,mainuser:req.user.username},function(err,loca){
                                                 
                                                    

                                                         order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:amounts,returnId:"",author:author,productD:prod.Name,qty:Number(req.body.qty),locality:req.body.locality,pay:pay,image:prod.image,returnQ:0,pid:prod._id,ifsc:"",account:"",cartId:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,mainuser:req.user.username,lid:loca._id,urls:prod.urls,leters:prod.leters,month:months[d.getMonth()],size:sizes},function(err,order){
                            
                           
                                                      
                           
 
                                                     
                                         var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  


                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${req.user.username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,${req.user.first},welcome to GroceryJi<br>
                                           Your order ${prod.Name}, Price: ${prod.Price},Qty:${req.body.qty} is successfully
                                           perchased..
                                           <br>
                                           size:${sizes}
                                           <br>
                                           Amount ${pay}:${req.body.qty*prod.Price}
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/Orders/${order._id}"<button style=color:green>Check Your Order</button></a>                       
                                                          
                                                          </form>
                                                             `
                           } 
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                    }
                                        else{
                                            console.log("here")

                                        }


                                                         


                                  })
                                 

                    })
                                 
                  
               
           
              })  
         
             }
        
        })                  
                          
          req.flash("success","product purchased successfully")
           res.redirect("/moreinfo/"+prod._id)
     


      }
        

}
       else{  

        if (req.body.qty<=prod.stock.length){
            if (req.body.method=="Stripe"){ 
             
           
            
             if(users.offerHold==true){

                 

                          var amounts=(req.body.qty*prod.Price)-20

                


            }

            else if(users.offerHold==false){
                  
                 
 
                     var amounts=(req.body.qty*prod.Price)


                
            
            }




            stripe.customers.create({ 
                            email: req.body.stripeEmail, 
                            source: req.body.stripeToken, 
                            name: req.user.username, 
                            address: { 
                                line1: 'TC 9/4 Old MES colony', 
                                postal_code: '110092', 
                                city: 'Kolkata', 
                                state: 'India', 
                                country: 'India', 
                            } 
                        }) 
                        .then((customer) => { 

                                return stripe.charges.create({ 
                                amount:amounts,    // Charing Rs 25 
                                description:prod.Name, 
                                currency: 'INR', 
                                customer: customer.id 
                            

                            })

                       })   
                            .then((charge) => {
                           })
                            .catch((err) => { 
                              res.send(err)    
                            })


}
                           
      


                            if(users.offerHold==true){

                 

                          var amounts=(req.body.qty*prod.Price)-20

                


            }

            else if(users.offerHold==false){
                  
                 
 
                     var amounts=(req.body.qty*prod.Price)


                
            
            }

                           

                            

                           var flag=true 
                           for(var i=0;i<users.cart.length;i++){
                                 
                                  if (users.cart[i].pid==prod._id){
                                      
                                      carts.findById(users.cart[i]._id,function(err,car){
                                           
                                            if (car.qty==req.body.qty){
                                                
                                                car.deleteOne({_id:car._id},function(err,info){

                                                })
                                            }
                                           else if(car.qty<req.body.qty){
                                               
                                                car.deleteOne({_id:car._id},function(err,info){

                                                })

                                           }
                                           else{
                                                  
                                                  car.updateOne({qty:car.qty-req.body.qty,Price:car.Price-amounts},function(err,info){

                                                  })

                                           }
                                           
                                      })
                                       break
                                      }
                                  }
                                  
                             
                           var author={
                            username:req.user.username,
                            id:req.user._id
                           }
                           var p=0
                            prod.stocking=prod.stocking-req.body.qty
                            prod.date=Date.now()
                            
                           for (var i=0;i<req.body.qty;i++){
                                        
                                        
                                        stocks.deleteOne({id:prod._id},function(err,info){
                                               
                                                   
                                         
                                        })

                                      
                                   
                                 }
                           

                           if(prod.stocking==0){
                             prod.empty=true
                             prod.stocking=0
                             prod.date=Date.now()
                           
                             pop.find({pid:prod._id},function(err,pup){

                                for (var i=0;i<pup.length;i++){

                                   if (pup[i].id==prod._id){


                                            pop.findByIdAndDelete(pup[i]._id,function(err,info){

                                     })
                                   }
                                }
                             })                             
 
                             carts.find({pid:prod._id},function(err,allcart){

                                 for (var i=0;i<allcart.length;i++){

                                     carts.findByIdAndDelete(allcart[i]._id,function(err,info){


                                     })
                                 }
                             })  

                             wishlist.find({pid:prod._id},function(err,allwish){


                                 for(var i=0;i<allwish.length;i++){

                                     wishlist.findByIdAndDelete(allwish[i]._id,function(err,info){


                                     })
                                 }
                             })

                           }
                           prod.save()
                           
                           carts.find({pid:prod._id},function(err,allcarts){
                                  
                                 if(allcarts.length>0){ 
                                  for(var i=0;i<allcarts.lengthl;i++){

                                      carts.findById(allcarts[i]._id,function(err,cartinfo){
                                         if(cartinfo){ 
                                          if(cartinfo.qty>prod.stocking){

                                              carts.findByIdAndDelete(cartinfo._id,function(err,info){


                                              })
                                          }
                                        }
                                      })
                                    
                                  }
                                 }
                           })

                           if(req.body.method=="Stripe"){

                              var pay="Paid"
                           }
                           
                           
                          else if(req.body.method=="razorpay"){

                            var pay="Paid"
                          }  


                           else if (req.body.method=="Cash-On-Delivery"){
 
                                 var pay="Cash-On-Delivery"


          

                           }
                           
                            var id=""
     
                            if(users.offerHold==true){

                                     var amounts=(req.body.qty*prod.Price)-20
                                }
                                else if(users.offerHold==false){

                                        var amounts=req.body.qty*prod.Price


                                }
 
   
                            order.find({mainuser:req.user.username},function(err,orders){
                                  var flag=true
                                   
                                if(loc){ 
                                  for(var i=0;i<orders.length;i++){

                                           if(orders[i].lid==loc._id){

                                                 order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:amounts,returnId:"",author:author,productD:prod.Name,qty:Number(req.body.qty),locality:req.body.locality,pay:pay,image:prod.image,returnQ:0,pid:prod._id,ifsc:"",account:"",cartId:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,mainuser:req.user.username,lid:loc._id,urls:prod.urls,leters:prod.leters,month:months[d.getMonth()]},function(err,order){
                            
                           
                                                      
                           
 
                                                     
                                         var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  


                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${req.user.username}`,
                                           subject:"GroceryjI",
                                           html:`Hi,${req.user.first},welcome to GroceryjI<br>
                                           Your Order ${prod.Name}, Price: ${prod.Price},Qty:${req.body.qty} is successfully
                                           perchased..
                                           <br>
                                           Amount ${pay}:<b>${req.body.qty*prod.Price}</b>
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/Orders/${order._id}"<button style=color:green>Check Your Order</button></a>                      
                                                          
                                                          </form>
                                                             `
                           } 
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                    }
                                        else{
                                            console.log("here")

                                        }


                                                         


                                  })
                                 

                    })





                                                 console.log("here")
                                                 console.log(id)
                                                 flag=false
                                                 break        

                                           }

                               
                                 }                      
                                } 
                                 if(flag==true){

                                                        location.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:req.body.qty*prod.Price,returnId:"",author:author,productD:prod.Name,qty:Number(req.body.qty),locality:req.body.locality,pay:pay,image:prod.image,returnQ:0,pid:prod._id,ifsc:"",account:"",cartId:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,mainuser:req.user.username},function(err,loca){
                                                 
                                                    

                                                         order.create({first:req.body.first,last:req.body.last,name:req.body.first +" "+req.body.last,city:req.body.city,phone:req.body.phone,roadNumber:req.body.road,landmark:req.body.landmark,Price:amounts,returnId:"",author:author,productD:prod.Name,qty:Number(req.body.qty),locality:req.body.locality,pay:pay,image:prod.image,returnQ:0,pid:prod._id,ifsc:"",account:"",cartId:"",ordered:"Ordered",dateone:Date.now(),shipped:"",outfor:"",update:"",autoCancel:false,mainuser:req.user.username,lid:loca._id,urls:prod.urls,leters:prod.leters,month:months[d.getMonth()],offerHold:false},function(err,order){
                            
                           
                                                      
                           
 
                                                     
                                         var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  


                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${req.user.username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,${req.user.first},welcome to GroceryJi<br>
                                           Your order ${prod.Name}, Price: ${prod.Price},Qty:${req.body.qty} is successfully
                                           perchased..
                                           <br>
                                           Amount ${pay}:${req.body.qty*prod.Price}
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/Orders/${order._id}"<button style=color:green>Check Your Order</button></a>                      
                                                          
                                                          </form>
                                                             `
                           } 
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                    }
                                        else{
                                            console.log("here")

                                        }


                                                         


                                  })
                                 

                    })
                                 
                  
               
           
              })  
         
             }
        
        })                  
                          
          req.flash("success","product purchased successfully")
           res.redirect("/moreinfo/"+prod._id)
     }
      else{

            req.flash("error","quantity is out of stock")
              res.redirect("back")
       }    
   
   }
})
   })
})
})
app.get("/orders",isLoggedin,function(req,res){

    order.find({mainuser:req.user.username},function(err,orders){
      if (orders.length>0){


        res.render("orders.ejs",{orders:orders})
    }
    else{
        res.render("nomyorders.ejs")
    }   
    })
})



app.get("/notifications/:id",function(req,res){

     pop.findById(req.params.id,function(err,popup){

         if(popup.api=="cart"){

             res.redirect("/cart")

         }
         else if(popup.api!=="vip"){

             res.redirect("/moreinfo/"+popup.id)
         }

         popup.updateOne({view:"viewed"},function(err,pp){


         })
     })
}) 



app.get("/orders/:id",function(req,res){

 user.findById(req.user._id).populate("pops").exec(function(err,users){
    order.findById(req.params.id,function(err,orders){
        res.render("ordersmore.ejs",{orders:orders,users:users})
    })
})
})

app.get("/updateOrders/:id",function(req,res){

         location.findById(req.params.id,function(err,loc){

         res.render("updateOrder.ejs",{loc:loc})
   })

})

app.post("/updateOrders/:id",function(req,res){

     location.findById(req.params.id,function(err,loc){

                    if(req.body.first){


                       loc.first=req.body.first
                       
                     }
                     if (req.body.last){

                        loc.last=req.body.last
                     } 
                        
                       loc.name=loc.first +" "+ loc.last 
                       if (req.body.phone){


                          loc.phone=req.body.phone
                        }
                       if (req.body.roadNumber){


                        loc.roadNumber=req.body.road
                      }
                       
                       if(req.body.city){


                        loc.city=req.body.city
                      }
                       
                       if(req.body.landmark){


                        loc.landmark=req.body.landmark
                      }
                      
                       if(req.body.locality){


                         loc.locality=req.body.locality
                       }
                   
                     loc.save()

         order.find({lid:loc._id},function(err,orders){

             orders.forEach(function(data){
                     
                     if(req.body.first){


                       data.first=req.body.first
                       
                     }
                     if (req.body.last){

                        data.last=req.body.last
                     } 
                        
                       data.name=data.first +" "+ data.last 
                       if (req.body.phone){


                          data.phone=req.body.phone
                        }
                       if (req.body.roadNumber){


                        data.roadNumber=req.body.road
                      }
                       
                       if(req.body.city){


                        data.city=req.body.city
                      }
                       
                       if(req.body.landmark){


                        data.landmark=req.body.landmark
                      }
                      
                       if(req.body.locality){


                         data.locality=req.body.locality
                       }
                   
                     data.save()             
             

             })
                    req.flash("success","Updated,Go Back To Previous Page")
                   res.redirect("back")
         })
     })
})



app.get("/cancel/:id",function(req,res){

    order.findById(req.params.id,function(err,orders){
        
              

        res.render("cancel.ejs",{orders:orders})
    })
})


app.post("/cancel/:id",function(req,res){
 var flag=true
    order.findById(req.params.id,function(err,orders){
        product.findById(orders.pid).populate("stock").populate("ones").populate("twos").populate("notify").exec(function(err,prods){

            
            
            if(orders.pay=="Cash-On-Delivery"){
              var ifsc=""
              var account=""
              var phone=orders.phone 
           }
           else{

            
                var ifsc=req.body.ifsc
              var account=req.body.account
              var phone=req.body.number


              }

               orders.updateOne({returnId:orders._id,ifsc:ifsc,account:account,phone:phone,cDate:Date.now(),update:"Canceled",datefour:Date.now()},function(err,info){
  
              
                
              console.log("total stock before cancel")
              console.log(prods.stock.length)
        
        
        
  })
       
        if(orders.size){

            if(orders.size=="1L"){

                 if(prods.ones.length==0){
                      
                       prods.totalOne=0
            prods.save()
                user.find({},function(err,alluser){

                   for (var i=0;i<alluser.length;i++){
                      
                     user.findById(alluser[i]._id,function(err,infos){ 
                      for(var j=0;j<prods.notify.length;j++){

                          if (infos.username==prods.notify[j].username){


                                      pop.create({id:prods._id,text:prods.Name + "1L",image:prods.image,urls:prods.urls,view:""},function(err,pups){
                                         infos.pops.push(pups)
                                         infos.save()
                                       
                                       })
                                      
                                   
                              break
                          }
                           {

                           }
                      }

                    
                 
                  })
                 }                    
                }) 

            for( var n=0;n<prods.notify.length;n++){


                    var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  

                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${prods.notify[n].username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,welcome to GroceryJi<br>
                                           Your requested  product ${prods.Name}, Price: ${prods.Price},Size:${orders.size} is available
                                           in stock..
                                           <br>
                                           
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                          
                                                          </form>`
                                    } 
                              
                             
                                   
 
                                      
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                        res.redirect("/login");
                                    }
                                        else{
                                            console.log("here")

                                        }


                                })


            }

                 }
          }  
           else if(orders.size=="2L"){

                if(prods.twos.length==0){
                      
                       prods.totalTwo=0
            prods.save()
                user.find({},function(err,alluser){

                   for (var i=0;i<alluser.length;i++){
                      
                     user.findById(alluser[i]._id,function(err,infos){ 
                      for(var j=0;j<prods.notify.length;j++){

                          if (infos.username==prods.notify[j].username){


                                      pop.create({id:prods._id,text:prods.Name + "2L",image:prods.image,urls:prods.urls,view:""},function(err,pups){
                                         infos.pops.push(pups)
                                         infos.save()
                                       
                                       })
                                      
                                   
                              break
                          }
                           {

                           }
                      }

                    
                 
                  })
                 }                    
                }) 

            for( var n=0;n<prods.notify.length;n++){


                    var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  

                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${prods.notify[n].username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,welcome to GroceryJi<br>
                                           Your requested  product ${prods.Name}, Price: ${prods.Price},Size:${orders.size} is available
                                           in stock..
                                           <br>
                                           
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                          
                                                          </form>`
                                    } 
                              
                             
                                   
 
                                      
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                        res.redirect("/login");
                                    }
                                        else{
                                            console.log("here")

                                        }


                                })


            }


           }


        }         
      }  
      else{
         if(prods.stock.length==0){

            prods.stocking=0
            prods.save()
                user.find({},function(err,alluser){

                   for (var i=0;i<alluser.length;i++){
                      
                     user.findById(alluser[i]._id,function(err,infos){ 
                      for(var j=0;j<prods.notify.length;j++){

                          if (infos.username==prods.notify[j].username){


                                      pop.create({id:prods._id,text:prods.Name,image:prods.image,urls:prods.urls,view:""},function(err,pups){
                                         infos.pops.push(pups)
                                         infos.save()
                                       
                                       })
                                      
                                   
                              break
                          }
                           {

                           }
                      }

                    
                 
                  })
                 }                    
                }) 

            for( var n=0;n<prods.notify.length;n++){


                    var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  

                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${prods.notify[n].username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,welcome to GroceryJi<br>
                                           Your requested  product ${prods.Name}, Price: ${prods.Price} is available
                                           in stock..
                                           <br>
                                           
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                      
                                                          
                                                          </form>`
                                    } 
                              
                             
                                   
 
                                      
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                        res.redirect("/login");
                                    }
                                        else{
                                            console.log("here")

                                        }


                                })


            }
}

}


    if(orders.size){


          if(orders.size=="1L"){


              var i=0; 
                 var p=0; 
                 prods.totalOne=prods.totalOne+orders.qty
                 prods.emptyOne=false
                 prods.date=Date.now()

                 for ( i=0;i<orders.qty;i++){

                      console.log("hitted")
                    
                    one.create({id:prods._id},function(err,sto){
                        console.log(sto)
                        prods.ones.push(sto)
                        console.log(i)
                        if(p==orders.qty-1){
                         console.log("total stock after cancel")
                          console.log(prods.stock.length)   
                            prods.save()
                        
                        }   
                        p=p+1

                    })
                 
                 
                 }


          }

       if(orders.size=="2L"){


              var i=0; 
                 var p=0; 
                 prods.totalTwo=prods.totalTwo+orders.qty
                 prods.emptyTwo=false
                 prods.date=Date.now()

                 for ( i=0;i<orders.qty;i++){

                      console.log("hitted")
                    
                    two.create({id:prods._id},function(err,sto){
                        console.log(sto)
                        prods.twos.push(sto)
                        console.log(i)
                        if(p==orders.qty-1){
                         console.log("total stock after cancel")
                          console.log(prods.stock.length)   
                            prods.save()
                        
                        }   
                        p=p+1

                    })
                 
                 
                 }


          }



    } 
        

     else{

         var i=0; 
         var p=0; 
         prods.stocking=prods.stocking+orders.qty
         prods.empty=false
         prods.date=Date.now()

         for ( i=0;i<orders.qty;i++){

              console.log("hitted")
            
            stocks.create({id:prods._id},function(err,sto){
                console.log(sto)
                prods.stock.push(sto)
                console.log(i)
                if(p==orders.qty-1){
                 console.log("total stock after cancel")
                  console.log(prods.stock.length)   
                    prods.save()
                
                }   
                p=p+1

            })
         
         
         }
          
            
         
   }






            if(orders.pay=="Cash-On-Delivery"){

                var status=""
            }
            else{

                var status="Refundable"
            }

            var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  

                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${req.user.username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,${req.user.first},welcome to GroceryJi<br>
                                           Your Cancellation request ${prods.Name}, Price: ${prods.Price},Qty:${orders.qty} is successfully
                                           submitted..
                                           <br>
                                           Amount ${status}:${orders.Price}
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/Orders/${orders._id}"<button style=color:green>Check Your Order</button></a>                     
                                                          
                                                          </form>`
                                    } 
                              
                             
                                   
 
                                      
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                        res.redirect("/login");
                                    }
                                        else{
                                            console.log("here")

                                        }


                                })    
                                
                                req.flash("success","Request submitted successfully")
                                res.redirect("/orders/"+orders._id)  

    })

})

})


app.get("/mydata",function(req,res){

   product.find({},function(err,data){
         
         var mains=JSON.stringify(data,null,2)
         fs.writeFile("./grocery.json",mains,finished)
         function finished(){

             fs.readFile("./grocery.json","utf-8",function(err,all){

                var finallys=JSON.parse(all)
                res.send(finallys)   
             })             
         }
   })
})

app.get("/review",function(req,res){

     product.find({key:"jeeras"},function(err,allpr){

         for(var i=0;i<allpr.length;i++){

             product.findById(allpr[i]._id,function(err,foundp){

                 foundp.updateOne({stocking:5},function(err,info){

                 })
             })
         }
     })
     res.send("all updated")
})

app.get("/data/:product",function(req,res){
    request(`https://www.flipkart.com/search?q=${req.params.product}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`,function(error,response,html){
    if(!error && response.statusCode==200)
    {
        const $=cheerio.load(html)
        // console.log(html)
        $("._4ddWXP").each(function(i,el){
            var datas=$(el)
            console.log(datas.find(".s1Q9rs").attr("title"))
            var val=datas.find("._30jeq3").text()
            var final=""
            var lets=""
            console.log(".........................................")
            // if(datas.find("._3Djpdu").text()){
            //  lets=datas.find("._3Djpdu").text()
            // }
            // else{

               
    //      }
            console.log(".........................................")
            for(var i=1;i<val.length;i++){
                            final=final+val[i]

            }
            if (final==""){
                console.log("here")
                var final=Math.floor(Math.random()*123)

                console.log(final)
             }
            console.log(".............")
            console.log(Number(final))
            console.log(".............")
            console.log(datas.find("._396cs4").attr("src")) 
            var vals=datas.find("._3I9_wc").text()
            var finals=""
            for (var i=1;i<vals.length;i++){

                finals=finals+vals[i]
            }
            if (Number(finals)==0){
 
                    console.log("here")

                    var finals=Math.floor(Math.random()*123)
                    console.log(finals)         
              }
            console.log(final)
            var info=""
            info=datas.find("._3Ay6Sb").text()
            if (info==""){
               if (finals && final){
                 info=`${parseInt((Number(final)*100)/Number(finals))} % off`
               }
               else{

                 info="28 % off"
               }
            }
            // product.deleteOne({key:"buiscuits"},function(err,info){

            // })
            product.create({image:datas.find("._396cs4").attr("src"),Name:datas.find(".s1Q9rs").attr("title"),Price:Number(final),offer:Number(finals),off:info,key:`${req.params.product}`,ratings:datas.find("._3LWZlK").text(),empty:false,stocking:5,date:Date.now(),urls:"URL",leters:""},function(err,products){
            if (products!==undefined){
    
              // coproduct.create({image:datas.find("._396cs4").attr("src"),Price:Number(final),offer:Number(finals),key:`${req.params.product}s`,ratings:datas.find("._3LWZlK").text(),pid:products._id},function(err,cos){
                        var p=0



                          stocks.create({id:products._id},function(err,stoOne){
                          stocks.create({id:products._id},function(err,stotwo){
                          stocks.create({id:products._id},function(err,stothree){
                          stocks.create({id:products._id},function(err,stofour){
                          stocks.create({id:products._id},function(err,stofive){
                         
                          
                           
                           
                           
                           products.stock.push(stoOne)
                           products.stock.push(stotwo)
                           products.stock.push(stothree)
                           products.stock.push(stofour)
                           products.stock.push(stofive)
                           

                          

                           products.save()
                            
                           
                          

                          }) 
                          })
                          })
                          })
                          })
                    
              console.log(products)
        // })   
          }  
        })  
        //  if(datas.find(".FHCV02u6Cp2zYL0fhQPsO").text()!==""){


        //  console.log("comments.....")

        //  console.log(datas.find(".FHCV02u6Cp2zYL0fhQPsO").text())
        // }
        })
     
   }
   res.send("Done")

})  
})

app.get("/updateData/:id/:subject",function(req,res){

     product.findById(req.params.id,function(err,prods){

         if(req.params.subject=="price"){


          res.render("updatePrice.ejs",{prods:prods,data:"price"})
      }
      else if(req.params.subject=="name"){
           
                      res.render("updatePrice.ejs",{prods:prods,data:"name"})


      }
     else if(req.params.subject=="offer"){

                              res.render("updatePrice.ejs",{prods:prods,data:"offer"})


     }
 
        
     })
})

app.post("/updateData/:id/:data",function(req,res){

     product.findById(req.params.id,function(err,prods){

          if(req.params.data=="price"){

           if(prods.offer>req.body.price){

              prods.updateOne({Price:req.body.price},function(err,info){
 
 
                 var calc=parseInt((req.body.price*100)/prods.offer)
                 prods.off=`${calc} % off`
                 prods.save()
                 req.flash("success","Updated")
                 res.redirect("/groceryProduct")

             })
            
         
         carts.find({pid:prods._id},function(err,allcart){

             for(var i=0;i<allcart.length;i++){

                 carts.findById(allcarts[i]._id,function(err,cartinfo){

                     cartinfo.updateOne({Price:req.body.price,off:`${calc} % off`},function(err,info){


                     })
                 })
             }
         })           
       

        wishlist.find({pid:prods._id},function(err,allwish){

             for(var i=0;i<allwish.length;i++){

                 wishlist.findById(allwish[i]._id,function(err,wishinfo){

                     wishinfo.updateOne({Price:req.body.price,off:`${calc} % off`},function(err,info){

                         
                     })
                 })
             }
         })

       }
      else{

        req.flash("error","offerprice should be lower than actual price")
        res.redirect("back")
      }    
     
     }
     else if(req.params.data=="name"){
       
         prods.updateOne({Name:req.body.name},function(err,info){

             req.flash("success","Updated")
             res.redirect("/groceryProduct")

        })  
      
      pop.find({id:prods._id},function(err,pups){

         for (var i=0;i<pups.length;i++){

             pop.findById(pups[i]._id,function(err,pup){

                 pup.updateOne({text:req.body.name},function(err,info){


                 })
             })
         }
      

       carts.find({pid:prods._id},function(err,allcart){

             for(var i=0;i<allcart.length;i++){

                 carts.findById(allcarts[i]._id,function(err,cartinfo){

                     cartinfo.updateOne({Name:req.body.name},function(err,info){


                     })
                 })
             }
         })           
       

        


      })  
     
     }
     else if(req.params.data=="offer"){

         if(prods.Price<req.body.offer){
          prods.updateOne({offer:req.body.offer},function(err,info){

                 var calc=parseInt((prods.Price*100)/req.body.offer)
                 prods.off=`${calc} % off`
                 prods.save()
             req.flash("success","Updated")
             res.redirect("/groceryProduct")

           })
     
         
         carts.find({pid:prods._id},function(err,allcart){

             for(var i=0;i<allcart.length;i++){

                 carts.findById(allcarts[i]._id,function(err,cartinfo){

                     cartinfo.updateOne({offer:req.body.offer,off:`${calc} % off`},function(err,info){


                     })
                 })
             }
         })



     }
   else{

     req.flash("error","Product's actual price should be greater than the product's offer price")
     res.redirect("back")
   }
   }
})

})


app.get("/increaseStockOne/:id/:stock",function(req,res){
  
   product.findById(req.params.id).populate("ones").populate("notify").exec(function(err,prods){

       if (prods.ones.length==0){  
         prods.totalOne=0
         prods.save()
        
      user.find({},function(err,users){  
      
      for(var i=0;i<users.length;i++)
       user.findById(users[i]._id,function(err,found){
        for(var j=0;j<prods.notify.length;j++){
           
           if (found.username==prods.notify[j].username){



                 pop.create({id:prods._id,text:prods.Name + " " +"1L",image:prods.image,urls:prods.urls,view:""},function(err,pup){

                     found.pops.push(pup)
                     found.save()

                 })
              
               break
           }                   
               

     }
   })
  })
         for(var i=0;i<prods.notify.length;i++){

              var transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"grocery.ofc@gmail.com",
                pass:process.env.password
            }
        }); 


            var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`${prods.notify[i].username}`,
                subject:"GroceryJi",
                html:`Hi,welcome to GroceryJi<br>
                                           Your requested  product ${prods.Name}, Price: ${prods.Price},Size:1L is now available
                                           in stock..
                                           <br>
                                           
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                          
                                                          </form>`
            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        console.log("error")
                    }
                        else{
                            console.log("here")

                        }


                

  })
 }  
}



         var p=0
         prods.totalOne=prods.totalOne+Number(req.params.stock)
         prods.emptyOne=false
         prods.date=Date.now()
         for (var i=0;i<Number(req.params.stock);i++){

              one.create({id:prods._id},function(err,sto){
                  prods.ones.push(sto) 
                  if(p==Number(req.params.stock)-1){

                      prods.save()
                  }
                  p=p+1
              })
         }
         
         
             

            

    })
 
     
     req.flash("success","Stock Is Increased")
     res.redirect("back")

})


app.get("/increaseStockTwo/:id/:stock",function(req,res){
  
   product.findById(req.params.id).populate("twos").populate("notify").exec(function(err,prods){

       if (prods.twos.length==0){  
         prods.totalTwo=0
         prods.save()
        
      user.find({},function(err,users){  
      
      for(var i=0;i<users.length;i++)
       user.findById(users[i]._id,function(err,found){
        for(var j=0;j<prods.notify.length;j++){
           
           if (found.username==prods.notify[j].username){



                 pop.create({id:prods._id,text:prods.Name + " " +"2L",image:prods.image,urls:prods.urls,view:""},function(err,pup){

                     found.pops.push(pup)
                     found.save()

                 })
              
               break
           }                   
               

     }
   })
  })
         for(var i=0;i<prods.notify.length;i++){

              var transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"grocery.ofc@gmail.com",
                pass:process.env.password
            }
        }); 


            var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`${prods.notify[i].username}`,
                subject:"GroceryJi",
                html:`Hi,welcome to GroceryJi<br>
                                           Your requested  product ${prods.Name}, Price: ${prods.Price},Size:2L is now available
                                           in stock..
                                           <br>
                                           
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                          
                                                          </form>`
            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        console.log("error")
                    }
                        else{
                            console.log("here")

                        }


                

  })
 }  
}



         var p=0
         prods.totalTwo=prods.totalTwo+Number(req.params.stock)
         prods.emptyTwo=false
         prods.date=Date.now()
         for (var i=0;i<Number(req.params.stock);i++){

              two.create({id:prods._id},function(err,sto){
                  prods.twos.push(sto) 
                  if(p==Number(req.params.stock)-1){

                      prods.save()
                  }
                  p=p+1
              })
         }
         
         
             

            

    })
 
     
     req.flash("success","Stock Is Increased")
     res.redirect("back")

})

app.get("/increaseStock/:id/:stock",function(req,res){
  
    product.findById(req.params.id).populate("stock").populate("notify").exec(function(err,prods){

       if (prods.stock.length==0){  
         prods.stocking=0
         prods.save()
        
      user.find({},function(err,users){  
      
      for(var i=0;i<users.length;i++)
       user.findById(users[i]._id,function(err,found){
        for(var j=0;j<prods.notify.length;j++){
           
           if (found.username==prods.notify[j].username){



                 pop.create({id:prods._id,text:prods.Name,image:prods.image,urls:prods.urls,view:""},function(err,pup){

                     found.pops.push(pup)
                     found.save()

                 })
              
               break
           }                   
               

     }
   })
  })
         for(var i=0;i<prods.notify.length;i++){

              var transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"grocery.ofc@gmail.com",
                pass:process.env.password
            }
        }); 


            var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`${prods.notify[i].username}`,
                subject:"GroceryJi",
                html:`Hi,welcome to GroceryJi<br>
                                           Your requested  product ${prods.Name}, Price: ${prods.Price} is now available
                                           in stock..
                                           <br>
                                           
                                            <br>
                                                       
                        
                        
                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                      
                                                          
                                                          </form>`
            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        console.log("error")
                    }
                        else{
                            console.log("here")

                        }


                

  })
 }  
}



         var p=0
         prods.stocking=prods.stocking+Number(req.params.stock)
         prods.empty=false
         prods.date=Date.now()
         for (var i=0;i<Number(req.params.stock);i++){

              stocks.create({id:prods._id},function(err,sto){
                  prods.stock.push(sto) 
                  if(p==Number(req.params.stock)-1){

                      prods.save()
                  }
                  p=p+1
              })
         }
         
         
             

            

    })
 
     
     req.flash("success","Stock Is Increased")
     res.redirect("back")

})


app.get("/addProduct",function(req,res){

    res.render("addProduct.ejs")
})

app.get("/deleteProduct/:id",function(req,res){

   wishlist.find({pid:req.params.id},function(err,wish){

     for (var i=0;i<wish.length;i++){

        wishlist.deleteOne({pid:wish[i].pid},function(err,info){
           

        })
     }

   })

    

   pop.find({id:req.params.id},function(err,pups){

      for (var i=0;i<pups.length;i++){


             pop.findByIdAndDelete(pups[i]._id,function(err,info){


             })
         
      }
   })


   user.find({},function(err,users){

     for (var i=0;i<users.length;i++){

         user.findById(users[i]._id).populate("cart").exec(function(err,alluser){

          if(alluser.cart.length>0){    
             for (var p=0;p<alluser.cart.length;p++){

                 if (alluser.cart[p].pid==req.params.id){
                        
                      alluser.sum=alluser.sum-alluser.cart[p].Price
                      alluser.save()
                 
                      break
            }
            }
         }
         
         
         })
     }
   })
   
   carts.find({pid:req.params.id},function(err,car){

     for (var i=0;i<car.length;i++){

        carts.deleteOne({pid:car[i].pid},function(err,info){

            
        })
     }

   })

   product.findByIdAndDelete(req.params.id,function(err,infos){

     req.flash("success","Product is deleted")
     res.redirect("back")
   })

})
app.post("/addProduct",function(req,res){
 
 if(parseInt(req.body.actual)>parseInt(req.body.offer)){  


   if (req.files){

     var file=req.files.filename,
     filesname=file.name;
     file.mv("./public/"+filesname)

  }
 
  
   if (req.body.image){

     var filesname=req.body.image
  }
   
   var calc=parseInt((req.body.offer*100)/req.body.actual) 
   var total=`${calc} % off`
   
   product.create({Name:req.body.name,Price:parseInt(req.body.offer),offer:parseInt(req.body.actual),off:total,image:filesname,stocking:req.body.stock,empty:false,date:Date.now(),key:req.body.keys,urls:req.body.urls},function(err,prod){
        var p=0
        for (var i=0;i<parseInt(req.body.stock);i++){

             console.log(i)
             stocks.create({id:prod._id},function(err,stoc){

                prod.stock.push(stoc)
                console.log(prod)
              p=p+1
              if(p==parseInt(req.body.stock)){
                console.log(p)
                prod.save()
              }
        })
            
        }
   
    user.find({},function(err,users){

      var p=0
       for (var i=0;i<users.length;i++){
      

        user.findById(users[i]._id,function(err,us){
          pop.create({id:prod._id,image:prod.image,urls:prod.urls,text:prod.Name,view:""},function(err,pup){
            
            us.pops.push(pup)
               
            us.save()  
              
          
             

          }) 
        })   
         var transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"grocery.ofc@gmail.com",
                pass:process.env.password
            }
        }); 


            var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`${users[i].username}`,
                subject:"GroceryJi",
                html:`<div align=center><b>Hi,${users[i].first}</b><br><b>${prod.Name} New Product Added<br></b>
                        <a href=https://groceryji.com/moreinfo/${prod._id}><b>Check It Out</b></b></a></div>
                        
                        
                       
                        `
            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        res.redirect("/moreinfo/"+prod._id)
                    }
                        else{
                            console.log("here")

                        }


                

})


       }

    
    })  
  
   })

   req.flash("success","product added successfully")
   res.redirect("/groceryProduct")
}
else{

    console.log("here")
    req.flash("error","Actual price of product should be greater than offer price of product")
    res.redirect("back")
}
})


app.get("/groceryProduct",function(req,res){
   if(!req.query.search){


     product.find({},function(err,prods){
         
          res.render("allproducts.ejs",{prods:prods})
     })
}

else{

    var search=req.query.search
         product.find({},function(err,prods){
        var C=[]
        
        for (var i=0;i<prods.length;i++){

             for (var p=0;p<search.length;p++){

                 k=p
                 var flag=true
                 for (var j=0;j<prods[i].key.length-1;j++){

                      if(prods[i].key[j]!==search[k]){

                          flag=false
                          break
                      }
                     k++
                 }
               
                 if (flag==true){
                    
                     product.find({key:{$regex:prods[i].key,$options:"$i"}},function(err,prods){
         
                       res.render("allproducts.ejs",{prods:prods})
             })
                 
                  C.push(0)
                  prods=[]
                  break
                 
                 }
             }
        }
  
     if(C.length==0){

         res.render("allproducts.ejs",{prods:0})


     }

})
}
})

app.get("/outof",function(req,res){

     product.find({},function(err,prods){
      var data=0      
      for(var i=0;i<prods.length;i++){
           
            if(prods[i].empty && prods[i].empty==true || prods[i].emptyOne && prods[i].emptyOne==true || prods[i].emptyTwo && prods[i].emptyTwo==true){
        
            data=data+1

        }
      
      }
        if(data>0){


          res.render("out.ejs",{prods:prods})
     }
     else{

            res.render("noout.ejs")

     }
     })
})
app.post("/registering",function(req,res){
 user.findOne({username:req.body.username},function(err,user){
  console.log(user)
  if (user!==null){
    req.flash("error","User already exists")
    res.redirect("back")    
  }
  else{
    console.log("here")
    var code=Math.floor(Math.random()*11223)
    var transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"grocery.ofc@gmail.com",
                pass:process.env.password
            }
        }); 


            var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`${req.body.username}`,
                subject:"GroceryJi",
                html:`Hi,${req.body.first},welcome to GroceryJi<br>please activate your account<br>
                        Your activation code is <b>${code}</b>
                        
                        
                        </form>
                        `
            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        req.flash("error","something went wrong...");

                        res.redirect("/login");
                    }
                        else{
                            console.log("here")
                            res.render("active.ejs",{first:req.body.first,username:req.body.username,last:req.body.last,password:req.body.password,number:code})

                        }


                

})

}
})
})

app.get("/forgot",function(req,res){
    res.render("forget.ejs")
})

app.post("/forgot",function(req,res){
user.findOne({username:req.body.username},function(err,user){
  if (user){    
    var transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"grocery.ofc@gmail.com",
            pass:process.env.password
        }
    })
 
    var mailoptions={
                from:"grocery.ofc@gmail.com",
                bcc:`${req.body.username}`,
                subject:"GroceryJi",
                html:`Hi,${user.first},welcome to GroceryJi<br>Reset Your Password<br>
                        <a href="https://groceryji.com/set/${user._id}">Change Password</a>
                        
                        
                        </form>
                        `
            } 

 
             transport.sendMail(mailoptions,function(err,info){
                  if(err){
                     req.flash("error","cant send the mail")
                     res.redirect("back")
                }
                else{

                     req.flash("success","mail sent")
                     res.redirect("back")
                 }
  })
}
else{
    req.flash("error","No user found")
    res.redirect("back")
}
})
})
app.get("/set/:id",function(req,res){

    user.findById(req.params.id,function(err,user){
        res.render("set.ejs",{user:user})
    })
})
app.post("/setPassword",function(req,res){
    user.findOne({username:req.body.username},function(err,user){
 
        if (req.body.password==req.body.confirm){

        user.setPassword(req.body.password,function(err,user){
            user.save()
            req.flash("success","Password changed")
            res.redirect("/")
        })
    
    }
    else{
        req.flash("error","Password not matched") 
        res.redirect("back")
    }

    
 
    })
})
app.post("/registered",function(req,res){
            // if(req.files)
            // {
            //  var file=req.files.filename,
            //      filesname=file.name;
            //      file.mv("./public/"+filesname);
            // }
            if(req.body.two)
            {
            if(req.body.one!==req.body.two)
            {
                 req.flash("error","Your code was wrong,it's destroyed,try again...")
                 res.redirect("/login")
            }
            
            
            
            else{
            user.register(new user({first:req.body.first,last:req.body.last,name:req.body.first + " " + req.body.last,username:req.body.username,offerHold:false}),req.body.password,function(err,user){
                    
        if(err)
        {
            
                console.log(err);
            return res.redirect("/login");  
        }
    
            
            
            passport.authenticate("local")(req,res,function(){
                

                req.flash("success","successfully Registered...");
                res.redirect("/");
            });
        

}); 
}
}
else{
        req.flash("error","Please give the code as input...")
        res.redirect("back")

}
});

app.get("/logout",function(req,res){

    req.logout()
   req.flash("success","We Have Logged You Out!")
   res.redirect("/login")

})

app.post("/login",passport.authenticate("local",{
successRedirect:"/", 
failureRedirect:"/login"
}),function(req,res){

});

app.get("/admin",function(req,res){
 
 var totalSum=0
 if(!req.query.search){

  order.find({},function(err,orders){
   if (orders.length>0){

     for (var i=0;i<orders.length;i++){

        if (orders[i].returnId==""){

             totalSum=totalSum+orders[i].Price
        }
     } 

     res.render("adminOrders.ejs",{orders:orders,totalSum:totalSum,search:""})
   }
   else{

             res.render("noOrders.ejs")

   }
  })
}
else{

    var key=req.query.search
    var find=[]
    order.find({},function(err,orders){

       
       for (var i=0;i<orders.length;i++){


           for (var j=0;j<orders[i].name.length;j++){

              var k=j
              var flag=true
              for (var p=0;p<key.length;p++){

                  if(orders[i].name[k].toLowerCase()!==key[p].toLowerCase()){

                      flag=false
                      break

                  
                    
              

                  }
                  k=k+1 

              
              }
            
              if (flag==true){
                 find.push(0)

                 order.find({name:{$regex:orders[i].name,$options:"$i"}},function(err,orderf){

                      var totals=0
                      for (var x=0;x<orderf.length;x++){

                         if(orderf[x].returnId==""){

                             totals=totals+orderf[x].Price

                         }
                      }
                   

                           res.render("adminOrders.ejs",{orders:orderf,totalSum:totals,search:key})



                 })
                 
                 var orders=[]
                 break
               }

           }
       }

       if(find.length==0){

                res.render("nocustomer.ejs")

       }
    
    })    

 
}

})

app.get("/statusChange/:id/:key",function(req,res){

   order.findById(req.params.id,function(err,orders){
    if (req.params.key=="Shipped"){
      orders.updateOne({shipped:req.params.key,datetwo:Date.now()},function(err,info){


      })
    } 
    else if (req.params.key=="Out-For-Delivery"){
        orders.updateOne({outfor:req.params.key,datethree:Date.now()},function(err,info){


      })
    } 
 

    else if (req.params.key=="Canceled"){
        console.log("yaaaaaa")
        orders.updateOne({update:req.params.key,datefour:Date.now(),autoCancel:true,returnId:orders._id},function(err,info){

              product.findById(orders.pid).populate("stock").populate("notify").populate("ones").populate("twos").exec(function(err,prods){
                
     
     if(orders.size){

          if(orders.size=="1L"){
                

                 if(prods.ones.length==0){

                     prods.totalOne=0
                     prods.save()
                    user.find({},function(err,alluser){

                  for (var i=0;i<alluser.length;i++){
                  
                     user.findById(alluser[i]._id,function(err,infos){ 
                      for(var j=0;j<prods.notify.length;j++){

                          if (infos.username==prods.notify[j].username){


                                      pop.create({id:prods._id,text:prods.Name + " " + "(1L)",image:prods.image,urls:prods.urls,view:""},function(err,pups){
                                         infos.pops.push(pups)
                                         infos.save()
                                       
                                       })
                                var transport=nodemailer.createTransport({
                       service:"gmail",
                      auth:{
                         user:"grocery.ofc@gmail.com",
                         pass:process.env.password
                    }
              
               
                     });    


                            var mailoptions={
                                from:"grocery.ofc@gmail.com",
                                bcc:`${infos.username}`,
                                subject:"GroceryJi",
                                html:`Hi,welcome to GroceryJi<br>
                                                           Your requested  product ${prods.Name}, Price: ${prods.Price},Size:${orders.size} is now available
                                                           in stock..
                                                           <br>
                                                           
                                                            <br>
                                                                       
                                        
                                        
                                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                                          
                                                                          </form>`
                            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        console.log("error")

                    }
                        else{
                            console.log("here")

                        }


                

                    })       
                                   
                               break
                          }
                           
                      }

                    
                 
                  })
                 }                    
                }) 
                    
                   
                  

                 
                 

                 }
               
          prods.totalOne=prods.totalOne+orders.qty
                prods.emptyOne=false
                prods.date=Date.now()
                var p=0
                for(var i=0;i<orders.qty;i++){
                   
                   one.create({id:orders.pid},function(err,sto){
                     
                      prods.ones.push(sto)
                      if(p==orders.qty-1){

                         prods.save()
                      }
                     p=p+1
                   })
                } 
         

          }
         
          else if(orders.size=="2L"){
             
                 

                     


                     if(prods.twos.length==0){

                     prods.totalTwo=0
                     prods.save()
                    user.find({},function(err,alluser){

                  for (var i=0;i<alluser.length;i++){
                  
                     user.findById(alluser[i]._id,function(err,infos){ 
                      for(var j=0;j<prods.notify.length;j++){

                          if (infos.username==prods.notify[j].username){


                                      pop.create({id:prods._id,text:prods.Name + " " + "(2L)",image:prods.image,urls:prods.urls,view:""},function(err,pups){
                                         infos.pops.push(pups)
                                         infos.save()
                                       
                                       })
                                var transport=nodemailer.createTransport({
                       service:"gmail",
                      auth:{
                         user:"grocery.ofc@gmail.com",
                         pass:process.env.password
                    }
              
               
                     });    


                            var mailoptions={
                                from:"grocery.ofc@gmail.com",
                                bcc:`${infos.username}`,
                                subject:"GroceryJi",
                                html:`Hi,welcome to GroceryJi<br>
                                                           Your requested  product ${prods.Name}, Price: ${prods.Price},Size:${orders.size} is now available
                                                           in stock..
                                                           <br>
                                                           
                                                            <br>
                                                                       
                                        
                                        
                                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                                          
                                                                          </form>`
                            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        console.log("error")

                    }
                        else{
                            console.log("here")

                        }


                

                    })       
                                   
                               break
                          }
                           
                      }

                    
                 
                  })
                 }                    
                }) 
                    
                  

                 
                 

                 }


               prods.totalTwo=prods.totalTwo+orders.qty
                prods.emptyTwo=false
                prods.date=Date.now()
                                var p=0

                for(var i=0;i<orders.qty;i++){
                   
                   two.create({id:orders.pid},function(err,sto){
                     
                      prods.twos.push(sto)
                      if(p==orders.qty-1){

                         prods.save()
                      }
                     p=p+1
                   })
                }





          } 
            
 



     }
     else{
     if (prods.stock.length==0){
              prods.stocking=0 
              prods.save()
                user.find({},function(err,alluser){

               for (var i=0;i<alluser.length;i++){
                  
                     user.findById(alluser[i]._id,function(err,infos){ 
                      for(var j=0;j<prods.notify.length;j++){

                          if (infos.username==prods.notify[j].username){


                                      pop.create({id:prods._id,text:prods.Name,image:prods.image,urls:prods.urls,view:""},function(err,pups){
                                         infos.pops.push(pups)
                                         infos.save()
                                       
                                       })
                                      
                                   
                                 var transport=nodemailer.createTransport({
                       service:"gmail",
                      auth:{
                         user:"grocery.ofc@gmail.com",
                         pass:process.env.password
                    }
              
               
                     });    


                            var mailoptions={
                                from:"grocery.ofc@gmail.com",
                                bcc:`${infos.username}`,
                                subject:"GroceryJi",
                                html:`Hi,welcome to GroceryJi<br>
                                                           Your requested  product ${prods.Name}, Price: ${prods.Price} is now available
                                                           in stock..
                                                           <br>
                                                           
                                                            <br>
                                                                       
                                        
                                        
                                                            <a href="https://groceryji.com/moreinfo/${prods._id}"<button style=color:green>Check Your product Details</button></a>                       
                                                                          
                                                                          </form>`
                            }
                console.log("hmmmmm")
                transport.sendMail(mailoptions,function(err,info){
                    if(err)
                    {
                        console.log("error")

                    }
                        else{
                            console.log("here")

                        }


                

                    })

                               break
                          }
                           
                      }

                    
                 
                  })
                 }                    
                })  


                          


                

             } 

              

               prods.stocking=prods.stocking+orders.qty
                prods.empty=false
                prods.date=Date.now()
                               var p=0
 
                for(var i=0;i<orders.qty;i++){
                   
                   stocks.create({id:orders.pid},function(err,sto){
                     
                      prods.stock.push(sto)
                      if(p==orders.qty-1){

                         prods.save()
                      }
                     p=p+1
                   })
                }  





}




                
                 
              })
                   


                    if(orders.pay=="Paid"){

                        var amount="Give Us Account Details, so that we can give back you the paid money" +" "+ orders.Price
                    }
                   else{

                     var amount=""
                   }
                     var transport=nodemailer.createTransport({
                                              service:"gmail",
                                              auth:{
                                               user:"grocery.ofc@gmail.com",
                                               pass:process.env.password
                                              }
                                               });  


                                         var mailoptions={
                                           from:"grocery.ofc@gmail.com",
                                           bcc:`${orders.author.username}`,
                                           subject:"GroceryJi",
                                           html:`Hi,we have canceled your order for ${orders.productD}<br>
                                           Price:${orders.Price},
                                           <br>
                                           Quantity:${orders.qty} 
                                            for some issues
                                           <br>
                                           ${amount} 
                                            <br>
                                            Thank You 
                                            <br>
                                            From GroceryJi           
                        
                        
                                           
                                                             `
                           } 
                              console.log("hmmmmm")
                               transport.sendMail(mailoptions,function(err,info){
                                    if(err)
                                    {
                                        req.flash("error","something went wrong...");

                                    }
                                        else{
                                            console.log("here")

                                        }


                                }) 

      })
    } 
     else if (req.params.key=="Delivered"){
        orders.updateOne({update:req.params.key,datefour:Date.now()},function(err,info){


      })

    } 
   
    req.flash("success","Order Is Updated")
    res.redirect("back")

   })

})

app.get("/allcancelOrders/:key",function(req,res){

     order.find({update:req.params.key},function(err,orders){
      
      if (orders.length>0){

         res.render("cancels.ejs",{orders:orders,key:req.params.key})
      }
      else{
                 res.render("noOrders.ejs")

      } 
     })
})





function isLoggedin(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }

        
        req.flash("error","Do log in first...");

        res.redirect("/login");
    
}

app.listen(port,function(){

    console.log("server 4 has started")
})
