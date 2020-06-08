const sqlite3 = require("sqlite3").verbose()


const db = new sqlite3.Database("./src/database/database.db")

// utulizar o objeto de banco de dados, para nossas operações

db.serialize(() =>{
    //criar uma tabela

    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir na tabela
    const query = `
        insert into places (
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?);
    `
    const values = [
        "Colecotoria",
        "Guilherme Gemballa, Jardim America",
        "numero 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]
    
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    


    //db.run('DELETE FROM places WHERE id = ?',[1], function(err){
     //   if(err){
     //       return console.log(err)
    //    }
    //
    //    console.log("Registro delatado com sucesso")
   // })

    //db.all(`SELECT * FROM places`, function(err, rows){
     //   if(err){
    //        return console.log(err)
    //    }
    //    console.log("Aqui estao seus registros: ")
     //   console.log(rows)
    //})

})