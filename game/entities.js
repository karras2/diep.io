const s = {
    // reload, recoil, size, dmg, pene, speed, range, density, spray
    basic: [30, 0.1, 1, 15, 15, 2.5, 75, 50, 1],
    drone: [4, 0, 1, 1, 3, 0.75, -10, 1, 0.1],
    twin: [1.5, 0.5, 1, 1, 1, 1, 1, 1, 1],
    mach: [0.6, 0.75, 1, 0.75, 0.75, 1, 0.9, 1, 2],
    sniper: [1.125, 1, 1, 1, 1.5, 1.5, 1.25, 1, 0.5],
    flank: [1.2, 1, 1, 0.9, 0.9, 0.9, 1, 1, 1],
    thruster: [1, 1.5, 1, 0.5, 0.5, 0.75, 0.5, 0.5, 1.5],
    rocketeerRocket: [0.75, 2, 1, 1.25, 1.25, 0.5, 10, 2],
    destroy: [4, 2, 1, 3, 3, 1.125, 2, 5, 0.1],
    gunner: [0.75, 0.75, 1, 0.8, 0.8, 1, 1, 2, 0.1],
    rocketeerRocket: [0.5, 2, 1, 1.25, 1.25, 0.25, 0.6, 10, 5],
    skimmerMissile: [0.75, 1, 1, 1.25, 1.25, 1, 0.5, 10, 0.5],
    trapper: [0.75, 1, 1.5, 0.3, 4, 2, 2, 100, 2],
    anni: [1.25, 2, 1, 1.5, 1.5, 0.8, 1.5, 2, 0.1],
    battle: [1, 1, 0.7, 0.25, 1, 1, 1, 0.001, 1],
    necro: [2, 1, 1, 1, 1.5, 1.75, -10, 1, 2],
    summoner: [0.5, 1, 0.7, 0.2, 0.2, 3, -10, 1, 5],
    fover: [0.75, 1, 0.4, 0.3, 0.5, 3, -10, 1, 10],
    factory: [1, 1, 1, 0.75, 2, 1, 1, 2, 1],
    stream: [3, 1, 0.9, 0.5, 1.5, 1.25, 1.25, 2, 0.01],
    spread: [2, 0.5, 1, 0.6, 0.6, 1, 1, 1, 1],
    spreadMain: [1, 1.5, 1, 1.5, 1.5, 1, 1, 1, 1]
};

let combineStats = ((stats) => {
    let baseStats = JSON.parse(JSON.stringify(stats[0]));
    stats.shift();
    for (let stat of stats) {
        for (let i = 0; i < stat.length; i++) baseStats[i] *= stat[i];
    }
    let out = {};
    let names = ["reload", "recoil", "size", "dmg", "pene", "speed", "range", "density", "spray"];
    for (let i = 0; i < names.length; i++) out[names[i]] = baseStats[i];
    out.range = Math.floor(out.range);
    return out;
});

// Shapes
let square = {
    label: "Square",
    size: 30,
    spin: 2,
    type: "food",
    color: "square",
    shape: 4,
    slows: true,
    health: {
        max: 75,
        amount: 75
    },
    xp: 30,
};
let triangle = {
    label: "Triangle",
    size: 45,
    spin: 2,
    type: "food",
    color: "triangle",
    shape: 3,
    slows: true,
    health: {
        max: 125,
        amount: 125
    },
    xp: 75,
};
let pentagon = {
    label: "Pentagon",
    size: 60,
    spin: 2,
    type: "food",
    color: "pentagon",
    shape: 5,
    slows: true,
    health: {
        max: 250,
        amount: 250
    },
    xp: 300,
};
let alphaPentagon = {
    label: "Alpha Pentagon",
    size: 225,
    spin: 2,
    type: "food",
    color: "pentagon",
    shape: 5,
    slows: true,
    health: {
        max: 10000,
        amount: 10000
    },
    damage: 10,
    xp: 9000,
};
let crasher = {
    label: "Crasher",
    size: 30,
    type: "food",
    color: "crasher",
    shape: 3,
    slows: true,
    health: {
        max: 100,
        amount: 100
    },
    damage: 10,
    xp: 250,
    moveToTarget: true,
    view: 10,
    speedMult: 3,
};

