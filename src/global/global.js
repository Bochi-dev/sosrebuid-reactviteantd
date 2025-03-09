export const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const caloriesOfAKg = 7700

export const debuffByFatigue = (stat, fatigue) => { 
  const debuff_percentage = (fatigue/0.10) 
  const debuff_percentage2 = debuff_percentage * 100
  let modified
  
  if ( debuff_percentage2 > 300){
      modified = debuff_percentage * 0.25     
  
  } else if (debuff_percentage2 > 200) {
      modified = debuff_percentage * 0.35  
  
  } else {
      modified = debuff_percentage * 0.45  
  }
  
  
  if ( debuff_percentage2 > 20){
      
  
      return Math.ceil(stat*modified)
  }
  
  return 0
    
}

export const manageFatigue = (stats, amount) => {
  console.log("stats fatigue",stats.fatigue)
  const fatigue = stats.fatigue + amount
  const fatigue_display = Math.floor((fatigue/0.10)*100)
  
  if (fatigue_display < 0.00){
    stats.fatigue = 0.00
    stats.fatigue_display = 0     
  } else {
    stats.fatigue = fatigue
    stats.fatigue_display = fatigue_display
  }

  return stats
}

export function getStat(stat, stats) {
  const fatigue = stats.fatigue
  const fatigueDebuff = debuffByFatigue(stat,fatigue)
  
  return stat - fatigueDebuff
    

}

export const checkReqs = (reqs,stats) => {
  let newReqs = [... reqs]
  newReqs = newReqs.map((req) => {
      const stat = getStat(stats["curr_"+req.type], stats)
      if (stat < req.amount){
          return false 
      }
      return true
  })
  
  if (newReqs.includes(false)){
      return false
  }
  
  return true
    
}

export const getBMICategory = (bmi) => {
  if (bmi < 18) {
    return 'Underweight';
  } else if (bmi >= 18 && bmi < 25) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
};
    
    
    
export const looseGainWeight = (stats, amount) => {

  let calories = stats.calories + (amount)
  
  console.log(calories)
  if (calories > caloriesOfAKg){
    calories = 0
    stats.weight += 1
    
  } else if (calories < 0) {
  
    calories = caloriesOfAKg + calories
    stats.weight -= 1
    
  }

  const bmi = stats.weight / stats.height**2;
  const category = getBMICategory(bmi)
  
  stats.calories = calories
  stats.bmi = `${Math.floor(bmi)} - ${category}`
  
  
  return stats
}

/*substract 10% of its original value to any number*/
export const minusToStat = (stat) => {
    const tenpercent = stat * 0.1
    if (stat > 20) {
        return stat -= tenpercent
    } else {
      stat = 20
    }
    return Math.floor(stat)
    
}

/*This will replace the current way we are adding stats to
the recruits/users */
export const plusToStat = (stat, amount) => {
  const sum = stat + amount
  if (sum < 100) {
      return stat += amount
  } else {
    stat = 100
  }
  return stat
}


export const changeStatByTurn = (stats, turns) => {
  const newStats = {... stats}
 
  looseGainWeight(newStats, -50)
  manageFatigue(newStats, 0.00416)
  
  if (turns >= 24) {
    newStats.curr_strength = minusToStat(newStats.curr_strength)
    newStats.curr_inteligence = minusToStat(newStats.curr_strength)
    newStats.curr_strength = minusToStat(newStats.curr_strength)
  }
 
 return newStats
  
}

