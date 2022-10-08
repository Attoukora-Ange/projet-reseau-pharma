const mongoose = require('mongoose');

mongoose.connect(process.env.URL_DATA_BASE, { useNewUrlParser: true }).then(()=>{
    console.log(`Connexion à la BASE DE DONNEES`)
}).catch(e=>{
    console.log(`Erreur de connexion à la BASE DE DONNEES`);
    console.log(e.message);
})

module.exports = mongoose;
