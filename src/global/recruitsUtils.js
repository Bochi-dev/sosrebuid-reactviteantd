export const NAMESLIST = [
  "Alejandro", "Beatriz", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Hilda", "Iván", "Julia",
  "Karla", "Luis", "Mariana", "Nicolás", "Olga", "Pablo", "Quintín", "Raquel", "Santiago", "Teresa",
  "Ulises", "Valeria", "Wilfredo", "Ximena", "Yahir", "Zulema", "Andrés", "Brenda", "Camilo", "Daniela",
  "Emilio", "Fabiola", "Gustavo", "Helena", "Ignacio", "Jimena", "Kevin", "Lorena", "Mateo", "Natalia",
  "Omar", "Patricia", "Ricardo", "Silvia", "Tomás", "Uriel", "Vanessa", "Walter", "Xavier", "Yolanda",
  "Zacarías", "Adriana", "Benjamín", "Cecilia", "Diego", "Esteban", "Francisca", "Gerardo", "Héctor", "Isabel",
  "Jorge", "Karen", "Leonardo", "Margarita", "Norma", "Octavio", "Paula", "Ramón", "Sara", "Teodoro",
  "Ubaldo", "Violeta", "William", "Xenia", "Yasmin", "Zoraida", "Abel", "Bianca", "Cristian", "Deborah",
  "Ezequiel", "Felipe", "Graciela", "Humberto", "Irma", "Jesús", "Katherine", "Lorenzo", "Marcela", "Nelson",
  "Oscar", "Pamela", "Rafael", "Selena", "Tadeo", "Úrsula", "Verónica", "Wendy", "Xochitl", "Yuliana"
];

export const NUMBEROFRECRUITS = 9


const generateRandomRecruits = amount => {
    const generateRandomNumberInLength = (lower, greater) => {
        return Math.floor(Math.random()*(greater - lower + 1))+lower
    }
    const x = []
    for (let i = 0; i < amount; i++){
        x.push({
            id:i,
            name:NAMESLIST[Math.floor(Math.random()*NAMESLIST.length)],
            curr_actions: [],
            schedule: null,
            stats: {
              curr_strength: generateRandomNumberInLength(20, 30),
              curr_inteligence: generateRandomNumberInLength(20, 30),
              curr_spirit: generateRandomNumberInLength(20, 30),
              /*Weight*/
              weight: 68,
              height: 1.7,
              calories: 7700,
              bmi: "normal",
              /*Fatigue*/
              fatigue: 0.00,
              fatigue_display:0,
              /*Energy and Happiness*/
              curr_happiness: 100,
              
              min_stat_value: 1,
              max_stat_value: 100,
              }
        })
    }
    
    return x
} 


export const RECRUITS = generateRandomRecruits(NUMBEROFRECRUITS)