// Ammo
let bullet = {
    label: "Bullet",
    type: "bullet",
    guns: []
};
let trap = {
    label: "Trap",
    type: "bullet",
    shape: -3,
    slows: true,
    guns: []
};
let drone = {
    label: "Drone",
    type: "bullet",
    view: 15,
    speedMult: 4,
    moveToTarget: true,
    shape: 3,
    guns: []
};
let swarm = JSON.parse(JSON.stringify(drone));
swarm.label = "Swarm";
swarm.view = 50;
swarm.speedMult *= 1.25;
let necroDrone = JSON.parse(JSON.stringify(drone));
necroDrone.label = "Drone";
necroDrone.shape = 4;
let minion = {
    label: "Minion",
    type: "bullet",
    view: 10,
    speedMult: 1.5,
    minion: true,
    moveToTarget: true,
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic])
    }]
};
let rocket = {
    label: "Rocket",
    type: "bullet",
    guns: [{
        position: [1.5, 1, 1.75, 0, 0, Math.PI, 2],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.thruster, s.rocketeerRocket]),
        color: "me"
    }]
};
let missile = {
    label: "Missile",
    type: "bullet",
    spin: 1,
    guns: [{
        position: [1.65, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.thruster, s.skimmerMissile]),
        color: "me"
    }, {
        position: [1.65, 1, 1, 0, 0, Math.PI, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.thruster, s.skimmerMissile]),
        color: "me"
    }]
};

let basic = {
    label: "Basic",
    type: "tank",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic])
    }],
    upgrades: ["twin", "machine", "sniper", "flank"]
};
let dev = {
    label: "Dev",
    guns: [{
        position: [2, 1, 0.75, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic])
    }],
    upgrades: ["bosses", "observer", "basic", "misc"]
};
let bosses = {
    label: "Bosses",
    guns: [{
        position: [2, 1, 0.75, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic])
    }],
    upgrades: ["summoner", "fallenOverlord", "dev"]
};
let misc = {
    label: "Miscellaneous",
    guns: [{
        position: [2, 1, 0.75, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic])
    }],
    upgrades: ["arenaCloser", "mothership", "dev"]
};
let observer = {
    label: "Observer",
    fov: 2
};
let mothership = {
    label: "Mothership",
    SIZE: 100,
    shape: 16,
    maxChildren: 32,
    health: {
        max: 7000,
        amount: 7000
    },
    xp: 100000,
    guns: []
};
for (let i = 0; i < 16; i++) mothership.guns.push({
    position: [1.5, 0.5, 1, 0, 0, (Math.PI * 2) / 16 * i, i / 16],
    ammo: "drone",
    autoShoot: 3,
    stats: combineStats([s.basic, s.drone])
});

// LvL 15
let twin = {
    label: "Twin",
    guns: [{
        position: [1.9, 0.9, 1, 0.5, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.9, 0.9, 1, -0.5, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }],
    upgrades: ["triple", "double"]
};
let machine = {
    label: "Machine Gun",
    guns: [{
        position: [2, 1, 1.75, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach])
    }],
    upgrades: ["destroyer", "gunner", "sprayer"]
};
let sniper = {
    label: "Sniper",
    fov: 1.2,
    guns: [{
        position: [2.5, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }],
    upgrades: ["assassin", "hunter", "trapper", "overseer"]
};
let flank = {
    label: "Flank Guard",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [1.6, 1, 1, 0, 0, Math.PI, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }],
    upgrades: ["quad", "tri"]
};

