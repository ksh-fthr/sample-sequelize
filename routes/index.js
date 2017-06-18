var express = require('express');
var router = express.Router();

const Project = sequelize.define('project_tbl', {
  project_id: {
    type: Sequelize.STRING
  },
  project_name: {
    type: Sequelize.STRING
  }
});

const Team = sequelize.define('team_tbl', {
  project_id: {
    type: Sequelize.STRING
  },
  team_id: {
    type: Sequelize.STRING
  },
  team_name: {
    type: Sequelize.STRING
  }
});

const Member = sequelize.define('team_tbl', {
  project_id: {
    type: Sequelize.STRING
  },
  team_id : {
    type: Sequelize.STRING
  },
  member_id: {
    tyoe: Sequelize.STRING
  },
  member_name: {
    type: Sequelize.STRING
  }
})



// db-access to use sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('COMPANY', 'postgres', 'pgadmin', {
  host: 'localhost',
  dialect: 'postgres',
});


/* GET home page. */
router.get('/', function(req, res, next) {
  // db access
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  // rendering index.html
  res.render('index', { title: 'Express' });
});

module.exports = router;
