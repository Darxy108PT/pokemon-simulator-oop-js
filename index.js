
class Pokemon{

  static AllPokemons = []

  constructor(own,name,weak,resistance,hp,IdAttacks){
    this.own = own
    this.name = name
    this.weak = weak
    this.resistance = resistance
    this.hp = hp
    this.IdAttacks = IdAttacks 
    Pokemon.AllPokemons.push(this)
  }
  ChooseAttacks(Pokemon){
    let Attacks = []
    Pokemon.IdAttacks.forEach((IdAttacks) => {
      Attack.AllAttacks.forEach((attack) => {
        if (attack.IdAttacks == IdAttacks){
          Attacks.push(attack)
        }
      })
    })
    return Attacks
  }
}
class Attack{

  static AllAttacks = []

  constructor(IdAttacks,name,type,dmg){
    this.IdAttacks = IdAttacks
    this.name = name
    this.type = type
    this.dmg = dmg
    Attack.AllAttacks.push(this)
  }
}
// Pokemons 10
const Bulbasaur = new Pokemon(0,'Bulbasaur',["Fire","Flying","Psychic","Ice"],["Water","Fighting","Grass","Eletric","Fairy"],36,[1,2,3,4])
const Charmander = new Pokemon(0,'Charmander',["Water","Rock","Ground"],["Grass","Bug","Steel","Fire","Ice","Fairy"],37,[1,5,6,7])
const Squirtle = new Pokemon(0,'Squirtle',["Grass","Eletric"],["Fire","Steel","Water","Ice"],38,[1,8,9,10])
const Pikachu = new Pokemon(0,'Pikachu',["Ground"],["Steel","Eletric","Flying"],34,[1,11,12,13])
const Butterfree = new Pokemon(0,'Butterfree',["Flying","Rock","Fire","Eletric","Ice"],["Fighting","Ground","Bug","Grass"],42,[14,15,16,17])
const Beedrill = new Pokemon(0,'Beedrill',["Flying","Rock","Fire","Psychic"],["Fighting","Poison","Bug","Grass","Fairy"],38,[20,19,18,21])
const Pidgeot = new Pokemon(0,'Pidgeot',["Rock","Eletric","Ice"],["Ground","Bug","Grass","Ghost"],38,[14,12,22,23])
const Rattata = new Pokemon(0,'Rattata',["Fighting"],["Ghost"],33,[1,12,8,24])
const Eevee = new Pokemon(0,'Eevee',["Fighting"],["Ghost"],35,[1,12,25,24])
const Mankey = new Pokemon(0,'Mankey',["Flying","Psychic","Fairy"],["Dark","Bug","Rock"],37,[1,26,28,27])
// Attacks 28
const Tackle = new Attack(1,'Tackle','Normal',6)
const Razor_Leaf = new Attack(2,'Razor Leaf','Grass',10)
const Vine_Whip = new Attack(3,'Vine Whip','Grass',8)
const Sludge_Wave = new Attack(4,'Sludge Wave','Poison',9)
const Dragon_Breath = new Attack(5,'Dragon Breath','Dragon',9 )
const Ember = new Attack(6,'Ember','Fire',10)
const Slash = new Attack(7,'Slash','Normal',7)
const Bite = new Attack(8,'Bite','Dark',9)
const Aqua_Beam = new Attack(9,'Aqua Beam','Water',10)
const Aqua_jet = new Attack(10,'Aqua Jet','Water',8)
const Volt_Tackle = new Attack(11,'Volt Tackle','Eletric',12)
const Quick_Attack = new Attack(12,'Quick Attack','Normal',8)
const Spark = new Attack(13,'Spark','Eletric',10)
const Gust = new Attack(14,'Gust','Flying',9)
const Bug_Bite = new Attack(15,'Bug Bite','Bug',9)
const Confusion = new Attack(16,'Confusion','Psychic',11)
const Air_Slash = new Attack(17,'Air Slash','Flying',12)
const Brutal_Swig = new Attack(18,'Brutal Swig','Dark',12)
const Bug_Buzz = new Attack(19,'Bug Buzz','Bug',11)
const Drill_Run = new Attack(20,'Drill Run','Ground',11)
const Poison_Sting = new Attack(21,'Poison Sting','Poison',8)
const Twister = new Attack(22,'Twister','Dragon',9)
const Brave_Bird = new Attack(23,'Brave Bird','Flying',13)
const Take_Down = new Attack(24,'Take Down','Normal',15)
const Disarming_Voice = new Attack(25,'Disarming Voice','Fairy',9)
const Rock_Throw = new Attack(26,'Rock Throw','Rock',9)
const Close_Combat = new Attack(27,'Close Combat','Fighting',12)
const Facade = new Attack(28,'Facade','Normal',10)