// LvL 30
let triple = {
    label: "Triple Shot",
    guns: [{
        position: [1.75, 0.9, 1, -0.25, 0, Math.PI / 10, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.75, 0.9, 1, 0.25, 0, -Math.PI / 10, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [2, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }],
    upgrades: ["triplet", "penta", "spreadshot"]
};
let double = {
    label: "Double Twin",
    guns: [{
        position: [1.9, 0.9, 1, 0.5, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.9, 0.9, 1, -0.5, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.9, 0.9, 1, 0.5, 0, Math.PI, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.9, 0.9, 1, -0.5, 0, Math.PI, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }],
    upgrades: ["tripleTwin", "battleship"]
};
let destroyer = {
    label: "Destroyer",
    guns: [{
        position: [2, 1.4, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.destroy])
    }],
    upgrades: ["anni", "hybrid", "skimmer", "rocketeer"]
};
let gunner = {
    label: "Gunner",
    guns: [{
        position: [1.6, 0.5, 1, 0.7, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.6, 0.5, 1, -0.7, 0, 0, 0.75],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.8, 0.5, 1, 0.35, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.8, 0.5, 1, -0.35, 0, 0, 0.25],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }],
    upgrades: ["battery", "stream", "gunnerTrapper"]
};
let trapper = {
    label: "Trapper",
    guns: [{
        position: [1.5, 1, 1, 0, 0, 0, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper]),
        prop: true
    }, {
        position: [0.4, 1, 1.5, 0, 1.5, 0, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper])
    }],
    upgrades: ["megaTrapper", "triTrapper", "gunnerTrapper"]
};
let assassin = {
    label: "Assassin",
    fov: 1.3,
    guns: [{
        position: [2.8, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }],
    upgrades: ["ranger", "stalker"]
};
let hunter = {
    label: "Hunter",
    fov: 1.2,
    guns: [{
        position: [2.3, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }, {
        position: [2, 1.2, 1, 0, 0, 0, 0.25],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }],
    upgrades: ["stream", "preda"]
};
let quad = {
    label: "Quad Tank",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI / 2, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, -Math.PI / 2, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }],
    upgrades: ["octo"]
};
let sprayer = {
    label: "Sprayer",
    guns: [{
        position: [2.25, 0.75, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach])
    }, {
        position: [2, 1, 1.75, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach])
    }]
};
let tri = {
    label: "Tri-Angle",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [1.65, 0.9, 1, -0.1, 0, Math.PI + (Math.PI / 6), 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }, {
        position: [1.65, 0.9, 1, 0.1, 0, Math.PI - (Math.PI / 6), 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }],
    upgrades: ["booster", "fighter"]
};
let overseer = {
    label: "Overseer",
    maxChildren: 8,
    guns: [{
        position: [1.5, 1, 1.5, 0, 0, Math.PI / 2, 1],
        ammo: "drone",
        autoShoot: 4,
        stats: combineStats([s.basic, s.drone])
    }, {
        position: [1.5, 1, 1.5, 0, 0, -Math.PI / 2, 1],
        ammo: "drone",
        autoShoot: 4,
        stats: combineStats([s.basic, s.drone])
    }],
    upgrades: ["overlord", "battleship", "necromancer", "factory"]
};

// LvL 45
let triplet = {
    label: "Triplet",
    guns: [{
        position: [1.675, 0.9, 1, -0.5, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.675, 0.9, 1, 0.5, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [2, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }]
};
let penta = {
    label: "Penta Shot",
    guns: [{
        position: [1.6, 0.9, 1, -0.3, 0, Math.PI / 5, 0.75],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.6, 0.9, 1, 0.3, 0, -Math.PI / 5, 0.75],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.8, 0.9, 1, -0.25, 0, Math.PI / 10, 0.4],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.8, 0.9, 1, 0.25, 0, -Math.PI / 10, 0.4],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [2, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }]
};

