import brainImage from '/images/brain.jpg';
import bicepImage from '/images/bicep.jpg';
import treeImage from '/images/tree.jpg';

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

const classes = [
  {id:1, name:"presecurer", label:"Pre-Securer", level: 1, icon:brainImage, benefitsDesc: [
      "Necesary to go in any exploration",
  ]},
  {id:2, name:"securer", label:"Securer", level: 1, icon:bicepImage, benefitsDesc: [
      "+30 to weight in explorations",
  ]},
  {id:3, name:"postsecurer", label:"Post-Securer", level: 1, icon:treeImage, benefitsDesc: [
      "more resources in explorations",
  ]},

]



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
            classes: [[classes[0]],[classes[1]],[classes[2]]],
            get canCarry() {
              return Math.floor(this.stats.curr_strength/2)
            },
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


const levelUpClass = (clss) => {
  return [{ ... clss, level: Math.min(clss.level + 1, 3) }]
}

const classInSlots = (slots, reward) => {
  return slots.map( el => JSON.stringify((el.length === 0) ? [] : el[0].id)).includes(JSON.stringify(reward.id))
}

const pickAvailableSlot = (slots) => {
  for (let i = 0; i < slots.length; i++){
    const slot = slots[i]
    if (slot.length === 0) return i
  }
}

const assignClass = (slots, reward) => {
  reward = classes.filter(el => el.id === reward[0].id)[0]
  
  if (classInSlots(slots, reward)) {
    console.log("1")
    return slots.map((slot, index) => {
      if (slot.length > 0) {
        const clss = slot[0]
        if (clss.name === reward.name) return levelUpClass(clss)
        return slot         
      } else { 
        return slot
      }
    })
  }
  
  const availableSlot = pickAvailableSlot(slots)
  
  return slots.map((slot, index) => {
    if (availableSlot === index) return [ reward ]
    return slot
  })
}

  

export const proccessEducation = (recruit) => {
  const edu = recruit.curr_actions.mission
  console.log(edu)
  if (edu.progress >= edu.turns) {
    return { 
      ... recruit,
      classes: assignClass(recruit.classes, edu.reward),
      curr_actions: { 
        ... recruit.curr_actions,
        mission: { ... edu, progress: 0}
      }
    }
  }
  return { ... recruit, 
    curr_actions: { 
      ... recruit.curr_actions,
      mission: { ... edu,  progress: edu.progress + 1, }
    }
  }
}