StarterPokemons = [Bulbasaur,Charmander,Squirtle]
UserPokemon = []
UserAttacks = []
WildPokemonAttacks = []
let WildInitialHealth = 0
let UserInitialHealth = 0

const { randomInt } = require('node:crypto');
const readline = require('node:readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

Start()

//Start
function Start(){
  console.log(" ")
  console.log("Choose your pokemon")
  StarterPokemons.forEach((pokemon, index) => {
    console.log(`${index + 1}. ${pokemon.name}`);
  })
  rl.question("->", pokemon => {
    if( !Verify(pokemon) || pokemon > StarterPokemons.length || pokemon <= 0){
      console.log(" ") 
      console.log("Incorrect value, please choose again...")
      setTimeout(() => Start(), 1000)
    }else{
      StarterPokemons[pokemon-1].own=1
      UserPokemon = StarterPokemons[pokemon-1]
      console.log("You chose "+UserPokemon.name)
      console.log(" ") 
      Menu()
    }
  });
}

//Menu
function Menu(){
  console.log(" ")
  console.log('Options: 1-Battle 2-Pokemons 3-exit')
  rl.question("->", option => {
    if( !Verify(option) || option > 3 || option <= 0 ){
      console.log(" ") 
      console.log("Incorrect value, please choose again...")
      setTimeout(() => Menu(), 1000)
    }
    if (option == 1){
      Battle()
    }if(option == 2){
      OwnedPokemons()
    }if(option == 3){
      rl.close()
    }
  });
}

//Battle
function Battle(){
  let owned = []
  Pokemon.AllPokemons.forEach((pokemon)=>{
    if(pokemon.own == 1)
      owned.push(pokemon)
  })
  if(owned.length == Pokemon.AllPokemons.length){
    console.log(" ")
    console.log("You captured every pokemon in this area.")
    console.log("There's no more Pokemons left to Battle.")
    console.log(" ")
    setTimeout(() => Menu(), 2000)
  }else{
    wildPokemon=Pokemon.AllPokemons[randomInt(Pokemon.AllPokemons.length - 0)]
    if (wildPokemon.own == 1){
      Battle()
    }else{
      console.log(" ")
      console.log(wildPokemon.name + " appears and is ready for battle.")
      console.log(" ")
      WildInitialHealth = wildPokemon.hp
      UserInitialHealth = UserPokemon.hp
      BattleAttack()
    }
  }
}

//Battle Attack
function BattleAttack(){
  console.log("Wild: "+wildPokemon.name + " HP: "+ wildPokemon.hp)
  console.log("Yours: "+UserPokemon.name + " HP: "+ UserPokemon.hp)
  console.log(" ")
  console.log("Attack!!!")
  UserAttacks = []
  WildPokemonAttacks = []
  UserAttacks = UserPokemon.ChooseAttacks(UserPokemon)
  WildPokemonAttacks = wildPokemon.ChooseAttacks(wildPokemon)
  UserAttacks.forEach((attack, index) => {
    console.log(`${index + 1}. ${attack.name}`);
  })
  rl.question("->", attack => {
    if( !Verify(attack) || attack > UserAttacks.length || attack <= 0 ){
      console.log(" ") 
      console.log("Incorrect value, please choose again...")
      setTimeout(() => BattleAttack(), 1000)
    }else{
// User attacks the wild Pokemon
      console.log(" ") 
      console.log("You used " + UserAttacks[attack-1].name)
      TypeOfDamage("User",attack)
      console.log(" ")
      setTimeout(() => {
// If the wild Pokemon faintes
        if(wildPokemon.hp <=0){
            console.log("The wild Pokemon fainted.")
            
            //Restore Health
            wildPokemon.hp = WildInitialHealth
            UserPokemon.hp = UserInitialHealth

            Capture()
// Else, the wild Pokemon attacks the player
          }else{
            wildUsed = WildPokemonAttacks[randomInt(4 - 0)]
            console.log("The wild Pokemon used " + wildUsed.name)
            TypeOfDamage("Wild","none")
            console.log(" ") 
            setTimeout(() => {
// If the user Pokemon faintes
              if (UserPokemon.hp <= 0 ){
                console.log("Your pokemon fainted.")
                console.log("The wild Pokemon fled.")

                //Restore Health
                wildPokemon.hp = WildInitialHealth
                UserPokemon.hp = UserInitialHealth

                setTimeout(() => Menu(), 3000)
              }else
                BattleAttack()
          }, 3000)
        }
      }, 3000) 
    }
  });
}

function Capture(){
  console.log("Try to capture it? 1-Yes 2-No")
  rl.question("->", option => {
    if( !Verify(option) || option > 2 || option <= 0 ){
      console.log(" ") 
      console.log("Incorrect value, please choose again...")
      setTimeout(() => Capture(), 1000)
    }else{
      CapturePokemon = randomInt(4 - 0)
      if(CapturePokemon == 1 ){
        console.log("You captured the wild Pokemon successfully!")
        Pokemon.AllPokemons.forEach((pokemon, index)=>{
          if(pokemon.name == wildPokemon.name)
            Pokemon.AllPokemons[index].own=1
        })
        setTimeout(() => Menu(), 2000)
      }else{
        console.log("You failed to capture the wild Pokemon.")
        setTimeout(() => Menu(), 2000)
      }
    }
  });
}

//Owned Pokemons
function OwnedPokemons(){
  let owned = []
  Pokemon.AllPokemons.forEach((pokemon)=>{
    if(pokemon.own == 1)
      owned.push(pokemon)
  })
  owned.forEach((pokemon, index) => {
    console.log(`${index + 1}. ${pokemon.name}`);
  })
  console.log("Choose what pokemon to use on battle")
  rl.question("->", pokemon => {
    if( !Verify(pokemon) || pokemon > owned.length || pokemon <= 0 ){
      console.log(" ") 
      console.log("Incorrect value, please choose again...")
      setTimeout(() => OwnedPokemons(), 1000)
    }else{
      UserPokemon = owned[pokemon-1]
      console.log("You chose "+UserPokemon.name)
      console.log(" ") 
      Menu()
    }
  });
}

//Attack depending on the resistance and weakness
function TypeOfDamage(Who, Attack) {
  damage = 0
  if(Who == "User"){
    wildPokemon.weak.forEach((types)=>{
      if(types == UserAttacks[Attack-1].type){
        damage = UserAttacks[Attack-1].dmg * 2
        wildPokemon.hp = wildPokemon.hp - damage
        console.log("The attack was very effective.")
        console.log("It did " + damage + " damage to the wild Pokemon")
        return
      }
    })
    wildPokemon.resistance.forEach((types)=>{
      if(types == UserAttacks[Attack-1].type){
        damage = UserAttacks[Attack-1].dmg / 2
        wildPokemon.hp = wildPokemon.hp - damage
        console.log("The attack wasn't very effective.")
        console.log("It did " + damage + " damage to the wild Pokemon")
        return
      }
    })
    if(damage == 0){
      damage = UserAttacks[Attack-1].dmg
      wildPokemon.hp = wildPokemon.hp - damage
      console.log("It did " + damage + " damage to the wild Pokemon")
      return
    }
  }else{
    UserPokemon.weak.forEach((type)=>{
      if(type == wildUsed.type){
        damage = wildUsed.dmg * 2
        UserPokemon.hp = UserPokemon.hp - damage
        console.log("The attack was very effective.")
        console.log("It did " + damage + " damage to your Pokemon")
        return
      }
    })
    UserPokemon.resistance.forEach((type)=>{
      if(type == wildUsed.type){
        damage = wildUsed.dmg / 2
        UserPokemon.hp = UserPokemon.hp - damage
        console.log("The attack wasn't very effective.")
        console.log("It did " + damage + " damage to your Pokemon")
        return
      }
    })
    if (damage == 0){
      damage = wildUsed.dmg
      UserPokemon.hp = UserPokemon.hp - damage
      console.log("It did " + damage + " damage to your Pokemon")
      return
    }
  }
}

//NOT DONE BY ME(THE MAJORITY)
function Verify(valor) {
  if (typeof valor === 'string') {
    const num = Number(valor);
    if (!isNaN(num) && Number.isInteger(num)) {
      return(true)
    }else{
      return(false)
    }
  }
}

