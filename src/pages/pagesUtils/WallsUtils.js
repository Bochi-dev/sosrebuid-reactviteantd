

const [walls, setWalls] = useState( ["North Wall", "South Wall", "East Wall"].map( (el, index) => {
        return {
            id: index,
            name: el,
            health: 3,
            maxHealth: 3,
            stationedTeam: null,
            isBeingAttacked: false,
            get defenseLevel () {
                if (this.stationedTeam == null) return this.maxHealth
                const stationedTeam = getTeam(this.stationedTeam)
                
                return stationedTeam.powerLevel + this.maxHealth
            }
        
        }
    }))