let spreadshot = {
    label: "Spredshot",
    guns: [{
        position: [1.5, 0.5, 1, -0.25, 0, Math.PI / 20 * 5, 5 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.5, 0.5, 1, 0.25, 0, -Math.PI / 20 * 5, 5 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.6, 0.5, 1, -0.25, 0, Math.PI / 20 * 4, 4 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.6, 0.5, 1, 0.25, 0, -Math.PI / 20 * 4, 4 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.7, 0.5, 1, -0.25, 0, Math.PI / 20 * 3, 3 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.7, 0.5, 1, 0.25, 0, -Math.PI / 20 * 3, 3 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.8, 0.5, 1, -0.25, 0, Math.PI / 20 * 2, 2 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.8, 0.5, 1, 0.25, 0, -Math.PI / 20 * 2, 2 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.9, 0.5, 1, -0.25, 0, Math.PI / 20, 1 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [1.9, 0.5, 1, 0.25, 0, -Math.PI / 20, 1 / 6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread])
    }, {
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.spread, s.spreadMain])
    }]
};
let tripleTwin = {
    label: "Triple Twin",
    guns: []
};
for (let i = 0; i < 3; i++)
    tripleTwin.guns.push({
        position: [1.9, 0.9, 1, 0.5, 0, Math.PI / 1.5 * i, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    }, {
        position: [1.9, 0.9, 1, -0.5, 0, Math.PI / 1.5 * i, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin])
    });
let anni = {
    label: "Annihilator",
    guns: [{
        position: [2, 2, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.destroy, s.anni])
    }]
};
let hybrid = {
    label: "Hybrid",
    maxChildren: 3,
    guns: [{
        position: [2, 1.4, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.destroy]),
        ignoreMaxChildren: 1,
    }, {
        position: [1.5, 1, 1.5, 0, 0, Math.PI, 1],
        ammo: "drone",
        autoShoot: 3,
        stats: combineStats([s.basic, s.drone])
    }]
};
let skimmer = {
    label: "Skimmer",
    guns: [{
        position: [0.25, 1.2, 1.1, 0, 1.8, 0, 0],
        ammo: "missile",
        stats: combineStats([s.basic, s.destroy])
    }, {
        position: [1.8, 1.4, 1, 0, 0, 0, 0],
        ammo: "missile",
        stats: combineStats([s.basic, s.destroy]),
        prop: true
    }]
};
let rocketeer = {
    label: "Rocketeer",
    guns: [{
        position: [0.25, 1.05, 1.1, 0, 1.8, 0, 0],
        ammo: "rocket",
        stats: combineStats([s.basic, s.destroy])
    }, {
        position: [1.8, 1.4, 0.75, 0, 0, 0, 0],
        ammo: "rocket",
        stats: combineStats([s.basic, s.destroy]),
        prop: true
    }]
};
let octo = {
    label: "Octo Tank",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI / 2, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, -Math.PI / 2, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI / 4, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI + Math.PI / 4, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, Math.PI / 2 + Math.PI / 4, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [2, 1, 1, 0, 0, -Math.PI / 2 + Math.PI / 4, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }]
};
let battleship = {
    label: "Battleship",
    guns: [{
        position: [1.55, 0.9, 0.6, 0.45, 0, Math.PI / 2, 0],
        ammo: "swarm",
        stats: combineStats([s.basic, s.battle])
    }, {
        position: [1.55, 0.9, 0.6, -0.45, 0, Math.PI / 2, 0.5],
        ammo: "swarm",
        stats: combineStats([s.basic, s.battle])
    }, {
        position: [1.55, 0.9, 0.6, 0.45, 0, -Math.PI / 2, 0],
        ammo: "swarm",
        stats: combineStats([s.basic, s.battle])
    }, {
        position: [1.55, 0.9, 0.6, -0.45, 0, -Math.PI / 2, 0.5],
        ammo: "swarm",
        stats: combineStats([s.basic, s.battle])
    }]
};
let overlord = {
    label: "Overlord",
    maxChildren: 8,
    guns: [{
        position: [1.5, 1, 1.5, 0, 0, 0, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.drone])
    }, {
        position: [1.5, 1, 1.5, 0, 0, Math.PI, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.drone])
    }, {
        position: [1.5, 1, 1.5, 0, 0, Math.PI / 2, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.drone])
    }, {
        position: [1.5, 1, 1.5, 0, 0, -Math.PI / 2, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.drone])
    }]
};
let necromancer = {
    label: "Necromancer",
    maxChildren: 16,
    shape: 4,
    guns: [{
        position: [1.3, 1, 1.5, 0, 0, Math.PI / 2, 1],
        ammo: "necroDrone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.necro])
    }, {
        position: [1.3, 1, 1.5, 0, 0, -Math.PI / 2, 1],
        ammo: "necroDrone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.necro])
    }]
};
let factory = {
    label: "Factory",
    maxChildren: 6,
    shape: 4,
    guns: [{
        position: [1.3, 1, 1.5, 0, 0, 0, 0.5],
        ammo: "minion",
        autoShoot: 2,
        stats: combineStats([s.basic, s.drone, s.factory])
    }]
};

