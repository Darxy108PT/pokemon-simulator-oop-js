
class Pokemon{
  constructor(own,name,weak,resistance,hp,IdAttacks){
    this.own = own
    this.name = name
    this.weak = weak
    this.resistance = resistance
    this.hp = hp
    this.IdAttacks = IdAttacks 
  }
  ChooseAttacks(Pokemon){
    let Attacks = []
    Pokemon.IdAttacks.forEach((IdAttacks) => {
      AllAttacks.forEach((attack) => {
        if (attack.IdAttacks == IdAttacks){
          Attacks.push(attack)
        }
      })
    })
    return Attacks
  }
}
class Attack{
  constructor(IdAttacks,name,type,dmg){
    this.IdAttacks = IdAttacks
    this.name = name
    this.type = type
    this.dmg = dmg
  }
}
// Pokemons
Bulbasaur = new Pokemon(0,'Bulbasaur',["Fire","Flying","Psychic","Ice"],["Water","Fightin","Grass","Eletric","Fairy"],36,[1,2,3,4])
Charmander = new Pokemon(0,'Charmander',["Water","Rock","Ground"],["Grass","Bug","Steel","Fire","Ice","Fairy"],37,[1,5,6,7])
Squirtle = new Pokemon(0,'Squirtle',["Grass","Eletric"],["Fire","Steel","Water","Ice"],38,[1,8,9,10])
Pikachu = new Pokemon(0,'Pikachu',["Ground"],["Steel","Eletric","Flying"],34,[1,11,12,13])
Butterfree = new Pokemon(0,'Butterfree',["Flying","Rock","Fire","Eletric","Ice"],["Fightin","Ground","Bug","Grass"],42,[14,15,16,17])
Beedrill = new Pokemon(0,'Beedrill',["Flying","Rock","Fire","Psychic"],["Fightin","Poison","Bug","Grass","Fairy"],38,[20,19,18,21])
Pidgeot = new Pokemon(0,'Pidgeot',["Rock","Eletric","Ice"],["Ground","Bug","Grass","Ghost"],38,[14,12,22,23])
Rattata = new Pokemon(0,'Rattata',["Fightin"],["Ghost"],33,[1,12,8,24])
Eevee = new Pokemon(0,'Eevee',["Fightin"],["Ghost"],35,[1,12,25,24])
Mankey = new Pokemon(0,'Mankey',["Flying","Psychic","Fairy"],["Ghost"],37,[1,26,28,27])

const palbasaur = new Pokemon(0,'Bulbasaur',["Fire","Flying","Psychic","Ice"],["Water","Fightin","Grass","Eletric","Fairy"],36,[1,2,3,4])

// Attacks
Tackle = new Attack(1,'Tackle','Normal',6)
Razor_Leaf = new Attack(2,'Razor Leaf','Grass',10)
Vine_Whip = new Attack(3,'Vine Whip','Grass',8)
Sludge_Wave = new Attack(4,'Sludge Wave','Poison',9)
Dragon_Breath = new Attack(5,'Dragon Breath','Dragon',9 )
Ember = new Attack(6,'Ember','Fire',10)
Slash = new Attack(7,'Slash','Normal',7)
Bite = new Attack(8,'Bite','Dark',9)
Aqua_Beam = new Attack(9,'Aqua Beam','Water',10)
Aqua_jet = new Attack(10,'Aqua Jet','Water',8)
Volt_Tackle = new Attack(11,'Volt Tackle','Eletric',12)
Quick_Attack = new Attack(12,'Quick Attack','Normal',8)
Spark = new Attack(13,'Spark','Eletric',10)
Gust = new Attack(14,'Gust','Flying',9)
Bug_Bite = new Attack(15,'Bug Bite','Bug',9)
Confusion = new Attack(16,'Confusion','Psychic',11)
Air_Slash = new Attack(17,'Air Slash','Flying',12)
Brutal_Swig = new Attack(18,'Brutal Swig','Dark',12)
Bug_Buzz = new Attack(19,'Bug Buzz','Bug',11)
Drill_Run = new Attack(20,'Drill Run','Ground',11)
Poison_Sting = new Attack(21,'Poison Sting','Poison',8)
Twister = new Attack(22,'Twister','Dragon',9)
Brave_Bird = new Attack(23,'Brave Bird','Flying',13)
Take_Down = new Attack(24,'Take Down','Normal',15)
Disarming_Voice = new Attack(25,'Disarming Voice','Fairy',9)
Rock_Throw = new Attack(26,'Rock Throw','Fairy',9)
Close_Combat = new Attack(27,'Close Combat','Fairy',12)
Facade = new Attack(28,'Facade','Fairy',10)



StarterPokemons = [Bulbasaur,Charmander,Squirtle]
AllPokemons = [Bulbasaur,Charmander,Squirtle,Pikachu,Butterfree,Beedrill,Pidgeot,Rattata,Eevee]
AllAttacks = [Tackle,Razor_Leaf,Vine_Whip,Sludge_Wave,Dragon_Breath,Ember,Slash,Bite,Aqua_Beam,Aqua_jet,Volt_Tackle,Quick_Attack,Spark,Gust,Bug_Bite,Confusion,Air_Slash,Brutal_Swig,Bug_Buzz,Drill_Run,Poison_Sting,Twister,Brave_Bird,Take_Down,Disarming_Voice,Rock_Throw,Close_Combat,Facade]
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
  AllPokemons.forEach((pokemon)=>{
    if(pokemon.own == 1)
      owned.push(pokemon)
  })
  if(owned.length == AllPokemons.length){
    console.log(" ")
    console.log("You captured every pokemon in this area.")
    console.log("There's no more Pokemons left to Battle.")
    console.log(" ")
    setTimeout(() => Menu(), 2000)
  }else{
    wildPokemon=AllPokemons[randomInt(AllPokemons.length - 0)]
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
        AllPokemons.forEach((pokemon, index)=>{
          if(pokemon.name == wildPokemon.name)
            AllPokemons[index].own=1
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
  AllPokemons.forEach((pokemon)=>{
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
        damage = UserAttacks[Attack-1].dmg * 1.5
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
        damage = wildUsed.dmg * 1.5
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

console.log("Thank you for playing!")