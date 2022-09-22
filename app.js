const express = require("express")
const { engine } = require('express-handlebars')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require ('bcrypt')
const jwt_decode = require('jwt-decode')
const saltRounds = 10

const sequelize = require("sequelize")
const { Sequelize } = require("sequelize")

var session
const skills = [
  [0, 'Acrobacia', 0, 'dex', 0],
  [0, 'Adestramento', 0, 'cha', 0],
  [0, 'Atletismo', 0, 'str', 0],
  [0, 'Diplomacia', 0, 'cha', 0],
  [0, 'Enganação', 0, 'cha', 0],
  [0, 'Furtividade', 0, 'dex', 0],
  [0, 'Intimidação', 0, 'cha', 0],
  [0, 'Intuição', 0, 'wis', 0],
  [0, 'Investigação', 0, 'int', 0],
  [0, 'Jogatina', 0, 'cha', 0],
  [0, 'Ladinagem', 0, 'dex', 0],
  [0, 'Medicina', 0, 'int', 0],
  [0, 'Misticismo', 0, 'int', 0],
  [0, 'Natureza', 0, 'wis', 0],
  [0, 'Performance', 0, 'cha', 0],
  [0, 'Pilotagem', 0, 'dex', 0],
  [0, 'Religião', 0, 'wis', 0],
  [0, 'Sobrevivência', 0, 'wis', 0],
  [0, 'Sociedade', 0, 'int', 0]
]
const User = require("./models/user")
const Sheet = require("./models/sheet")
const Status = require("./models/status")
const Skill = require('./models/skill')
const Proficiency = require('./models/proficiency')
const Attack = require('./models/attack')
const Armor = require('./models/armor')
const Shield = require('./models/shield')


// Configurações
  // express
    const app = express()
    // cookie parser middleware
    app.use(cookieParser())
  // sessão
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(sessions({
        secret: 'issoaquitemquesermuitoseguro',
        resave: true,
        cookie: { maxAge: oneDay },
        saveUninitialized: true
      }))
  // flash
    app.use(flash())
  // middleware
    app.use((req, res, next) => {
      // res.locals.success_msg = req.flash('success_msg')
      // res.locals.error_msg = req.flash('error_msg')
      res.locals.sub = req.sub || null
      next()
    })
  // porta
    const PORTA = process.env.PORTA || 4001;
  // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
    app.use(bodyParser.json())
  // handlebars
    app.engine('handlebars', engine({
      defaultLayout: 'main',
      runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
      }));
      app.set('view engine', 'handlebars');
      app.set('views', './views');
      // method-override
      app.use(express.static('public'))
      app.use(methodOverride('_method'))

// ROTAS

  // Posts

  app.post('/login', async (req, res) => {
    const data = jwt_decode(req.body.credential)
    var lastId;

    const database = require('./db')

    const subExist = await User.count({ where: { sub: data.sub } })
    .then(count => {
      return (count > 0) ? true : false
    });

    try {
      // tenta sincronizar as tabelas
      const resultado = await database.sync()
    } catch (error) {
        console.log(error)
    }

    if (!subExist) {
      User.create({
        name: data.name,
        email: data.email,
        sub: data.sub,
        admin: false
      }).then(() =>{
        console.log('Cadastrado com sucesso.')
      }).catch((erro) =>{
        res.send('Erro: Usuario não cadastrado. ERRO: '+erro);
      })
    }

    await User.findAll({
      attributes: ['id'],
      where: {sub: data.sub}
    })
    .then(function(result) {
      lastId = result[0].id
    })

    session = req.session
    session.userId = lastId
    session.name = data.name
    session.sub = data.sub
    // console.log('SESSION ', session)
    // if ( session.sub ) {
    //   res.send("Welcome User <a href=\'/logout'>click to logout</a>")
    // }
    res.redirect('/')
  })

  app.post('/cadastra-ficha', async (req, res) => {
    const data = req.body;

    // sincroniza as tabelas
    const database = require('./db')
    try {
      const resultado = await database.sync()
    } catch (error) {
        console.log(error)
    }

    // pega qualquer sheet que tenha o mesmo nome

    const sheetExist = await Sheet.count({ where: { name: data.name } })
    .then(count => {
      return (count > 0) ? true : false
    });

    // se não existe nenhuma sheet com esse nome, cria a sheet e suas tabelas complementares
    if ( !sheetExist ) {

      // cria sheet
      Sheet.create({
        id_user: session.userId,
        name: data.name,
        clan: data.clan,
        origin: data.origin,
        class: data.class,
        level: data.level,
        aspect: data.aspect,
        language: data.language,
        description: data.description
      }).then(async () => {

        const sheetID = await Sheet.findOne({ where: { name: data.name } }).id

        Status.create({
          id_sheet: sheetId
        })

        skills.forEach(element => {
          Skill.create({
            id_sheet: sheetId,
            trained: element[0],
            name: element[1],
            total: element[2],
            attribute: element[3],
            bonus: element[4],
          })
        })

        Proficiency.create({
          id_sheet: sheetId
        })

        Armor.create({
          id_sheet: sheetId
        })

        Shield.create({
          id_sheet: sheetId
        })

        Attack.create({
          id_sheet: sheetId
        })

      }).catch((erro) => {
        res.send('Erro: Usuario não cadastrado. ERRO: '+erro);
      })

    }
  })

