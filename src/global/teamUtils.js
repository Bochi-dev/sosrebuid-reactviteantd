
export const damageTaken = (team, value, setRecruits) => {
  const consolelist = []
  setRecruits(prev => prev.map(el => {
    if (!team.recruitIds.includes(el.id)) return el;
    return { ...el, stats: {... el.stats, health: Math.max(0, el.stats.health - value)}}; // Prevent negative health
  }));
};

export const calculateTeamHealth = (team, recruits) => {
  let teamsHealth = team.recruitIds
    .map(id => recruits.find(r => r.id === id).stats.health || 0)
    .reduce((sum, health) => sum + health, 0);

  const teamsMaxHealth = team.maxHealth * team.recruitIds.length;
  return (teamsHealth / teamsMaxHealth) * team.maxHealth;
};

export const isTeamDead = (team, recruits) => {
    const members = team.recruitIds.map(el => recruits.find(re => re.id === el))
    const aliveMembers = members.filter(el => el.stats.health > 0)
    return (aliveMembers.length === 0)
}

export const healRecruit = (recruit, setRecruits, value) => {
    setRecruits(prev => prev.map(re => {
        if (re.id !== recruit.id) return re
        return {
            ... recruit,
            stats: {
                ... recruit.stats,
                health: Math.min(recruit.stats.health + value, recruit.stats.maxHealth)
            }
        }
    }))
}

