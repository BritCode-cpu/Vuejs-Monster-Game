
//The Get Randon number function is a global function that takes two numbers as an argument then returns a random number. 
//This function is used to generate random attack values then 
function randomNumber (min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}


//A single Vue app created and mounted
const app = Vue.createApp({

  //Data properties---------------------------------------------------------------------------------------------
data(){
   return{
    playerHealth: 100,
    monsterHealth: 100,
    numOfRound: 0,
    winner: null,
    logs: []
   } 
},

//Computed functions--------------------------------------------------------------------------------------------

computed: {
    //Setting the Health Bar levels for both player to reflect empty if health runs to 0.
  monsterHealthLevels(){
    if(this.monsterHealth < 0){
     return { width: '0%'};
    }
  return {width: this.monsterHealth + '%'}
  },
  playerHealthLevels(){
    if(this.playerHealth < 0){
        return { width: '0%'};
       }
    return {width: this.playerHealth + '%'}
    },
//Specil attack activates after every three attack the player/you launches.
    activateSpecialAttack() {
    return this.numOfRound % 3 !== 0;
    }
}, 

//Watcher functions------------------------------------------------------------------------------------------------

watch: {
   playerHealth(value){
    if(value <= 0 && this.monsterHealth <= 0){
     //A draw
     this.winner = 'Draw';
    } else if (value <= 0){
    //Player lost
    this.winner = 'monster';
    }
   },
   monsterHealth(value){
    if(value <= 0 && this.playerHealth <= 0){
     //A draw
     this.winner = 'Draw';
    } else if (value <= 0){
    //Monster lost
    this.winner = 'you';
    }
   }
},

//functions-----------------------------------------------------------------------------------------------------------------------------

methods: {
    //Add action to log
    addLogMessage(who, what, value){
      this.logs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    },
   //Surrender
   surrender(){
   this.winner = 'monster';
   },
    //Reset Game
    resetGame() {
    this.playerHealth = 100;
    this.monsterHealth = 100;
    this.winner = null;
    numOfRound = 0;
    this.logs = [];
    },
    //attack monster 
    attackMonster() {
      this.numOfRound++;
      const attackValue = randomNumber(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      //Record attack against monster
      this.addLogMessage('you', 'attack', attackValue);
      //Calling the monster attack function after an attack is complete
      this.attackRecieved();
    },
    //Attacks received from the monster
    attackRecieved() {
        const attackValue = randomNumber(15, 8);
        this.playerHealth = this.playerHealth - attackValue;
        //Record attack recevied from monster
        this.addLogMessage('monster', 'attack', attackValue);
      },
    //Special attack function
    specialAttack() {
        this.numOfRound++;
        const attackValue = randomNumber(10, 25);
        this.monsterHealth = this.monsterHealth - attackValue;
        // Record special attack against monster
        this.addLogMessage('you', 'special-attack', attackValue);
        //Calling the monster attack function after special attack is executed
        this.attackRecieved();
    },

    //Heal player during fight
    healPlayer () {
      this.numOfRound++;
      const healValue =   randomNumber(8, 20);
      if(this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      //Record healing by you/player
      this.addLogMessage('you', 'heal', healValue);
      //Calling the monster attack function after player healing is complete
      this.attackRecieved();
    }
}

});

app.mount('#game');