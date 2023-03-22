var express = require('express');
var router = express.Router();

const { Connection, Request } = require("tedious");

// Configurar la conexión
const config = {
    server: "10.7.0.13",
    authentication: {
        type: "default",
        options: {
            userName: "usr_prueba",
            password: "Pf123456",
        },
    },
    options: {
        database: "AdventureWorks2017",
        encrypt: false, // Utilizar SSL
        trustServerCertificate: true, // Aceptar certificados no confiables
        port: 64573, // Especificar el puerto aquí
    },
};

//instancio una conexion segun "x" configuracion
var connection = new Connection(config);



/* GET home page. */
router.get('/', function(req, res, next) {

    function executeStatement() {
      const data = [];
  
      const SQL = "SELECT  top 1000 [AddressID]      ,[AddressLine1]      ,[AddressLine2]      ,[City]      ,[StateProvinceID]      ,[PostalCode]      ,[SpatialLocation]      ,[rowguid]      ,[ModifiedDate]  FROM [Person].[Address]";
      
      const request = new Request(SQL,(err, rowCount, rows) => {
              if (err) {
                  console.error(err.message);
                  res.render("index", {title: "Personas del Sistema"});
              } else {             
                //console.log('total reg', data);
                  res.render("person", {title: "Personas del Sistema",personas: data, totalregistro:rowCount });
              }
              connection.close();
          }
      );
  
      request.on("row", (columns) => {
          const row = {};
          columns.forEach((column) => {
                row[column.metadata.colName] = column.value;     
          });
  
          console.log(row);
        
      });
  
      connection.execSql(request);
  }
  
  connection.connect((err) => {
      if (err) {
          console.log(err);
      } else {
          executeStatement();
      }
  });
  
    
  });

module.exports = router;
