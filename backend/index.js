require('dotenv').config();
const express = require('express');
const userRouter = require('./router/userRouter');
const cors = require('cors');
const app =  express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors({origin: '*'}))
app.use(express.json());

app.use('/users',userRouter);
//endpoint or route

app.get('/', (req, res) => {
    res.send('response from express');
});
app.get('/add', (req,res) => {
    res.send('response from add');

});

app.get('/getall', (req,res) => {
   res.send('response from getall');

});
app.get('/delete', (req,res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);

    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
    res.send('response from delete');
 
 });

app.listen(port,() =>{
    console.log('server started');
})
