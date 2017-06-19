var express = require('express');
var router = express.Router();

// db-access to use sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('company', 'postgres', 'pgadmin', {
  host: 'localhost',
  dialect: 'postgres',
});

/** model of project_tbl */
const Project = sequelize.define('project_tbl', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  project_id: {
    type: Sequelize.STRING
  },
  project_name: {
    type: Sequelize.STRING
  },
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

/** model of team_tbl */
const Team = sequelize.define('team_tbl', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  project_id: {
    type: Sequelize.STRING
  },
  team_id: {
    type: Sequelize.STRING
  },
  team_name: {
    type: Sequelize.STRING
  }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

/** model of member_tbl */
const Member = sequelize.define('member_tbl', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  project_id: {
    type: Sequelize.STRING
  },
  team_id : {
    type: Sequelize.STRING
  },
  member_id: {
    type: Sequelize.STRING
  },
  member_name: {
    type: Sequelize.STRING
  }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
})

// has many
Project.hasMany(Team, {foreignKey: 'project_id', targetKey: 'project_id'});
Team.hasMany(Member, {foreignKey: 'project_id', targetKey: 'project_id'});

// belongsTo
Team.belongsTo(Project, {foreignKey: 'project_id', targetKey: 'project_id'});
Member.belongsTo(Team, {foreignKey: 'project_id', targetKey: 'project_id'});

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

  // select
  // member_tbl M inner join team_tbl T on M.project_id = T.project_id and M.team_id and T.team_id;
  Member.findAll({
    include: [{
      model: Team,
      where: {
       team_id: {
         $eq : Sequelize.col('member_tbl.team_id')
        }
      },
      require: true
    }]
  })

  // rendering index.html
  res.render('index', { title: 'Express' });
});

module.exports = router;