app.post('/editHP', async (req, res) => {

  const id = req.body.id;

  const results = await Status.findOne({ where: {id_sheet: id}})

  res.json({
    data: results
  })

})

  // Gets

  app.get('/', async (req, res) => {

    if ( req.session.userId == null) {
      res.redirect('/login')
    } else {
      var sheetData = []
      await Sheet.findAll({
        attribute: [ 'id', 'name' ],
        where: {id_user: req.session.userId}
      })
      .then(function(result) {
        result.forEach(element => {
          sheetData.push(element.dataValues)
        })
      })
      res.render('home', { session: req.session, sheet: sheetData })
    }
  });

  app.get('/minha-ficha/:id', async (req, res, next) => {
    var skill
    var proficiency
    var attack
    var armor
    var shield
    const sheet = await Sheet.findOne({ where: { id: req.params.id } })
    try {
      const status = await Status.findOne({ where: { id_sheet: sheet.id } })
      res.render('minhaFicha', {
          sheet: sheet,
          session: req.session
        })
    } catch {
        res.render('home', {
          session: req.session,
          sheet: Sheet,
          errorMessage: 'Erro ao editar ficha'
        })
    }
    




    // .then( async () => {
    //   console.log('cara wtf')
    //   try {
    //     status = await Status.findOne({ where: { id_sheet: sheet.id } })
    //   } catch {
    //     console.log('então deu erro né?')
    //       res.render('home', {
    //       session: req.session,
    //       sheet: sheetData,
    //       errorMessage: 'Erro ao editar ficha'
    //     })
    //   }
      // skill = await Skill.findOne({ where: { id_sheet: sheet.id } })
      // proficiency = await Proficiency.findOne({ where: { id_sheet: sheet.id } })
      // attack = await Attack.findOne({ where: { id_sheet: sheet.id } })
      // armor = await Armor.findOne({ where: { id_sheet: sheet.id } })
      // shield = await Shield.findOne({ where: { id_sheet: sheet.id } })
      // const ability = await Ability.findOne({ where: { id_sheet: sheet.id } })
      // const magics = await Magics.findOne({ where: { id_sheet: sheet.id } })
      // res.render('minhaFicha', {
      //   sheet: sheet,
      //   status: status,
        // skill: skill,
        // proficiency: proficiency,
        // attack: attack,
        // armor: armor,
        // shield: shield,
        // ability: ability,
        // magics: magics,
    //     session: req.session
    //   })
    // }).catch(() => {
    //   console.log('mano porque')
    //   res.redirect('/')
    // })
  })


  app.get('/cadastra-ficha', (req, res) => {
    res.render('cadFicha', {session: req.session})
  })


  app.get('/login', (req, res) => {
    res.render('login')
  })


  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login')
  })

  // Put

  app.put('/minha-ficha/:id', async (req, res) => {
    let sheet

    try {
      sheet = await Sheet.findByPk(req.params.id)
      sheet.name =  req.body.name
      sheet.clan =  req.body.clan
      sheet.origin =  req.body.origin
      sheet.aspect =  req.body.aspect
      sheet.class =  req.body.class
      sheet.level =  req.body.level
      sheet.language =  req.body.language
      sheet.description =  req.body.description
      sheet.notes =  req.body.notes,
      await sheet.save()
      res.redirect(`/minha-ficha/${sheet.id}`)
    } catch {
      if ( sheet == null ) {
        res.redirect('/')
      } else {
        var sheetData = []

        await Sheet.findAll({
          where: {id_user: req.session.userId}
        })
        .then(function(result) {
          result.forEach(element => {
            sheetData.push(element.dataValues)
          })
        })
        res.render('home', {
          session: req.session,
          sheet: sheetData,
          errorMessage: 'Erro ao editar ficha'
        })
      }
    }
  })



  /**
   * POST => Inserir um dado
   * GET => Buscar um dado
   * PUT => Alterar um dado
   * DELETE => Remover um dado
   */

  /**
    * Body => Sempre que eu quiser enviar dados para minha aplicação
    * Params => /cadastro/Alex/12345
    * Query => /cadastro?nome=Alex&senha=12345
    */

app.listen(PORTA, () => console.log("Servidor está rodando na porta 4001!"));
