var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('personadd', { title: 'Direccion', respuesta:"" });
});



router.post('/', function (req, res, next) {

    var Connection = require('tedious').Connection
    var Request = require('tedious').Request
    // Configurar la conexión
    const config = {
        server: '10.7.0.13',
        authentication: {
            type: 'default',
            options: {
                userName: 'usr_prueba',
                password: 'Pf123456'
            }
        },
        options: {
            database: 'AdventureWorks2017',
            encrypt: false, // Utilizar SSL
            trustServerCertificate: true, // Aceptar certificados no confiables
            port: 64573 // Especificar el puerto aquí
        }
    };
  
    var connection = new Connection(config)
  
    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            executeSQL();
        }
    })
  
    function executeSQL() {
      let sql = "INSERT INTO [Person].[Address]       ([AddressLine1]   ,[AddressLine2]     ,[City]   ,[StateProvinceID]  ,[PostalCode]           ,[ModifiedDate])  VALUES (";
  
      sql = sql + " '" + req.body.AddressLine1 + "','" + req.body.AddressLine2 + "','" + req.body.City + "','" + req.body.StateProvinceID + "','" + req.body.PostalCode + "','" + req.body.ModifiedDate + "');"
        
      console.log(sql);
        request = new Request(sql, (err, rowCount) => {
            if (err) {
                res.send(err);
            } else {             
                    res.render('personadd', { title: 'Direccion del Sistema', personas: "", totalregistro:0 , respuesta: 'Direccion agregado correctamente'});        
            }
            connection.close()
        })
        connection.execSql(request)
    } 
  });
  

module.exports = router;
