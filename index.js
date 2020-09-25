const path = require('path')
const fs = require('fs')
const Discord = require('discord.js');

const Commando = require('discord.js-commando')

const client = new Discord.Client();
({ disableMentions: 'everyone' });

const config = require('./config.json')
const memberCount = require('./member-count')
const privateMessage = require('./private-message')




const command = require('./command');
const { timeStamp } = require('console');
const { cpuUsage, send } = require('process');
const { EventEmitter } = require('events');
const { measureMemory } = require('vm');

const baseFile = 'command-base.js'
const commandBase = require(`./commands/${baseFile}`)

const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir))
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file))
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file))
    } else if (file !== baseFile) {
      const option = require(path.join(__dirname, dir, file))
      commandBase(client, option)
    }
  }
}

readCommands('commands')



const emitter = new EventEmitter()
emitter.setMaxListeners(0)

///Estado del bot///
client.on("ready", () => { 
console.log("Ya me desperte u.u");
presence();

///Presencia///
  function presence(){
    client.user.setPresence({
      status:"online",
      activity: {
        name: "Anime u.u",
        type: "WATCHING"
      }
    })
  }
//Mensajes de respuesta
command(client, ['<@!483434222942683137>'], (message) => {
  message.channel.send('**Estado actual**')
  message.channel.send('Nada')
});

//Contandor de servers y sus miembros//
 command(client, 'servers', (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')){
     client.guilds.cache.forEach((guild) => {
         message.channel.send(
             `**${guild.name}** Tiene un total de **${guild.memberCount}** miembros`
             )
     })
    }
})
//Crear canales//

//Crear canal de texto
  command(client, 'create', (message) => {
    if (message.member.hasPermission('MANAGE_CHANNELS')){
      const name = message.content.replace('-create','')
      
      message.guild.channels
      .create(name, {
          type: 'text',
      })
      .then((channel) => {
          const categoryId = '648707136754417664'
          channel.setParent(categoryId)
      })
    }
  })
  
//Crear canal de voz
  command(client, 'createvc', (message) => {
    if (message.member.hasPermission('MANAGE_CHANNELS')){
      const name = message.content.replace('-createvc','')

      message.guild.channels
      .create(name,{
          type: 'voice',
      })
      .then((channel) => {
          
          const categoryId = '648707136754417667'
          channel.setParent(categoryId)
          channel.setUserLimit(2)
      })
    }
  })

//Embeds//
        command(client, 'invite', (message) =>{
            const embed = new Discord.MessageEmbed()
            .setTitle('Mi invitacion')
            .setDescription('Mi invitacion para agregarme a tu servidor :)')
            .setColor('RANDOM')
            .addField('https://discord.com/api/oauth2/authorize?client_id=757608037392449638&permissions=8&scope=bot','**^^^^^**',false)
            .addField('Recuerda que este bot esta en fase alpha','Talvez tenga errores u otras cosas',true)
            .setFooter('Desarrollado por xJustClefory#0001')
            message.channel.send(embed)
        })

        command(client, 'helpmenu', (message) => {
          const embed = new Discord.MessageEmbed()
          .setTitle('Menu de Ayuda')
          .setDescription('*Escribe **-**help(comando)*')
          .setColor(`#ffff00`)
          .addField('**Comandos de moderacion**','```ban,kick```')
          .addField('**Comandos de utilidad**','```avatar,userinfo,serverinfo```')
          .addField('**Comandos de administrador**','```role,hasrole,removerole,purge,servers```')
          .addField('**Comandos varios**','```create,createvc,say,ping,invite```')
          .setFooter('Recuerda usar el prefix "-"')
          .setTimestamp()
          message.channel.send(embed)
        })

        command(client, ['Gracias','gracias'], (message) =>{
          const embed = new Discord.MessageEmbed()
          .setTitle('**Agradecimientos**')
          .setDescription('Lista de personas importantes')
          .setColor('RANDOM')
          .addField('Luxo','Una de las primeras personas que conoci y tambien una persona agradable',false)
          .addField('Johan y sebastian garcia', 'No se si era amigo de ellos pero me trataron bien',false)
          .addField('Isaac y Junior', 'Primeros peruanos que conoci',false)
          .addField('Losmejorescrack,kirnitor,tantan,benjagamer,etc', 'Mejores jugadores de IR competitivo 2020', false)
          .setImage('https://media.discordapp.net/attachments/696586356553547866/758760677195907142/unknown.png?width=444&height=414')
          .setFooter('Desarrollado por xJustClefory#0001')
          message.channel.send(embed)
        })

        
        command(client, ['musulman','Musulman'], (message) =>{
          const embed = new Discord.MessageEmbed()
          .setTitle('**._.XD**')
          .setColor('RANDOM')
          .setImage('https://cdn.discordapp.com/attachments/746512138666901516/758793204702117938/AFP_15R767_20180609191630-760-keRD-U45132941168n4B-992x558LaVanguardia-Web.png')
          .setFooter('COMANDO SECRETO!!')
          message.channel.send(embed)
        })
//Info//

 command(client, 'serverinfo', (message) =>{
     const { guild } = message
     // console.log(guild)
     
     const { name, region, memberCount, owner, afkTimeout } = guild
     const icon = guild.iconURL()
     
     const embed = new Discord.MessageEmbed()
     .setTitle(`Informacion de "${name}"`)
    .setThumbnail(icon)
    .addFields(
        {
           name: 'Region',
           Value: message.guild.region,
        },
        {
           name: 'Miembros',
           value: memberCount,
        },
        {
            name: 'Owner',
            value: owner.user.tag,
        },
        {
             name: 'Tiempo del AFK',
             value: afkTimeout /60,
        }
    )
        
        message.channel.send(embed)
 })

//Comando de ayuda :0
    command(client, 'help ban', (message) => {
        message.channel.send(`**-ban** - Te permite banear a un usuario(*__tienes que escribir luego del__*)`)
    })
    command(client, 'help kick', (message) => {
      message.channel.send('**-kick** - Te permite kickear a un usuario(*__tienes que escribir luego del comando__*)')
    })
    command(client, 'help avatar', (message) => {
      message.channel.send('**-avatar** - Mostrara tu avatar y si mencionas a alguien mostrara su avatar')
    })
    command(client, 'help userinfo', (message) => {
      message.channel.send('**-userinfo** - Muestra la informacion del usuario')
    })
    command(client, 'help serverinfo', (message) => {
      message.channel.send('Muestra informacion basica acerca del servidor')
    })
    command(client, 'help role', (message) => {
      message.channel.send('**-role** - Le das un rol a un usuario(*__tienes que mencionarlo a el y solo escribes el nombre del rol al costado__*)')
    })
    command(client, 'help hasrole', (message) => {
      message.channel.send('**-hasrole** - Compruebas si un usuario tiene un rol(*__Tienes que mencionar a el y solo escribes el nombre del rol al costado__*)')
    })
    command(client, 'help removerole', (message) => {
      message.channel.send('**-removerole** - Le quitas un rol al usuario(*__Tienes que mencionar a el y solo escribes el nombre del rol al costado__*)')
    })
    command(client, 'help purge', (message) => {
      message.channel.send('**-purge** - Escribe la cantidad de mensajes que quieres borrar(del 2 al 100)')
    })
    command(client, 'help servers', (message) =>{
      message.channel.send('**-servers** - Te muestra todos los servers en donde esta el bot y sus miembros')
    })
    command(client, 'help create', (message) => {
      message.channel.send('**-create** - Crea un canal de texto(tienes que escribir al costado del comando el nombre)')
    })
    command(client, 'help createvc', (message) => {
      message.channel.send('**-createvc** - Crea un canal de voz para 2 personas(tienes que escribir al costado del comando el nombre)')
    })
    command(client, 'help say', (message) => {
      message.channel.send('**-say** - Escribe al costado de este comando para que el bot lo replique')
    })
    command(client, 'help ping', (message) => {
      message.channel.send('**-ping** - Te muestra el ping del bot')
    })
    command(client, 'help invite', (message) => {
      message.channel.send('**-invite** - Te manda la invitacion para que lo agreges a tu server')
    })
    command(client, 'amongus', (message) => {
      message.channel.send('Nadie esta jugando justo ahora')
    })

    const { prefix } = config


        
    
//KICK Y BANS

command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} **${target.tag} fue baneado** :white_check_mark:`)
      } else {
        message.channel.send(`${tag} **Especifica a alguien para banear** :grey_question:`)
      }
    } else {
      message.channel.send(
        `${tag} No tienes el permiso **Banear Miembros** :x:`
      )
    }
  
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} **${target.tag} fue kickeado** :white_check_mark:`)
      } else {
        message.channel.send(`${tag} **Porfavor especifica a quien vas a kickear** :grey_question:`)
      }
    } else {
      message.channel.send(
        `${tag} No tienes el permiso **Expulsar Miembros** :x:`
      )
    }
  })
//Purge command
command(client, 'purge', (message) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('ERROR! :x: || No tienes el permiso de **gestionar mensajes**');
  
  const args = message.content.slice(6).split(" ");
  const clear = args[1];
  
  if(2<=clear && clear <= 100) return message.channel.bulkDelete(clear);
  else return message.reply('ERROR! :x:|| Tienes que borrar como minimo 2 mensajes y como maximo 100');
  
  });


  




//Mensaje de encendido
let embed = new Discord.MessageEmbed()
    .setTitle('Estado del bot')
    .setColor('RANDOM')
    .setDescription('El bot esta funcionando ✅')
    .setFooter('Bot desarrollado por xJustClefory#0001')
    .setTimestamp()
const ch = client.channels.cache.get('758175284989394985')
if (ch) return ch.send(embed)




});
client.login(config.token)