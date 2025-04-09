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

const APOCALYPSEBIOS = [
  "I was a librarian. Now I map safe zones in burned cities, trading books for bullets.",
  "Once a barista, now I brew herbal meds. Caffeine's gone, but survival’s my new blend.",
  "Used to teach math. These days, I calculate risks and lead raids for clean water.",
  "I was a wedding planner. Now I organize scavenger squads and bury the dead.",
  "Mechanic before the fall. Still fixing things—mostly broken people and rusty weapons.",
  "I danced ballet. Now I sneak past raiders on silent toes with a blade in each hand.",
  "Once a florist. Now I grow food in a bunker garden lit by salvaged LED strips.",
  "Former gamer. Turns out zombie headshots weren't just for fun—now it's how I stay alive.",
  "I was an accountant. Now I trade bullets and bread, keeping tabs on karma and supplies.",
  "Chef turned hunter. Cooking rats and roots, spicing survival with memories of real meals.",
];



export const NUMBEROFRECRUITS = 1

const getRandoIndexOfList = (list) => Math.floor(Math.random()*list.length)
const generateRandomRecruits = amount => {
    const generateRandomNumberInLength = (lower, greater) => {
        return Math.floor(Math.random()*(greater - lower + 1))+lower
    }
    const x = []
    for (let i = 0; i < amount; i++){
        x.push({
            id:i,
            name:NAMESLIST[getRandoIndexOfList(NAMESLIST)],
            curr_actions: null,
            schedule: 0,
            desc: APOCALYPSEBIOS[getRandoIndexOfList(APOCALYPSEBIOS)],
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

