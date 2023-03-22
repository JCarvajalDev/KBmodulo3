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

    const SQL = "select top 10 BusinessEntityID,PersonType,NameStyle,Title,FirstName,MiddleName,LastName,EmailPromotion	from Person.Person order by BusinessEntityID desc";
    
    const request = new Request(SQL,(err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
                res.render("index", {title: "Personas del Sistema"});
            } else {             
              //console.log('total reg', data);
                res.render("index", {title: "Personas del Sistema",personas: data, totalregistro:rowCount });
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
    let sql = "INSERT INTO Person.Person (BusinessEntityID,PersonType,NameStyle,Title,FirstName,MiddleName,LastName,EmailPromotion)  VALUES (";

    sql = sql + " '" + req.body.BusinessEntityID + "','" + req.body.PersonType + "','" + req.body.NameStyle + "','" + req.body.Title + "','" + req.body.FirstName + "','" + req.body.MiddleName + "','" + req.body.LastName + "','" + req.body.EmailPromotion + "');"
      
   // console.log(sql);
      request = new Request(sql, (err, rowCount) => {
          if (err) {
              res.send(err);
          } else {             
                  res.render('index', { title: 'Personas del Sistema', personas: "", totalregistro:0 , respuesta: 'Usuario agregado correctamente'});        
          }
          connection.close()
      })
      connection.execSql(request)
  } 
});




module.exports = router;
