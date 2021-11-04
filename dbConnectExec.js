const sql = require("mssql");

const wyattConfig = require("./config.js");

const config = {
  user: wyattConfig.DB.user,
  password: wyattConfig.DB.password,
  server: wyattConfig.DB.server,
  database: wyattConfig.DB.database,
};

async function executeQuery(aQuery) {
  let connection = await sql.connect(config);
  let result = await connection.query(aQuery);

  //   console.log(result);
  return result.recordset;
}

// executeQuery(`SELECT *
// FROM Webinar
// LEFT JOIN Category
// ON Category.CategoryPK = Webinar.CategoryFk`);

module.exports = { executeQuery: executeQuery };