let stream = {
    label: "Streamliner",
    fov: 1.5,
    guns: [{
        position: [3, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.gunner, s.stream])
    }, {
        position: [2.7, 0.9, 1, 0, 0, 0, 0.2],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.gunner, s.stream])
    }, {
        position: [2.4, 0.9, 1, 0, 0, 0, 0.4],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.gunner, s.stream])
    }, {
        position: [2.1, 0.9, 1, 0, 0, 0, 0.6],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.gunner, s.stream])
    }, {
        position: [1.8, 0.9, 1, 0, 0, 0, 0.8],
        ammo: "bullet",
        stats: combineStats([s.basic, s.mach, s.gunner, s.stream])
    }]
};
let preda = {
    label: "Predator",
    fov: 1.4,
    guns: [{
        position: [2.3, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }, {
        position: [2, 1.2, 1, 0, 0, 0, 0.25],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }, {
        position: [1.7, 1.5, 1, 0, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }]
};
let ranger = {
    label: "Ranger",
    fov: 1.5,
    guns: [{
        position: [2.8, 0.9, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }, {
        position: [1.5, 1.75, 0.5, 0, 0, 0, 0],
        ammo: "bullet",
        prop: true,
        stats: combineStats([s.basic, s.sniper])
    }]
};
let stalker = {
    label: "Stalker",
    fov: 1.4,
    invis: true,
    guns: [{
        position: [2.8, 1.5, 0.75, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.sniper])
    }]
};
let battery = {
    label: "Battery",
    guns: [{
        position: [1.5, 0.5, 1, 0.7, 0, 0, 0.999],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.5, 0.5, 1, -0.7, 0, 0, 0.999],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.75, 0.5, 1, 0.35, 0, 0, 0.666],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.75, 0.5, 1, -0.35, 0, 0, 0.666],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [2, 0.5, 1, 0, 0, 0, 0.333],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }]
};
let gunnerTrapper = {
    label: "Gunner-Trapper",
    guns: [{
        position: [1.8, 0.5, 1, 0.35, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.8, 0.5, 1, -0.35, 0, 0, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.twin, s.gunner])
    }, {
        position: [1.4, 1, 1, 0, 0, Math.PI, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper]),
        prop: true
    }, {
        position: [0.5, 1, 1.5, 0, 1.35, Math.PI, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper])
    }]
};
let megaTrapper = {
    label: "Mega Trapper",
    guns: [{
        position: [1.5, 1.4, 1, 0, 0, 0, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper]),
        prop: true
    }, {
        position: [0.4, 1.4, 1.45, 0, 1.5, 0, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper, s.destroy])
    }]
};
let triTrapper = {
    label: "Tri-Trapper",
    guns: [{
        position: [1.5, 1, 1, 0, 0, 0, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper]),
        prop: true
    }, {
        position: [0.4, 1, 1.5, 0, 1.5, 0, 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper])
    }, {
        position: [1.5, 1, 1, 0, 0, Math.PI - (Math.PI / 3), 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper]),
        prop: true
    }, {
        position: [0.4, 1, 1.5, 0, 1.5, Math.PI - (Math.PI / 3), 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper])
    }, {
        position: [1.5, 1, 1, 0, 0, Math.PI + (Math.PI / 3), 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper]),
        prop: true
    }, {
        position: [0.4, 1, 1.5, 0, 1.5, Math.PI + (Math.PI / 3), 0],
        ammo: "trap",
        stats: combineStats([s.basic, s.trapper])
    }]
};
let fighter = {
    label: "Fighter",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [1.65, 0.9, 1, -0.1, 0, Math.PI * 1.5, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [1.65, 0.9, 1, 0.1, 0, Math.PI / 2, 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [1.65, 0.9, 1, -0.1, 0, Math.PI + (Math.PI / 6), 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }, {
        position: [1.65, 0.9, 1, 0.1, 0, Math.PI - (Math.PI / 6), 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }]
};
let booster = {
    label: "Booster",
    guns: [{
        position: [2, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank])
    }, {
        position: [1.5, 0.9, 1, -0.1, 0, Math.PI + (Math.PI / 4), 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }, {
        position: [1.5, 0.9, 1, 0.1, 0, Math.PI - (Math.PI / 4), 0.5],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }, {
        position: [1.65, 0.9, 1, -0.1, 0, Math.PI + (Math.PI / 6), 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }, {
        position: [1.65, 0.9, 1, 0.1, 0, Math.PI - (Math.PI / 6), 0],
        ammo: "bullet",
        stats: combineStats([s.basic, s.flank, s.thruster])
    }]
};

// Bosses
let summoner = {
    label: "Summoner",
    maxChildren: 32,
    type: "tank",
    name: "Summoner",
    color: "square",
    boss: true,
    xp: 500000,
    shape: 4,
    view: 10000,
    spin: 2,
    health: {
        max: 10000,
        amount: 10000
    },
    speed: 0.5,
    size: 150,
    guns: [{
        position: [1.15, 1, 1.5, 0, 0, 0, 1],
        ammo: "necroDrone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.summoner])
    }, {
        position: [1.15, 1, 1.5, 0, 0, Math.PI, 1],
        ammo: "necroDrone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.summoner])
    }, {
        position: [1.15, 1, 1.5, 0, 0, Math.PI / 2, 1],
        ammo: "necroDrone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.summoner])
    }, {
        position: [1.15, 1, 1.5, 0, 0, -Math.PI / 2, 1],
        ammo: "necroDrone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.summoner])
    }]
};
let fallenOverlord = {
    label: "Fallen Overlord",
    maxChildren: 32,
    type: "tank",
    name: "Fallen Overlord",
    color: "gray",
    boss: true,
    xp: 500000,
    view: 10000,
    spin: 2,
    health: {
        max: 10000,
        amount: 10000
    },
    speed: 0.5,
    size: 150,
    guns: [{
        position: [1.5, 1, 1.5, 0, 0, 0, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.fover])
    }, {
        position: [1.5, 1, 1.5, 0, 0, Math.PI, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.fover])
    }, {
        position: [1.5, 1, 1.5, 0, 0, Math.PI / 2, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.fover])
    }, {
        position: [1.5, 1, 1.5, 0, 0, -Math.PI / 2, 1],
        ammo: "drone",
        autoShoot: 2,
        stats: combineStats([s.basic, s.fover])
    }]
};
let arenaCloser = {
    label: "Arena Closer",
    type: "tank",
    color: "square",
    xp: 500000,
    health: {
        max: 10000,
        amount: 10000
    },
    stats: {
        speed: 50,
        damage: 1000,
        fov: 1.5
    },
    size: 150,
    guns: [{
        position: [1.5, 1, 1, 0, 0, 0, 0],
        ammo: "bullet",
        stats: combineStats([s.basic, [0.5, 1, 1, 10, 10, 2, 1, 5, 1]])
    }]
};

export {
    square,
    triangle,
    pentagon,
    alphaPentagon,
    crasher,
    bullet,
    trap,
    drone,
    necroDrone,
    minion,
    swarm,
    rocket,
    missile,
    basic,
    twin,
    machine,
    sniper,
    flank,
    triple,
    double,
    destroyer,
    gunner,
    trapper,
    assassin,
    hunter,
    quad,
    tri,
    triplet,
    penta,
    spreadshot,
    tripleTwin,
    anni,
    hybrid,
    skimmer,
    rocketeer,
    overseer,
    overlord,
    necromancer,
    factory,
    octo,
    battleship,
    sprayer,
    summoner,
    fallenOverlord,
    preda,
    stream,
    ranger,
    stalker,
    battery,
    gunnerTrapper,
    megaTrapper,
    triTrapper,
    fighter,
    booster,
    arenaCloser,
    dev,
    bosses,
    observer,
    misc,
    mothership
}